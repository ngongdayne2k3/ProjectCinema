const cron = require('node-cron');
const BookingService = require('../services/booking.service');
const SeatService = require('../services/seat.service');
const logger = require('../config/logger');

class BookingExpirationJob {
    static init() {
        // Chạy mỗi phút để kiểm tra các booking hết hạn
        cron.schedule('* * * * *', async () => {
            try {
                const expiredBookings = await BookingService.getExpiredBookings();
                
                for (const booking of expiredBookings) {
                    try {
                        // Cập nhật trạng thái booking
                        await BookingService.updatePaymentStatus(booking._id, 'Expired');
                        
                        // Cập nhật trạng thái ghế về Available
                        await SeatService.updateSeatsStatus(
                            booking.seats.map(seat => seat._id),
                            'Available'
                        );
                        
                        logger.info('Đã cập nhật trạng thái booking và ghế hết hạn', {
                            bookingId: booking._id,
                            seats: booking.seats.map(seat => seat._id)
                        });
                    } catch (error) {
                        logger.error('Lỗi khi xử lý booking hết hạn:', {
                            bookingId: booking._id,
                            error: error.message
                        });
                    }
                }
            } catch (error) {
                logger.error('Lỗi khi chạy job kiểm tra booking hết hạn:', error);
            }
        });
        
        logger.info('Đã khởi tạo job kiểm tra booking hết hạn');
    }
}

module.exports = BookingExpirationJob; 