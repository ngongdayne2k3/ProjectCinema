const theaterDAO = require('../dao/theater.dao');
const seatService = require('./seat.service');
const { TheaterDTO, CreateTheaterDTO, UpdateTheaterDTO } = require('../dto/theater.dto');
const logger = require('../config/logger');

class TheaterService {
    async createTheater(theaterData) {
        try {
            const createTheaterDTO = new CreateTheaterDTO(theaterData);
            const theater = await theaterDAO.create(createTheaterDTO);

            // Tự động tạo ghế cho rạp mới
            await seatService.generateSeatsForTheater(
                theater._id,
                theater.rows,
                theater.seatsPerRow
            );

            return TheaterDTO.toDTO(theater);
        } catch (error) {
            logger.error(`Lỗi tạo rạp: ${error.message}`);
            throw error;
        }
    }

    async getTheaterById(id) {
        try {
            const theater = await theaterDAO.findById(id);
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi lấy thông tin rạp: ${error.message}`);
            throw error;
        }
    }

    async getAllTheaters(query = {}) {
        try {
            const theaters = await theaterDAO.findAll(query);
            return TheaterDTO.toDTOList(theaters);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp: ${error.message}`);
            throw error;
        }
    }

    async updateTheater(id, theaterData) {
        try {
            const updateTheaterDTO = new UpdateTheaterDTO(theaterData);
            const theater = await theaterDAO.update(id, updateTheaterDTO);
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi cập nhật rạp: ${error.message}`);
            throw error;
        }
    }

    async deleteTheater(id) {
        try {
            const theater = await theaterDAO.softDelete(id);
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi xóa rạp: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TheaterService(); 