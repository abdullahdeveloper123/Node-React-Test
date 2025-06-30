// Import the main application routes
import AppRoutes from './route/auth/authRoute';

/**
 * Root App Component
 * Renders the main application by injecting route-based views through AppRoutes.
 */
function App() {
  return (
    <>
      {/* Application Routes */}
      <AppRoutes />
    </>
  );
}

// Export the App component as default
export default App;
