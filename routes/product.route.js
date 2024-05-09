// product.route.js
const express = require('express');
const router = express.Router();
const Product = require('../model/product.model');


// Get all  products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});


// Create a product
router.post('/', async (req, res) => {
  const product = new Product({
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update the product
router.put('/:id', getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.type != null) {
    res.product.type = req.body.type;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }

  try {
   const updatedProduct = await res.product.save();
   res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

async function getProduct(req, res, next) {
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  
  res.product = product;
  next();
}

module.exports = router;
