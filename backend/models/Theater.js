const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    capacity: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        enum: ['2D', '3D', 'IMAX'],
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    seatsPerRow: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    description: String
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
theaterSchema.index({ name: 1 });
theaterSchema.index({ format: 1 });
theaterSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('Theater', theaterSchema); 