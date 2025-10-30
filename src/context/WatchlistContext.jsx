import { createContext, useState, useEffect } from 'react';

// Create the context
export const WatchlistContext = createContext();

// Create the provider component
export const WatchlistProvider = ({ children }) => {
  // Initialize watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddtoWatchlist = async (movie) => {
    // Use id for TMDB movies, imdbID for OMDB movies
    const movieId = movie.id || movie.imdbID;
    
    // Check if movie already exists in watchlist
    const isAlreadyAdded = watchlist.some(m => (m.id || m.imdbID) === movieId);
    
    if (isAlreadyAdded) {
      console.log('Movie already in watchlist!');
      return;
    }
    
    // For TMDB movies, try to get IMDB data
    if (movie.id && !movie.imdbID) {
      try {
        // First, get external IDs from TMDB to find IMDB ID
        const externalIdsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=8c8d4201c369e3061713ad1276a51176`
        );
        const externalIds = await externalIdsResponse.json();
        
        if (externalIds.imdb_id) {
          // Now fetch detailed data from OMDB using IMDB ID
          const omdbResponse = await fetch(
            `https://www.omdbapi.com/?i=${externalIds.imdb_id}&apikey=c11dee2`
          );
          const omdbData = await omdbResponse.json();
          
          if (omdbData.Response === 'True') {
            // Merge TMDB and OMDB data
            const enrichedMovie = {
              ...movie,
              imdbID: externalIds.imdb_id,
              Title: omdbData.Title,
              Genre: omdbData.Genre,
              imdbRating: omdbData.imdbRating,
              imdbVotes: omdbData.imdbVotes,
              Poster: movie.Poster || omdbData.Poster,
            };
            setWatchlist([...watchlist, enrichedMovie]);
            console.log('Added to watchlist with OMDB details:', enrichedMovie);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching IMDB data:', error);
      }
      
      // Fallback: Add TMDB movie with basic data
      const basicMovie = {
        ...movie,
        id: movie.id,
        Title: movie.title || movie.Title,
        Genre: 'N/A',
        imdbRating: 'N/A',
        imdbVotes: 'N/A',
      };
      setWatchlist([...watchlist, basicMovie]);
      console.log('Added to watchlist (TMDB basic data):', basicMovie);
    } else {
      // OMDB movie - fetch full details
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=c11dee2`);
        const detailedMovie = await response.json();
        
        if (detailedMovie.Response === 'True') {
          setWatchlist([...watchlist, detailedMovie]);
          console.log('Added to watchlist with details:', detailedMovie);
        } else {
          setWatchlist([...watchlist, movie]);
          console.log('Added to watchlist (basic data):', movie);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setWatchlist([...watchlist, movie]);
      }
    }
  };

  const handleRemoveFromWatchlist = (movie) => {
    // Use id for TMDB movies, imdbID for OMDB movies
    const movieId = movie.id || movie.imdbID;
    const filteredWatchlist = watchlist.filter((m) => (m.id || m.imdbID) !== movieId);
    setWatchlist(filteredWatchlist);
    console.log('Removed from watchlist:', movie.Title || movie.title);
  };

  return (
    <WatchlistContext.Provider 
      value={{ 
        watchlist, 
        setWatchlist,
        handleAddtoWatchlist, 
        handleRemoveFromWatchlist 
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
