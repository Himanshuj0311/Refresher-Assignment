// script.js
async function fetchMovies() {
    try {
      const response = await fetch('http://localhost:3000/movies');
      const movies = await response.json();
      displayMovies(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  
  function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
  
    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.className = 'movie';
      movieDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toDateString()}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Description:</strong> ${movie.description || 'No description available.'}</p>
      `;
      movieList.appendChild(movieDiv);
    });
  }
  
  // Initial fetch
  fetchMovies();
  