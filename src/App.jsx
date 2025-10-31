import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

// Minimal test component
function TestPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">✅ IT WORKS!</h1>
      <p className="text-gray-300 text-xl">If you see this, the routing works!</p>
      <div className="mt-8 p-4 bg-green-500 text-white rounded">
        Mobile rendering is successful!
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WatchlistProvider>
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<TestPage />} />
              <Route path="/watchlist" element={<TestPage />} />
              <Route path="/movie/:id" element={<TestPage />} />
            </Routes>
          </div>
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;