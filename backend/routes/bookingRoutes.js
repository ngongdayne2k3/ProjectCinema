const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validateBooking, validatePaymentStatus } = require('../middlewares/validator');
const { apiLimiter } = require('../config/rateLimit');

// Public routes
router.get('/', apiLimiter, BookingController.getAllBookings);
router.get('/:id', apiLimiter, BookingController.getBookingById);
router.get('/user/:userId', apiLimiter, BookingController.getBookingsByUser);
router.get('/schedule/:scheduleId', apiLimiter, BookingController.getBookingsBySchedule);
router.get('/status/:status', apiLimiter, BookingController.getBookingsByStatus);
router.get('/date-range', apiLimiter, BookingController.getBookingsByDateRange);

// Protected routes (require authentication)
router.post('/', apiLimiter, auth, validateBooking, BookingController.createBooking);
router.put('/:id', apiLimiter, auth, validateBooking, BookingController.updateBooking);
router.put('/:id/payment-status', apiLimiter, auth, validatePaymentStatus, BookingController.updatePaymentStatus);

// Admin routes
router.delete('/:id', apiLimiter, auth, adminAuth, BookingController.deleteBooking);

module.exports = router; 