import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Moviecard from "./Moviecard";
import Pagination from "./Pagination";
import { WatchlistContext } from "../context/WatchlistContext";
import { useSearchParams } from "react-router-dom";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  // useContext to access watchlist context
  const { watchlist, handleAddtoWatchlist, handleRemoveFromWatchlist } = useContext(WatchlistContext);
  
  // useRef to store the previous page number
  const prevPageRef = useRef(1);
  
  // useRef to reference the top of movies section for auto-scroll
  const moviesTopRef = useRef(null);

  const handlePrevious = () => {
    if (pageNo > 1) setPageNo(pageNo - 1);
  };
  const handleNext = () => setPageNo(pageNo + 1);
  
  // Auto-scroll to top when page changes
  useEffect(() => {
    if (prevPageRef.current !== pageNo && moviesTopRef.current) {
      moviesTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    prevPageRef.current = pageNo;
  }, [pageNo]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let response;
        
        if (searchQuery) {
          // Search for movies if query exists
          response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=8c8d4201c369e3061713ad1276a51176&language=en-US&query=${searchQuery}&page=${pageNo}`
          );
        } else {
          // Fetch popular movies if no search query
          response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=8c8d4201c369e3061713ad1276a51176&language=en-US&page=${pageNo}`
          );
        }

        if (response.data && response.data.results) {
          setMovies(response.data.results);
        } else {
          setMovies([]);
        }

        console.log("Fetched Movies:", response.data.results?.length || 0);
      } catch (err) {
        console.error("API Error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNo, searchQuery]);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Ref for auto-scroll */}
      <div ref={moviesTopRef}></div>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-900 dark:text-white px-2 flex items-center justify-center gap-2">
        {searchQuery ? (
          <>
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search Results for "{searchQuery}"</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span>Trending Movies</span>
          </>
        )}
      </h1>

      {loading && (
        <div className="text-center text-blue-400 dark:text-blue-300 mb-4 text-base md:text-lg animate-pulse">
          Loading new movies...
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
        {movies.length > 0
          ? movies.map((movie) => (
              <Moviecard
                key={movie.id}
                movie={{
                  ...movie,
                  Poster: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/160x240?text=No+Image",
                }}
              />
            ))
          : [...Array(20)].map((_, i) => (
              <div
                key={i}
                className="h-[30vh] sm:h-[35vh] w-[140px] sm:w-[160px] bg-gray-700 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>

      {!loading && movies.length === 0 && (
        <div className="text-center text-red-400 dark:text-red-300 mt-10 text-lg md:text-xl">
          No movies found 😢
        </div>
      )}

      <Pagination
        handleprevious={handlePrevious}
        handleNext={handleNext}
        pageNo={pageNo}
      />
    </div>
  );
}

export default Movies;
