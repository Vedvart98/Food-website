const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Food Processing' // default status when order is created
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        // type:Number, 
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    items: {
        type: Array,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    promo: {
        type: String
    }
}, { timestamps: true, collection: "orders" }
); // collection name

module.exports = mongoose.model('Order', OrderSchema);
