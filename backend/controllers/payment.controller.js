const VNPayService = require('../services/vnpay.service');
const BookingService = require('../services/booking.service');
const UserService = require('../services/user.service');
const EmailService = require('../services/email.service');
const logger = require('../config/logger');

class PaymentController {
    static async vnpayReturn(req, res) {
        try {
            const vnp_Params = req.query;
            const isValid = VNPayService.verifyReturn(vnp_Params);

            if (isValid) {
                const bookingId = vnp_Params['vnp_TxnRef'];
                const responseCode = vnp_Params['vnp_ResponseCode'];
                const amount = parseInt(vnp_Params['vnp_Amount']) / 100;

                // Lấy thông tin booking
                const booking = await BookingService.getBookingById(bookingId);
                
                if (!booking) {
                    logger.error(`Booking không tồn tại: ${bookingId}`);
                    return res.redirect('/payment/error?message=Booking không tồn tại');
                }

                // Kiểm tra số tiền thanh toán
                if (amount !== booking.totalAmount) {
                    logger.error(`Số tiền thanh toán không khớp: ${amount} vs ${booking.totalAmount}`);
                    return res.redirect('/payment/error?message=Số tiền thanh toán không khớp');
                }

                if (responseCode === '00') {
                    // Thanh toán thành công
                    await BookingService.updateBooking(bookingId, {
                        paymentStatus: 'Paid',
                        paymentMethod: 'VNPAY',
                        paymentDate: new Date(),
                        paymentInfo: {
                            transactionId: vnp_Params['vnp_TransactionNo'],
                            bankCode: vnp_Params['vnp_BankCode'],
                            bankTranNo: vnp_Params['vnp_BankTranNo'],
                            cardType: vnp_Params['vnp_CardType']
                        }
                    });

                    // Tính điểm thưởng (1 điểm cho mỗi 10,000 VND)
                    const points = Math.floor(amount / 10000);
                    
                    // Cập nhật điểm thành viên
                    await UserService.updateUser(booking.user, {
                        membershipPoints: points
                    }, true);

                    // Thêm vào lịch sử đặt vé
                    await UserService.addBookingToHistory(booking.user, bookingId);

                    // Gửi email xác nhận thanh toán thành công
                    const user = await UserService.getUserById(booking.user);
                    await EmailService.sendPaymentSuccessEmail(user.email, booking);

                    return res.redirect('/payment/success?bookingId=' + bookingId);
                } else {
                    // Thanh toán thất bại
                    await BookingService.updateBooking(bookingId, {
                        paymentStatus: 'Failed',
                        paymentMethod: 'VNPAY',
                        paymentDate: new Date(),
                        paymentInfo: {
                            errorCode: responseCode,
                            errorMessage: vnp_Params['vnp_ResponseMessage']
                        }
                    });

                    // Gửi email thông báo thanh toán thất bại
                    const user = await UserService.getUserById(booking.user);
                    await EmailService.sendPaymentFailedEmail(user.email, booking);

                    return res.redirect('/payment/fail?bookingId=' + bookingId);
                }
            } else {
                // Chữ ký không hợp lệ
                logger.error('Chữ ký VNPay không hợp lệ');
                return res.redirect('/payment/error?message=Chữ ký không hợp lệ');
            }
        } catch (error) {
            logger.error('Lỗi xử lý callback VNPay:', error);
            return res.redirect('/payment/error?message=Lỗi hệ thống');
        }
    }

    static async vnpayIPN(req, res) {
        try {
            const vnp_Params = req.query;
            const isValid = VNPayService.verifyReturn(vnp_Params);

            if (isValid) {
                const bookingId = vnp_Params['vnp_TxnRef'];
                const responseCode = vnp_Params['vnp_ResponseCode'];

                if (responseCode === '00') {
                    // Lấy thông tin booking
                    const booking = await BookingService.getBookingById(bookingId);
                    
                    if (booking) {
                        // Cập nhật trạng thái thanh toán
                        await BookingService.updateBooking(bookingId, {
                            paymentStatus: 'Paid',
                            paymentMethod: 'VNPAY',
                            paymentDate: new Date(),
                            paymentInfo: {
                                transactionId: vnp_Params['vnp_TransactionNo'],
                                bankCode: vnp_Params['vnp_BankCode'],
                                bankTranNo: vnp_Params['vnp_BankTranNo'],
                                cardType: vnp_Params['vnp_CardType']
                            }
                        });

                        // Tính điểm thưởng (1 điểm cho mỗi 10,000 VND)
                        const amount = parseInt(vnp_Params['vnp_Amount']) / 100;
                        const points = Math.floor(amount / 10000);
                        
                        // Cập nhật điểm thành viên
                        await UserService.updateUser(booking.user, {
                            membershipPoints: points
                        }, true);

                        // Thêm vào lịch sử đặt vé
                        await UserService.addBookingToHistory(booking.user, bookingId);
                    }
                }

                return res.status(200).json({ RspCode: '00', Message: 'Confirm Success' });
            } else {
                return res.status(200).json({ RspCode: '97', Message: 'Invalid Checksum' });
            }
        } catch (error) {
            logger.error('Lỗi xử lý IPN VNPay:', error);
            return res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
        }
    }

    static async paymentSuccess(req, res) {
        try {
            const { bookingId } = req.query;
            if (!bookingId) {
                return res.status(400).json({ message: 'Thiếu thông tin bookingId' });
            }

            const booking = await BookingService.getBookingById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy thông tin đặt vé' });
            }

            res.render('payment/success', {
                booking,
                title: 'Thanh toán thành công'
            });
        } catch (error) {
            logger.error('Lỗi khi hiển thị trang thành công:', error);
            res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    }

    static async paymentFail(req, res) {
        try {
            const { bookingId } = req.query;
            if (!bookingId) {
                return res.status(400).json({ message: 'Thiếu thông tin bookingId' });
            }

            const booking = await BookingService.getBookingById(bookingId);
            if (!booking) {
                return res.status(404).json({ message: 'Không tìm thấy thông tin đặt vé' });
            }

            res.render('payment/fail', {
                booking,
                title: 'Thanh toán thất bại'
            });
        } catch (error) {
            logger.error('Lỗi khi hiển thị trang thất bại:', error);
            res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    }

    static async paymentError(req, res) {
        try {
            const { message } = req.query;
            res.render('payment/error', {
                message: message || 'Đã có lỗi xảy ra trong quá trình thanh toán',
                title: 'Lỗi thanh toán'
            });
        } catch (error) {
            logger.error('Lỗi khi hiển thị trang lỗi:', error);
            res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    }
}

module.exports = PaymentController; 