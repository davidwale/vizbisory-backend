
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const registerRoute = require('./src/routes/registrationRoute');
const productRoute = require('./src/routes/productroute');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const MONGODB_URI = process.env.DB_URL;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(registerRoute);
app.use(productRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
