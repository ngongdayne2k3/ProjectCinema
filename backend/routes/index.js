const express = require('express');
const router = express.Router();
const movieRoutes = require('./movieRoutes');
const userRoutes = require('./userRoutes');
const bookingRoutes = require('./bookingRoutes');
// const scheduleRoutes = require('./scheduleRoutes');
// const theaterRoutes = require('./theaterRoutes');

// API version prefix
const API_VERSION = '/api/v1';

// Routes
router.use(`${API_VERSION}/movies`, movieRoutes);
router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/bookings`, bookingRoutes);
// router.use(`${API_VERSION}/schedules`, scheduleRoutes);
// router.use(`${API_VERSION}/theaters`, theaterRoutes);

// Health check route
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;
