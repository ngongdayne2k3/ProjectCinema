const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Lỗi dữ liệu không hợp lệ',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'ID không hợp lệ'
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Dữ liệu đã tồn tại trong hệ thống'
        });
    }

    res.status(500).json({
        message: 'Lỗi máy chủ nội bộ',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

module.exports = errorHandler; 