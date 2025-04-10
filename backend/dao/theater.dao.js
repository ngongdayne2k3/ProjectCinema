const Theater = require('../models/Theater');
const logger = require('../config/logger');

class TheaterDAO {
    async create(theaterData) {
        try {
            const theater = new Theater(theaterData);
            return await theater.save();
        } catch (error) {
            logger.error(`Lỗi tạo rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Theater.findById(id);
        } catch (error) {
            logger.error(`Lỗi tìm rạp theo ID trong DAO: ${error.message}`);
            throw error;
        }
    }

    async findAll(query = {}) {
        try {
            return await Theater.find({ ...query, isDeleted: false });
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    async update(id, theaterData) {
        try {
            return await Theater.findByIdAndUpdate(id, theaterData, { new: true });
        } catch (error) {
            logger.error(`Lỗi cập nhật rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    async softDelete(id) {
        try {
            return await Theater.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true }
            );
        } catch (error) {
            logger.error(`Lỗi xóa mềm rạp trong DAO: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TheaterDAO(); 