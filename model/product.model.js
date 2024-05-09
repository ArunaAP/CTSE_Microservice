//product.model.js file
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  // You can add more fields as needed
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
