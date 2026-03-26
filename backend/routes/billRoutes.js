const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// 1. Naya Bill Banaina (Sales Entry)
router.post('/create', async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMode } = req.body;

    // Unique Invoice Number generate karna (e.g., GJGS-853219)
    const invoiceNumber = "GJGS-" + Math.floor(100000 + Math.random() * 900000);

    // Bill Database me save karna
    const newBill = new Bill({
      invoiceNumber,
      customer: customer || null, // Agar walk-in customer hai toh null aayega
      items,
      totalAmount,
      paymentMode
    });

    await newBill.save();

    // LOGIC 1: Inventory se stock minus karna
    // Loop lagakar har item ka stock kam karenge
    for (let item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stockQuantity: -item.quantity } // $inc Mongoose ka feature hai jo direct math karta hai
      });
    }

    // LOGIC 2: Agar Udhaar par liya hai, toh Khate me paise add karna
    if (paymentMode === 'Udhaar' && customer) {
      await Customer.findByIdAndUpdate(customer, {
        $inc: { udhaarBalance: totalAmount } // Bill ka total amount udhaar me jud jayega
      });
    }

    res.status(201).json({ message: "Bill successfully generate ho gaya!", bill: newBill });

  } catch (error) {
    res.status(500).json({ error: "Bill banane me error aayi", details: error.message });
  }
});

// 2. Saare Bills ki History Dekhna (Reports ke liye)
router.get('/', async (req, res) => {
  try {
    // .populate() lagane se customer ID ke badle uska naam aur phone number bhi dikhega
    const bills = await Bill.find()
      .populate('customer', 'name phone')
      .sort({ date: -1 }); // Latest bill sabse upar aayega
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: "Bills fetch karne me error aayi", details: error.message });
  }
});

module.exports = router;