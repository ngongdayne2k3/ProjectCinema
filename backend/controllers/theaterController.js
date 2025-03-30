const theaterService = require('../services/theater.service');
const logger = require('../config/logger');

class TheaterController {
    async createTheater(req, res) {
        try {
            const theater = await theaterService.createTheater(req.body);
            logger.info(`Tạo rạp mới: ${theater.name}`);
            res.status(201).json(theater);
        } catch (error) {
            logger.error(`Lỗi tạo rạp: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async getTheaterById(req, res) {
        try {
            const theater = await theaterService.getTheaterById(req.params.id);
            if (!theater) {
                return res.status(404).json({ message: 'Không tìm thấy rạp' });
            }
            res.json(theater);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin rạp: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllTheaters(req, res) {
        try {
            const theaters = await theaterService.getAllTheaters(req.query);
            res.json(theaters);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách rạp: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateTheater(req, res) {
        try {
            const theater = await theaterService.updateTheater(req.params.id, req.body);
            if (!theater) {
                return res.status(404).json({ message: 'Không tìm thấy rạp' });
            }
            logger.info(`Cập nhật rạp: ${theater.name}`);
            res.json(theater);
        } catch (error) {
            logger.error(`Lỗi cập nhật rạp: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTheater(req, res) {
        try {
            const theater = await theaterService.getTheaterById(req.params.id);
            if (!theater) {
                return res.status(404).json({ message: 'Không tìm thấy rạp' });
            }
            await theaterService.deleteTheater(req.params.id);
            logger.info(`Xóa rạp: ${theater.name}`);
            res.json({ message: 'Xóa rạp thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa rạp: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new TheaterController(); 