const BookingService = require('../services/booking.service');
const logger = require('../config/logger');

class BookingController {
    static async createBooking(req, res) {
        try {
            // Lấy thông tin từ request
            const bookingData = {
                user: req.user._id, // Lấy từ middleware authenticate
                schedule: req.body.schedule,
                seats: req.body.seats,
                paymentMethod: req.body.paymentMethod
            };

            // Tạo booking
            const booking = await BookingService.createBooking(bookingData);

            // Trả về response
            res.status(201).json({
                success: true,
                message: 'Đặt vé thành công',
                data: {
                    bookingId: booking._id,
                    totalAmount: booking.totalAmount,
                    paymentStatus: booking.paymentStatus,
                    seats: booking.seats,
                    schedule: booking.schedule
                }
            });
        } catch (error) {
            logger.error('Lỗi khi tạo booking:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingById(req, res) {
        try {
            const booking = await BookingService.getBookingById(req.params.id);
            res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            logger.error('Lỗi khi lấy thông tin booking:', error);
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getAllBookings(req, res) {
        try {
            const bookings = await BookingService.getAllBookings();
            res.status(200).json({
                success: true,
                data: bookings
            });
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateBooking(req, res) {
        try {
            const booking = await BookingService.updateBooking(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            logger.error('Lỗi khi cập nhật booking:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteBooking(req, res) {
        try {
            const booking = await BookingService.deleteBooking(req.params.id);
            res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            logger.error('Lỗi khi xóa booking:', error);
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingsByUser(req, res) {
        try {
            const bookings = await BookingService.getBookingsByUser(req.params.userId);
            res.status(200).json({
                success: true,
                data: bookings
            });
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking theo user:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingsBySchedule(req, res) {
        try {
            const bookings = await BookingService.getBookingsBySchedule(req.params.scheduleId);
            res.status(200).json({
                success: true,
                data: bookings
            });
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking theo lịch chiếu:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingsByStatus(req, res) {
        try {
            const bookings = await BookingService.getBookingsByStatus(req.params.status);
            res.status(200).json({
                success: true,
                data: bookings
            });
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking theo trạng thái:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getBookingsByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const bookings = await BookingService.getBookingsByDateRange(startDate, endDate);
            res.status(200).json({
                success: true,
                data: bookings
            });
        } catch (error) {
            logger.error('Lỗi khi lấy danh sách booking theo khoảng thời gian:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updatePaymentStatus(req, res) {
        try {
            const { paymentStatus } = req.body;
            const booking = await BookingService.updatePaymentStatus(req.params.id, paymentStatus);
            res.status(200).json({
                success: true,
                data: booking
            });
        } catch (error) {
            logger.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = BookingController; 