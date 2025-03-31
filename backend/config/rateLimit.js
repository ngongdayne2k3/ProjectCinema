const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 phút
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Giới hạn 100 request mỗi IP trong 15 phút
    message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút'
});

const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 giờ
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5, // Giới hạn 5 lần đăng nhập thất bại mỗi IP trong 1 giờ
    message: 'Quá nhiều lần đăng nhập thất bại, vui lòng thử lại sau 1 giờ'
});

module.exports = {
    apiLimiter,
    authLimiter
}; 