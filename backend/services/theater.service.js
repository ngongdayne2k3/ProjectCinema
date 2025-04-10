const TheaterDAO = require('../dao/theater.dao');
const SeatDAO = require('../dao/seat.dao');
const { TheaterDTO, CreateTheaterDTO } = require('../dto/theater.dto');
const logger = require('../config/logger');

class TheaterService {
    static async createTheater(theaterData) {
        try {
            // Validate theater data
            const createTheaterDTO = new CreateTheaterDTO(theaterData);
            
            // Create theater
            const theater = await TheaterDAO.create(createTheaterDTO);
            
            // Generate seats based on rows and seatsPerRow
            await this.generateSeatsForTheater(theater._id, theater.rows, theater.seatsPerRow);
            
            return theater;
        } catch (error) {
            logger.error(`Error in createTheater service: ${error.message}`);
            throw error;
        }
    }

    static async getTheaterById(id) {
        try {
            return await TheaterDAO.findById(id);
        } catch (error) {
            logger.error(`Error in getTheaterById service: ${error.message}`);
            throw error;
        }
    }

    static async getAllTheaters() {
        try {
            return await TheaterDAO.findAll();
        } catch (error) {
            logger.error(`Error in getAllTheaters service: ${error.message}`);
            throw error;
        }
    }

    static async updateTheater(id, theaterData) {
        try {
            return await TheaterDAO.update(id, theaterData);
        } catch (error) {
            logger.error(`Error in updateTheater service: ${error.message}`);
            throw error;
        }
    }

    static async deleteTheater(id) {
        try {
            // Soft delete theater
            const theater = await TheaterDAO.delete(id);
            
            // Soft delete all seats in this theater
            const seats = await SeatDAO.findByTheater(id);
            const seatIds = seats.map(seat => seat._id);
            await SeatDAO.deleteMany(seatIds);
            
            return theater;
        } catch (error) {
            logger.error(`Error in deleteTheater service: ${error.message}`);
            throw error;
        }
    }

    static async getTheatersByFormat(format) {
        try {
            return await TheaterDAO.findByFormat(format);
        } catch (error) {
            logger.error(`Error in getTheatersByFormat service: ${error.message}`);
            throw error;
        }
    }

    static async getActiveTheaters() {
        try {
            return await TheaterDAO.findActiveTheaters();
        } catch (error) {
            logger.error(`Error in getActiveTheaters service: ${error.message}`);
            throw error;
        }
    }

    static async generateSeatsForTheater(theaterId, rows, seatsPerRow) {
        try {
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

            // Create seats in bulk
            await SeatDAO.createMany(seats);
        } catch (error) {
            logger.error(`Error in generateSeatsForTheater service: ${error.message}`);
            throw error;
        }
    }
}

module.exports = TheaterService; 