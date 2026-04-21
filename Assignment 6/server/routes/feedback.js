const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({
      message: 'Feedback submitted successfully.',
      feedback,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { subject } = req.query;
    const query = subject ? { subject } : {};
    const feedbacks = await Feedback.find(query).sort({ timestamp: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
