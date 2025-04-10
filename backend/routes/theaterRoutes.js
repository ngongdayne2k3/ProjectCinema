const express = require('express');
const router = express.Router();
const TheaterController = require('../controllers/theaterController');
const { validate, theaterValidationRules, idValidationRules } = require('../middlewares/validator');
const { adminAuth } = require('../middlewares/auth');

// Public routes - không cần quyền admin
router.get('/', TheaterController.getAllTheaters);
router.get('/:id', idValidationRules, validate, TheaterController.getTheater);
router.get('/format/:format', TheaterController.getTheatersByFormat);
router.get('/active/theaters', TheaterController.getActiveTheaters);

// Admin routes - cần quyền admin
router.post('/', adminAuth, theaterValidationRules, validate, TheaterController.createTheater);
router.put('/:id', adminAuth, [...idValidationRules, ...theaterValidationRules], validate, TheaterController.updateTheater);
router.delete('/:id', adminAuth, idValidationRules, validate, TheaterController.deleteTheater);

module.exports = router; 