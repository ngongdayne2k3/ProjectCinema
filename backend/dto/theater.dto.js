class TheaterDTO {
    constructor(theater) {
        this.id = theater._id;
        this.name = theater.name;
        this.capacity = theater.capacity;
        this.format = theater.format;
        this.rows = theater.rows;
        this.seatsPerRow = theater.seatsPerRow;
        this.isActive = theater.isActive;
        this.description = theater.description;
        this.createdAt = theater.createdAt;
        this.updatedAt = theater.updatedAt;
    }

    static toDTO(theater) {
        return new TheaterDTO(theater);
    }

    static toDTOList(theaters) {
        return theaters.map(theater => new TheaterDTO(theater));
    }
}

class CreateTheaterDTO {
    constructor(data) {
        this.name = data.name;
        this.capacity = data.capacity;
        this.format = data.format;
        this.rows = data.rows;
        this.seatsPerRow = data.seatsPerRow;
        this.description = data.description;
    }
}

class UpdateTheaterDTO {
    constructor(data) {
        this.name = data.name;
        this.capacity = data.capacity;
        this.format = data.format;
        this.rows = data.rows;
        this.seatsPerRow = data.seatsPerRow;
        this.isActive = data.isActive;
        this.description = data.description;
    }
}

module.exports = {
    TheaterDTO,
    CreateTheaterDTO,
    UpdateTheaterDTO
}; 