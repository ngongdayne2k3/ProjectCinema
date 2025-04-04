const seatDAO = require('../dao/seat.dao');
const { SeatDTO, CreateSeatDTO, UpdateSeatDTO, BulkUpdateSeatDTO } = require('../dto/seat.dto');

class SeatService {
    async createSeat(seatData) {
        const createSeatDTO = new CreateSeatDTO(seatData);
        const seat = await seatDAO.create(createSeatDTO);
        return new SeatDTO(seat);
    }

    async getSeatById(id) {
        const seat = await seatDAO.findById(id);
        return seat ? new SeatDTO(seat) : null;
    }

    async getSeatsByTheater(theaterId) {
        const seats = await seatDAO.findByTheater(theaterId);
        return seats.map(seat => new SeatDTO(seat));
    }

    async updateSeat(id, seatData) {
        const updateSeatDTO = new UpdateSeatDTO(seatData);
        const seat = await seatDAO.update(id, updateSeatDTO);
        return seat ? new SeatDTO(seat) : null;
    }

    async bulkUpdateSeats(updateData) {
        const bulkUpdateDTO = new BulkUpdateSeatDTO(updateData);
        const result = await seatDAO.bulkUpdate(bulkUpdateDTO.seatIds, {
            type: bulkUpdateDTO.type,
            status: bulkUpdateDTO.status
        });
        return result;
    }

    async deleteSeat(id) {
        const seat = await seatDAO.softDelete(id);
        return seat ? new SeatDTO(seat) : null;
    }

    async deleteManySeats(seatIds) {
        return await seatDAO.softDeleteMany(seatIds);
    }

    async generateSeatsForTheater(theaterId, rows, seatsPerRow) {
        const seats = await seatDAO.generateSeats(theaterId, rows, seatsPerRow);
        return seats.map(seat => new SeatDTO(seat));
    }
}

module.exports = new SeatService();