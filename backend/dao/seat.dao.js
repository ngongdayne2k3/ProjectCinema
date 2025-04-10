const Seat = require('../models/Seat');
const { SeatDTO, CreateSeatDTO, UpdateSeatDTO } = require('../dto/seat.dto');
const logger = require('../config/logger');

class SeatDAO {
    static async create(seatData) {
        try {
            const createSeatDTO = new CreateSeatDTO(seatData);
            const seat = new Seat(createSeatDTO);
            await seat.save();
            return SeatDTO.toDTO(seat);
        } catch (error) {
            logger.error(`Lỗi tạo ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async createMany(seatsData) {
        try {
            const createSeatDTOs = seatsData.map(data => new CreateSeatDTO(data));
            const seats = await Seat.insertMany(createSeatDTOs);
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
        try {
            const updateSeatDTO = new UpdateSeatDTO(seatData);
            const seat = await Seat.findByIdAndUpdate(
                id,
                { $set: updateSeatDTO },
                { new: true }
            );
            return seat ? SeatDTO.toDTO(seat) : null;
        } catch (error) {
            logger.error(`Lỗi cập nhật ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const seat = await Seat.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                { new: true }
            );
            return seat ? SeatDTO.toDTO(seat) : null;
        } catch (error) {
            logger.error(`Lỗi xóa ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async deleteMany(seatIds) {
        try {
            const seats = await Seat.updateMany(
                { _id: { $in: seatIds } },
                { $set: { isDeleted: true } }
            );
            return seats;
        } catch (error) {
            logger.error(`Lỗi xóa nhiều ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async restore(id) {
        try {
            const seat = await Seat.findByIdAndUpdate(
                id,
                { $set: { isDeleted: false } },
                { new: true }
            );
            return seat ? SeatDTO.toDTO(seat) : null;
        } catch (error) {
            logger.error(`Lỗi khôi phục ghế trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async restoreMany(seatIds) {
        try {
            const seats = await Seat.updateMany(
                { _id: { $in: seatIds } },
                { $set: { isDeleted: false } }
            );
            return seats;
        } catch (error) {
            logger.error(`Lỗi khôi phục nhiều ghế trong DAO: ${error.message}`);
            throw error;
        }
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