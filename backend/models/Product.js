const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, default: '' }, // Optional: Agar scan karna ho
  costPrice: { type: Number, required: true }, // Kharid rate (Profit nikalne ke liye)
  sellingPrice: { type: Number, required: true }, // Bikri rate
  stockQuantity: { type: Number, required: true, default: 0 } // Dukaan me kitna bacha hai
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);