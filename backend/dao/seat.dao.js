const Seat = require('../models/Seat');
const { SeatDTO, CreateSeatDTO } = require('../dto/seat.dto');
const logger = require('../config/logger');

class SeatDAO {
    static async create(seatData) {
        try {
            const seat = new Seat(seatData);
            await seat.save();
            return SeatDTO.toDTO(seat);
        } catch (error) {
            logger.error(`Lỗi tạo ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async createMany(seatsData) {
        try {
            const seats = await Seat.insertMany(seatsData);
            return SeatDTO.toDTOList(seats);
        } catch (error) {
            logger.error(`Lỗi tạo nhiều ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findById(id) {
        const seat = await Seat.findById(id);
        return seat ? SeatDTO.toDTO(seat) : null;
    }

    static async findByTheater(theaterId) {
        const seats = await Seat.find({ 
            theater: theaterId,
            isDeleted: false 
        });
        return SeatDTO.toDTOList(seats);
    }

    static async update(id, seatData) {
        const seat = await Seat.findByIdAndUpdate(
            id,
            { $set: seatData },
            { new: true }
        );
        return seat ? SeatDTO.toDTO(seat) : null;
    }

    static async delete(id) {
        const seat = await Seat.findByIdAndUpdate(
            id,
            { $set: { isDeleted: true } },
            { new: true }
        );
        return seat ? SeatDTO.toDTO(seat) : null;
    }

    static async deleteMany(seatIds) {
        const seats = await Seat.updateMany(
            { _id: { $in: seatIds } },
            { $set: { isDeleted: true } },
            { new: true }
        );
        return seats;
    }

    static async restore(id) {
        const seat = await Seat.findByIdAndUpdate(
            id,
            { $set: { isDeleted: false } },
            { new: true }
        );
        return seat ? SeatDTO.toDTO(seat) : null;
    }

    static async restoreMany(seatIds) {
        const seats = await Seat.updateMany(
            { _id: { $in: seatIds } },
            { $set: { isDeleted: false } },
            { new: true }
        );
        return seats;
    }

    static async findAvailableSeats(theaterId) {
        const seats = await Seat.find({ 
            theater: theaterId,
            status: 'Available',
            isDeleted: false 
        });
        return SeatDTO.toDTOList(seats);
    }

    static async findSeatsByType(theaterId, type) {
        const seats = await Seat.find({ 
            theater: theaterId,
            type: type,
            isDeleted: false 
        });
        return SeatDTO.toDTOList(seats);
    }

    static async updateSeatStatus(id, status) {
        const seat = await Seat.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );
        return seat ? SeatDTO.toDTO(seat) : null;
    }

    static async findDeletedSeats(theaterId) {
        const seats = await Seat.find({ 
            theater: theaterId,
            isDeleted: true 
        });
        return SeatDTO.toDTOList(seats);
    }
}

module.exports = SeatDAO; 