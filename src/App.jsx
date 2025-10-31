import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import MovieSlider from "./components/MovieSlider";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<><MovieSlider/> <Movies /></>} />           
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <AppContent />
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;