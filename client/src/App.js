// Import necessary dependencies
import { useEffect, useState } from 'react';
import { refreshAccessToken } from './api/auth/refreshAccessToken';
import Routes from './routes/Routes';
import Toast from './component/common/toast';

/**
 * Root App Component
 * Bootstraps the main application by rendering route-based views via Routes component.
 * Also triggers periodic access token refresh to keep user sessions alive.
 */
function App() {

  const [offlineToast, setOfflineToast] = useState(false);

  // Refresh access token every 14 minutes to maintain authenticated session
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 12 * 60 * 10); // 12 minutes

    // Clear interval when component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  // Offline toast alert
  useEffect(() => {
    const handleOffline = () => {
      setOfflineToast(true);
      setTimeout(() => setOfflineToast(false), 4000);
    };

    window.addEventListener("offline", handleOffline);
    return () => window.removeEventListener("offline", handleOffline);
  }, []);


  return (
    <>
      {/* Render application routes */}
      {offlineToast && (
        <Toast
          message="You're offline. Some features may not work."
          onClose={() => setOfflineToast(false)}
        />
      )}

      <Routes />
    </>
  );
}

// Export App component as default
export default App;
