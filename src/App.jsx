import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Movies from "./components/Movies.jsx";
import Watchlist from "./components/Watchlist.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import MovieSlider from "./components/MovieSlider.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// HomePage component
function HomePage() {
  return (
    <div className="w-full">
      <MovieSlider />
      <Movies />
    </div>
  );
}

function App() {
  useEffect(() => {
    console.log('✅ App mounted');
    console.log('📱 Device:', navigator.userAgent);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;