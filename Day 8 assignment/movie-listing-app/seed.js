// seed.js
const { sequelize, Movie } = require('./models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // Reset database
    
    // Seed data
    const movies = [
      {
        title: 'Inception',
        genre: 'Science Fiction',
        releaseDate: '2010-07-16',
        rating: 8.8,
        description: 'A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.'
      },
      {
        title: 'The Matrix',
        genre: 'Action',
        releaseDate: '1999-03-31',
        rating: 8.7,
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
      },
      {
        title: 'Interstellar',
        genre: 'Science Fiction',
        releaseDate: '2014-11-07',
        rating: 8.6,
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
      },
      {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        releaseDate: '1994-09-23',
        rating: 9.3,
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
      }
    ];

    await Movie.bulkCreate(movies);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
