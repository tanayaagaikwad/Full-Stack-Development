const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['Student', 'Admin'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
