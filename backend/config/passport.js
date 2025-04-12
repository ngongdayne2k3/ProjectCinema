const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userDAO = require('../dao/user.dao');
const { generateToken } = require('./jwt');
const logger = require('./logger');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userDAO.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await userDAO.findByEmail(profile.emails[0].value);

        if (!user) {
            // Tạo người dùng mới nếu chưa tồn tại
            const newUser = {
                email: profile.emails[0].value,
                username: profile.displayName,
                fullName: profile.displayName,
                password: Math.random().toString(36).slice(-8), // Tạo mật khẩu ngẫu nhiên
                googleId: profile.id
            };
            user = await userDAO.create(newUser);
            logger.info(`Tạo tài khoản mới từ Google: ${user.email}`);
        } else if (!user.googleId) {
            // Cập nhật googleId nếu người dùng đã tồn tại nhưng chưa liên kết với Google
            user = await userDAO.updateGoogleId(user._id, profile.id);
            logger.info(`Liên kết tài khoản với Google: ${user.email}`);
        }

        return done(null, user);
    } catch (error) {
        logger.error('Lỗi xác thực Google:', error);
        return done(error, null);
    }
}));

module.exports = passport; 