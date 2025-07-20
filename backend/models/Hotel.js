const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    review: { type: Number, required: true },
    location: { type: String, required: true },
},
    { collection: "hotels" } // collection name

);
module.exports = mongoose.model('Hotel', hotelSchema); 