const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

class UploadService {
    async uploadPoster(file) {
        try {
            if (!file) {
                throw new Error('Không tìm thấy file');
            }

            // Tạo URL cho file
            const fileUrl = `/uploads/posters/${file.filename}`;
            
            logger.info(`Upload poster thành công: ${fileUrl}`);
            return fileUrl;
        } catch (error) {
            logger.error(`Lỗi upload poster: ${error.message}`);
            throw error;
        }
    }

    async deletePoster(posterUrl) {
        try {
            if (!posterUrl) return;

            // Lấy tên file từ URL
            const filename = posterUrl.split('/').pop();
            const filePath = path.join(__dirname, '../../public/uploads/posters', filename);

            // Kiểm tra file tồn tại
            if (fs.existsSync(filePath)) {
                // Xóa file
                fs.unlinkSync(filePath);
                logger.info(`Xóa poster thành công: ${filename}`);
            }
        } catch (error) {
            logger.error(`Lỗi xóa poster: ${error.message}`);
            throw error;
        }
    }

    async updatePoster(oldPosterUrl, newFile) {
        try {
            // Xóa poster cũ nếu có
            if (oldPosterUrl) {
                await this.deletePoster(oldPosterUrl);
            }

            // Upload poster mới
            const newPosterUrl = await this.uploadPoster(newFile);
            return newPosterUrl;
        } catch (error) {
            logger.error(`Lỗi cập nhật poster: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new UploadService(); 