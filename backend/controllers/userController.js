const userService = require('../services/user.service');
const logger = require('../config/logger');

class UserController {
    async register(req, res) {
        try {
            const user = await userService.createUser(req.body);
            logger.info(`Đăng ký tài khoản mới: ${user.email}`);
            res.status(201).json(user);
        } catch (error) {
            logger.error(`Lỗi đăng ký: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { user, token } = await userService.login(req.body);
            logger.info(`Đăng nhập thành công: ${user.email}`);
            res.json({ user, token });
        } catch (error) {
            logger.error(`Lỗi đăng nhập: ${error.message}`);
            res.status(401).json({ message: error.message });
        }
    }

    async getUserProfile(req, res) {
        try {
            const user = await userService.getUserById(req.user._id);
            res.json(user);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin người dùng: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const user = await userService.updateUser(req.user._id, req.body, false);
            logger.info(`Cập nhật thông tin người dùng: ${user.email}`);
            res.json(user);
        } catch (error) {
            logger.error(`Lỗi cập nhật thông tin: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async updateMembershipPoints(req, res) {
        try {
            const { points } = req.body;
            const user = await userService.updateMembershipPoints(req.user._id, points);
            logger.info(`Cập nhật điểm thành viên: ${user.email}`);
            res.json(user);
        } catch (error) {
            logger.error(`Lỗi cập nhật điểm thành viên: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    // Admin routes
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            logger.error(`Lỗi lấy danh sách người dùng: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.json(user);
        } catch (error) {
            logger.error(`Lỗi lấy thông tin người dùng: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body, true);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            logger.info(`Cập nhật thông tin người dùng: ${user.email}`);
            res.json(user);
        } catch (error) {
            logger.error(`Lỗi cập nhật thông tin người dùng: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await userService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            logger.info(`Xóa người dùng: ${user.email}`);
            res.json({ message: 'Xóa người dùng thành công' });
        } catch (error) {
            logger.error(`Lỗi xóa người dùng: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController(); 