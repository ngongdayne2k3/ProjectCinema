const Theater = require('../models/Theater');
const logger = require('../config/logger');

class TheaterService {
    async createTheater(theaterData) {
        try {
            const theater = new Theater(theaterData);
            await theater.save();
            return theater;
        } catch (error) {
            logger.error(`Lỗi tạo rạp: ${error.message}`);
            throw error;
        }
    }

    async getTheaterById(id) {
        try {
            return await Theater.findById(id);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin rạp: ${error.message}`);
            throw error;
        }
    }

    async getAllTheaters(query = {}) {
        try {
            return await Theater.find(query);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp: ${error.message}`);
            throw error;
        }
    }

    async updateTheater(id, theaterData) {
        try {
            return await Theater.findByIdAndUpdate(id, theaterData, { new: true });
        } catch (error) {
            logger.error(`Lỗi cập nhật rạp: ${error.message}`);
            throw error;
        }
    }

    async deleteTheater(id) {
        try {
            return await Theater.findByIdAndDelete(id);
        } catch (error) {
            logger.error(`Lỗi xóa rạp: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new TheaterService(); 