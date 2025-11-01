import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";

// Import contexts directly (not lazy)
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Import Navbar directly (not lazy) - it's small and needed immediately
import Navbar from "./components/Navbar.jsx";

// Lazy load heavy components
const Movies = lazy(() => import("./components/Movies.jsx"));
const Watchlist = lazy(() => import("./components/Watchlist.jsx"));
const MovieDetails = lazy(() => import("./components/MovieDetails.jsx"));
const MovieSlider = lazy(() => import("./components/MovieSlider.jsx"));

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-red-500 text-white p-6 rounded-lg max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-2">Error: {this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-white text-red-500 px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HomePage component with error handling
function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('✅ HomePage mounted');
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log('✅ App initializing...');
    console.log('📱 UserAgent:', navigator.userAgent);
    console.log('🌐 Screen:', window.innerWidth, 'x', window.innerHeight);
    
    // Small delay to ensure everything is ready
    setTimeout(() => {
      setReady(true);
      console.log('✅ App ready');
    }, 100);

    // Catch unhandled errors
    window.addEventListener('error', (e) => {
      console.error('❌ Unhandled error:', e.message);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('❌ Unhandled promise rejection:', e.reason);
    });
  }, []);

  if (!ready) {
    return <LoadingFallback />;
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;