import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videos, setVideos] = useState([]);
  
  const { watchlist, handleAddtoWatchlist, handleRemoveFromWatchlist } = useContext(WatchlistContext);

  // Check if movie is in watchlist
  const isInWatchlist = watchlist?.some(m => (m.id || m.imdbID) === parseInt(id)) || false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details from TMDB
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=8c8d4201c369e3061713ad1276a51176&language=en-US`
        );
        const movieData = await movieResponse.json();

        // Fetch credits (cast & crew)
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8c8d4201c369e3061713ad1276a51176`
        );
        const creditsData = await creditsResponse.json();

        // Fetch videos (trailers & clips)
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8c8d4201c369e3061713ad1276a51176`
        );
        const videosData = await videosResponse.json();

        setMovie(movieData);
        setCredits({
          cast: creditsData.cast?.slice(0, 10) || [],
          crew: creditsData.crew?.filter(c => c.job === 'Director') || []
        });
        
        // Filter for trailers and teasers, prioritize official trailers
        const movieVideos = videosData.results?.filter(
          v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
        ).sort((a, b) => {
          // Prioritize official trailers
          if (a.type === 'Trailer' && b.type !== 'Trailer') return -1;
          if (a.type !== 'Trailer' && b.type === 'Trailer') return 1;
          return 0;
        }) || [];
        
        setVideos(movieVideos);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleWatchlistToggle = () => {
    const movieData = {
      ...movie,
      Poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/160x240?text=No+Image',
    };

    if (isInWatchlist) {
      handleRemoveFromWatchlist(movieData);
    } else {
      handleAddtoWatchlist(movieData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4 text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-2xl">Movie not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/400x600?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-950 text-white transition-colors duration-300">
      {/* Backdrop with overlay */}
      {backdropUrl && (
        <div className="fixed top-0 left-0 w-full h-[70vh] overflow-hidden -z-10">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="ml-3 sm:ml-4 md:ml-6 mb-4 px-4 py-2 md:px-6 md:py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2 shadow-lg text-sm md:text-base"
          style={{position:'relative', bottom:'50px'}}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back</span>
        </button>

        {/* Movie Info Section */}
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:block">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-48 sm:w-56 md:w-80 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-lg sm:text-xl text-gray-300 italic mb-4 md:mb-6">"{movie.tagline}"</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-yellow-500/20 text-yellow-400 rounded-full font-semibold border border-yellow-500/30 text-sm md:text-base flex items-center gap-1.5">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average?.toFixed(1)} / 10
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-500/20 text-blue-400 rounded-full font-semibold border border-blue-500/30 text-sm md:text-base flex items-center gap-1.5">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-500/20 text-purple-400 rounded-full font-semibold border border-purple-500/30 text-sm md:text-base flex items-center gap-1.5">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {movie.runtime} min
                </span>
              </div>

              {/* Genres */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-gray-300">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-white rounded-lg border border-pink-500/30 hover:scale-105 transition text-sm md:text-base"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Watchlist Button */}
              <button
                onClick={handleWatchlistToggle}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg mb-4 md:mb-6 w-full md:w-auto flex items-center justify-center gap-2 ${
                  isInWatchlist
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>

              {/* Overview */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-gray-200">Overview</h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">{movie.overview}</p>
              </div>

              {/* Director */}
              {credits.crew.length > 0 && (
                <div className="mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-200">Director</h3>
                  <p className="text-gray-300 text-base md:text-lg">
                    {credits.crew.map(d => d.name).join(', ')}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs md:text-sm">Status</p>
                  <p className="text-white font-semibold text-sm md:text-base">{movie.status}</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs md:text-sm">Language</p>
                  <p className="text-white font-semibold text-sm md:text-base">{movie.original_language?.toUpperCase()}</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs md:text-sm">Budget</p>
                  <p className="text-white font-semibold text-sm md:text-base">
                    {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs md:text-sm">Revenue</p>
                  <p className="text-white font-semibold text-sm md:text-base">
                    {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {credits.cast.length > 0 && (
            <div className="mt-8 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Top Cast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                {credits.cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-lg border border-gray-700"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : 'https://via.placeholder.com/200x300?text=No+Image'
                      }
                      alt={actor.name}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                    />
                    <div className="p-2 md:p-4">
                      <p className="font-bold text-white truncate text-sm md:text-base">{actor.name}</p>
                      <p className="text-xs md:text-sm text-gray-400 truncate">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos & Trailers Section */}
          {videos.length > 0 && (
            <div className="mt-8 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Trailers & Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {videos.slice(0, 4).map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-all"
                  >
                    <div className="relative aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-3 md:p-4">
                      <p className="font-semibold text-white mb-1 text-sm md:text-base line-clamp-1">{video.name}</p>
                      <div className="flex items-center gap-2 text-xs md:text-sm flex-wrap">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30">
                          {video.type}
                        </span>
                        <span className="text-gray-400">
                          {new Date(video.published_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
