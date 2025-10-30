import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestMovies = async () => {
      setLoading(true);
      try {
        // Fetch now playing movies (latest releases)
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=8c8d4201c369e3061713ad1276a51176&language=en-US&page=1`
        );

        if (response.data && response.data.results) {
          // Get first 5 latest movies
          setMovies(response.data.results.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [movies.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handleSlideClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-xl">Loading latest movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];
  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w1280${currentMovie.poster_path}`;

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 cursor-pointer"
        style={{ backgroundImage: `url(${backdropUrl})` }}
        onClick={() => handleSlideClick(currentMovie.id)}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
          {/* Badge */}
          <div className="mb-2 md:mb-4">
            <span className="px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white text-xs md:text-sm font-bold rounded-full flex items-center gap-1.5 w-fit">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              NOW PLAYING
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl cursor-pointer hover:text-blue-400 transition-colors line-clamp-2"
            onClick={() => handleSlideClick(currentMovie.id)}
          >
            {currentMovie.title}
          </h1>

          {/* Overview */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 md:mb-6 line-clamp-2 md:line-clamp-3 drop-shadow-lg">
            {currentMovie.overview}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6 flex-wrap">
            <div className="flex items-center gap-1 md:gap-2 bg-yellow-500/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full border border-yellow-500/30">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-bold text-sm md:text-base">{currentMovie.vote_average?.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2 bg-blue-500/20 backdrop-blur-sm px-2 md:px-4 py-1 md:py-2 rounded-full border border-blue-500/30">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white font-semibold text-sm md:text-base">
                {new Date(currentMovie.release_date).getFullYear()}
              </span>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => handleSlideClick(currentMovie.id)}
            className="px-4 py-2 md:px-8 md:py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-sm md:text-base rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            View Details
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-4 rounded-full transition-all hover:scale-110"
        aria-label="Previous"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 md:p-4 rounded-full transition-all hover:scale-110"
        aria-label="Next"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 md:w-8 bg-white'
                : 'w-1.5 md:w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieSlider;
