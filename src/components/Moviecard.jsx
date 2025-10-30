import React, { useState, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WatchlistContext } from '../context/WatchlistContext'

function Moviecard({ movie }) {
  const posterUrl = movie?.Poster || 'https://via.placeholder.com/160x240?text=No+Image';
  const title = movie?.title || 'Movie Title';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  // useContext to access watchlist functions
  const { watchlist, handleAddtoWatchlist, handleRemoveFromWatchlist } = useContext(WatchlistContext);

  // Check if movie is in watchlist - recalculate when watchlist changes
  const isInWatchlist = useMemo(() => {
    const movieId = movie.id || movie.imdbID;
    return watchlist?.some(m => (m.id || m.imdbID) === movieId) || false;
  }, [watchlist, movie.id, movie.imdbID]);

  const handleWatchlistClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log(`${title} - isInWatchlist:`, isInWatchlist);
    if (isInWatchlist) {
      handleRemoveFromWatchlist(movie);
    } else {
      handleAddtoWatchlist(movie);
    }
  };

  const handleCardClick = () => {
    // Navigate to movie details page
    const movieId = movie.id || movie.imdbID;
    navigate(`/movie/${movieId}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className='h-[30vh] sm:h-[35vh] w-[140px] sm:w-[160px] bg-gray-800 rounded-xl hover:scale-105 sm:hover:scale-110 hover:cursor-pointer transition-all duration-300 ease-in-out flex items-end relative overflow-hidden group'
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className='absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center'>
          <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={posterUrl}
        alt={title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Watchlist icon - toggles between add/remove */}
      <div 
        onClick={handleWatchlistClick} 
        className='absolute top-1 right-1 sm:top-2 sm:right-2 flex justify-center items-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg z-30 bg-gray-900/60 hover:bg-gray-900/80 cursor-pointer transition hover:scale-110'
      >
        {isInWatchlist ? (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      
      {/* View Details Hint */}
      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center z-10 pointer-events-none'>
        <span className='text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          View Details
        </span>
      </div>
      
      <div className='text-white text-base sm:text-xl text-center w-full bg-black/60 p-1.5 sm:p-2 rounded-b-xl relative z-20 line-clamp-2'>
        {title}
      </div>
    </div>
  )
}

export default Moviecard
