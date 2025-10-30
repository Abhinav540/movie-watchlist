import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import MovieSlider from "./components/MovieSlider";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<><MovieSlider/> <Movies /></>} />           
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;