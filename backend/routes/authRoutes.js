const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    me,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, me);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
