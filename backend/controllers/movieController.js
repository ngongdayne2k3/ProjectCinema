const movieService = require('../services/movie.service');
const uploadService = require('../services/upload.service');
const logger = require('../config/logger');

class MovieController {
    async createMovie(req, res) {
        try {
            let posterUrl = null;
            if (req.file) {
                posterUrl = await uploadService.uploadPoster(req.file);
            }

            const movieData = {
                ...req.body,
                poster: posterUrl
            };

            const movie = await movieService.createMovie(movieData);
            logger.info(`Tạo phim mới: ${movie.title}`);
            res.status(201).json(movie);
        } catch (error) {
            logger.error(`Lỗi tạo phim: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async getMovieById(req, res) {
        try {
            const movie = await movieService.getMovieById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Không tìm thấy phim' });
            }
            res.json(movie);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin phim: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllMovies(req, res) {
        try {
            const movies = await movieService.getAllMovies(req.query);
            res.json(movies);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách phim: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateMovie(req, res) {
        try {
            let posterUrl = req.body.poster; // Giữ nguyên poster cũ nếu không có file mới

            if (req.file) {
                // Lấy poster cũ từ database
                const oldMovie = await movieService.getMovieById(req.params.id);
                if (oldMovie) {
                    posterUrl = await uploadService.updatePoster(oldMovie.poster, req.file);
                } else {
                    posterUrl = await uploadService.uploadPoster(req.file);
                }
            }

            const movieData = {
                ...req.body,
                poster: posterUrl
            };

            const movie = await movieService.updateMovie(req.params.id, movieData);
            if (!movie) {
                return res.status(404).json({ message: 'Không tìm thấy phim' });
            }
            logger.info(`Cập nhật phim: ${movie.title}`);
            res.json(movie);
        } catch (error) {
            logger.error(`Lỗi cập nhật phim: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteMovie(req, res) {
        try {
            // Lấy thông tin phim trước khi xóa
            const movie = await movieService.getMovieById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Không tìm thấy phim' });
            }

            // Xóa poster
            if (movie.poster) {
                await uploadService.deletePoster(movie.poster);
            }

            // Xóa phim
            await movieService.deleteMovie(req.params.id);
            logger.info(`Xóa phim: ${movie.title}`);
            res.json({ message: 'Xóa phim thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa phim: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getMoviesByStatus(req, res) {
        try {
            const movies = await movieService.getMoviesByStatus(req.params.status);
            res.json(movies);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách phim theo trạng thái: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async addRating(req, res) {
        try {
            const { rating, comment } = req.body;
            const movie = await movieService.addRating(
                req.params.id,
                req.user._id,
                rating,
                comment
            );
            if (!movie) {
                return res.status(404).json({ message: 'Không tìm thấy phim' });
            }
            logger.info(`Thêm đánh giá cho phim: ${movie.title}`);
            res.json(movie);
        } catch (error) {
            logger.error(`Lỗi thêm đánh giá: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new MovieController(); 