// Import necessary dependencies
import { useEffect } from 'react';
import { refreshAccessToken } from './api/auth/refreshAccessToken';
import Routes from './routes/Routes';

/**
 * Root App Component
 * Bootstraps the main application by rendering route-based views via Routes component.
 * Also triggers periodic access token refresh to keep user sessions alive.
 */
function App() {

  // Refresh access token every 14 minutes to maintain authenticated session
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 12 * 60 * 1000); // 12 minutes

    // Clear interval when component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Render application routes */}
      <Routes />
    </>
  );
}

// Export App component as default
export default App;
