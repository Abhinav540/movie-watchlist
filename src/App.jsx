import { useEffect, useState } from "react";

function App() {
  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    // Capture all errors
    const errorHandler = (e) => {
      setErrors(prev => [...prev, {
        message: e.message || String(e),
        stack: e.error?.stack || 'No stack',
        time: new Date().toLocaleTimeString()
      }]);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', (e) => {
      errorHandler({ message: 'Promise rejection: ' + e.reason });
    });

    // Collect system info
    setInfo({
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      online: navigator.onLine,
      cookies: navigator.cookieEnabled,
      localStorage: !!window.localStorage,
    });

    return () => window.removeEventListener('error', errorHandler);
  }, []);

  // Test imports
  let navbarStatus = '❌ Not tested';
  let themeStatus = '❌ Not tested';
  let watchlistStatus = '❌ Not tested';
  
  try {
    require('./components/Navbar');
    navbarStatus = '✅ Import OK';
  } catch (e) {
    navbarStatus = '❌ Error: ' + e.message;
  }

  try {
    require('./context/ThemeContext');
    themeStatus = '✅ Import OK';
  } catch (e) {
    themeStatus = '❌ Error: ' + e.message;
  }

  try {
    require('./context/WatchlistContext');
    watchlistStatus = '✅ Import OK';
  } catch (e) {
    watchlistStatus = '❌ Error: ' + e.message;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '14px'
    }}>
      <h1 style={{ color: '#00ff00', marginBottom: '20px' }}>
        🔍 ERROR DIAGNOSTIC TOOL
      </h1>

      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#ffaa00', marginBottom: '10px' }}>System Info:</h2>
        {Object.entries(info).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#00aaff', marginBottom: '10px' }}>Import Tests:</h2>
        <div>Navbar: {navbarStatus}</div>
        <div>ThemeContext: {themeStatus}</div>
        <div>WatchlistContext: {watchlistStatus}</div>
      </div>

      {errors.length > 0 && (
        <div style={{
          backgroundColor: '#ff0000',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ marginBottom: '10px' }}>❌ ERRORS FOUND:</h2>
          {errors.map((error, i) => (
            <div key={i} style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px'
            }}>
              <div><strong>Time:</strong> {error.time}</div>
              <div><strong>Message:</strong> {error.message}</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                <strong>Stack:</strong>
                <pre style={{ overflow: 'auto' }}>{error.stack}</pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {errors.length === 0 && (
        <div style={{
          backgroundColor: '#00aa00',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <h2>✅ NO ERRORS DETECTED</h2>
          <p>React is running successfully!</p>
        </div>
      )}
    </div>
  );
}

export default App;