import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = 'd9aa109c31f76cdca097ed5121699292';
      const apiUrl = 'https://api.themoviedb.org/3';
      const endpoint = '/movie/popular';

      try {
        const response = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    gsap.from('.movie-slide', {
      opacity: 0,
      duration: 1,
      ease: 'power3.inOut',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sliderRef.current,
        start: 'top center+=100',
        end: 'bottom center',
        scrub: 1,
      },
    });

    gsap.from('.image-container', {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sliderRef.current,
        start: 'top center+=200',
        end: 'bottom center',
        scrub: 1,
      },
    });

    gsap.from('.text-container', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sliderRef.current,
        start: 'top center+=200',
        end: 'bottom center',
        scrub: 1,
      },
    });

    gsap.from('.button-container', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sliderRef.current,
        start: 'top center+=300',
        end: 'bottom center',
        scrub: 1,
      },
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div ref={sliderRef} className="relative h-screen overflow-hidden z-10">
      <Slider {...settings} className="h-full bg-gradient-to-r from-black via-transparent to-transparent">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-slide w-full h-full relative">
            <div className="image-container w-full h-full object-cover">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover brightness-50 blur-sm"
              />
            </div>
            <div className="text-container absolute left-0 top-1/2 transform -translate-y-[52%] text-white text-left p-8 px-16 xl:px-32 gap-20 flex md:hidden sm:hidden">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                style={{ height: 400, width: 300 }}
                className="object-cover rounded-xl"
              />
            </div>
            <div className="text-container absolute left-0 top-1/2 transform -translate-y-[52%] text-white text-left p-8 px-16 xl:px-32 gap-20 flex hidden md:flex sm:flex">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                style={{ height: 400, width: 300 }}
                className="object-cover rounded-xl"
              />
              <div className="flex flex-col gap-0 w-7/12 items-start justify-center">
                <p className="text-md gap-2">
                  <i className="fa-solid fa-star text-yellow"></i> {movie.vote_average}
                </p>
                <h1 className="text-7xl font-bold mb-4">{movie.title}</h1>
                <p className="text-sm font-light leading-6">{movie.overview}</p>
                <div className="button-container">
                  <button className="mt-4 w-fit bg-red text-white px-6 py-3">
                    <i className="fa-solid fa-play mr-3"></i> Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;