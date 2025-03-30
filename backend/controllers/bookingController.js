const bookingService = require('../services/booking.service');
const logger = require('../config/logger');

class BookingController {
    async createBooking(req, res) {
        try {
            const bookingData = {
                ...req.body,
                user: req.user._id
            };
            const booking = await bookingService.createBooking(bookingData);
            logger.info(`Tạo đặt vé mới: ${booking.ticketCode}`);
            res.status(201).json(booking);
        } catch (error) {
            logger.error(`Lỗi tạo đặt vé: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

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
}

module.exports = new BookingController(); 