// Import required dependencies and components
import LoginForm from "../component/form/authForm";
import Navbar from "../component/navbar/Navbar";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LoginPage View Component
 * Renders the login page layout including a Navbar, heading, and login form.
 */
const LoginPage = () => {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Page Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-full max-w-sm">
          {/* Page Heading */}
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            Login
          </h2>

          {/* Login Form Component */}
          <LoginForm onSuccess={() => window.location.replace("/meetings")} />
        </div>
      </div>
    </>
  );
};

// Export LoginPage component as default
export default LoginPage;
