import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Series = ({ name, poster_path, first_air_date }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  return (
    <div className="series-item">
      <img src={imageUrl} alt={name} className="mb-2 rounded-lg" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-grey">{first_air_date}</p>
    </div>
  );
};

const SeriesDetailOverlay = ({ series, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-2">{series.name}</h2>
        <p className="text-grey">{series.first_air_date}</p>
        {/* Add more series details here */}
      </div>
    </div>
  );
};

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    const fetchSeries = () => {
      const apiKey = 'd9aa109c31f76cdca097ed5121699292';
      const apiUrl = 'https://api.themoviedb.org/3/';
      const pageQueryParam = `&page=${page}`;

      let endpoint = 'search/tv';
      let query = `query=${searchQuery}`;

      if (!searchQuery) {
        endpoint = 'tv/popular';
        query = '';
      }

      fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&${query}${pageQueryParam}`)
        .then((response) => response.json())
        .then((data) => {
          setSeries(data.results);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchSeries();
  }, [searchQuery, page]);

  const totalPages = 6;

  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSeriesClick = (selectedSeries) => {
    setSelectedSeries(selectedSeries);
  };

  const handleCloseOverlay = () => {
    setSelectedSeries(null);
  };

  return (
    <div className="container mx-auto p-4 series-grid flex items-center justify-center flex-col w-full mt-20">
      <h1 className='font-bold text-6xl mb-5'>TV Series</h1>
      <div className="w-full mb-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search TV series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[60%] p-2 border-white outline-none mr-2 text-black"
        />
        <i className="fas fa-search text-white cursor-pointer ml-4"></i>
      </div>
      <div className="series-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {series.map((serie) => (
          <div key={serie.id} className="cursor-pointer" onClick={() => handleSeriesClick(serie)}>
            <Series {...serie} />
          </div>
        ))}
      </div>
      {selectedSeries && (
        <SeriesDetailOverlay series={selectedSeries} onClose={handleCloseOverlay} />
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

export default SeriesPage;