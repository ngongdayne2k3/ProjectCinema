const Theater = require('../models/Theater');
const { TheaterDTO } = require('../dto/theater.dto');
const logger = require('../config/logger');

class TheaterDAO {
    static async create(theaterData) {
        try {
            const theater = new Theater(theaterData);
            await theater.save();
            return TheaterDTO.toDTO(theater);
        } catch (error) {
            logger.error(`Lỗi tạo rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const theater = await Theater.findById(id);
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi tìm rạp theo ID trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findAll() {
        try {
            const theaters = await Theater.find({ isDeleted: false });
            return TheaterDTO.toDTOList(theaters);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async update(id, theaterData) {
        try {
            const theater = await Theater.findByIdAndUpdate(
                id,
                { $set: theaterData },
                { new: true }
            );
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi cập nhật rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const theater = await Theater.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                { new: true }
            );
            return theater ? TheaterDTO.toDTO(theater) : null;
        } catch (error) {
            logger.error(`Lỗi xóa mềm rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findByFormat(format) {
        try {
            const theaters = await Theater.find({ 
                format: format,
                isDeleted: false 
            });
            return TheaterDTO.toDTOList(theaters);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp theo format trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findActiveTheaters() {
        try {
            const theaters = await Theater.find({ 
                isActive: true,
                isDeleted: false 
            });
            return TheaterDTO.toDTOList(theaters);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp đang hoạt động trong DAO: ${error.message}`);
            throw error;
        }
    }
}

module.exports = TheaterDAO; 