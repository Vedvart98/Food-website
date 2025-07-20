const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    hotelName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    review: { type: String, required: true }
},
    { collection: "dishes" });

module.exports = mongoose.model('Dish', DishSchema); 