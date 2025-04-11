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

  seats: [
    {
      seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: ['Momo', 'Banking', 'E-Wallet', 'VNPAY'],
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

  specialRequests: {
    type: String
  },

  refundReason: {
    type: String
  },

  expiresAt: {
    type: Date
  }

}, {
  timestamps: true
});

// Index tối ưu truy vấn & xóa tự động sau timeout
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ schedule: 1, createdAt: -1 });
bookingSchema.index({ ticketCode: 1 });
bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Optional: auto-cancel nếu chưa thanh toán

// Tạo ticketCode tự động
bookingSchema.pre('save', async function (next) {
  if (!this.ticketCode) {
    const date = new Date();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.ticketCode = `TKT${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${random}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
