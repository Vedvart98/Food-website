const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');  //mongoose model
const multer = require('multer');
const path = require('path')
const Order = require('../models/Order'); // mongoose model for orders
const { error } = require('console');
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ 
    storage,
    limits: {
        fileSize: 8 * 1024 * 1024 // 8MB limit
    }
});
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); //limit to avoid huge payload
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get('/search', async(req,res)=>{
  const {location = "",restoName = ""} = req.query;
  const query ={};
  if(restoName.trim()){
    query.restoName = {$regex:restoName.trim(),$options:'i'};
  }
  if(location.trim()){
    query.location = {$regex:location.trim(),$options:'i'};
  }

  const restaurants = await Restaurant.find(query);
  res.json(restaurants);
});
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { restoName, description, review, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    const newRestaurant = new Restaurant({
      restoName, description, review, location, imageUrl: imagePath
    });
    await newRestaurant.save();
    if (!newRestaurant) {
      return res.status(400).json({ success: false, error: 'Failed to add Restaurant' });
    }
    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      restaurant: newRestaurant
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete('/:id',authMiddleWare.protect , async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      })
    }
    
    await Order.deleteMany({ 'items.id': id });
    return res.json({
      success: true,
      message: 'Restaurant deleted successfully', 
      restaurant
    });

  } catch (err) {
    console.error('Failed to delete restaurant', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    }); 
  }
});
router.put('/:id',authMiddleWare.protect, upload.single('image'),async (req,res)=>{
  try{
    const {restoName,description,review,location} = req.body;
    const updateFields = {restoName,description,review,location};
    if(req.file){
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id,updateFields,{new:true});
    if(!updatedRestaurant){
      return res.status(404).json({
        message:'Restaurant not found'
      });
    }
    res.json({
      success:true,
      message:'Restaurant updated successfully',
      restaurant:updatedRestaurant
    });
  }catch(err){
    res.status(500).json({message:'server error',error:err.message});
  }
});
router.get('/:id' ,async (req,res)=>{
  try{
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant){
      return res.status(404).json({success:false,message:'Restaturant not found'});
    }
    res.json(restaurant);
  }catch(err){
    res.status(500).json({success:false, message:'Server error',error:err.message});
  }
})
module.exports = router;