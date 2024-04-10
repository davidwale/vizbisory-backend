const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
    category: String,
  location: String,
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
