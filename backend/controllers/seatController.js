const seatService = require('../services/seat.service');
const logger = require('../config/logger');

class SeatController {
    async getSeatsByTheater(req, res) {
        try {
            const seats = await seatService.getSeatsByTheater(req.params.theaterId);
            res.json(seats);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách ghế: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getSeatById(req, res) {
        try {
            const seat = await seatService.getSeatById(req.params.id);
            if (!seat) {
                return res.status(404).json({ message: 'Không tìm thấy ghế' });
            }
            res.json(seat);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin ghế: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateSeat(req, res) {
        try {
            const seat = await seatService.updateSeat(req.params.id, req.body);
            if (!seat) {
                return res.status(404).json({ message: 'Không tìm thấy ghế' });
            }
            logger.info(`Cập nhật thông tin ghế: ${seat._id}`);
            res.json(seat);
        } catch (error) {
            logger.error(`Lỗi cập nhật thông tin ghế: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async bulkUpdateSeats(req, res) {
        try {
            const result = await seatService.bulkUpdateSeats(req.body);
            logger.info(`Cập nhật hàng loạt ghế thành công`);
            res.json(result);
        } catch (error) {
            logger.error(`Lỗi cập nhật hàng loạt ghế: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteSeat(req, res) {
        try {
            const seat = await seatService.deleteSeat(req.params.id);
            if (!seat) {
                return res.status(404).json({ message: 'Không tìm thấy ghế' });
            }
            logger.info(`Xóa ghế: ${seat._id}`);
            res.json({ message: 'Xóa ghế thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa ghế: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteManySeats(req, res) {
        try {
            const { seatIds } = req.body;
            await seatService.deleteManySeats(seatIds);
            logger.info(`Xóa hàng loạt ghế thành công`);
            res.json({ message: 'Xóa ghế thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa hàng loạt ghế: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SeatController(); 