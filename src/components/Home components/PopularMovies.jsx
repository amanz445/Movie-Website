import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = () => {
      const apiKey = 'd9aa109c31f76cdca097ed5121699292';
      const apiUrl = 'https://api.themoviedb.org/3';
      const endpoint = '/movie/popular';

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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='mt-16 px-10 bg-black text-white'>
      <h1 className="ml-6 text-3xl font-bold mb-6">Popular Movies</h1>
      <div className="container mx-auto lg:px-24 xl:px-32 outline-none">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-2 cursor-pointer">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-68 object-cover rounded-lg transition-all hover:scale-90"
              />
              <div className='flex flex-col gap-2 text-left w-full'>
                <p className="mt-2 text-sm font-semibold">{movie.title}</p>
                <div className='flex items-center justify-between w-full'>
                  <p className="text-sm gap-2"><i className="fa-solid fa-star text-yellow"></i> {Math.floor(movie.vote_average)}</p>
                  <p className='font-light text-sm text-grey'>{movie.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularMovies;