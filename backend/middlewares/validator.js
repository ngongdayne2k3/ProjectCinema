const { validationResult, body, param, query } = require('express-validator');
const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');
const Seat = require('../models/Seat');


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
    body('user')
        .isMongoId()
        .withMessage('ID người dùng không hợp lệ'),
    body('schedule')
        .isMongoId()
        .withMessage('ID lịch chiếu không hợp lệ'),
    body('seats')
        .isArray()
        .withMessage('Danh sách ghế phải là một mảng')
        .notEmpty()
        .withMessage('Danh sách ghế không được để trống'),
    body('seats.*')
        .isMongoId()
        .withMessage('ID ghế không hợp lệ'),
    body('totalAmount')
        .isFloat({ min: 0 })
        .withMessage('Tổng tiền phải là số dương'),
    body('paymentMethod')
        .isIn(['VNPay'])
        .withMessage('Phương thức thanh toán không hợp lệ')
];

const updateBookingValidationRules = [
    body('status')
        .optional()
        .isIn(['Chưa thanh toán', 'Đã thanh toán', 'Đã hủy'])
        .withMessage('Trạng thái không hợp lệ'),
    body('paymentMethod')
        .optional()
        .isIn(['VNPay'])
        .withMessage('Phương thức thanh toán không hợp lệ')
];

const bookingIdValidationRules = [
    param('id')
        .isMongoId()
        .withMessage('ID booking không hợp lệ')
];

const checkBookingExists = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking không tồn tại');
    }
    return true;
};

const checkCanUpdateBooking = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking không tồn tại');
    }
    if (booking.status === 'Đã thanh toán') {
        throw new Error('Không thể cập nhật booking đã thanh toán');
    }
    return true;
};

const checkCanCancelBooking = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking không tồn tại');
    }
    if (booking.status === 'Đã thanh toán') {
        throw new Error('Không thể hủy booking đã thanh toán');
    }
    if (booking.status === 'Đã hủy') {
        throw new Error('Booking đã bị hủy');
    }
    return true;
};

const bookingCustomValidationRules = [
    param('id')
        .custom(checkBookingExists)
];

const updateBookingCustomValidationRules = [
    param('id')
        .custom(checkCanUpdateBooking)
];

const cancelBookingCustomValidationRules = [
    param('id')
        .custom(checkCanCancelBooking)
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

// Validation rules cho tạo booking
const validateBooking = [
    body('schedule')
        .isMongoId()
        .withMessage('ID lịch chiếu không hợp lệ')
        .custom(async (scheduleId) => {
            const schedule = await Schedule.findById(scheduleId)
                .populate('theater');
            if (!schedule) {
                throw new Error('Lịch chiếu không tồn tại');
            }
            return true;
        }),
    body('seats')
        .isArray()
        .withMessage('Danh sách ghế phải là một mảng')
        .notEmpty()
        .withMessage('Danh sách ghế không được để trống')
        .custom(async (seatIds, { req }) => {
            const schedule = await Schedule.findById(req.body.schedule)
                .populate('theater');
            if (!schedule) {
                throw new Error('Lịch chiếu không tồn tại');
            }

            const seats = await Seat.find({ _id: { $in: seatIds } });
            if (seats.length !== seatIds.length) {
                throw new Error('Một số ghế không tồn tại');
            }

            // Kiểm tra xem tất cả ghế có thuộc rạp của lịch chiếu không
            for (const seat of seats) {
                if (seat.theater.toString() !== schedule.theater._id.toString()) {
                    throw new Error(`Ghế ${seat._id} không thuộc rạp của lịch chiếu`);
                }
                if (seat.status !== 'Available') {
                    throw new Error(`Ghế ${seat._id} không khả dụng`);
                }
            }

            return true;
        }),
    body('paymentMethod')
        .isIn(['Momo', 'Banking', 'E-Wallet', 'VNPAY'])
        .withMessage('Phương thức thanh toán không hợp lệ'),
    validate
];

// Validation rules cho cập nhật trạng thái thanh toán
const validatePaymentStatus = [
    body('paymentStatus')
        .isIn(['Chưa thanh toán', 'Đã thanh toán', 'Đã hủy'])
        .withMessage('Trạng thái thanh toán không hợp lệ'),
    validate
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
    movieIdValidationRules,
    bookingIdValidationRules,
    updateBookingValidationRules,
    bookingCustomValidationRules,
    updateBookingCustomValidationRules,
    cancelBookingCustomValidationRules,
    validateBooking,
    validatePaymentStatus
}; 