const { generateToken } = require('../config/jwt');
const logger = require('../config/logger');

class AuthController {
    async googleAuth(req, res) {
        try {
            const token = generateToken({ userId: req.user._id, role: req.user.role });
            
            // Chuyển hướng về frontend với token
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
        } catch (error) {
            logger.error('Lỗi xác thực Google:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
    }

    async googleAuthCallback(req, res) {
        try {
            const token = generateToken({ 
                userId: req.user._id, 
                role: req.user.role 
            });

            // Trả về token JWT
            res.json({
                success: true,
                token,
                user: {
                    id: req.user._id,
                    email: req.user.email,
                    fullName: req.user.fullName,
                    role: req.user.role
                }
            });
        } catch (error) {
            logger.error('Lỗi callback Google:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra trong quá trình xác thực'
            });
        }
    }
}

module.exports = new AuthController(); 