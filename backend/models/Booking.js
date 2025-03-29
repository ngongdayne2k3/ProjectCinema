const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
    },
    seats: [{
        row: String,
        number: Number,
        price: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Momo', 'Banking', 'E-Wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    bookingStatus: {
        type: String,
        enum: ['Active', 'Cancelled', 'Completed'],
        default: 'Active'
    },
    ticketCode: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    specialRequests: String,
    refundReason: String
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ schedule: 1, createdAt: -1 });
bookingSchema.index({ ticketCode: 1 });

// Middleware để tạo mã vé tự động
bookingSchema.pre('save', async function(next) {
    if (!this.ticketCode) {
        const date = new Date();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.ticketCode = `TKT${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${random}`;
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema); 