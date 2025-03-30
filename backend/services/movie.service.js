const movieDAO = require('../dao/movie.dao');
const { MovieDTO, CreateMovieDTO, UpdateMovieDTO } = require('../dto/movie.dto');

class MovieService {
    async createMovie(movieData) {
        const createMovieDTO = new CreateMovieDTO(movieData);
        const movie = await movieDAO.create(createMovieDTO);
        return new MovieDTO(movie);
    }

    async getMovieById(id) {
        const movie = await movieDAO.findById(id);
        return movie ? new MovieDTO(movie) : null;
    }

    async getAllMovies(query = {}) {
        const movies = await movieDAO.findAll(query);
        return movies.map(movie => new MovieDTO(movie));
    }

    async updateMovie(id, movieData) {
        const updateMovieDTO = new UpdateMovieDTO(movieData);
        const movie = await movieDAO.update(id, updateMovieDTO);
        return movie ? new MovieDTO(movie) : null;
    }

    async deleteMovie(id) {
        return await movieDAO.delete(id);
    }

    async getMoviesByStatus(status) {
        const movies = await movieDAO.findByStatus(status);
        return movies.map(movie => new MovieDTO(movie));
    }

    async addRating(movieId, userId, rating, comment) {
        const ratingData = {
            userId,
            rating,
            comment,
            createdAt: new Date()
        };

        const movie = await movieDAO.addRating(movieId, ratingData);
        if (movie) {
            await movieDAO.updateAverageRating(movieId);
        }
        return movie ? new MovieDTO(movie) : null;
    }

    async calculateAverageRating(movieId) {
        const movie = await movieDAO.updateAverageRating(movieId);
        return movie ? new MovieDTO(movie) : null;
    }
}

module.exports = new MovieService(); 