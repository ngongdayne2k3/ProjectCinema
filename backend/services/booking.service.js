const bookingDAO = require('../dao/booking.dao');
const userDAO = require('../dao/user.dao');
const { BookingDTO, CreateBookingDTO, UpdateBookingDTO } = require('../dto/booking.dto');
const logger = require('../config/logger');
const Seat = require('../models/Seat');
const User = require('../models/User');
const Schedule = require('../models/Schedule');

class BookingService {
    static generateTicketCode() {
        const date = new Date();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `TKT${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${random}`;
    }

    static async createBooking(data) {
        try {
            // 1. Kiểm tra lịch chiếu có tồn tại không và populate theater
            const schedule = await Schedule.findById(data.schedule).populate('theater');
            if (!schedule) {
                throw new Error('Lịch chiếu không tồn tại');
            }

            // 2. Kiểm tra thời gian đặt vé
            const now = new Date();
            if (now > schedule.startTime) {
                throw new Error('Không thể đặt vé cho lịch chiếu đã bắt đầu');
            }

            // 3. Kiểm tra ghế có tồn tại không và populate theater
            const seats = await Seat.find({ _id: { $in: data.seats } }).populate('theater');
            if (seats.length !== data.seats.length) {
                throw new Error('Một số ghế không tồn tại');
            }

            // 4. Kiểm tra ghế có thuộc rạp của lịch chiếu không
            for (const seat of seats) {
                if (seat.theater._id.toString() !== schedule.theater._id.toString()) {
                    throw new Error(`Ghế ${seat._id} không thuộc rạp của lịch chiếu`);
                }
                if (seat.status !== 'Available') {
                    throw new Error(`Ghế ${seat._id} không khả dụng`);
                }
            }

            // 5. Kiểm tra ghế có sẵn sàng không
            const isAvailable = await bookingDAO.checkSeatsAvailability(data.schedule, data.seats);
            if (!isAvailable) {
                throw new Error('Một số ghế đã được đặt');
            }

            // 6. Tính tổng tiền dựa trên giá của lịch chiếu
            let totalAmount = 0;
            const seatDetails = seats.map(seat => {
                const priceConfig = schedule.prices.find(p => p.type === seat.type);
                if (!priceConfig) {
                    throw new Error(`Không tìm thấy cấu hình giá cho loại ghế ${seat.type}`);
                }
                totalAmount += priceConfig.price;
                return {
                    seat: seat._id,
                    price: priceConfig.price,
                    type: seat.type
                };
            });

            // 7. Lấy thông tin user từ request hoặc token
            const user = await User.findById(data.user);
            if (!user) {
                throw new Error('Người dùng không tồn tại');
            }

            // 8. Tạo booking
            const createBookingDTO = {
                user: user._id,
                schedule: schedule._id,
                seats: seatDetails,
                totalAmount,
                paymentMethod: data.paymentMethod,
                paymentStatus: 'Pending',
                bookingStatus: 'Active',
                ticketCode: BookingService.generateTicketCode(),
                expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 phút để thanh toán
            };

            const booking = await bookingDAO.create(createBookingDTO);
            logger.info(`Tạo booking mới: ${booking._id} cho user ${user.username}`);
            
            // 9. Cập nhật trạng thái ghế
            await Seat.updateMany(
                { _id: { $in: data.seats } },
                { $set: { status: 'Reserved' } }
            );
            
            // 10. Thêm booking vào lịch sử của user và cập nhật điểm
            await userDAO.addBookingToHistory(user._id, booking._id);
            const points = seats.length * 10;
            await userDAO.updateMembershipPoints(user._id, points);
            
            return booking;
        } catch (error) {
            logger.error('Lỗi khi tạo booking:', error);
            throw error;
        }
    }

    static async getBookingById(id) {
        try {
            const booking = await bookingDAO.findById(id);
            if (!booking) {
                throw new Error('Không tìm thấy booking');
            }
            return booking;
        } catch (error) {
            logger.error('Lỗi khi lấy booking theo ID:', error);
            throw error;
        }
    }

    static async getUserBookings(userId) {
        try {
            return await bookingDAO.findByUser(userId);
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking của user:', error);
            throw error;
        }
    }

    static async updateBooking(id, bookingData) {
        try {
            const updateBookingDTO = new UpdateBookingDTO(bookingData);
            const booking = await bookingDAO.update(id, updateBookingDTO);
            if (!booking) {
                throw new Error('Không tìm thấy booking');
            }
            return booking;
        } catch (error) {
            logger.error('Lỗi khi cập nhật booking:', error);
            throw error;
        }
    }

    static async deleteBooking(id) {
        try {
            return await bookingDAO.delete(id);
        } catch (error) {
            logger.error('Lỗi khi xóa booking:', error);
            throw error;
        }
    }

    static async updatePaymentStatus(id, status) {
        try {
            const booking = await bookingDAO.findById(id);
            if (!booking) {
                throw new Error('Không tìm thấy booking');
            }

            booking.paymentStatus = status;
            if (status === 'Completed') {
                booking.bookingStatus = 'Active';
            } else if (status === 'Failed') {
                booking.bookingStatus = 'Cancelled';
                // Giải phóng ghế khi thanh toán thất bại
                await Seat.updateMany(
                    { _id: { $in: booking.seats.map(s => s.seat) } },
                    { $set: { status: 'Available' } }
                );
            }

            return await bookingDAO.update(id, booking);
        } catch (error) {
            logger.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
            throw error;
        }
    }

    static async updateBookingStatus(id, status) {
        try {
            const booking = await bookingDAO.findById(id);
            if (!booking) {
                throw new Error('Không tìm thấy booking');
            }

            booking.bookingStatus = status;
            return await bookingDAO.update(id, booking);
        } catch (error) {
            logger.error('Lỗi khi cập nhật trạng thái booking:', error);
            throw error;
        }
    }

    async getBookingByTicketCode(ticketCode) {
        const booking = await bookingDAO.findByTicketCode(ticketCode);
        return booking ? new BookingDTO(booking) : null;
    }

    async getBookingsBySchedule(scheduleId) {
        const bookings = await bookingDAO.findBySchedule(scheduleId);
        return bookings.map(booking => new BookingDTO(booking));
    }

    async cancelBooking(id, reason) {
        const booking = await bookingDAO.update(id, {
            bookingStatus: 'Cancelled',
            refundReason: reason
        });
        return booking ? new BookingDTO(booking) : null;
    }
}

module.exports = BookingService; 