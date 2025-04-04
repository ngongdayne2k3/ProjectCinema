const User = require('../models/User');

class UserDAO {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findAll() {
        return await User.find({}).select('-password');
    }

    async findById(id) {
        return await User.findById(id).select('-password');
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateMembershipPoints(id, points) {
        const user = await User.findByIdAndUpdate(
            id,
            { $inc: { membershipPoints: points } },
            { new: true }
        ).select('-password');

        if (user) {
            // Tính toán lại cấp độ thành viên
            const newLevel = this.calculateMembershipLevel(user.membershipPoints);
            if (newLevel !== user.membershipLevel) {
                await this.updateMembershipLevel(id, newLevel);
            }
        }

        return user;
    }

    async updateMembershipLevel(id, level) {
        return await User.findByIdAndUpdate(
            id,
            { membershipLevel: level },
            { new: true }
        ).select('-password');
    }

    calculateMembershipLevel(points) {
        if (points >= 1000) return 'Platinum';
        if (points >= 500) return 'Gold';
        if (points >= 200) return 'Silver';
        return 'Bronze';
    }

    async addBookingToHistory(id, bookingId) {
        return await User.findByIdAndUpdate(
            id,
            { $push: { bookingHistory: bookingId } },
            { new: true }
        ).select('-password');
    }
}

module.exports = new UserDAO(); 