const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');
const { validate, userValidationRules, loginValidationRules } = require('../middlewares/validator');
const { authLimiter, apiLimiter } = require('../config/rateLimit');

// Public routes
router.post('/register', apiLimiter, validate, loginValidationRules, userController.register);
router.post('/login', apiLimiter, validate, userValidationRules,userController.login);

// Quên mật khẩu routes
router.post('/forgot-password', apiLimiter, userController.forgotPassword);
router.post('/reset-password', apiLimiter, userController.resetPassword);

// Protected routes
router.get('/profile', apiLimiter, auth, userController.getUserProfile);
router.put('/profile', apiLimiter, auth, validate, userController.updateProfile);
router.put('/change-password', apiLimiter, auth, validate, userController.changePassword);
// router.put('/membership/points', auth, userController.updateMembershipPoints);

// Admin routes
router.get('/', apiLimiter, adminAuth, userController.getAllUsers);
router.get('/:id', apiLimiter, adminAuth, userController.getUserById);
router.put('/:id', apiLimiter, adminAuth, validate, userValidationRules, userController.updateUser);
router.delete('/:id', apiLimiter, adminAuth, userController.deleteUser);

module.exports = router; 