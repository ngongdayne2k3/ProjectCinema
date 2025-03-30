class MovieDTO {
    constructor(movie) {
        this.id = movie._id;
        this.title = movie.title;
        this.description = movie.description;
        this.duration = movie.duration;
        this.director = movie.director;
        this.cast = movie.cast;
        this.genres = movie.genres;
        this.poster = movie.poster;
        this.trailer = movie.trailer;
        this.status = movie.status;
        this.averageRating = movie.averageRating;
        this.ratings = movie.ratings;
        this.createdAt = movie.createdAt;
        this.updatedAt = movie.updatedAt;
    }
}

class CreateMovieDTO {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.duration = data.duration;
        this.director = data.director;
        this.cast = data.cast;
        this.genres = data.genres;
        this.poster = data.poster;
        this.trailer = data.trailer;
        this.status = data.status || 'Sắp chiếu';
    }
}

class UpdateMovieDTO {
    constructor(data) {
        if (data.title) this.title = data.title;
        if (data.description) this.description = data.description;
        if (data.duration) this.duration = data.duration;
        if (data.director) this.director = data.director;
        if (data.cast) this.cast = data.cast;
        if (data.genres) this.genres = data.genres;
        if (data.poster) this.poster = data.poster;
        if (data.trailer) this.trailer = data.trailer;
        if (data.status) this.status = data.status;
    }
}

module.exports = {
    MovieDTO,
    CreateMovieDTO,
    UpdateMovieDTO
}; 