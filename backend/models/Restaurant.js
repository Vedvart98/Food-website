const mongoose = require('mongoose');
const restoSchema = new mongoose.Schema({
    restoName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    review: { type: Number, required: true },
    location: { type: String, required: true },
},
    { collection: "restaurants" } // collection name
);
module.exports = mongoose.model('Restaurant', restoSchema); 