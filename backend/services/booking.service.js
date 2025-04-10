const bookingDAO = require('../dao/booking.dao');
const userDAO = require('../dao/user.dao');
const { BookingDTO, CreateBookingDTO, UpdateBookingDTO } = require('../dto/booking.dto');

class BookingService {
    async createBooking(bookingData) {
        const createBookingDTO = new CreateBookingDTO(bookingData);
        const booking = await bookingDAO.create(createBookingDTO);
        
        if (booking) {
            // Thêm booking vào lịch sử của user
            await userDAO.addBookingToHistory(booking.user, booking._id);
            
            // Tính điểm thành viên (ví dụ: 10 điểm cho mỗi vé)
            const points = booking.seats.length * 10;
            await userDAO.updateMembershipPoints(booking.user, points);
        }
        
        return booking ? new BookingDTO(booking) : null;
    }

    async getBookingById(id) {
        const booking = await bookingDAO.findById(id);
        return booking ? new BookingDTO(booking) : null;
    }

    async getUserBookings(userId) {
        const bookings = await bookingDAO.findByUser(userId);
        return bookings.map(booking => new BookingDTO(booking));
    }

    async updateBooking(id, bookingData) {
        const updateBookingDTO = new UpdateBookingDTO(bookingData);
        const booking = await bookingDAO.update(id, updateBookingDTO);
        return booking ? new BookingDTO(booking) : null;
    }

    async deleteBooking(id) {
        return await bookingDAO.delete(id);
    }

    async updatePaymentStatus(id, status) {
        const booking = await bookingDAO.updatePaymentStatus(id, status);
        return booking ? new BookingDTO(booking) : null;
    }

    async updateBookingStatus(id, status) {
        const booking = await bookingDAO.updateBookingStatus(id, status);
        return booking ? new BookingDTO(booking) : null;
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

module.exports = new BookingService(); 