const SeatService = require('../services/seat.service');
const { CreateSeatDTO, UpdateSeatDTO, BulkUpdateSeatDTO } = require('../dto/seat.dto');
const logger = require('../config/logger');

class SeatController {
    static async createSeat(req, res) {
        try {
            const seat = await SeatService.createSeat(req.body);
            res.status(201).json({
                success: true,
                data: seat
            });
        } catch (error) {
            logger.error(`Error in createSeat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo ghế',
                error: error.message
            });
        }
    }

    static async getSeat(req, res) {
        try {
            const seat = await SeatService.getSeatById(req.params.id);
            if (!seat) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ghế'
                });
            }
            res.status(200).json({
                success: true,
                data: seat
            });
        } catch (error) {
            logger.error(`Error in getSeat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thông tin ghế',
                error: error.message
            });
        }
    }

    static async getSeatsByTheater(req, res) {
        try {
            const seats = await SeatService.getSeatsByTheater(req.params.theaterId);
            res.status(200).json({
                success: true,
                data: seats
            });
        } catch (error) {
            logger.error(`Error in getSeatsByTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách ghế',
                error: error.message
            });
        }
    }

    static async updateSeat(req, res) {
        try {
            const seat = await SeatService.updateSeat(req.params.id, req.body);
            if (!seat) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ghế'
                });
            }
            res.status(200).json({
                success: true,
                data: seat
            });
        } catch (error) {
            logger.error(`Error in updateSeat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật ghế',
                error: error.message
            });
        }
    }

    static async deleteSeat(req, res) {
        try {
            const seat = await SeatService.deleteSeat(req.params.id);
            if (!seat) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ghế'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Xóa ghế thành công'
            });
        } catch (error) {
            logger.error(`Error in deleteSeat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa ghế',
                error: error.message
            });
        }
    }

    static async deleteManySeats(req, res) {
        try {
            await SeatService.deleteManySeats(req.body.seatIds);
            res.status(200).json({
                success: true,
                message: 'Xóa nhiều ghế thành công'
            });
        } catch (error) {
            logger.error(`Error in deleteManySeats controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa nhiều ghế',
                error: error.message
            });
        }
    }

    static async restoreSeat(req, res) {
        try {
            const seat = await SeatService.restoreSeat(req.params.id);
            if (!seat) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ghế'
                });
            }
            res.status(200).json({
                success: true,
                data: seat
            });
        } catch (error) {
            logger.error(`Error in restoreSeat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi khôi phục ghế',
                error: error.message
            });
        }
    }

    static async restoreManySeats(req, res) {
        try {
            await SeatService.restoreManySeats(req.body.seatIds);
            res.status(200).json({
                success: true,
                message: 'Khôi phục nhiều ghế thành công'
            });
        } catch (error) {
            logger.error(`Error in restoreManySeats controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi khôi phục nhiều ghế',
                error: error.message
            });
        }
    }

    static async getAvailableSeats(req, res) {
        try {
            const seats = await SeatService.getAvailableSeats(req.params.theaterId);
            res.status(200).json({
                success: true,
                data: seats
            });
        } catch (error) {
            logger.error(`Error in getAvailableSeats controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách ghế trống',
                error: error.message
            });
        }
    }

    static async getSeatsByType(req, res) {
        try {
            const seats = await SeatService.getSeatsByType(req.params.theaterId, req.params.type);
            res.status(200).json({
                success: true,
                data: seats
            });
        } catch (error) {
            logger.error(`Error in getSeatsByType controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách ghế theo loại',
                error: error.message
            });
        }
    }

    static async updateSeatStatus(req, res) {
        try {
            const seat = await SeatService.updateSeatStatus(req.params.id, req.body.status);
            if (!seat) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy ghế'
                });
            }
            res.status(200).json({
                success: true,
                data: seat
            });
        } catch (error) {
            logger.error(`Error in updateSeatStatus controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật trạng thái ghế',
                error: error.message
            });
        }
    }

    static async bulkUpdateSeats(req, res) {
        try {
            await SeatService.bulkUpdateSeats(req.body);
            res.status(200).json({
                success: true,
                message: 'Cập nhật nhiều ghế thành công'
            });
        } catch (error) {
            logger.error(`Error in bulkUpdateSeats controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật nhiều ghế',
                error: error.message
            });
        }
    }

    static async getDeletedSeats(req, res) {
        try {
            const seats = await SeatService.getDeletedSeats(req.params.theaterId);
            res.status(200).json({
                success: true,
                data: seats
            });
        } catch (error) {
            logger.error(`Error in getDeletedSeats controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách ghế đã xóa',
                error: error.message
            });
        }
    }
}

module.exports = SeatController; 