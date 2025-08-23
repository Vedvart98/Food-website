const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authController = require('../controllers/authController');
const authMiddleWare = require('../middleware/auth');
router.get('/list' ,async (req, res) => {
    try {
        const orders = await Order.find().populate('user');
        res.json({
            success: true,
            data: orders
        });
    } catch (err) {
        console.error('Does not get list of orders', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
}); 
router.put('/status',authMiddleWare.protect, async (req, res) => {
    try {
        console.log('Recieved payload',req.body);
        const { _id, status } = req.body; 
        const order = await Order.findById(_id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        order.status = status;  // update the status
        await order.save();    // save the updated order

        res.json({ success: true, message: 'Order status updated successfully', order });
    } catch (err) {
        console.error('Error updating order status',err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({
            success: true,
            order
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            // message: err.message 
            message: err.message || 'Failed to create order. Please check your input and try again.',
        });
    }
});
router.get('/my', authMiddleWare.protect, authController.getMyOrders);
router.delete('/:id',authMiddleWare.protect, async (req, res) => {
    try{
        const {id} = req.params;
        const order = await Order.findByIdAndDelete(id); 
        if(!order){
        return res.status(404).json({success:false,message:'Order not found'});
        }
        res.json({success:true,message:'Order deleted successfully',order});
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message || 'Failed to delete order.Please try again later.'
        })
    }
}); 
module.exports = router;