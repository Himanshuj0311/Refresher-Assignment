const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  company_symbol: { type: String, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
