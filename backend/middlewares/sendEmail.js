// middlewares/sendEmail.js
const nodemailer = require('nodemailer');

// Cấu hình transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Hoặc dịch vụ email khác như Mailtrap, SendGrid, v.v.
  auth: {
    user: process.env.EMAIL_USER, // Sử dụng biến môi trường
    pass: process.env.EMAIL_PASS, // Sử dụng biến môi trường
  },
});

// Hàm gửi email xác nhận booking
const sendBookingSuccessEmail = async (to, bookingDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to, // Email của khách hàng
    subject: 'Booking Confirmation - ProjectCinema',
    html: `
      <h2>Booking Successful!</h2>
      <p>Dear Customer,</p>
      <p>Your booking has been confirmed with the following details:</p>
      <ul>
        <li>Ticket Code: ${bookingDetails.ticketCode}</li>
        <li>Movie: ${bookingDetails.movie}</li>
        <li>Showtime: ${bookingDetails.showtime}</li>
        <li>Seats: ${bookingDetails.seats.join(', ')}</li>
        <li>Total Price: ${bookingDetails.totalPrice} VND</li>
      </ul>
      <p>Thank you for choosing ProjectCinema!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send booking confirmation email');
  }
};

module.exports = sendBookingSuccessEmail;