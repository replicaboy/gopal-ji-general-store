const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// 1. Naya Customer Add Karna (Jiska udhaar khata kholna ho)
router.post('/add', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(201).json({ message: "Customer add ho gaya!", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ error: "Customer add karne me error aayi", details: error.message });
  }
});

// 2. Saare Customers Dekhna (Khata Book dekhne ke liye)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Customers fetch karne me error aayi", details: error.message });
  }
});

// 3. Udhaar Jama Karna (Jab customer paise de jaye)
router.put('/receive-payment/:id', async (req, res) => {
  try {
    // Frontend se { amountReceived: 500 } bheja jayega
    const { amountReceived } = req.body; 
    
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer nahi mila" });

    // Udhaar kam kar do
    customer.udhaarBalance -= amountReceived;
    await customer.save();

    res.status(200).json({ message: "Payment receive ho gayi aur udhaar update ho gaya!", customer });
  } catch (error) {
    res.status(500).json({ error: "Payment update me error aayi", details: error.message });
  }
});

module.exports = router;