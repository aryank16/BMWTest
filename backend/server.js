// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

const electricCarsRoute = require('./routes/electricCars');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()

// Connect to MongoDB


  const db = mongoose.connect(process.env.mongoDBkey, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.error("Connection Error:", err));


// Use the route
app.use('/api/electric-cars', electricCarsRoute);

// Start server
const PORT = 4000;
console.log(process.env,'abcdef'),
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


   