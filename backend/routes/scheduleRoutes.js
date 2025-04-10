const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/scheduleController');
const { adminAuth } = require('../middlewares/auth');
const { validate,
    theaterIdValidationRules,
    scheduleValidationRules,
    updateScheduleValidationRules,
    scheduleIdValidationRules,
    movieIdValidationRules } = require('../middlewares/validator');
const {
    scheduleCustomValidationRules,
    updateScheduleCustomValidationRules,
    deleteScheduleValidationRules,
    cancelScheduleValidationRules
} = require('../middlewares/customValidators/scheduleValidators');

// Public routes
router.get('/', ScheduleController.getAllSchedules);
router.get('/:id', scheduleIdValidationRules, validate, ScheduleController.getScheduleById);
router.get('/movie/:movieId', movieIdValidationRules, validate, ScheduleController.getSchedulesByMovie);
router.get('/theater/:theaterId', theaterIdValidationRules, validate, ScheduleController.getSchedulesByTheater);
router.get('/date-range', ScheduleController.getSchedulesByDateRange);
router.get('/status/:status', ScheduleController.getSchedulesByStatus);

// Protected routes
// router.get('/available-seats/:id', auth, scheduleController.getAvailableSeats);

// Admin routes
router.post('/', adminAuth, scheduleValidationRules, validate, ScheduleController.createSchedule);
router.put('/:id', adminAuth, scheduleIdValidationRules, updateScheduleValidationRules, validate, ScheduleController.updateSchedule);
router.delete('/:id', adminAuth, scheduleIdValidationRules, validate, ScheduleController.deleteSchedule);
router.post('/:id/cancel', adminAuth, cancelScheduleValidationRules, validate, ScheduleController.cancelSchedule);

// router.put('/:id/status', adminAuth, scheduleController.updateScheduleStatus);

module.exports = router; 