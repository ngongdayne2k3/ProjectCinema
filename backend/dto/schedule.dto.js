class ScheduleDTO {
    constructor(schedule) {
        this._id = schedule._id;
        this.movie = {
            _id: schedule.movie._id,
            title: schedule.movie.title,
            duration: schedule.movie.duration,
            format: schedule.movie.format
        };
        this.theater = {
            _id: schedule.theater._id,
            name: schedule.theater.name,
            location: schedule.theater.location,
            format: schedule.theater.format
        };
        this.startTime = schedule.startTime;
        this.endTime = schedule.endTime;
        this.format = schedule.format;
        this.prices = schedule.prices;
        this.status = schedule.status;
        this.isDeleted = schedule.isDeleted;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
    }

    static toDTO(schedule) {
        return new ScheduleDTO(schedule);
    }

    static toDTOList(schedules) {
        return schedules.map(schedule => new ScheduleDTO(schedule));
    }
}

class CreateScheduleDTO {
    constructor(data) {
        this.movie = data.movie;
        this.theater = data.theater;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.format = data.format;
        this.prices = data.prices || [
            { type: 'Standard', price: 0 },
            { type: 'VIP', price: 0 }
        ];
        this.status = data.status || 'upcoming';
        this.isDeleted = false;
    }
}

class UpdateScheduleDTO {
    constructor(data) {
        if (data.startTime) this.startTime = data.startTime;
        if (data.endTime) this.endTime = data.endTime;
        if (data.format) this.format = data.format;
        if (data.prices) this.prices = data.prices;
        if (data.status) this.status = data.status;
    }
}

module.exports = {
    ScheduleDTO,
    CreateScheduleDTO,
    UpdateScheduleDTO
}; 