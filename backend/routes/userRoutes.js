const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, userValidationRules, loginValidationRules } = require('../middlewares/validator');
const { authLimiter } = require('../config/rateLimit');

// Public routes
router.post('/register', userValidationRules, validate, userController.register);
router.post('/login', authLimiter, loginValidationRules, validate, userController.login);

// Protected routes
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userValidationRules, validate, userController.updateProfile);
router.put('/membership/points', auth, userController.updateMembershipPoints);

// Admin routes
router.get('/', adminAuth, userController.getAllUsers);
router.get('/:id', adminAuth, userController.getUserById);
router.put('/:id', adminAuth, userValidationRules, validate, userController.updateUser);
router.delete('/:id', adminAuth, userController.deleteUser);

module.exports = router; 