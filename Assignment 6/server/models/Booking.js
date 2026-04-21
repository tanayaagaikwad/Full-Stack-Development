const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  labID: { type: String, required: true, trim: true },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeslot: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
