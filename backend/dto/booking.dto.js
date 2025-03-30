class BookingDTO {
    constructor(booking) {
        this.id = booking._id;
        this.user = booking.user;
        this.schedule = booking.schedule;
        this.seats = booking.seats;
        this.totalAmount = booking.totalAmount;
        this.paymentMethod = booking.paymentMethod;
        this.paymentStatus = booking.paymentStatus;
        this.bookingStatus = booking.bookingStatus;
        this.ticketCode = booking.ticketCode;
        this.email = booking.email;
        this.phone = booking.phone;
        this.specialRequests = booking.specialRequests;
        this.refundReason = booking.refundReason;
        this.createdAt = booking.createdAt;
        this.updatedAt = booking.updatedAt;
    }
}

class CreateBookingDTO {
    constructor(data) {
        this.user = data.user;
        this.schedule = data.schedule;
        this.seats = data.seats;
        this.totalAmount = data.totalAmount;
        this.paymentMethod = data.paymentMethod;
        this.email = data.email;
        this.phone = data.phone;
        this.specialRequests = data.specialRequests;
    }
}

class UpdateBookingDTO {
    constructor(data) {
        if (data.seats) this.seats = data.seats;
        if (data.totalAmount) this.totalAmount = data.totalAmount;
        if (data.paymentMethod) this.paymentMethod = data.paymentMethod;
        if (data.paymentStatus) this.paymentStatus = data.paymentStatus;
        if (data.bookingStatus) this.bookingStatus = data.bookingStatus;
        if (data.email) this.email = data.email;
        if (data.phone) this.phone = data.phone;
        if (data.specialRequests) this.specialRequests = data.specialRequests;
        if (data.refundReason) this.refundReason = data.refundReason;
    }
}

module.exports = {
    BookingDTO,
    CreateBookingDTO,
    UpdateBookingDTO
}; 