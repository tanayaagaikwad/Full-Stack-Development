const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['Book', 'Bike', 'Electronics'], required: true },
  sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Available', 'Sold'], default: 'Available' },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
