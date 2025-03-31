const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, scheduleValidationRules } = require('../middlewares/validator');
const { apiLimiter } = require('../config/rateLimit');

// Public routes
router.get('/', scheduleController.getAllSchedules);
router.get('/movie/:movieId', scheduleController.getSchedulesByMovie);
router.get('/:id', scheduleController.getScheduleById);

// Protected routes
router.get('/available-seats/:id', auth, scheduleController.getAvailableSeats);

// Admin routes
router.post('/', 
    adminAuth,
    apiLimiter,
    scheduleValidationRules,
    validate,
    scheduleController.createSchedule
);

router.put('/:id',
    adminAuth,
    scheduleValidationRules,
    validate,
    scheduleController.updateSchedule
);

router.delete('/:id', adminAuth, scheduleController.deleteSchedule);

router.put('/:id/status', adminAuth, scheduleController.updateScheduleStatus);

module.exports = router; 