const userService = require('../services/user.service');
const emailService = require('../services/email.service');
const { generateToken } = require('../config/jwt');
const { comparePassword, hashPassword } = require('../config/password');
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
    
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            // Kiểm tra email có tồn tại không
            const user = await userService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Email không tồn tại trong hệ thống'
                });
            }

            // Tạo token reset mật khẩu
            const resetToken = generateToken({ id: user._id }, '10m');

            // Lưu token vào database
            await userService.updateUser(user._id, {
                resetPasswordToken: resetToken,
                resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 phút
            });

            // Gửi email reset mật khẩu
            await emailService.sendResetPasswordEmail(user.email, resetToken);

            res.status(200).json({
                success: true,
                message: 'Email đặt lại mật khẩu đã được gửi'
            });
        } catch (error) {
            logger.error('Lỗi khi xử lý yêu cầu quên mật khẩu:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi hệ thống'
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;

            // Tìm user với token hợp lệ
            const user = await userService.getUserByResetToken(token);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Token không hợp lệ hoặc đã hết hạn'
                });
            }

            // Kiểm tra token hết hạn
            if (user.resetPasswordExpires < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: 'Token đã hết hạn'
                });
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await hashPassword(newPassword);

            // Cập nhật mật khẩu và xóa token
            await userService.updateUser(user._id, {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            });

            res.status(200).json({
                success: true,
                message: 'Mật khẩu đã được đặt lại thành công'
            });
        } catch (error) {
            logger.error('Lỗi khi đặt lại mật khẩu:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi hệ thống'
            });
        }
    }

    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.user._id; // Lấy từ middleware auth

            // Lấy thông tin user
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Người dùng không tồn tại'
                });
            }

            // Kiểm tra mật khẩu hiện tại
            const isPasswordValid = await comparePassword(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Mật khẩu hiện tại không đúng'
                });
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await hashPassword(newPassword);

            // Cập nhật mật khẩu mới
            await userService.updateUser(userId, {
                password: hashedPassword
            });

            // Gửi email thông báo đổi mật khẩu thành công
            await emailService.sendPasswordChangedEmail(user.email);

            res.status(200).json({
                success: true,
                message: 'Đổi mật khẩu thành công'
            });
        } catch (error) {
            logger.error('Lỗi khi đổi mật khẩu:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi hệ thống'
            });
        }
    }
}

module.exports = new UserController(); 