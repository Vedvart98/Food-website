const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');   // mongoose model
const multer = require('multer');
const path = require('path');
const Order = require('../models/Order'); // mongoose model for orders
// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// GET all dishes
// get /api/dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();   // fetch all dishes
        res.json(dishes);
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST a new dish with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, hotelName, review } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        // const newDish = new Dish(req.body);
        const newDish = new Dish({
            name, price, hotelName, imageUrl: imagePath, review
        });
        await newDish.save();
        // return the newly created dish
        if (!newDish) {
            return res.status(400).json({ success: false, error: 'Failed to create dish' });
        }
        res.status(201).json({
            success: true,
            message: 'Dish created successfully',
            dish: newDish
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await Dish.findByIdAndDelete(id);
        if (!dish) {
            return res.status(404).json({
                success: false,
                message: 'Dish not found'
            })
        } else {
            await Order.deleteMany({ 'items.id': id });
            res.json({
                success: true,
                message: 'Dish deleted successfully',
                dish
            })

        }

    } catch (err) {
        console.error('Failed to delete dish:', err.message);
    }
});
router.put('/:id', upload.single('image'), async (req, res) => {
    // const {id} = req.params; 
    try {

        const { name, price, hotelName, review } = req.body;
        const updateFields = { name, price, hotelName, review };
        if (req.file) {
            updateFields.imageUrl = `/uploads/${req.file.filename}`;
        }
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!updatedDish) {
            return res.status(404).json({
                message: 'Dish not found'
            });
        }
        res.json({
            success: true,
            message: 'Dish updated successfully',
            dish: updatedDish
        });
    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
});
module.exports = router;