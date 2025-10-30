import React, { useContext, useState } from 'react'
import Logo from '../MovieLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to home page with search query
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setShowMobileSearch(false)
    }
  }
  
  return (
    <>
      <nav className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 md:px-6 py-3 shadow-md dark:shadow-gray-800 transition-colors duration-300">
        {/* Logo + Links */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-2">
            <img 
              src={Logo} 
              alt="Movie Logo" 
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
          </div>

          {/* Links - Hidden on mobile when search is open */}
          {!showMobileSearch && (
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link
                to="/"
                className="text-lg md:text-2xl text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Movies
              </Link>
              <Link         
                to="/watchlist"
                className="text-lg md:text-2xl text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                WatchList
              </Link>
            </div>
          )}
        </div>

        {/* Right Side: Search + Dark Mode */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Search Bar - Always visible on md+ */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-64"
              />
            </div>
          </form>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            aria-label="Toggle Search"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 flex-shrink-0"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Search Bar - Expandable */}
      {showMobileSearch && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 shadow-md dark:shadow-gray-800 border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                autoFocus
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Navbar
