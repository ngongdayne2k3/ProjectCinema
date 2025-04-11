const Booking = require('../models/Booking');
const { BookingDTO, CreateBookingDTO, UpdateBookingDTO } = require('../dto/booking.dto');
const logger = require('../config/logger');
const Seat = require('../models/Seat');
const User = require('../models/User');

class BookingDAO {
    static async create(data) {
        try {
            const booking = new Booking(data);
            await booking.save();

            const populatedBooking = await Booking.findById(booking._id)
                .populate('user', 'username email')
                .populate('schedule')
                .populate('seats.seat');

            return BookingDTO.toDTO(populatedBooking);
        } catch (error) {
            logger.error('Lỗi khi tạo booking:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const booking = await Booking.findById(id)
                .populate({
                    path: 'user',
                    select: 'username email'
                })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'theater movie'
                    }
                })
                .populate({
                    path: 'seats.seat',
                    populate: {
                        path: 'theater'
                    }
                });

            if (!booking) {
                return null;
            }

            return booking;
        } catch (error) {
            logger.error('Lỗi khi tìm booking theo ID:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const bookings = await Booking.find()
                .populate({
                    path: 'user',
                    select: 'username email'
                })
                .populate('schedule')
                .populate('seats');
            return BookingDTO.toListDTO(bookings);
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking:', error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) {
                throw new Error('Booking không tồn tại');
            }

            // Kiểm tra trạng thái booking
            if (booking.paymentStatus === 'Đã thanh toán') {
                throw new Error('Không thể cập nhật booking đã thanh toán');
            }

            // Nếu đổi ghế
            if (data.seats) {
                const seats = await Seat.find({ _id: { $in: data.seats } });
                if (seats.length !== data.seats.length) {
                    throw new Error('Một số ghế không tồn tại');
                }

                // Tính lại tổng tiền
                const totalAmount = seats.reduce((sum, seat) => sum + seat.price, 0);
                data.totalAmount = totalAmount;
            }

            const updateBookingDTO = new UpdateBookingDTO(data);
            const updatedBooking = await Booking.findByIdAndUpdate(
                id,
                updateBookingDTO,
                { new: true }
            ).populate({
                path: 'user',
                select: 'username email'
            })
             .populate('schedule')
             .populate('seats');

            return updatedBooking ? BookingDTO.toDTO(updatedBooking) : null;
        } catch (error) {
            logger.error('Lỗi khi cập nhật booking:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) {
                throw new Error('Booking không tồn tại');
            }

            // Soft delete
            const deletedBooking = await Booking.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true }
            );

            return deletedBooking ? BookingDTO.toDTO(deletedBooking) : null;
        } catch (error) {
            logger.error('Lỗi khi xóa booking:', error);
            throw error;
        }
    }

    static async findByUser(userId) {
        try {
            const bookings = await Booking.find({ user: userId, isDeleted: false })
                .populate({
                    path: 'user',
                    select: 'username email'
                })
                .populate('schedule')
                .populate('seats')
                .sort({ createdAt: -1 });
            return BookingDTO.toListDTO(bookings);
        } catch (error) {
            logger.error('Lỗi khi tìm booking theo user:', error);
            throw error;
        }
    }

    static async findBySchedule(scheduleId) {
        try {
            const bookings = await Booking.find({ schedule: scheduleId, isDeleted: false })
                .populate({
                    path: 'user',
                    select: 'username email'
                })
                .populate('schedule')
                .populate('seats');
            return BookingDTO.toListDTO(bookings);
        } catch (error) {
            logger.error('Lỗi khi tìm booking theo lịch chiếu:', error);
            throw error;
        }
    }

    static async findByStatus(status) {
        try {
            const bookings = await Booking.find({ status, isDeleted: false })
                .populate({
                    path: 'user',
                    select: 'username email'
                })
                .populate('schedule')
                .populate('seats');
            return BookingDTO.toListDTO(bookings);
        } catch (error) {
            logger.error('Lỗi khi tìm booking theo trạng thái:', error);
            throw error;
        }
    }

    static async findByDateRange(startDate, endDate) {
        try {
            const bookings = await Booking.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                },
                isDeleted: false
            }).populate({
                path: 'user',
                select: 'username email'
            })
              .populate('schedule')
              .populate('seats');
            return BookingDTO.toListDTO(bookings);
        } catch (error) {
            logger.error('Lỗi khi tìm booking theo khoảng thời gian:', error);
            throw error;
        }
    }

    static async checkSeatsAvailability(scheduleId, seatIds) {
        try {
            // Kiểm tra xem có booking nào đang giữ các ghế này không
            const existingBookings = await Booking.find({
                schedule: scheduleId,
                'seats.seat': { $in: seatIds },
                bookingStatus: { $in: ['Active', 'Pending'] },
                paymentStatus: { $ne: 'Failed' }
            });

            // Nếu có booking tồn tại, nghĩa là ghế đã được đặt
            return existingBookings.length === 0;
        } catch (error) {
            logger.error('Lỗi khi kiểm tra tình trạng ghế:', error);
            throw error;
        }
    }

    static async updatePaymentStatus(id, paymentStatus) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) {
                throw new Error('Booking không tồn tại');
            }

            // Cập nhật trạng thái thanh toán
            const updatedBooking = await Booking.findByIdAndUpdate(
                id,
                { paymentStatus },
                { new: true }
            ).populate({
                path: 'user',
                select: 'username email'
            })
             .populate('schedule')
             .populate('seats');

            return updatedBooking ? BookingDTO.toDTO(updatedBooking) : null;
        } catch (error) {
            logger.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
            throw error;
        }
    }
}

module.exports = BookingDAO; 