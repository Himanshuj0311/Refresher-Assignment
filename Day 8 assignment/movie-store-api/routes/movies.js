// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Create a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all movies with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const { q, rating, sortBy, page = 1, limit = 10 } = req.query;
    let filter = {};
    
    if (q) {
      filter.title = { $regex: q, $options: 'i' }; // Case-insensitive search
    }
    if (rating) {
      filter.rating = rating;
    }

    const sort = sortBy ? { [sortBy]: 1 } : {};
    const skip = (page - 1) * limit;
    
    const movies = await Movie.find(filter).sort(sort).skip(skip).limit(parseInt(limit));
    const totalMovies = await Movie.countDocuments(filter);
    
    res.json({
      totalMovies,
      page,
      totalPages: Math.ceil(totalMovies / limit),
      movies
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
