const nodemailer = require('nodemailer');

const emailConfig = {
    host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.MAILTRAP_PORT || 2525,
    auth: {
        user: process.env.MAILTRAP_USER || 'your_mailtrap_user',
        pass: process.env.MAILTRAP_PASS || 'your_mailtrap_password'
    }
};

const transporter = nodemailer.createTransport(emailConfig);

module.exports = transporter; 