const express = require('express');
const router = express.Router();
const User = require('../models/User'); // mongoose model for users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error('Failed to get list of orders', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
module.exports = router;