const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    format: {
        type: String,
        enum: ['2D', '3D', 'IMAX'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    availableSeats: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
scheduleSchema.index({ movie: 1, startTime: 1 });
scheduleSchema.index({ theater: 1, startTime: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema); 