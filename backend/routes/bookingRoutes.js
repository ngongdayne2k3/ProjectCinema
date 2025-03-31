const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, bookingValidationRules } = require('../middlewares/validator');
const { apiLimiter } = require('../config/rateLimit');

// Protected routes
router.post('/', 
    auth,
    apiLimiter,
    bookingValidationRules,
    validate,
    bookingController.createBooking
);

router.get('/my-bookings', auth, bookingController.getUserBookings);
router.get('/ticket/:ticketCode', auth, bookingController.getBookingByTicketCode);
router.put('/:id/cancel', auth, bookingController.cancelBooking);

// Admin routes
router.get('/', adminAuth, bookingController.getAllBookings);
router.get('/:id', adminAuth, bookingController.getBookingById);
router.put('/:id', adminAuth, bookingValidationRules, validate, bookingController.updateBooking);
router.put('/:id/payment-status', adminAuth, bookingController.updatePaymentStatus);
router.put('/:id/booking-status', adminAuth, bookingController.updateBookingStatus);
router.get('/schedule/:scheduleId', adminAuth, bookingController.getBookingsBySchedule);

module.exports = router; 