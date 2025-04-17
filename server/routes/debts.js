const express = require('express');
const router = express.Router();
const Debt = require('./../models/Debt');

console.log('🛠 debts.js routes loaded');

// Debug route
router.get('/debug', (req, res) => {
  console.log('🔍 Debug route hit');
  res.json({
    message: 'Debug route working',
    baseUrl: req.baseUrl,
    path: req.path,
    originalUrl: req.originalUrl
  });
});

// Route logging middleware
router.use((req, res, next) => {
  console.log('⚡️ Debts route hit:', {
    method: req.method,
    baseUrl: req.baseUrl,
    path: req.path,
    originalUrl: req.originalUrl
  });
  next();
});

// GET /api/debts
router.get('/', async (req, res) => {
  console.log('🔥 GET /api/debts handler called');
  try {
    console.log('📊 Fetching debts from database...');
    const debts = await Debt.find();
    console.log(`✅ Found ${debts.length} debts`);
    return res.json(debts);
  } catch (err) {
    console.error('❌ Database error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/debts
router.post('/', async (req, res) => {
  console.log('📝 POST /api/debts handler called');
  try {
    const newDebt = new Debt(req.body);
    const savedDebt = await newDebt.save();
    console.log('✅ New debt saved:', savedDebt._id);
    return res.status(201).json(savedDebt);
  } catch (err) {
    console.error('❌ Error saving debt:', err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
