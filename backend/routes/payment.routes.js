const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');

// VNPay callback URLs
router.get('/vnpay_return', PaymentController.vnpayReturn);
router.get('/vnpay_ipn', PaymentController.vnpayIPN);

// Payment result pages
router.get('/success', PaymentController.paymentSuccess);
router.get('/fail', PaymentController.paymentFail);
router.get('/error', PaymentController.paymentError);

module.exports = router; 