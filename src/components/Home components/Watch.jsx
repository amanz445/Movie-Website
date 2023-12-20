import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const API_KEY = 'd9aa109c31f76cdca097ed5121699292';
const MOVIE_ID = '1075794';

const Watch = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true });
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=videos`
        );
        const data = await response.json();
        setMovie(data);

        // Check if there is a trailer available
        const videos = data.videos.results;
        const trailer = videos.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchMovie();
  }, []);

  useEffect(() => {
    // Autoplay the video when it's in view
    if (inView && videoRef.current) {
      videoRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  }, [inView]);

  return (
    <div className="h-screen w-full">
      <div className="container mx-auto p-4">
        {movie && (
          <div className="h-full w-full mx-auto my-4 bg-white rounded-md shadow-md">
            {trailerKey && (
              <div className="mt-4 h-screen" ref={ref}>
                <iframe
                  title="trailer"
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerKey}?enablejsapi=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
