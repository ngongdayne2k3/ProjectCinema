const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { apiLimiter } = require('../config/rateLimit');

// Google OAuth routes
router.get('/google', apiLimiter, passport.authenticate('google', { 
    scope: ['profile', 'email']
}));

router.get('/google/callback', 
    apiLimiter,
    passport.authenticate('google', { 
        failureRedirect: '/login',
        session: false 
    }),
    authController.googleAuthCallback
);

module.exports = router; 