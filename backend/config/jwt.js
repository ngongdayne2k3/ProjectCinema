const jwt = require('jsonwebtoken');
const logger = require('./logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (error) {
        logger.error('Lỗi khi tạo token:', error);
        throw error;
    }
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        logger.error('Lỗi khi xác thực token:', error);
        throw error;
    }
};

module.exports = {
    generateToken,
    verifyToken
}; 