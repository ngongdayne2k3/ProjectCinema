const userDAO = require('../dao/user.dao');
const { UserDTO, CreateUserDTO, UpdateUserDTO, LoginDTO, ResetPasswordDTO } = require('../dto/user.dto');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const bcrypt = require('bcryptjs');
const emailService = require('./email.service');

class UserService {
    async createUser(userData) {
        const createUserDTO = new CreateUserDTO(userData);
        const user = await userDAO.create(createUserDTO);
        return new UserDTO(user);
    }

    async getAllUsers() {
        const users = await userDAO.findAll();
        return users.map(user => new UserDTO(user));
    }

    async getUserById(id) {
        const user = await userDAO.findById(id);
        return user ? new UserDTO(user) : null;
    }

    async updateUser(id, userData, isAdmin = false) {
        const updateUserDTO = new UpdateUserDTO(userData);
        
        // Nếu không phải admin, không cho phép cập nhật role và membershipPoints
        if (!isAdmin) {
            delete updateUserDTO.role;
            delete updateUserDTO.membershipPoints;
            delete updateUserDTO.membershipLevel;
        }

        const user = await userDAO.update(id, updateUserDTO);
        
        // Nếu có cập nhật membershipPoints, tính toán lại membershipLevel
        if (user && isAdmin && updateUserDTO.membershipPoints !== undefined) {
            const newLevel = this.calculateMembershipLevel(updateUserDTO.membershipPoints);
            if (newLevel !== user.membershipLevel) {
                await userDAO.updateMembershipLevel(id, newLevel);
            }
        }
        
        return user ? new UserDTO(user) : null;
    }

    async deleteUser(id) {
        return await userDAO.delete(id);
    }

    async login(loginData) {
        const loginDTO = new LoginDTO(loginData);
        const user = await userDAO.findByEmail(loginDTO.email);
        
        if (!user || !(await user.comparePassword(loginDTO.password))) {
            throw new Error('Email hoặc mật khẩu không chính xác');
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            user: new UserDTO(user),
            token
        };
    }

    async updateMembershipPoints(id, points) {
        const user = await userDAO.updateMembershipPoints(id, points);
        if (user) {
            // Cập nhật cấp độ thành viên dựa trên điểm
            const newLevel = this.calculateMembershipLevel(user.membershipPoints);
            if (newLevel !== user.membershipLevel) {
                await userDAO.updateMembershipLevel(id, newLevel);
            }
        }
        return user ? new UserDTO(user) : null;
    }

    calculateMembershipLevel(points) {
        if (points >= 1000) return 'Platinum';
        if (points >= 500) return 'Gold';
        if (points >= 200) return 'Silver';
        return 'Bronze';
    }

    async addBookingToHistory(id, bookingId) {
        const user = await userDAO.addBookingToHistory(id, bookingId);
        return user ? new UserDTO(user) : null;
    }

    static async getUserByEmail(email) {
        try {
            const user = await userDAO.findByEmail(email.toLowerCase());
            return user ? new UserDTO(user) : null;
        } catch (error) {
            logger.error('Lỗi khi tìm user bằng email:', error);
            throw error;
        }
    }

    static async getUserByResetToken(token) {
        try {
            const user = await userDAO.findByResetToken(token);
            return user ? new UserDTO(user) : null;
        } catch (error) {
            logger.error('Lỗi khi tìm user bằng reset token:', error);
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const user = await userDAO.findByEmail(email);
            if (!user) {
                throw new Error('Email không tồn tại trong hệ thống');
            }

            // Tạo token reset mật khẩu
            const resetToken = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '10m' }
            );

            // Cập nhật token vào database
            const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
            await userDAO.updateResetPasswordToken(user._id, resetToken, expires);

            // Gửi email reset mật khẩu
            await emailService.sendResetPasswordEmail(user.email, resetToken);

            return {
                success: true,
                message: 'Email hướng dẫn đặt lại mật khẩu đã được gửi'
            };
        } catch (error) {
            logger.error('Lỗi trong quá trình xử lý quên mật khẩu:', error);
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            // Kiểm tra token hợp lệ
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userDAO.findByResetToken(token);

            if (!user) {
                throw new Error('Token không hợp lệ hoặc đã hết hạn');
            }

            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            // Cập nhật mật khẩu mới
            const updatedUser = await userDAO.resetPassword(user._id, hashedPassword);
            
            return {
                success: true,
                message: 'Mật khẩu đã được đặt lại thành công',
                user: new UserDTO(updatedUser)
            };
        } catch (error) {
            logger.error('Lỗi trong quá trình đặt lại mật khẩu:', error);
            throw error;
        }
    }
}

module.exports = UserService; 