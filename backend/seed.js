// seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const Papa = require('papaparse');
const ElectricCar = require('./models/ElectricCar');

mongoose
  .connect('mongodb://localhost:27017/bmw_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('Connected to MongoDB, seeding data...');

    // Read CSV file
    const file = fs.readFileSync('./BMW_Aptitude_Test_Test_Data_ElectricCarData.csv', 'utf8');
    // Parsing the data  with Papa
    const parsed = Papa.parse(file, { header: true });

   
    await ElectricCar.deleteMany({});
    await ElectricCar.insertMany(parsed.data);

    console.log('Data seeded successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    process.exit(1);
  });