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
    seats: [{
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
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    description: String,
    facilities: [{
        type: String
    }]
}, {
    timestamps: true
});

// Index để tối ưu truy vấn
theaterSchema.index({ name: 1 });
theaterSchema.index({ format: 1 });

module.exports = mongoose.model('Theater', theaterSchema); 