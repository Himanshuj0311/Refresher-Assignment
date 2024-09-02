const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: logStream }));
app.use(logger);
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(5000, () => console.log('Server running on port 5000'));
