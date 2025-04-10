// controllers/bookingController.js
const bookingService = require('../services/booking.service');
const scheduleService = require('../services/schedule.service'); // Thêm để lấy thông tin lịch chiếu
const movieService = require('../services/movie.service'); // Thêm để lấy thông tin phim
const sendBookingSuccessEmail = require('../middlewares/sendEmail'); // Thêm để gửi email
const logger = require('../config/logger');

class BookingController {
    async createBooking(req, res) {
        try {
            const bookingData = {
                ...req.body,
                user: req.user._id
            };
            // Tạo booking
            const booking = await bookingService.createBooking(bookingData);
            logger.info(`Tạo đặt vé mới: ${booking.ticketCode}`);

            // Lấy thông tin lịch chiếu và phim
            const schedule = await scheduleService.getScheduleById(booking.schedule);
            const movie = await movieService.getMovieById(schedule.movie);

            // Tạo bookingDetails để gửi email
            const bookingDetails = {
                movie: movie.title,
                showtime: schedule.startTime.toISOString(), // Hoặc định dạng thời gian theo ý bạn
                seats: booking.seats.map(seat => `${seat.row}${seat.number}`), // Chuyển seats thành dạng "A1, A2"
                totalPrice: booking.totalAmount,
                ticketCode: booking.ticketCode, // Thêm ticketCode vào email
            };

            // Gửi email xác nhận (bất đồng bộ để không làm chậm response)
            sendBookingSuccessEmail(booking.email, bookingDetails).catch(err => {
                logger.error(`Lỗi gửi email xác nhận: ${err.message}`);
            });

            // Trả về response ngay lập tức
            res.status(201).json({
                success: true,
                message: 'Booking created successfully! Confirmation email sent.',
                data: booking,
            });
        } catch (error) {
            logger.error(`Lỗi tạo đặt vé: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    // Các hàm khác (getBookingById, getUserBookings, v.v.) không cần chỉnh sửa
    async getBookingById(req, res) {
        try {
            const booking = await bookingService.getBookingById(req.params.id);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin đặt vé: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getUserBookings(req, res) {
        try {
            const bookings = await bookingService.getUserBookings(req.user._id);
            res.json(bookings);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách đặt vé: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateBooking(req, res) {
        try {
            const booking = await bookingService.updateBooking(req.params.id, req.body);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            logger.info(`Cập nhật đặt vé: ${booking.ticketCode}`);
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi cập nhật đặt vé: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const { status } = req.body;
            const booking = await bookingService.updatePaymentStatus(req.params.id, status);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            logger.info(`Cập nhật trạng thái thanh toán: ${booking.ticketCode}`);
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi cập nhật trạng thái thanh toán: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async updateBookingStatus(req, res) {
        try {
            const { status } = req.body;
            const booking = await bookingService.updateBookingStatus(req.params.id, status);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            logger.info(`Cập nhật trạng thái đặt vé: ${booking.ticketCode}`);
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi cập nhật trạng thái đặt vé: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async getBookingByTicketCode(req, res) {
        try {
            const booking = await bookingService.getBookingByTicketCode(req.params.ticketCode);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin đặt vé theo mã vé: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getBookingsBySchedule(req, res) {
        try {
            const bookings = await bookingService.getBookingsBySchedule(req.params.scheduleId);
            res.json(bookings);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách đặt vé theo lịch chiếu: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async cancelBooking(req, res) {
        try {
            const { reason } = req.body;
            const booking = await bookingService.cancelBooking(req.params.id, reason);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy đặt vé' });
            }
            logger.info(`Hủy đặt vé: ${booking.ticketCode}`);
            res.json(booking);
        } catch (error) {
            logger.error(`Lỗi hủy đặt vé: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await bookingService.getAllBookings(req.query);
            res.json(bookings);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách tất cả đặt vé: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BookingController();