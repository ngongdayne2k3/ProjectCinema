const ScheduleDAO = require('../dao/schedule.dao');
const { CreateScheduleDTO, UpdateScheduleDTO } = require('../dto/schedule.dto');
const logger = require('../config/logger');

class ScheduleService {
    static async createSchedule(scheduleData) {
        try {
            return await ScheduleDAO.create(scheduleData);
        } catch (error) {
            logger.error(`Error in createSchedule service: ${error.message}`);
            throw error;
        }
    }

    static async getScheduleById(id) {
        try {
            return await ScheduleDAO.findById(id);
        } catch (error) {
            logger.error(`Error in getScheduleById service: ${error.message}`);
            throw error;
        }
    }

    static async getAllSchedules() {
        try {
            return await ScheduleDAO.findAll();
        } catch (error) {
            logger.error(`Error in getAllSchedules service: ${error.message}`);
            throw error;
        }
    }

    static async updateSchedule(id, scheduleData) {
        try {
            return await ScheduleDAO.update(id, scheduleData);
        } catch (error) {
            logger.error(`Error in updateSchedule service: ${error.message}`);
            throw error;
        }
    }

    static async deleteSchedule(id) {
        try {
            return await ScheduleDAO.delete(id);
        } catch (error) {
            logger.error(`Error in deleteSchedule service: ${error.message}`);
            throw error;
        }
    }

    static async getSchedulesByMovie(movieId) {
        try {
            return await ScheduleDAO.findByMovie(movieId);
        } catch (error) {
            logger.error(`Error in getSchedulesByMovie service: ${error.message}`);
            throw error;
        }
    }

    static async getSchedulesByTheater(theaterId) {
        try {
            return await ScheduleDAO.findByTheater(theaterId);
        } catch (error) {
            logger.error(`Error in getSchedulesByTheater service: ${error.message}`);
            throw error;
        }
    }

    static async getSchedulesByDateRange(startDate, endDate) {
        try {
            return await ScheduleDAO.findByDateRange(startDate, endDate);
        } catch (error) {
            logger.error(`Error in getSchedulesByDateRange service: ${error.message}`);
            throw error;
        }
    }

    static async getSchedulesByStatus(status) {
        try {
            return await ScheduleDAO.findByStatus(status);
        } catch (error) {
            logger.error(`Error in getSchedulesByStatus service: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ScheduleService; 