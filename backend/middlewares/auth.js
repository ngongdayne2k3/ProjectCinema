const { verifyToken } = require('../config/jwt');
const userDAO = require('../dao/user.dao');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('Không tìm thấy token xác thực');
        }

        const decoded = verifyToken(token);
        const user = await userDAO.findById(decoded.userId);

        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        if (!user.isActive) {
            throw new Error('Tài khoản đã bị khóa');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                throw new Error('Không có quyền truy cập');
            }
            next();
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

module.exports = {
    auth,
    adminAuth
}; 