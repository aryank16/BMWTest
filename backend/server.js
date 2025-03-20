// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const electricCarsRoute = require('./routes/electricCars');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB


  const db = mongoose.connect('mongodb+srv://admin:fAYRkIkWfXqapOXa@bmwtest.y41em.mongodb.net/?retryWrites=true&w=majority&appName=BMWTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Error:", err));


// Use the route
app.use('/api/electric-cars', electricCarsRoute);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


   