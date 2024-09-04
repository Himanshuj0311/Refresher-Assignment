const express = require('express');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const authMiddleware = require('./middleware/authMiddleware');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use('/api', rateLimiter); // Apply rate limiter to all routes

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', authMiddleware, postRoutes); // Auth middleware applied here
app.use('/api', swaggerRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
