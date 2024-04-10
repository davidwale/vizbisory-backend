const express = require('express');
const router = express.Router();
const dummyProducts = require('../products');
const Farmer = require('../models/farmerModel');
const ProductModel = require('../models/productModel');

router.get('/api/product', async (req, res) => {
  const { location, category } = req.query;

  try {
    let dbProducts = [];

      let query = {};
      
    if (location) {
      query.location = { $regex: new RegExp(location, 'i') };
    }

    if (category) {
      query.category = category;
    }

    dbProducts = await ProductModel.find(query).populate({
      path: 'farmer',
        select: 'name email phoneNumber'
    });

    const filteredDummyProducts = dummyProducts.filter(product => {
      let match = true;
      
      if (location && !product.location.toLowerCase().includes(location.toLowerCase())) {
        match = false;
      }
      if (category && product.category !== category) {
        match = false;
      }
      return match;
    });

    const allProducts = [...filteredDummyProducts, ...dbProducts];

    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/api/add-product', async (req, res) => {
  const { username, productName, description, location, category } = req.body;

  if (!productName || !username || !description || !location || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }
    
  try {
    const farmer = await Farmer.findOne({ username });

    if (!farmer) {
      return res.status(404).json({ message: 'No user found with the provided username.' });
    }

    const product = await ProductModel.create({ name: productName, description, category, location, farmer: farmer._id });
    res.json({message: 'Product Created Successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Error Creating Product' });
  }
});

module.exports = router;
