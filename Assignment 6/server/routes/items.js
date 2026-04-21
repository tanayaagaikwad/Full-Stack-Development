const express = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const router = express.Router();

async function resolveSeller(sellerID) {
  if (sellerID) {
    return sellerID;
  }

  const demoSeller = await User.findOneAndUpdate(
    { email: 'seller@campusconnect.edu' },
    { name: 'Marketplace Seller', email: 'seller@campusconnect.edu', role: 'Student' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return demoSeller._id;
}

router.post('/', async (req, res) => {
  try {
    const sellerID = await resolveSeller(req.body.sellerID);
    const item = new Item({ ...req.body, sellerID });
    await item.save();
    const populatedItem = await item.populate('sellerID', 'name email role');
    res.status(201).json({
      message: 'Item listed successfully.',
      item: populatedItem,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ status: 'Available' })
      .sort({ createdAt: -1 })
      .populate('sellerID', 'name email role');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
