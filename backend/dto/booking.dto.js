class BookingDTO {
    static toDTO(booking) {
        return {
            id: booking._id,
            user: booking.user,
            schedule: booking.schedule,
            seats: booking.seats,
            totalAmount: booking.totalAmount,
            paymentMethod: booking.paymentMethod,
            paymentStatus: booking.paymentStatus,
            bookingStatus: booking.bookingStatus,
            ticketCode: booking.ticketCode,
            specialRequests: booking.specialRequests,
            refundReason: booking.refundReason,
            expiresAt: booking.expiresAt,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
    }

    static toListDTO(bookings) {
        return bookings.map(booking => this.toDTO(booking));
    }
}

class CreateBookingDTO {
    constructor(data) {
        this.user = data.user;
        this.schedule = data.schedule;
        this.seats = data.seats;
        this.totalAmount = data.totalAmount;
        this.paymentMethod = data.paymentMethod;
        this.paymentStatus = 'Pending';
        this.bookingStatus = 'Active';
        this.ticketCode = data.ticketCode;
        this.specialRequests = data.specialRequests;
    }
}

class UpdateBookingDTO {
    constructor(data) {
        if (data.paymentStatus) this.paymentStatus = data.paymentStatus;
        if (data.bookingStatus) this.bookingStatus = data.bookingStatus;
        if (data.paymentMethod) this.paymentMethod = data.paymentMethod;
        if (data.specialRequests) this.specialRequests = data.specialRequests;
        if (data.refundReason) this.refundReason = data.refundReason;
    }
}

module.exports = {
    BookingDTO,
    CreateBookingDTO,
    UpdateBookingDTO
}; 