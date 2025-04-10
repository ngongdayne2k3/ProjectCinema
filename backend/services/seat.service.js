const SeatDAO = require('../dao/seat.dao');
const {CreateSeatDTO, UpdateSeatDTO, BulkUpdateSeatDTO } = require('../dto/seat.dto');
const logger = require('../config/logger');

class SeatService {
    static async createSeat(seatData) {
        try {
            const createSeatDTO = new CreateSeatDTO(seatData);
            return await SeatDAO.create(createSeatDTO);
        } catch (error) {
            logger.error(`Error in createSeat service: ${error.message}`);
            throw error;
        }
    }

    static async getSeatById(id) {
        try {
            return await SeatDAO.findById(id);
        } catch (error) {
            logger.error(`Error in getSeatById service: ${error.message}`);
            throw error;
        }
    }

    static async getSeatsByTheater(theaterId) {
        try {
            return await SeatDAO.findByTheater(theaterId);
        } catch (error) {
            logger.error(`Error in getSeatsByTheater service: ${error.message}`);
            throw error;
        }
    }

    static async updateSeat(id, seatData) {
        try {
            const updateSeatDTO = new UpdateSeatDTO(seatData);
            return await SeatDAO.update(id, updateSeatDTO);
        } catch (error) {
            logger.error(`Error in updateSeat service: ${error.message}`);
            throw error;
        }
    }

    static async deleteSeat(id) {
        try {
            return await SeatDAO.delete(id);
        } catch (error) {
            logger.error(`Error in deleteSeat service: ${error.message}`);
            throw error;
        }
    }

    static async deleteManySeats(seatIds) {
        try {
            return await SeatDAO.deleteMany(seatIds);
        } catch (error) {
            logger.error(`Error in deleteManySeats service: ${error.message}`);
            throw error;
        }
    }

    static async restoreSeat(id) {
        try {
            return await SeatDAO.restore(id);
        } catch (error) {
            logger.error(`Error in restoreSeat service: ${error.message}`);
            throw error;
        }
    }

    static async restoreManySeats(seatIds) {
        try {
            return await SeatDAO.restoreMany(seatIds);
        } catch (error) {
            logger.error(`Error in restoreManySeats service: ${error.message}`);
            throw error;
        }
    }

    static async getAvailableSeats(theaterId) {
        try {
            return await SeatDAO.findAvailableSeats(theaterId);
        } catch (error) {
            logger.error(`Error in getAvailableSeats service: ${error.message}`);
            throw error;
        }
    }

    static async getSeatsByType(theaterId, type) {
        try {
            return await SeatDAO.findSeatsByType(theaterId, type);
        } catch (error) {
            logger.error(`Error in getSeatsByType service: ${error.message}`);
            throw error;
        }
    }

    static async updateSeatStatus(id, status) {
        try {
            return await SeatDAO.updateSeatStatus(id, status);
        } catch (error) {
            logger.error(`Error in updateSeatStatus service: ${error.message}`);
            throw error;
        }
    }

    static async bulkUpdateSeats(updateData) {
        try {
            const bulkUpdateDTO = new BulkUpdateSeatDTO(updateData);
            return await SeatDAO.bulkUpdate(bulkUpdateDTO.seatIds, {
                type: bulkUpdateDTO.type,
                status: bulkUpdateDTO.status
            });
        } catch (error) {
            logger.error(`Error in bulkUpdateSeats service: ${error.message}`);
            throw error;
        }
    }

    static async getDeletedSeats(theaterId) {
        try {
            return await SeatDAO.findDeletedSeats(theaterId);
        } catch (error) {
            logger.error(`Error in getDeletedSeats service: ${error.message}`);
            throw error;
        }
    }
}

module.exports = SeatService;