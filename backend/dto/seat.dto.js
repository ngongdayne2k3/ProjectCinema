class SeatDTO {
    constructor(seat) {
        this._id = seat._id;
        this.theater = seat.theater;
        this.row = seat.row;
        this.number = seat.number;
        this.type = seat.type;
        this.status = seat.status;
        this.isDeleted = seat.isDeleted;
        this.createdAt = seat.createdAt;
        this.updatedAt = seat.updatedAt;
    }

    static toDTO(seat) {
        return new SeatDTO(seat);
    }

    static toDTOList(seats) {
        return seats.map(seat => new SeatDTO(seat));
    }
}

class CreateSeatDTO {
    constructor(data) {
        this.theater = data.theater;
        this.row = data.row;
        this.number = data.number;
        this.type = data.type || 'Standard';
        this.status = data.status || 'Available';
    }
}

class UpdateSeatDTO {
    constructor(data) {
        if (data.type) this.type = data.type;
        if (data.status) this.status = data.status;
    }
}

class BulkUpdateSeatDTO {
    constructor(data) {
        this.seatIds = data.seatIds;
        this.type = data.type;
        this.status = data.status;
    }
}

module.exports = {
    SeatDTO,
    CreateSeatDTO,
    UpdateSeatDTO,
    BulkUpdateSeatDTO
}; 