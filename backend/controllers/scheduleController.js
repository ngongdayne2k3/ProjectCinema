const ScheduleService = require('../services/schedule.service');
const logger = require('../config/logger');
const Booking = require('../models/Booking');

class ScheduleController {
    static async createSchedule(req, res) {
        try {
            const schedule = await ScheduleService.createSchedule(req.body);
            res.status(201).json({
                success: true,
                data: schedule
            });
        } catch (error) {
            logger.error(`Error in createSchedule controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo lịch chiếu',
                error: error.message
            });
        }
    }

    static async getScheduleById(req, res) {
        try {
            const schedule = await ScheduleService.getScheduleById(req.params.id);
            if (!schedule) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy lịch chiếu'
                });
            }
            res.status(200).json({
                success: true,
                data: schedule
            });
        } catch (error) {
            logger.error(`Error in getScheduleById controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thông tin lịch chiếu',
                error: error.message
            });
        }
    }

    static async getAllSchedules(req, res) {
        try {
            const schedules = await ScheduleService.getAllSchedules();
            res.status(200).json({
                success: true,
                data: schedules
            });
        } catch (error) {
            logger.error(`Error in getAllSchedules controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách lịch chiếu',
                error: error.message
            });
        }
    }

    static async updateSchedule(req, res) {
        try {
            const schedule = await ScheduleService.updateSchedule(req.params.id, req.body);
            if (!schedule) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy lịch chiếu'
                });
            }
            res.status(200).json({
                success: true,
                data: schedule
            });
        } catch (error) {
            logger.error(`Error in updateSchedule controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật lịch chiếu',
                error: error.message
            });
        }
    }

    static async deleteSchedule(req, res) {
        try {
            const schedule = await ScheduleService.deleteSchedule(req.params.id);
            if (!schedule) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy lịch chiếu'
                });
            }
            res.status(200).json({
                success: true,
                data: schedule
            });
        } catch (error) {
            logger.error(`Error in deleteSchedule controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa lịch chiếu',
                error: error.message
            });
        }
    }

    static async getSchedulesByMovie(req, res) {
        try {
            const schedules = await ScheduleService.getSchedulesByMovie(req.params.movieId);
            res.status(200).json({
                success: true,
                data: schedules
            });
        } catch (error) {
            logger.error(`Error in getSchedulesByMovie controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy lịch chiếu theo phim',
                error: error.message
            });
        }
    }

    static async getSchedulesByTheater(req, res) {
        try {
            const schedules = await ScheduleService.getSchedulesByTheater(req.params.theaterId);
            res.status(200).json({
                success: true,
                data: schedules
            });
        } catch (error) {
            logger.error(`Error in getSchedulesByTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy lịch chiếu theo rạp',
                error: error.message
            });
        }
    }

    static async getSchedulesByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const schedules = await ScheduleService.getSchedulesByDateRange(startDate, endDate);
            res.status(200).json({
                success: true,
                data: schedules
            });
        } catch (error) {
            logger.error(`Error in getSchedulesByDateRange controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy lịch chiếu theo khoảng thời gian',
                error: error.message
            });
        }
    }

    static async getSchedulesByStatus(req, res) {
        try {
            const schedules = await ScheduleService.getSchedulesByStatus(req.params.status);
            res.status(200).json({
                success: true,
                data: schedules
            });
        } catch (error) {
            logger.error(`Error in getSchedulesByStatus controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy lịch chiếu theo trạng thái',
                error: error.message
            });
        }
    }

    static async cancelSchedule(req, res) {
        try {
            const schedule = await ScheduleService.getScheduleById(req.params.id);
            if (!schedule) {
                return res.status(404).json({
                    success: false,
                    message: 'Lịch chiếu không tồn tại'
                });
            }

            // Cập nhật trạng thái thành canceled
            schedule.status = 'canceled';
            await schedule.save();

            // Gửi thông báo cho các booking liên quan
            const bookings = await Booking.find({ schedule: schedule._id });
            for (const booking of bookings) {
                if (booking.status === 'Chưa thanh toán') {
                    booking.status = 'Đã hủy';
                    await booking.save();
                    // TODO: Gửi email thông báo cho khách hàng
                }
            }

            return res.status(200).json({
                success: true,
                message: 'Đã hủy lịch chiếu thành công',
                data: schedule
            });
        } catch (error) {
            logger.error('Lỗi khi hủy lịch chiếu:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi khi hủy lịch chiếu'
            });
        }
    }
}

module.exports = ScheduleController; 