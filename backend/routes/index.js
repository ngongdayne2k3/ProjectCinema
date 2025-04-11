const express = require('express');
const router = express.Router();
const movieRoutes = require('./movieRoutes');
const userRoutes = require('./userRoutes');
const bookingRoutes = require('./bookingRoutes');
const theaterRoutes = require('./theaterRoutes');
const seatRoutes = require('./seatRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const paymentRoutes = require('./paymentRoutes');


// Routes
router.use(`/movies`, movieRoutes);
router.use(`/users`, userRoutes);
router.use(`/bookings`, bookingRoutes);
router.use('/theaters', theaterRoutes);
router.use('/seats', seatRoutes);
router.use(`/schedules`, scheduleRoutes);
router.use('/payment', paymentRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;
