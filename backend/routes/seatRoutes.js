const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
const { adminAuth } = require('../middlewares/auth');
const { validate, seatValidationRules } = require('../middlewares/validator');

// Admin routes
router.get('/theater/:theaterId', adminAuth, seatController.getSeatsByTheater);
router.get('/:id', adminAuth, seatController.getSeatById);
router.put('/:id', adminAuth, seatValidationRules, validate, seatController.updateSeat);
router.put('/bulk-update', adminAuth, seatValidationRules, validate, seatController.bulkUpdateSeats);
router.delete('/:id', adminAuth, seatController.deleteSeat);
router.delete('/bulk-delete', adminAuth, seatController.deleteManySeats);

module.exports = router; 