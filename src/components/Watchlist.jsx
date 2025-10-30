import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { WatchlistContext } from '../context/WatchlistContext'

function Watchlist() {
  const [search, setSearch] = useState('')
  const [genreList, setGenreList] = useState(['All Genres'])
  const [currGenre, setCurrGenre] = useState('All Genres')
  const navigate = useNavigate()
  
  // useContext to access watchlist
  const { watchlist, setWatchlist, handleRemoveFromWatchlist } = useContext(WatchlistContext)
  
  // useRef for search input - allows programmatic focus
  const searchInputRef = useRef(null)
  
  // useRef to track if component just mounted
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Extract unique genres from watchlist
    let temp = watchlist.map((movie) => movie.Genre?.split(',')[0])
    temp = new Set(temp)
    setGenreList(['All Genres', ...temp])
    
    // Auto-focus search input when component mounts
    if (isFirstRender.current && searchInputRef.current) {
      searchInputRef.current.focus()
      isFirstRender.current = false
    }
  }, [watchlist])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleFilter = (genre) => {
    setCurrGenre(genre)
    // Focus search input after filtering
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const sortIncreasing = () => {
    let sorted = [...watchlist].sort((movieA, movieB) => {
      return parseFloat(movieA.imdbRating) - parseFloat(movieB.imdbRating)
    })
    setWatchlist(sorted)
  }

  const sortDecreasing = () => {
    let sorted = [...watchlist].sort((movieA, movieB) => {
      return parseFloat(movieB.imdbRating) - parseFloat(movieA.imdbRating)
    })
    setWatchlist(sorted)
  }

  const sortPopularityIncreasing = () => {
    let sorted = [...watchlist].sort((movieA, movieB) => {
      return parseFloat(movieA.imdbVotes?.replace(/,/g, '')) - parseFloat(movieB.imdbVotes?.replace(/,/g, ''))
    })
    setWatchlist(sorted)
  }

  const sortPopularityDecreasing = () => {
    let sorted = [...watchlist].sort((movieA, movieB) => {
      return parseFloat(movieB.imdbVotes?.replace(/,/g, '')) - parseFloat(movieA.imdbVotes?.replace(/,/g, ''))
    })
    setWatchlist(sorted)
  }

  // Filter movies based on genre and search
  const filteredMovies = watchlist.filter((movie) => {
    const matchesGenre = currGenre === 'All Genres' || movie.Genre?.includes(currGenre)
    const movieTitle = movie.Title || movie.title || ''
    const matchesSearch = movieTitle.toLowerCase().includes(search.toLowerCase())
    return matchesGenre && matchesSearch
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4 md:gap-8 p-3 sm:p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Genre Filter Buttons */}
        <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
          {genreList.map((genre) => (
            <button
              key={genre}
              onClick={() => handleFilter(genre)}
              className={`px-3 py-1.5 md:px-6 md:py-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                currGenre === genre
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full max-w-md px-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Movies"
            value={search}
            onChange={handleSearch}
            className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 text-sm md:text-base"
          />
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto px-2">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-gray-700">
                <th className="text-left px-2 md:px-4 py-2 md:py-3 text-gray-600 dark:text-gray-300 font-semibold text-sm md:text-base">Name</th>
                <th className="text-center px-2 md:px-4 py-2 md:py-3 text-gray-600 dark:text-gray-300 font-semibold text-sm md:text-base">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <span>Ratings</span>
                    <div className="flex flex-col">
                      <button onClick={sortIncreasing} className="text-xs hover:text-blue-500">▲</button>
                      <button onClick={sortDecreasing} className="text-xs hover:text-blue-500">▼</button>
                    </div>
                  </div>
                </th>
                <th className="text-center px-2 md:px-4 py-2 md:py-3 text-gray-600 dark:text-gray-300 font-semibold text-sm md:text-base hidden sm:table-cell">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <span>Popularity</span>
                    <div className="flex flex-col">
                      <button onClick={sortPopularityIncreasing} className="text-xs hover:text-blue-500">▲</button>
                      <button onClick={sortPopularityDecreasing} className="text-xs hover:text-blue-500">▼</button>
                    </div>
                  </div>
                </th>
                <th className="text-center px-2 md:px-4 py-2 md:py-3 text-gray-600 dark:text-gray-300 font-semibold text-sm md:text-base hidden md:table-cell">Genre</th>
                <th className="text-center px-2 md:px-4 py-2 md:py-3 text-gray-600 dark:text-gray-300 font-semibold text-sm md:text-base"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                    No movies in watchlist
                  </td>
                </tr>
              ) : (
                filteredMovies.map((movie) => {
                  const movieId = movie.id || movie.imdbID;
                  const movieTitle = movie.Title || movie.title || 'N/A';
                  const moviePoster = movie.Poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'https://via.placeholder.com/160x240?text=No+Image';
                  
                  return (
                    <tr 
                      key={movieId} 
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => navigate(`/movie/${movieId}`)}
                    >
                      <td className="px-2 md:px-4 py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-4">
                          <img
                            src={moviePoster}
                            alt={movieTitle}
                            className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-28 object-cover rounded shadow-md"
                          />
                          <span className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs sm:text-sm md:text-base line-clamp-2">{movieTitle}</span>
                        </div>
                      </td>
                      <td className="text-center px-2 md:px-4 py-3 md:py-4 text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base">{movie.imdbRating || 'N/A'}</td>
                      <td className="text-center px-2 md:px-4 py-3 md:py-4 text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base hidden sm:table-cell">{movie.imdbVotes || 'N/A'}</td>
                      <td className="text-center px-2 md:px-4 py-3 md:py-4 text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base hidden md:table-cell">{movie.Genre?.split(',')[0] || 'N/A'}</td>
                      <td className="text-center px-2 md:px-4 py-3 md:py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromWatchlist(movie);
                          }}
                          className="text-red-500 dark:text-red-400 font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors hover:scale-110 transform text-xs sm:text-sm md:text-base"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Watchlist