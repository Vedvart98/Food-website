const express = require('express');
const router = express.Router();
const User = require('../models/User'); // mongoose model for users
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/auth');

router.get('/',authMiddleWare.protect , async (req, res) => {
    try {
        const users = await User.find().select("-password -email -__v -lastlogin -createdAt -role -_id");
        res.json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error('Failed to get list of users', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
module.exports = router;