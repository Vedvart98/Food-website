const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');  //mongoose model
const multer = require('multer');
const path = require('path')
const Order = require('../models/Order'); // mongoose model for orders
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find(); //limit to avoid huge payload
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { hotelName, description, review, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const newHotel = new Hotel({
      hotelName, description, review, location, imageUrl: imagePath
    });
    await newHotel.save();
    if (!newHotel) {
      return res.status(400).json({ success: false, error: 'Failed to create hotel' });
    }
    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      hotel: newHotel
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    } else {
      await Order.deleteMany({ 'items.id': id });
      res.json({
        success: true,
        message: 'Hotel deleted successfully',
        hotel
      })
    }

  } catch (err) {
    console.error('Failed to delete hotel', err);

  }
})
module.exports = router;