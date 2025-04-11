const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    row: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Standard', 'VIP'],
        default: 'Standard'
    },
    status: {
        type: String,
        enum: ['Available', 'Maintenance', 'Reserved'],
        default: 'Available'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
seatSchema.index({ theater: 1, row: 1, number: 1 });
seatSchema.index({ theater: 1, isDeleted: 1 });

module.exports = mongoose.model('Seat', seatSchema); 