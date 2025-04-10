const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seatController');
const { validate, seatValidationRules, bulkUpdateSeatValidationRules, idValidationRules, theaterIdValidationRules } = require('../middlewares/validator');
const { adminAuth } = require('../middlewares/auth');

// Public routes - không cần quyền admin
router.get('/:id', idValidationRules, validate, SeatController.getSeat);
router.get('/theater/:theaterId', theaterIdValidationRules, validate, SeatController.getSeatsByTheater);
router.get('/theater/:theaterId/available', theaterIdValidationRules, validate, SeatController.getAvailableSeats);
router.get('/theater/:theaterId/type/:type', theaterIdValidationRules, validate, SeatController.getSeatsByType);

// Admin routes - cần quyền admin
router.post('/', adminAuth, seatValidationRules, validate, SeatController.createSeat);
router.put('/:id', adminAuth, [...idValidationRules, ...seatValidationRules], validate, SeatController.updateSeat);
router.delete('/:id', adminAuth, idValidationRules, validate, SeatController.deleteSeat);
router.delete('/', adminAuth, bulkUpdateSeatValidationRules, validate, SeatController.deleteManySeats);
router.put('/:id/restore', adminAuth, idValidationRules, validate, SeatController.restoreSeat);
router.put('/restore/many', adminAuth, bulkUpdateSeatValidationRules, validate, SeatController.restoreManySeats);
router.put('/:id/status', adminAuth, idValidationRules, validate, SeatController.updateSeatStatus);
router.put('/bulk/update', adminAuth, bulkUpdateSeatValidationRules, validate, SeatController.bulkUpdateSeats);
router.get('/theater/:theaterId/deleted', adminAuth, theaterIdValidationRules, validate, SeatController.getDeletedSeats);

module.exports = router;