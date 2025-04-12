const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const theaterRoutes = require('./theaterRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const seatRoutes = require('./seatRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./payment.routes');
const authRoutes = require('./auth.routes');

// Auth routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Movie routes
router.use('/movies', movieRoutes);

// Theater routes
router.use('/theaters', theaterRoutes);

// Schedule routes
router.use('/schedules', scheduleRoutes);

// Seat routes
router.use('/seats', seatRoutes);

// Booking routes
router.use('/bookings', bookingRoutes);

// Payment routes
router.use('/payments', paymentRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;
