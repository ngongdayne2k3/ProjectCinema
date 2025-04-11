const transporter = require('../config/email.config');
const logger = require('../config/logger');

class EmailService {
    static async sendPaymentSuccessEmail(userEmail, booking) {
        try {
            const mailOptions = {
                from: '"Cinema System" <noreply@cinema.com>',
                to: userEmail,
                subject: 'Thanh toán thành công - Đặt vé xem phim',
                html: `
                    <h1>Thanh toán thành công!</h1>
                    <p>Xin chào,</p>
                    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Đơn đặt vé của bạn đã được thanh toán thành công.</p>
                    <h2>Thông tin đặt vé:</h2>
                    <ul>
                        <li>Mã đặt vé: ${booking.ticketCode}</li>
                        <li>Phim: ${booking.schedule.movie.title}</li>
                        <li>Rạp: ${booking.schedule.theater.name}</li>
                        <li>Suất chiếu: ${new Date(booking.schedule.startTime).toLocaleString()}</li>
                        <li>Ghế: ${booking.seats.map(s => s.seat.code).join(', ')}</li>
                        <li>Tổng tiền: ${booking.totalAmount.toLocaleString()} VNĐ</li>
                    </ul>
                    <p>Vui lòng đến rạp trước 15 phút để nhận vé.</p>
                    <p>Trân trọng,</p>
                    <p>Đội ngũ Cinema System</p>
                `
            };

            await transporter.sendMail(mailOptions);
            logger.info(`Email xác nhận thanh toán đã được gửi đến ${userEmail}`);
        } catch (error) {
            logger.error('Lỗi khi gửi email xác nhận thanh toán:', error);
            throw error;
        }
    }

    static async sendPaymentFailedEmail(userEmail, booking) {
        try {
            const mailOptions = {
                from: '"Cinema System" <noreply@cinema.com>',
                to: userEmail,
                subject: 'Thanh toán thất bại - Đặt vé xem phim',
                html: `
                    <h1>Thanh toán thất bại</h1>
                    <p>Xin chào,</p>
                    <p>Rất tiếc, giao dịch thanh toán của bạn đã không thành công.</p>
                    <h2>Thông tin đặt vé:</h2>
                    <ul>
                        <li>Mã đặt vé: ${booking.ticketCode}</li>
                        <li>Phim: ${booking.schedule.movie.title}</li>
                        <li>Rạp: ${booking.schedule.theater.name}</li>
                        <li>Suất chiếu: ${new Date(booking.schedule.startTime).toLocaleString()}</li>
                        <li>Ghế: ${booking.seats.map(s => s.seat.code).join(', ')}</li>
                        <li>Tổng tiền: ${booking.totalAmount.toLocaleString()} VNĐ</li>
                    </ul>
                    <p>Vui lòng thử lại hoặc liên hệ với chúng tôi nếu bạn cần hỗ trợ.</p>
                    <p>Trân trọng,</p>
                    <p>Đội ngũ Cinema System</p>
                `
            };

            await transporter.sendMail(mailOptions);
            logger.info(`Email thông báo thanh toán thất bại đã được gửi đến ${userEmail}`);
        } catch (error) {
            logger.error('Lỗi khi gửi email thông báo thanh toán thất bại:', error);
            throw error;
        }
    }

    static async sendResetPasswordEmail(userEmail, resetToken) {
        try {
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
            
            const mailOptions = {
                from: '"Cinema System" <noreply@cinema.com>',
                to: userEmail,
                subject: 'Đặt lại mật khẩu - Cinema System',
                html: `
                    <h1>Đặt lại mật khẩu</h1>
                    <p>Xin chào,</p>
                    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
                    <p>Vui lòng nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>
                    <p><a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a></p>
                    <p>Liên kết này sẽ hết hạn sau 10 phút.</p>
                    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                    <p>Trân trọng,</p>
                    <p>Đội ngũ Cinema System</p>
                `
            };

            await transporter.sendMail(mailOptions);
            logger.info(`Email đặt lại mật khẩu đã được gửi đến ${userEmail}`);
        } catch (error) {
            logger.error('Lỗi khi gửi email đặt lại mật khẩu:', error);
            throw error;
        }
    }

    static async sendPasswordChangedEmail(userEmail) {
        try {
            const mailOptions = {
                from: '"Cinema System" <noreply@cinema.com>',
                to: userEmail,
                subject: 'Mật khẩu đã được thay đổi - Cinema System',
                html: `
                    <h1>Mật khẩu đã được thay đổi</h1>
                    <p>Xin chào,</p>
                    <p>Mật khẩu tài khoản của bạn vừa được thay đổi.</p>
                    <p>Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
                    <p>Trân trọng,</p>
                    <p>Đội ngũ Cinema System</p>
                `
            };

            await transporter.sendMail(mailOptions);
            logger.info(`Email thông báo đổi mật khẩu đã được gửi đến ${userEmail}`);
        } catch (error) {
            logger.error('Lỗi khi gửi email thông báo đổi mật khẩu:', error);
            throw error;
        }
    }
}

module.exports = EmailService; 