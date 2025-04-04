const Seat = require('../models/Seat');

class SeatDAO {
    async create(seatData) {
        const seat = new Seat(seatData);
        return await seat.save();
    }

    async createMany(seatsData) {
        return await Seat.insertMany(seatsData);
    }

    async findById(id) {
        return await Seat.findById(id);
    }

    async findByTheater(theaterId) {
        return await Seat.find({ theater: theaterId, isDeleted: false });
    }

    async update(id, seatData) {
        return await Seat.findByIdAndUpdate(id, seatData, { new: true });
    }

    async bulkUpdate(seatIds, updateData) {
        return await Seat.updateMany(
            { _id: { $in: seatIds } },
            updateData,
            { new: true }
        );
    }

    async softDelete(id) {
        return await Seat.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }

    async softDeleteMany(seatIds) {
        return await Seat.updateMany(
            { _id: { $in: seatIds } },
            { isDeleted: true },
            { new: true }
        );
    }

    async generateSeats(theaterId, rows, seatsPerRow) {
        const seats = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        for (let i = 0; i < rows; i++) {
            const row = alphabet[i];
            for (let j = 1; j <= seatsPerRow; j++) {
                seats.push({
                    theater: theaterId,
                    row: row,
                    number: j,
                    type: 'Standard',
                    status: 'Available'
                });
            }
        }

        return await this.createMany(seats);
    }
}

module.exports = new SeatDAO(); 