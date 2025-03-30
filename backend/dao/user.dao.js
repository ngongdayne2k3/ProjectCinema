const User = require('../models/User');

class UserDAO {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateMembershipPoints(id, points) {
        return await User.findByIdAndUpdate(
            id,
            { $inc: { membershipPoints: points } },
            { new: true }
        );
    }

    async updateMembershipLevel(id, level) {
        return await User.findByIdAndUpdate(
            id,
            { membershipLevel: level },
            { new: true }
        );
    }

    async addBookingToHistory(id, bookingId) {
        return await User.findByIdAndUpdate(
            id,
            { $push: { bookingHistory: bookingId } },
            { new: true }
        );
    }
}

module.exports = new UserDAO(); 