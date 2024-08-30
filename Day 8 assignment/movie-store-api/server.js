// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/moviestore';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
