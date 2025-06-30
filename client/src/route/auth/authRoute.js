// Import required dependencies from React and React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import view components
import LoginPage from "../../view/LoginPage";

/**
 * AppRoutes Component
 * Defines and handles client-side routes for the application using React Router
 */
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export AppRoutes component as default
export default AppRoutes;
