const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const router = express.Router();

async function resolveStudent(studentID) {
  if (studentID) {
    return studentID;
  }

  const demoStudent = await User.findOneAndUpdate(
    { email: 'student@campusconnect.edu' },
    { name: 'Demo Student', email: 'student@campusconnect.edu', role: 'Student' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return demoStudent._id;
}

router.post('/', async (req, res) => {
  try {
    const normalizedDate = new Date(req.body.date);
    const studentID = await resolveStudent(req.body.studentID);
    const existingBooking = await Booking.findOne({
      labID: req.body.labID,
      date: normalizedDate,
      timeslot: req.body.timeslot,
    });

    if (existingBooking) {
      return res.status(409).json({ error: 'This lab slot is already reserved.' });
    }

    const booking = new Booking({ ...req.body, date: normalizedDate, studentID });
    await booking.save();
    const populatedBooking = await booking.populate('studentID', 'name email role');
    res.status(201).json({
      message: 'Lab slot reserved successfully.',
      booking: populatedBooking,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
