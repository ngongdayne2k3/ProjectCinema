const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaterController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, theaterValidationRules } = require('../middlewares/validator');

// Public routes
router.get('/', theaterController.getAllTheaters);
router.get('/:id', theaterController.getTheaterById);

// Admin routes
router.post('/', 
    adminAuth,
    theaterValidationRules,
    validate,
    theaterController.createTheater
);

router.put('/:id',
    adminAuth,
    theaterValidationRules,
    validate,
    theaterController.updateTheater
);

router.delete('/:id', adminAuth, theaterController.deleteTheater);

router.put('/:id/seats', adminAuth, theaterController.updateSeats);
router.put('/:id/status', adminAuth, theaterController.updateTheaterStatus);

module.exports = router; 