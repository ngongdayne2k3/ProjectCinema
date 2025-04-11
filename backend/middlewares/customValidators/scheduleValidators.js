const { body, param } = require('express-validator');
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theater');
const Schedule = require('../../models/Schedule');
const Booking = require('../../models/Booking');

const checkMovieExists = async (movieId) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Phim không tồn tại trong hệ thống');
    }
    return true;
};

const checkTheaterExists = async (theaterId) => {
    const theater = await Theater.findById(theaterId);
    if (!theater) {
        throw new Error('Rạp không tồn tại trong hệ thống');
    }
    return true;
};

const checkTimeOverlap = async (theaterId, startTime, endTime, scheduleId = null) => {
    const query = {
        theater: theaterId,
        $or: [
            {
                startTime: { $lt: endTime },
                endTime: { $gt: startTime }
            }
        ]
    };

    if (scheduleId) {
        query._id = { $ne: scheduleId };
    }

    const overlappingSchedule = await Schedule.findOne(query);
    if (overlappingSchedule) {
        throw new Error('Thời gian chiếu bị trùng với suất chiếu khác trong cùng rạp');
    }
    return true;
};

const checkTimeOrder = (startTime, endTime) => {
    if (new Date(startTime) >= new Date(endTime)) {
        throw new Error('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc');
    }
    return true;
};

const checkFormat = (format) => {
    const validFormats = ['2D', '3D', 'IMAX', '4DX', 'SCREENX'];
    if (!validFormats.includes(format)) {
        throw new Error(`Định dạng không hợp lệ. Chỉ chấp nhận: ${validFormats.join(', ')}`);
    }
    return true;
};

const checkScheduleNotStarted = async (scheduleId) => {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
        throw new Error('Lịch chiếu không tồn tại');
    }
    if (new Date(schedule.startTime) <= new Date()) {
        throw new Error('Không thể sửa lịch chiếu đã bắt đầu');
    }
    return true;
};

const checkNoPaidBookings = async (scheduleId) => {
    const paidBooking = await Booking.findOne({
        schedule: scheduleId,
        status: 'Đã thanh toán'
    });
    if (paidBooking) {
        throw new Error('Không thể thay đổi lịch chiếu đã có vé được thanh toán');
    }
    return true;
};

const checkCanCancelSchedule = async (scheduleId) => {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
        throw new Error('Lịch chiếu không tồn tại');
    }

    if (schedule.status === 'canceled') {
        throw new Error('Lịch chiếu đã bị hủy');
    }

    if (schedule.status === 'finished') {
        throw new Error('Không thể hủy lịch chiếu đã kết thúc');
    }

    // Kiểm tra không có vé đã thanh toán
    const paidBooking = await Booking.findOne({
        schedule: scheduleId,
        status: 'Đã thanh toán'
    });
    if (paidBooking) {
        throw new Error('Không thể hủy lịch chiếu đã có vé được thanh toán');
    }

    return true;
};

const scheduleCustomValidationRules = [
    body('movie')
        .custom(checkMovieExists),
    body('theater')
        .custom(checkTheaterExists),
    body('startTime')
        .custom((value, { req }) => checkTimeOrder(value, req.body.endTime)),
    body('endTime')
        .custom((value, { req }) => checkTimeOrder(req.body.startTime, value)),
    body('format')
        .custom(checkFormat),
    body().custom(async (value, { req }) => {
        await checkTimeOverlap(
            req.body.theater,
            req.body.startTime,
            req.body.endTime
        );
        return true;
    })
];

const updateScheduleCustomValidationRules = [
    body('movie')
        .optional()
        .custom(checkMovieExists),
    body('theater')
        .optional()
        .custom(checkTheaterExists),
    body('startTime')
        .optional()
        .custom(async (value, { req }) => {
            // Kiểm tra lịch chiếu chưa bắt đầu
            await checkScheduleNotStarted(req.params.id);
            // Kiểm tra không có vé đã thanh toán
            await checkNoPaidBookings(req.params.id);
            // Kiểm tra thứ tự thời gian
            if (req.body.endTime) {
                return checkTimeOrder(value, req.body.endTime);
            }
            return true;
        }),
    body('endTime')
        .optional()
        .custom(async (value, { req }) => {
            // Kiểm tra lịch chiếu chưa bắt đầu
            await checkScheduleNotStarted(req.params.id);
            // Kiểm tra không có vé đã thanh toán
            await checkNoPaidBookings(req.params.id);
            // Kiểm tra thứ tự thời gian
            if (req.body.startTime) {
                return checkTimeOrder(req.body.startTime, value);
            }
            return true;
        }),
    body('format')
        .optional()
        .custom(checkFormat),
    body().custom(async (value, { req }) => {
        // Kiểm tra lịch chiếu chưa bắt đầu
        await checkScheduleNotStarted(req.params.id);
        // Kiểm tra không có vé đã thanh toán
        await checkNoPaidBookings(req.params.id);
        // Kiểm tra xung đột thời gian
        if (req.body.theater && req.body.startTime && req.body.endTime) {
            await checkTimeOverlap(
                req.body.theater,
                req.body.startTime,
                req.body.endTime,
                req.params.id
            );
        }
        return true;
    })
];

// Thêm validator cho xóa lịch chiếu
const deleteScheduleValidationRules = [
    param('id')
        .custom(async (value) => {
            // Kiểm tra lịch chiếu chưa bắt đầu
            await checkScheduleNotStarted(value);
            // Kiểm tra không có vé đã thanh toán
            await checkNoPaidBookings(value);
            return true;
        })
];

const cancelScheduleValidationRules = [
    param('id')
        .isMongoId()
        .withMessage('ID lịch chiếu không hợp lệ')
        .custom(checkCanCancelSchedule)
];

module.exports = {
    scheduleCustomValidationRules,
    updateScheduleCustomValidationRules,
    deleteScheduleValidationRules,
    cancelScheduleValidationRules
}; 