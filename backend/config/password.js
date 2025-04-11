const bcrypt = require('bcryptjs');
const logger = require('./logger');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        logger.error('Lỗi khi mã hóa mật khẩu:', error);
        throw error;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        logger.error('Lỗi khi so sánh mật khẩu:', error);
        throw error;
    }
};

module.exports = {
    hashPassword,
    comparePassword
}; 