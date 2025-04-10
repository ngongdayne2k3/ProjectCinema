const TheaterService = require('../services/theater.service');
const { CreateTheaterDTO } = require('../dto/theater.dto');
const logger = require('../config/logger');

class TheaterController {
    static async createTheater(req, res) {
        try {
            const theater = await TheaterService.createTheater(req.body);
            res.status(201).json({
                success: true,
                data: theater
            });
        } catch (error) {
            logger.error(`Error in createTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi tạo rạp',
                error: error.message
            });
        }
    }

    static async getTheater(req, res) {
        try {
            const theater = await TheaterService.getTheaterById(req.params.id);
            if (!theater) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy rạp'
                });
            }
            res.status(200).json({
                success: true,
                data: theater
            });
        } catch (error) {
            logger.error(`Error in getTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thông tin rạp',
                error: error.message
            });
        }
    }

    static async getAllTheaters(req, res) {
        try {
            const theaters = await TheaterService.getAllTheaters();
            res.status(200).json({
                success: true,
                data: theaters
            });
        } catch (error) {
            logger.error(`Error in getAllTheaters controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách rạp',
                error: error.message
            });
        }
    }

    static async updateTheater(req, res) {
        try {
            const theater = await TheaterService.updateTheater(req.params.id, req.body);
            if (!theater) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy rạp'
                });
            }
            res.status(200).json({
                success: true,
                data: theater
            });
        } catch (error) {
            logger.error(`Error in updateTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi cập nhật rạp',
                error: error.message
            });
        }
    }

    static async deleteTheater(req, res) {
        try {
            const theater = await TheaterService.deleteTheater(req.params.id);
            if (!theater) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy rạp'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Xóa rạp thành công'
            });
        } catch (error) {
            logger.error(`Error in deleteTheater controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi xóa rạp',
                error: error.message
            });
        }
    }

    static async getTheatersByFormat(req, res) {
        try {
            const theaters = await TheaterService.getTheatersByFormat(req.params.format);
            res.status(200).json({
                success: true,
                data: theaters
            });
        } catch (error) {
            logger.error(`Error in getTheatersByFormat controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách rạp theo định dạng',
                error: error.message
            });
        }
    }

    static async getActiveTheaters(req, res) {
        try {
            const theaters = await TheaterService.getActiveTheaters();
            res.status(200).json({
                success: true,
                data: theaters
            });
        } catch (error) {
            logger.error(`Error in getActiveTheaters controller: ${error.message}`);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách rạp đang hoạt động',
                error: error.message
            });
        }
    }
}

module.exports = TheaterController; 