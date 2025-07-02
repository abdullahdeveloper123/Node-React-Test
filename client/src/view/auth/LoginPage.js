// Import required dependencies and components
import LoginForm from "../../component/form/authForm";
import Navbar from "../../component/navbar/Navbar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LoginPage View Component
 * Renders the login screen layout, combining a navigation bar, page heading,
 * and a login form. Designed for user authentication.
 */
const LoginPage = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main page content area */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-sm">
          
          {/* Page Heading with icon */}
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Login
          </h2>

          {/* Login form component */}
          <LoginForm onSuccess={() => window.location.replace("/")} />
        </div>
      </div>
    </>
  );
};

// Export component as default export
export default LoginPage;
