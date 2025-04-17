// 1. Load environment variables
require('dotenv').config();

// 2. Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. Create Express app
const app = express();
app.use(cors());
app.use(express.json());

//3.5 Import & use APi routes
const debtRoutes = require('./routes/debts');
app.use('/api/debts', debtRoutes);


// 4. Read env variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 5. Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 6. Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running 🟢');
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
