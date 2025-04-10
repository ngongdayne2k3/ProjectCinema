const Schedule = require('../models/Schedule');
const logger = require('../config/logger');

class ScheduleStatusService {
    static async updateScheduleStatus() {
        try {
            const now = new Date();
            
            // Cập nhật lịch chiếu đang diễn ra
            await Schedule.updateMany(
                {
                    startTime: { $lte: now },
                    endTime: { $gt: now },
                    status: { $ne: 'showing' }
                },
                { status: 'showing' }
            );

            // Cập nhật lịch chiếu đã kết thúc
            await Schedule.updateMany(
                {
                    endTime: { $lt: now },
                    status: { $nin: ['finished', 'canceled'] }
                },
                { status: 'finished' }
            );

            // Cập nhật lịch chiếu sắp diễn ra
            await Schedule.updateMany(
                {
                    startTime: { $gt: now },
                    status: { $nin: ['upcoming', 'canceled'] }
                },
                { status: 'upcoming' }
            );

            logger.info('Đã cập nhật trạng thái lịch chiếu tự động');
        } catch (error) {
            logger.error('Lỗi khi cập nhật trạng thái lịch chiếu:', error);
            throw error;
        }
    }

    static async getScheduleStatus(schedule) {
        const now = new Date();
        const startTime = new Date(schedule.startTime);
        const endTime = new Date(schedule.endTime);

        if (schedule.status === 'canceled') {
            return 'canceled';
        }

        if (now < startTime) {
            return 'upcoming';
        }

        if (now >= startTime && now <= endTime) {
            return 'showing';
        }

        return 'finished';
    }

    static async updateSingleScheduleStatus(scheduleId) {
        try {
            const schedule = await Schedule.findById(scheduleId);
            if (!schedule) {
                throw new Error('Lịch chiếu không tồn tại');
            }

            const newStatus = await this.getScheduleStatus(schedule);
            if (newStatus !== schedule.status) {
                schedule.status = newStatus;
                await schedule.save();
                logger.info(`Đã cập nhật trạng thái lịch chiếu ${scheduleId} thành ${newStatus}`);
            }

            return schedule;
        } catch (error) {
            logger.error(`Lỗi khi cập nhật trạng thái lịch chiếu ${scheduleId}:`, error);
            throw error;
        }
    }
}

module.exports = ScheduleStatusService; 