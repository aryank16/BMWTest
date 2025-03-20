// routes/electricCars.js
const express = require('express');
const router = express.Router();
const ElectricCar = require('../models/ElectricCar');

// GET all (with optional search/filter)
router.get('/', async (req, res) => {
  try {
    console.log('testing')
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

// POST a new car
// router.post('/', async (req, res) => {
//   try {
   
//     const newCar = new ElectricCar(req.body);
//     const savedCar = await newCar.save();
//     res.status(201).json(savedCar);
//   } catch (error) {
//     console.error('Error creating car:', error);
//     res.status(500).json({ error: 'Failed to create car' });
//   }
// });

// POST one or multiple cars
router.post('/', async (req, res) => {
  try {
    let savedCars;
    if (Array.isArray(req.body)) {
      // If the body is an array, insert many documents at once
      savedCars = await ElectricCar.insertMany(req.body);
    } else {
      // Otherwise, create a single document
      const newCar = new ElectricCar(req.body);
      savedCars = await newCar.save();
    }
    res.status(201).json(savedCars);
  } catch (error) {
    console.error('Error creating car(s):', error);
    res.status(500).json({ error: 'Failed to create car(s)' });
  }
});

// PUT to update an existing car by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCar = await ElectricCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
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