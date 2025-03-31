const { validationResult, body } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const movieValidationRules = [
    body('title').notEmpty().withMessage('Tiêu đề phim không được để trống'),
    body('description').notEmpty().withMessage('Mô tả phim không được để trống'),
    body('duration').isInt({ min: 1 }).withMessage('Thời lượng phim phải là số nguyên dương'),
    body('director').notEmpty().withMessage('Tên đạo diễn không được để trống'),
    body('cast').isArray().withMessage('Diễn viên phải là một mảng'),
    body('genres').isArray().withMessage('Thể loại phải là một mảng'),
    body('poster').notEmpty().withMessage('Poster phim không được để trống'),
    body('status').isIn(['Đang chiếu', 'Sắp chiếu', 'Ngừng chiếu']).withMessage('Trạng thái phim không hợp lệ')
];

const userValidationRules = [
    body('username').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    body('fullName').notEmpty().withMessage('Họ tên không được để trống'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Số điện thoại không hợp lệ')
];

const bookingValidationRules = [
    body('schedule').notEmpty().withMessage('Lịch chiếu không được để trống'),
    body('seats').isArray().withMessage('Ghế ngồi phải là một mảng'),
    body('seats.*.row').notEmpty().withMessage('Hàng ghế không được để trống'),
    body('seats.*.number').isInt({ min: 1 }).withMessage('Số ghế phải là số nguyên dương'),
    body('totalAmount').isFloat({ min: 0 }).withMessage('Tổng tiền phải là số dương'),
    body('paymentMethod').isIn(['Momo', 'Banking', 'E-Wallet']).withMessage('Phương thức thanh toán không hợp lệ'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Số điện thoại không hợp lệ')
];

module.exports = {
    validate,
    movieValidationRules,
    userValidationRules,
    bookingValidationRules
}; 