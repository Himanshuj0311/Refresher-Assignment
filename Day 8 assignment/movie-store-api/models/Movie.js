// models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  releaseDate: { type: Date },
  genre: { type: String }
});

module.exports = mongoose.model('Movie', MovieSchema);
