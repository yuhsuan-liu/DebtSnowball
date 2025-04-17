const express = require('express');
const router = express.Router();
const Debt = require('../models/Debt');

// GET /api/debts – get all debt records
router.get('/', async (req, res) => {
  try {
    const debts = await Debt.find();
    res.json(debts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/debts – create a new debt record
router.post('/', async (req, res) => {
  try {
    const newDebt = new Debt(req.body);
    const savedDebt = await newDebt.save();
    res.status(201).json(savedDebt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

