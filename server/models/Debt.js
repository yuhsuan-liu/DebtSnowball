const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },         // Credit card or loan name
  balance: { type: Number, required: true },      // Current amount owed
  interestRate: { type: Number, required: true }, // APR
  minPayment: { type: Number, required: true },   // Minimum monthly payment
  dueDate: { type: String, required: true },      // For UI display (like "15th of each month")
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);

