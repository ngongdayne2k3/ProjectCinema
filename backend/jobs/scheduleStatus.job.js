const cron = require('node-cron');
const ScheduleStatusService = require('../services/scheduleStatus.service');
const logger = require('../config/logger');

class ScheduleStatusJob {
    static start() {
        // Chạy mỗi phút để cập nhật trạng thái
        cron.schedule('* * * * *', async () => {
            try {
                await ScheduleStatusService.updateScheduleStatus();
            } catch (error) {
                logger.error('Lỗi khi chạy job cập nhật trạng thái lịch chiếu:', error);
            }
        });

        logger.info('Đã khởi động job cập nhật trạng thái lịch chiếu');
    }
}

module.exports = ScheduleStatusJob; 