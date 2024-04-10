const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  username: String,
  name: String,
  farmName: String,
  email: String,
  phoneNumber: String
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
