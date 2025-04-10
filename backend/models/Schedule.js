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
        enum: ['2D', '3D', 'IMAX', '4DX', 'SCREENX'],
        required: true
    },
    prices: [{
        type: {
            type: String,
            enum: ['Standard', 'VIP'],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['upcoming', 'showing', 'finished', 'canceled'],
        default: 'upcoming'
    }
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
scheduleSchema.index({ movie: 1, startTime: 1 });
scheduleSchema.index({ theater: 1, startTime: 1 });
scheduleSchema.index({ status: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema); 