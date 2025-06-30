// Import the main application routes
import AppRoutes from './route/auth/authRoute';
import { useEffect } from 'react';
import { refreshAccessToken } from './api/auth/refreshAccessToken';

/**
 * Root App Component
 * Renders the main application by injecting route-based views through AppRoutes.
 */
function App() {

  // Request to endpoint to refresh access token before expiry 
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // every 14 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Application Routes */}
      <AppRoutes />
    </>
  );
}

// Export the App component as default
export default App;
