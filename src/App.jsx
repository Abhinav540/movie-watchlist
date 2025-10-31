import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy load components to prevent blocking
const Movies = lazy(() => import("./components/Movies"));
const Watchlist = lazy(() => import("./components/Watchlist"));
const MovieSlider = lazy(() => import("./components/MovieSlider"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Loading component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// HomePage component
function HomePage() {
  return (
    <div className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <MovieSlider />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Movies />
      </Suspense>
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log('✅ App mounted');
    console.log('📱 Device:', navigator.userAgent);
    console.log('🌐 Screen:', window.innerWidth, 'x', window.innerHeight);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
              </Routes>
            </Suspense>
          </div>
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;