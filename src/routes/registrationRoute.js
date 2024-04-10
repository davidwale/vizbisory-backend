const express = require('express');
const router = express.Router();
const Farmer = require('../models/farmerModel');

router.post('/api/register', async (req, res) => {
  const { name, username, farmName, email, phoneNumber } = req.body;

if (!name || !username || !farmName || !email || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUsername = await Farmer.findOne({ $or: [{ username }] });

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }


    const existingEmail = await Farmer.findOne({ $or: [{ email }] });
    
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newFarmer = await Farmer.create({ name, username, farmName, email, phoneNumber });
    res.json({ newFarmer, message: "Farmer Registered" });
  } catch (err) {
    res.status(500).json({ message: 'Error Signing up' });
  }
});

module.exports = router;
