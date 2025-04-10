const { validationResult, body, param } = require('express-validator');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors.array()
        });
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
    body('status').isIn(['Đang chiếu', 'Sắp chiếu', 'Ngừng chiếu']).withMessage('Trạng thái phim không hợp lệ')
];

const userValidationRules = [
    body('username').notEmpty().withMessage('Tên đăng nhập không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    body('fullName').notEmpty().withMessage('Họ tên không được để trống'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Số điện thoại không hợp lệ')
];

const loginValidationRules = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
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

const theaterValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Tên rạp không được để trống')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Tên rạp phải từ 2 đến 100 ký tự'),
    
    body('capacity')
        .notEmpty()
        .withMessage('Sức chứa không được để trống')
        .isInt({ min: 1 })
        .withMessage('Sức chứa phải là số nguyên dương'),
    
    body('format')
        .notEmpty()
        .withMessage('Định dạng không được để trống')
        .isIn(['2D', '3D', 'IMAX'])
        .withMessage('Định dạng không hợp lệ'),
    
    body('rows')
        .notEmpty()
        .withMessage('Số hàng không được để trống')
        .isInt({ min: 1, max: 26 })
        .withMessage('Số hàng phải từ 1 đến 26'),
    
    body('seatsPerRow')
        .notEmpty()
        .withMessage('Số ghế mỗi hàng không được để trống')
        .isInt({ min: 1, max: 50 })
        .withMessage('Số ghế mỗi hàng phải từ 1 đến 50'),
    
    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('Trạng thái hoạt động phải là true hoặc false'),
    
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Mô tả không được quá 500 ký tự')
];

const seatValidationRules = [
    body('theater')
        .notEmpty()
        .withMessage('ID rạp không được để trống')
        .isMongoId()
        .withMessage('ID rạp không hợp lệ'),
    
    body('row')
        .notEmpty()
        .withMessage('Hàng không được để trống')
        .matches(/^[A-Z]$/)
        .withMessage('Hàng phải là một chữ cái in hoa từ A-Z'),
    
    body('number')
        .notEmpty()
        .withMessage('Số ghế không được để trống')
        .isInt({ min: 1 })
        .withMessage('Số ghế phải là số nguyên dương'),
    
    body('type')
        .optional()
        .isIn(['Standard', 'VIP'])
        .withMessage('Loại ghế không hợp lệ'),
    
    body('status')
        .optional()
        .isIn(['Available', 'Maintenance', 'Reserved'])
        .withMessage('Trạng thái ghế không hợp lệ')
];

const bulkUpdateSeatValidationRules = [
    body('seatIds')
        .isArray()
        .withMessage('Danh sách ID ghế phải là một mảng')
        .notEmpty()
        .withMessage('Danh sách ID ghế không được để trống'),
    
    body('seatIds.*')
        .isMongoId()
        .withMessage('ID ghế không hợp lệ'),
    
    body('type')
        .optional()
        .isIn(['Standard', 'VIP'])
        .withMessage('Loại ghế không hợp lệ'),
    
    body('status')
        .optional()
        .isIn(['Available', 'Maintenance', 'Reserved'])
        .withMessage('Trạng thái ghế không hợp lệ')
];

const idValidationRules = [
    param('id')
        .isMongoId()
        .withMessage('ID không hợp lệ')
];

const theaterIdValidationRules = [
    param('theaterId')
        .isMongoId()
        .withMessage('ID rạp không hợp lệ')
];

const scheduleValidationRules = [
    body('movie')
        .isMongoId()
        .withMessage('ID phim không hợp lệ'),
    body('theater')
        .isMongoId()
        .withMessage('ID rạp không hợp lệ'),
    body('startTime')
        .isISO8601()
        .withMessage('Thời gian bắt đầu không hợp lệ'),
    body('endTime')
        .isISO8601()
        .withMessage('Thời gian kết thúc không hợp lệ'),
    body('format')
        .isIn(['2D', '3D', 'IMAX'])
        .withMessage('Định dạng không hợp lệ'),
    body('prices')
        .isArray()
        .withMessage('Giá phải là một mảng'),
    body('prices.*.type')
        .isIn(['Standard', 'VIP'])
        .withMessage('Loại ghế không hợp lệ'),
    body('prices.*.price')
        .isNumeric()
        .withMessage('Giá phải là số'),
    body('status')
        .optional()
        .isIn(['upcoming', 'showing', 'finished', 'canceled'])
        .withMessage('Trạng thái không hợp lệ')
];

const updateScheduleValidationRules = [
    body('startTime')
        .optional()
        .isISO8601()
        .withMessage('Thời gian bắt đầu không hợp lệ'),
    body('endTime')
        .optional()
        .isISO8601()
        .withMessage('Thời gian kết thúc không hợp lệ'),
    body('format')
        .optional()
        .isIn(['2D', '3D', 'IMAX'])
        .withMessage('Định dạng không hợp lệ'),
    body('prices')
        .optional()
        .isArray()
        .withMessage('Giá phải là một mảng'),
    body('prices.*.type')
        .optional()
        .isIn(['Standard', 'VIP'])
        .withMessage('Loại ghế không hợp lệ'),
    body('prices.*.price')
        .optional()
        .isNumeric()
        .withMessage('Giá phải là số'),
    body('status')
        .optional()
        .isIn(['upcoming', 'showing', 'finished', 'canceled'])
        .withMessage('Trạng thái không hợp lệ')
];

const scheduleIdValidationRules = [
    param('id')
        .isMongoId()
        .withMessage('ID lịch chiếu không hợp lệ')
];

const movieIdValidationRules = [
    param('movieId')
        .isMongoId()
        .withMessage('ID phim không hợp lệ')
];

module.exports = {
    validate,
    movieValidationRules,
    userValidationRules,
    bookingValidationRules,
    loginValidationRules,
    seatValidationRules,
    bulkUpdateSeatValidationRules,
    theaterValidationRules,
    idValidationRules,
    theaterIdValidationRules,
    scheduleValidationRules,
    updateScheduleValidationRules,
    scheduleIdValidationRules,
    movieIdValidationRules
}; 