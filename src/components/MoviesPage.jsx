import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Movie = ({ title, poster_path, release_date }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div className="movie-item">
      <img src={imageUrl} alt={title} className="mb-2 rounded-lg" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-grey">{release_date}</p>
    </div>
  );
};

const MovieDetailOverlay = ({ movie, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
        <p className="text-grey">{movie.release_date}</p>
        {/* Add more movie details here */}
      </div>
    </div>
  );
};

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1); // Track the current page
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = () => {
      const apiKey = 'd9aa109c31f76cdca097ed5121699292';
      const apiUrl = 'https://api.themoviedb.org/3/';
      const pageQueryParam = `&page=${page}`;

      let endpoint = 'search/movie';
      let query = `query=${searchQuery}`;

      if (!searchQuery) {
        // If search query is empty, fetch popular movies (you can change this to fit your needs)
        endpoint = 'movie/popular';
        query = '';
      }

      fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&${query}${pageQueryParam}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchMovies();
  }, [searchQuery, page]);

  const totalPages = 6; // Set the total number of pages

  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseOverlay = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto p-4 movie-grid flex items-center justify-center flex-col w-full mt-20">
      <h1 className='font-bold text-6xl mb-5'>Movies</h1>
      <div className="w-full mb-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[60%] p-2 border-white outline-none mr-2 text-black"
        />
        <i className="fas fa-search text-white cursor-pointer ml-4"></i>
      </div>
      <div className="movie-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {movies.map((movie) => (
          <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieClick(movie)}>
            <Movie {...movie} />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieDetailOverlay movie={selectedMovie} onClose={handleCloseOverlay} />
      )}
      <div className="w-full mt-4 flex justify-between">
        <button onClick={handlePrevClick} disabled={page === 1}>
          <i className="fas fa-chevron-left cursor-pointer"></i> Prev
        </button>
        <button onClick={handleNextClick} disabled={page === totalPages}>
          Next <i className="fas fa-chevron-right cursor-pointer"></i>
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;