import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

// Simple test component
function TestPage() {
  useEffect(() => {
    console.log('🧪 TestPage mounted');
    console.log('📱 Window size:', window.innerWidth, window.innerHeight);
    console.log('🔑 API Key exists:', !!import.meta.env.VITE_TMDB_API_KEY);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          ✅ React Router Works!
        </h1>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>✅ Navbar rendering</p>
          <p>✅ ThemeContext working</p>
          <p>✅ WatchlistContext working</p>
          <p>✅ Routes working</p>
          <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
            🔍 Now testing Movies component...
          </p>
        </div>
      </div>
      
      {/* Try to render a simple movie card */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          🎬 Test Movie Card
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <p className="text-sm text-gray-800 dark:text-white">Test Movie</p>
          </div>
        </div>
      </div>
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