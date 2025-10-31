import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { WatchlistProvider } from "./context/WatchlistContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  useEffect(() => {
    console.log('✅ App mounted');
    console.log('📱 Device:', navigator.userAgent);
    console.log('🌐 Screen:', window.innerWidth, 'x', window.innerHeight);
    
    // Try to catch any errors
    window.addEventListener('error', (e) => {
      console.error('❌ Global error:', e.message);
      alert('Error: ' + e.message);
    });
  }, []);

  return (
    <ThemeProvider>
      <WatchlistProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          
          {/* Simple content that should definitely work */}
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                🧪 Diagnostic Test
              </h1>
              
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    App component loaded
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Navbar rendered
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Contexts working
                  </span>
                </div>
                
                <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900 rounded">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold">
                    If you see this, React is working!
                  </p>
                </div>
                
                <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Screen: {window.innerWidth} x {window.innerHeight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;