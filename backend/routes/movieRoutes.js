const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, movieValidationRules } = require('../middlewares/validator');
const upload = require('../config/multer');

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/status/:status', movieController.getMoviesByStatus);
router.get('/:id', movieController.getMovieById);

// Protected routes
router.post('/:id/rating', auth, movieController.addRating);

// Admin routes
router.post('/', 
    adminAuth,
    upload.single('poster'),
    movieValidationRules,
    validate,
    movieController.createMovie
);

router.put('/:id',
    adminAuth,
    upload.single('poster'),
    movieValidationRules,
    validate,
    movieController.updateMovie
);

router.delete('/:id', adminAuth, movieController.deleteMovie);

module.exports = router; 