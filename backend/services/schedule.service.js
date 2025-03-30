const Schedule = require('../models/Schedule');
const logger = require('../config/logger');

class ScheduleService {
    async createSchedule(scheduleData) {
        try {
            const schedule = new Schedule(scheduleData);
            await schedule.save();
            return schedule;
        } catch (error) {
            logger.error(`Lỗi tạo lịch chiếu: ${error.message}`);
            throw error;
        }
    }

    async getScheduleById(id) {
        try {
            return await Schedule.findById(id)
                .populate('movie')
                .populate('theater');
        } catch (error) {
            logger.error(`Lỗi lấy thông tin lịch chiếu: ${error.message}`);
            throw error;
        }
    }

    async getAllSchedules(query = {}) {
        try {
            return await Schedule.find(query)
                .populate('movie')
                .populate('theater');
        } catch (error) {
            logger.error(`Lỗi lấy danh sách lịch chiếu: ${error.message}`);
            throw error;
        }
    }

    async updateSchedule(id, scheduleData) {
        try {
            return await Schedule.findByIdAndUpdate(id, scheduleData, { new: true })
                .populate('movie')
                .populate('theater');
        } catch (error) {
            logger.error(`Lỗi cập nhật lịch chiếu: ${error.message}`);
            throw error;
        }
    }

    async deleteSchedule(id) {
        try {
            return await Schedule.findByIdAndDelete(id);
        } catch (error) {
            logger.error(`Lỗi xóa lịch chiếu: ${error.message}`);
            throw error;
        }
    }

    async getSchedulesByMovie(movieId) {
        try {
            return await Schedule.find({ movie: movieId })
                .populate('theater');
        } catch (error) {
            logger.error(`Lỗi lấy lịch chiếu theo phim: ${error.message}`);
            throw error;
        }
    }

    async getSchedulesByTheater(theaterId) {
        try {
            return await Schedule.find({ theater: theaterId })
                .populate('movie');
        } catch (error) {
            logger.error(`Lỗi lấy lịch chiếu theo rạp: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new ScheduleService(); 