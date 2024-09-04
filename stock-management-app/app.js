require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const companyRoutes = require('./routes/companies');
const orderRoutes = require('./routes/orders');
const statsRoutes = require('./routes/stats');
const logger = require('./config/winston');

// Initialize app and connect to DB
const app = express();
connectDB();

app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
