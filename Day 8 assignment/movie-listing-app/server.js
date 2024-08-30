// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Movie } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Define routes
app.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const [updated] = await Movie.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedMovie = await Movie.findByPk(req.params.id);
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const deleted = await Movie.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Movie deleted' });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
