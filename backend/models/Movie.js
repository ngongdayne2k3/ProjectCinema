const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // Thời lượng phim (phút)
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: [{
        type: String
    }],
    genres: [{
        type: String
    }],
    poster: {
        type: String,
        required: true
    },
    trailer: {
        type: String
    },
    status: {
        type: String,
        enum: ['Đang chiếu', 'Sắp chiếu', 'Ngừng chiếu'],
        default: 'Sắp chiếu'
    },
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema); 