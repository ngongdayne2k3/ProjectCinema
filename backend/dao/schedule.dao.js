const Schedule = require('../models/Schedule');
const { ScheduleDTO, CreateScheduleDTO, UpdateScheduleDTO } = require('../dto/schedule.dto');
const logger = require('../config/logger');

class ScheduleDAO {
    static async create(scheduleData) {
        try {
            const createScheduleDTO = new CreateScheduleDTO(scheduleData);
            const schedule = new Schedule(createScheduleDTO);
            await schedule.save();
            return ScheduleDTO.toDTO(schedule);
        } catch (error) {
            logger.error(`Lỗi tạo lịch chiếu trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const schedule = await Schedule.findById(id)
                .populate('movie', 'title duration format')
                .populate('theater', 'name location format');
            return schedule ? ScheduleDTO.toDTO(schedule) : null;
        } catch (error) {
            logger.error(`Lỗi tìm lịch chiếu theo ID trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findAll() {
        try {
            const schedules = await Schedule.find({ isDeleted: false })
                .populate('movie', 'title duration format')
                .populate('theater', 'name location format');
            return ScheduleDTO.toDTOList(schedules);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách lịch chiếu trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async update(id, scheduleData) {
        try {
            const updateScheduleDTO = new UpdateScheduleDTO(scheduleData);
            const schedule = await Schedule.findByIdAndUpdate(
                id,
                { $set: updateScheduleDTO },
                { new: true }
            )
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return schedule ? ScheduleDTO.toDTO(schedule) : null;
        } catch (error) {
            logger.error(`Lỗi cập nhật lịch chiếu trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const schedule = await Schedule.findByIdAndUpdate(
                id,
                { $set: { isDeleted: true } },
                { new: true }
            )
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return schedule ? ScheduleDTO.toDTO(schedule) : null;
        } catch (error) {
            logger.error(`Lỗi xóa lịch chiếu trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findByMovie(movieId) {
        try {
            const schedules = await Schedule.find({ 
                movie: movieId,
                isDeleted: false 
            })
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return ScheduleDTO.toDTOList(schedules);
        } catch (error) {
            logger.error(`Lỗi tìm lịch chiếu theo phim trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findByTheater(theaterId) {
        try {
            const schedules = await Schedule.find({ 
                theater: theaterId,
                isDeleted: false 
            })
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return ScheduleDTO.toDTOList(schedules);
        } catch (error) {
            logger.error(`Lỗi tìm lịch chiếu theo rạp trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findByDateRange(startDate, endDate) {
        try {
            const schedules = await Schedule.find({
                startTime: { $gte: startDate },
                endTime: { $lte: endDate },
                isDeleted: false
            })
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return ScheduleDTO.toDTOList(schedules);
        } catch (error) {
            logger.error(`Lỗi tìm lịch chiếu theo khoảng thời gian trong DAO: ${error.message}`);
            throw error;
        }
    }

    static async findByStatus(status) {
        try {
            const schedules = await Schedule.find({ 
                status: status,
                isDeleted: false 
            })
            .populate('movie', 'title duration format')
            .populate('theater', 'name location format');
            return ScheduleDTO.toDTOList(schedules);
        } catch (error) {
            logger.error(`Lỗi tìm lịch chiếu theo trạng thái trong DAO: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ScheduleDAO; 