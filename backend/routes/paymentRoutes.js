const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const { auth } = require('../middlewares/auth');

// Các route thanh toán khác có thể được thêm vào đây

module.exports = router; 