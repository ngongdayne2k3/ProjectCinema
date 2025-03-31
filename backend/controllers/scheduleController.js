const scheduleService = require('../services/schedule.service');
const logger = require('../config/logger');

class ScheduleController {
    async createSchedule(req, res) {
        try {
            const schedule = await scheduleService.createSchedule(req.body);
            logger.info(`Tạo lịch chiếu mới cho phim: ${schedule.movie}`);
            res.status(201).json(schedule);
        } catch (error) {
            logger.error(`Lỗi tạo lịch chiếu: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async getScheduleById(req, res) {
        try {
            const schedule = await scheduleService.getScheduleById(req.params.id);
            if (!schedule) {
                return res.status(404).json({ message: 'Không tìm thấy lịch chiếu' });
            }
            res.json(schedule);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin lịch chiếu: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllSchedules(req, res) {
        try {
            const schedules = await scheduleService.getAllSchedules(req.query);
            res.json(schedules);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách lịch chiếu: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateSchedule(req, res) {
        try {
            const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
            if (!schedule) {
                return res.status(404).json({ message: 'Không tìm thấy lịch chiếu' });
            }
            logger.info(`Cập nhật lịch chiếu: ${schedule._id}`);
            res.json(schedule);
        } catch (error) {
            logger.error(`Lỗi cập nhật lịch chiếu: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteSchedule(req, res) {
        try {
            const schedule = await scheduleService.getScheduleById(req.params.id);
            if (!schedule) {
                return res.status(404).json({ message: 'Không tìm thấy lịch chiếu' });
            }
            await scheduleService.deleteSchedule(req.params.id);
            logger.info(`Xóa lịch chiếu: ${schedule._id}`);
            res.json({ message: 'Xóa lịch chiếu thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa lịch chiếu: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getSchedulesByMovie(req, res) {
        try {
            const schedules = await scheduleService.getSchedulesByMovie(req.params.movieId);
            res.json(schedules);
        } catch (error) {
            logger.error(`Lỗi lấy lịch chiếu theo phim: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getSchedulesByTheater(req, res) {
        try {
            const schedules = await scheduleService.getSchedulesByTheater(req.params.theaterId);
            res.json(schedules);
        } catch (error) {
            logger.error(`Lỗi lấy lịch chiếu theo rạp: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ScheduleController(); 