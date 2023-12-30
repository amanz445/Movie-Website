import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = 'd9aa109c31f76cdca097ed5121699292';
  const TMDB_API_URL = 'https://api.themoviedb.org/3';

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(`${TMDB_API_URL}/movie/popular?api_key=${API_KEY}&page=1`);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      setError('Error fetching popular movies');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${TMDB_API_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        setError('Error fetching genres');
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    fetchPopularMovies(); // Fetch popular movies on component mount
  }, []);

  const fetchMoviesByGenre = async (page = 1) => {
    try {
      if (selectedGenre) {
        setLoading(true);
        const response = await fetch(
          `${TMDB_API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${page}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
      }
    } catch (error) {
      setError('Error fetching movies by genre');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, [selectedGenre]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchMoviesByGenre(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchMoviesByGenre(currentPage + 1);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseOverlay = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto mt-8 flex flex-col">
      <h1 className="text-3xl font-semibold mt-10 mb-4">Choose a Genre</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="flex flex-col md:flex-row mb-4">
        <div className="overflow-y-auto max-h-40 md:max-h-[80vh] md:w-1/4 mr-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`block w-full text-left p-2 rounded ${
                selectedGenre === genre.id
                  ? 'text-white'
                  : 'hover:text-grey'
              } ${selectedGenre === genre.id ? 'text-red' : ''}`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {!selectedGenre && !loading && (
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="mb-4 cursor-pointer" onClick={() => handleMovieClick(movie)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <p className="mt-2 text-lg font-semibold">{movie.title}</p>
                </div>
              ))}
            </div>

            {selectedMovie && (
              <div className="overlay">
                <div className="overlay-content">
                  <button onClick={handleCloseOverlay} className="close-button">
                    Close
                  </button>
                  <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
                  <p className="text-grey">{selectedMovie.release_date}</p>
                  {/* Add more movie details here */}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-between">
              <button
                className="bg-white hover:bg-grey text-black font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-xl font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-white hover:bg-grey text-black font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {selectedGenre && !loading && (
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Movies in {genres.find((genre) => genre.id === selectedGenre)?.name} Genre</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="mb-4 cursor-pointer" onClick={() => handleMovieClick(movie)}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <p className="mt-2 text-sm font-semibold">{movie.title}</p>
                </div>
              ))}
            </div>

            {selectedMovie && (
              <div className="overlay">
                <div className="overlay-content">
                  <button onClick={handleCloseOverlay} className="close-button">
                    Close
                  </button>
                  <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
                  <p className="text-grey">{selectedMovie.release_date}</p>
                  {/* Add more movie details here */}
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-between">
              <button
                className="bg-white hover:bg-grey text-black font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-xl font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-white hover:bg-grey text-black font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;