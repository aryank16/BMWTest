// models/ElectricCar.js
const mongoose = require('mongoose');

const ElectricCarSchema = new mongoose.Schema({
  make: String,
  model: String,
  batteryCapacity: Number,
  range: Number,
  price: Number,
  // ...add or adjust fields to match your CSV columns
});

module.exports = mongoose.model('ElectricCar', ElectricCarSchema);