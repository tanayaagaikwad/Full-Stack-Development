const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  subject: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true, trim: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
