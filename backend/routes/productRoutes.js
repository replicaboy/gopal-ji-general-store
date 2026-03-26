const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Naya Product Add Karna ya Purane me Stock Jodna (Smart Logic)
router.post('/add', async (req, res) => {
  try {
    const { name, costPrice, sellingPrice, stockQuantity, barcode } = req.body;

    // Check karo ki kya is naam ka item pehle se hai (Case-insensitive check)
    // RegExp se 'Atta' aur 'atta' dono match ho jayenge
    const existingProduct = await Product.findOne({ 
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } 
    });

    if (existingProduct) {
      // Agar item pehle se hai, toh usme naya stock plus kar do
      existingProduct.stockQuantity += Number(stockQuantity);
      // Naya rate bhi update kar do (kyunki market me rate badal sakta hai)
      existingProduct.costPrice = Number(costPrice);
      existingProduct.sellingPrice = Number(sellingPrice);
      if (barcode) existingProduct.barcode = barcode; // Agar naya barcode aaya hai to update kar do
      
      await existingProduct.save();
      return res.status(200).json({ message: "Purane item me naya stock add ho gaya!", product: existingProduct });
    } else {
      // Agar item bilkul naya hai, toh nayi entry banao
      const newProduct = new Product(req.body);
      await newProduct.save();
      return res.status(201).json({ message: "Naya product add ho gaya!", product: newProduct });
    }
  } catch (error) {
    res.status(500).json({ error: "Product add karne me error aayi", details: error.message });
  }
});

// 2. Saare Products Dekhna (Inventory List ke liye)
router.get('/', async (req, res) => {
  try {
    // sort({ updatedAt: -1 }) lagane se jo item abhi update hua hai wo sabse upar dikhega
    const products = await Product.find().sort({ updatedAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Products fetch karne me error aayi", details: error.message });
  }
});

// 3. Product Update Karna (Manual edit ke liye, jaise galti se galat price dal gaya ho)
router.put('/update/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    res.status(200).json({ message: "Product manually update ho gaya!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Update me error aayi", details: error.message });
  }
});

module.exports = router;