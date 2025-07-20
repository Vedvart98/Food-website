const express = require('express');
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/auth');

const router = express.Router();

// public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// protected routes
router.get('/me', authMiddleWare.protect, authController.getMe);

// admin only route
router.get('/admin',
    authMiddleWare.protect,
    authMiddleWare.restrictTo('admin'),
    (req, res) => {
        res.json({
            status: 'success',
            message: 'admin access granted',
            user: req.user
        });
    }
);

module.exports = router;