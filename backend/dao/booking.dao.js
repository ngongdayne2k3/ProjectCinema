const Booking = require('../models/Booking');

class BookingDAO {
    async create(bookingData) {
        const booking = new Booking(bookingData);
        return await booking.save();
    }

    async findById(id) {
        return await Booking.findById(id)
            .populate('user')
            .populate('schedule');
    }

    async findByUser(userId) {
        return await Booking.find({ user: userId })
            .populate('schedule')
            .sort({ createdAt: -1 });
    }

    async findBySchedule(scheduleId) {
        return await Booking.find({ schedule: scheduleId });
    }

    async update(id, bookingData) {
        return await Booking.findByIdAndUpdate(id, bookingData, { new: true });
    }

    async delete(id) {
        return await Booking.findByIdAndDelete(id);
    }

    async updatePaymentStatus(id, status) {
        return await Booking.findByIdAndUpdate(
            id,
            { paymentStatus: status },
            { new: true }
        );
    }

    async updateBookingStatus(id, status) {
        return await Booking.findByIdAndUpdate(
            id,
            { bookingStatus: status },
            { new: true }
        );
    }

    async findByTicketCode(ticketCode) {
        return await Booking.findOne({ ticketCode })
            .populate('user')
            .populate('schedule');
    }
}

module.exports = new BookingDAO(); 