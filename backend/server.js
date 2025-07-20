const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
const hotelRoutes = require('./routes/hotels'); // Import hotel routes
const DishRoute = require('./routes/dishes');
const authRoutes = require('./routes/auth');  //
const orderRoutes = require('./routes/orders'); // Import order routes
const userRoutes = require('./routes/users');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
connectDB();

// create uploads folder to store images
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
// auto creates uploads folder if not existing
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}



// middleware
app.use(cors({
    //
    origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174'], // allow requests from these origins
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());      //
// Routes
app.use('/api/hotels', hotelRoutes); // Use hotel routes
app.use('/api/auth', authRoutes);     //new one
app.use('/api/dishes', DishRoute);
app.get('api/auth', authRoutes); // old one
app.use('/api/orders', orderRoutes); // Use order routes
app.use('/api/users', userRoutes);
//health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running',
        timeStamp: new Date().toISOString()
    })
});
app.get('/', (req, res) => {
    res.send('Heelo');
});
app.use('/uploads', express.static(uploadsDir));
// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });

});
// server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI,/*{useNewUrlParser:true, useUnifiedTopology:true}*/)
    .then(() => console.log("MONGO DB connected"))
    .catch(err => console.log(err));
app.use("/api/hotels", require("./routes/hotels"));
app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`));   