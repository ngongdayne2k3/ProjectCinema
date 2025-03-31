const Movie = require('../models/Movie');

class MovieDAO {
    async create(movieData) {
        const movie = new Movie(movieData);
        return await movie.save();
    }

    async findById(id) {
        return await Movie.findById(id);
    }

    async findAll(query = {}) {
        return await Movie.find(query);
    }

    async update(id, movieData) {
        return await Movie.findByIdAndUpdate(id, movieData, { new: true });
    }

    async delete(id) {
        return await Movie.findByIdAndDelete(id);
    }

    async findByStatus(status) {
        return await Movie.find({ status });
    }

    async addRating(movieId, ratingData) {
        return await Movie.findByIdAndUpdate(
            movieId,
            { $push: { ratings: ratingData } },
            { new: true }
        );
    }

    async updateAverageRating(movieId) {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const totalRating = movie.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const averageRating = movie.ratings.length > 0 ? totalRating / movie.ratings.length : 0;

        return await Movie.findByIdAndUpdate(
            movieId,
            { averageRating },
            { new: true }
        );
    }
}

module.exports = new MovieDAO(); 