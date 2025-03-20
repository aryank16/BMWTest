// models/ElectricCar.js
const mongoose = require('mongoose');



const ElectricCarSchema =new mongoose.Schema({
  Brand: { type: String, required: true, trim: true },
  Model: { type: String, required: true, trim: true },
  AccelSec: { type: Number, required: true },
  TopSpeed_KmH: { type: Number, required: true },
  Range_Km: { type: Number, required: true },
  Efficiency_WhKm: { type: Number, required: true },
  FastCharge_KmH: { 
    type: Number,
    required: false,
    // Convert value to a number; if it's not numeric (e.g. "-"), store null
    set: v => {
      const n = Number(v);
      return isNaN(n) ? null : n;
    }
  },
  RapidCharge: { 
    type: String, 
    required: true, 
    enum: ["Yes", "No"]
  },
  PowerTrain: { 
    type: String, 
    required: true, 
    enum: ["AWD", "RWD", "FWD"]
  },
  PlugType: { 
    type: String, 
    required: true, 
    enum: ["Type 2 CCS", "Type 2 CHAdeMO", "Type 2", "Type 1 CHAdeMO"]
  },
  BodyStyle: { 
    type: String, 
    required: true, 
    enum: ["Sedan", "Hatchback", "Liftback", "SUV", "MPV", "Pickup", "Cabrio", "Station","SPV"]
  },
  Segment: { 
    type: String, 
    required: true, 
    enum: ["A", "B", "C", "D", "E", "F", "N", "S"]
  },
  Seats: { type: Number, required: true },
  PriceEuro: { type: Number, required: true },
  Date: { 
    type: Date, 
    required: true,
    // Convert date string to Date object; adjust the conversion as needed
    set: v => new Date(v)
  }
});

module.exports = mongoose.model('ElectricCar', ElectricCarSchema);