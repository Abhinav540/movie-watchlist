import { useState, useEffect } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  navbar: {
    backgroundColor: '#1e40af',
    padding: '1rem',
    borderBottom: '2px solid #3b82f6'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#ffffff'
  },
  success: {
    fontSize: '1.25rem',
    lineHeight: '2',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem'
  },
  infoBox: {
    backgroundColor: '#065f46',
    padding: '1rem',
    borderRadius: '0.5rem',
    marginTop: '1.5rem',
    fontSize: '0.875rem'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    color: '#ffffff'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #ffffff',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

function App() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    addLog('🚀 App component mounted');
    addLog(`📱 Device: ${navigator.userAgent}`);
    addLog(`🌐 Screen: ${window.innerWidth} x ${window.innerHeight}`);
    addLog(`🔧 Location: ${window.location.href}`);

    // Add CSS animation for spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      button:hover {
        background-color: #2563eb !important;
      }
      a:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    // Global error handler
    const errorHandler = (e) => {
      const msg = `❌ ERROR: ${e.message || e}`;
      addLog(msg);
      alert(msg);
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', (e) => {
      errorHandler({ message: 'Promise rejection: ' + e.reason });
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setMounted(true);
      addLog('✅ App fully loaded');
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (!mounted) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Loading App...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <span style={styles.logo}>🎬 Movie Watchlist</span>
          <a href="/" style={styles.link}>Home</a>
          <a href="#watchlist" style={styles.link}>Watchlist</a>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.card}>
          <h1 style={styles.title}>🎉 SUCCESS!</h1>
          
          <div style={styles.success}>
            <p>✅ React is working perfectly</p>
            <p>✅ JavaScript executing</p>
            <p>✅ State management working</p>
            <p>✅ Event handlers working</p>
            <p>✅ Styles rendering correctly</p>
          </div>

          <button 
            style={styles.button}
            onClick={() => {
              setCount(count + 1);
              addLog(`🖱️ Button clicked ${count + 1} times`);
            }}
          >
            Click Me! (Clicked {count} times)
          </button>

          <div style={styles.infoBox}>
            <p><strong>📱 Device Info:</strong></p>
            <p>Screen: {window.innerWidth} x {window.innerHeight}</p>
            <p>Pixel Ratio: {window.devicePixelRatio}</p>
            <p>Online: {navigator.onLine ? 'Yes' : 'No'}</p>
          </div>

          {/* Console Logs */}
          <div style={{...styles.infoBox, backgroundColor: '#1f2937', marginTop: '1.5rem'}}>
            <p style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>📋 Console Logs:</p>
            {logs.map((log, i) => (
              <p key={i} style={{fontSize: '0.75rem', marginBottom: '0.25rem', fontFamily: 'monospace'}}>
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;