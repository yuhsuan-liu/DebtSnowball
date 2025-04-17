require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🔍 Incoming request:`, {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl
  });
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('API is running 🟢');
});

// Load and register routes
console.log('🛠 Loading routes...');
const debtRoutes = require('./routes/debts');
app.use('/api/debts', debtRoutes);
console.log('✅ Routes registered');

// Catch-all 404 handler
app.use((req, res) => {
  console.log('❌ No route found for:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('📡 Attempting to connect to MongoDB...');
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
