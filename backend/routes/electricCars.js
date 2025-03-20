// routes/electricCars.js
const express = require('express');
const router = express.Router();
const ElectricCar = require('../models/ElectricCar');

// GET all (with optional search/filter)
router.get('/', async (req, res) => {
  try {
    const { search, filterColumn, filterMode, filterValue } = req.query;
    let query = {};

    // 1) Search: assume we match 'make' or 'model' fields
    if (search) {
      query.$or = [
        { make: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }

    // 2) Column-based filter
    if (filterColumn && filterMode && filterValue !== undefined) {
      switch (filterMode) {
        case 'equals':
          query[filterColumn] = filterValue;
          break;
        case 'contains':
          query[filterColumn] = { $regex: filterValue, $options: 'i' };
          break;
        case 'startsWith':
          query[filterColumn] = { $regex: '^' + filterValue, $options: 'i' };
          break;
        case 'endsWith':
          query[filterColumn] = { $regex: filterValue + '$', $options: 'i' };
          break;
        case 'isEmpty':
          query[filterColumn] = { $in: [null, ''] };
          break;
        default:
          // fallback if needed
          break;
      }
    }

    const cars = await ElectricCar.find(query);
    res.json(cars);
  } catch (err) {
    console.error('Error in GET /:', err);
    res.status(500).json({ error: 'Failed to retrieve cars' });
  }
});

// GET single record (details)
router.get('/:id', async (req, res) => {
  try {
    const car = await ElectricCar.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    console.error('Error in GET /:id:', err);
    res.status(500).json({ error: 'Failed to retrieve car' });
  }
});

// DELETE record
router.delete('/:id', async (req, res) => {
  try {
    await ElectricCar.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /:id:', err);
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

module.exports = router;