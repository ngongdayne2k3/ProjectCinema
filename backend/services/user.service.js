const userDAO = require('../dao/user.dao');
const { UserDTO, CreateUserDTO, UpdateUserDTO, LoginDTO } = require('../dto/user.dto');
const jwt = require('jsonwebtoken');

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
}

module.exports = new UserService(); 