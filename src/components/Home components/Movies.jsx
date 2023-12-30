import React, { useEffect, useState } from 'react';

const MovieOverlay = ({ movie, onClose }) => {
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

const InTheatersPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = () => {
      const apiKey = 'd9aa109c31f76cdca097ed5121699292';
      const apiUrl = 'https://api.themoviedb.org/3';
      const endpoint = '/movie/now_playing';

      fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseOverlay = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto my-8 px-10 bg-black text-white">
      <h1 className="ml-2 text-3xl font-bold mb-4">In Theaters</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-black p-4 rounded text-white cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-md mb-2 transition-all hover:scale-90"
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-grey">{movie.release_date}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieOverlay movie={selectedMovie} onClose={handleCloseOverlay} />
      )}
    </div>
  );
};

export default InTheatersPage;