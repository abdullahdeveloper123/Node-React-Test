// Import React hooks and dependencies
import { useState } from "react";
import { loginUser } from "../../api/auth/authApi";
import '../../assets/main.css';

// Import FontAwesome icons for input fields
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LoginForm Component
 * Displays a login form with email and password fields.
 * Handles user authentication via API, token storage, error handling,
 * and optional redirect or callback via `onSuccess` prop.
 */
export function LoginForm({ onSuccess }) {

  // State variables for form input fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Form submission handler
   * Sends login credentials to API, stores token on success,
   * triggers `onSuccess()` callback, and handles errors gracefully.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call login API with provided credentials
      const token = await loginUser(email, password);

      // Save access token to local storage for session persistence
      localStorage.setItem("accessToken", token.token);

      // Clear any previous error messages
      setError("");

      // Invoke callback on successful login
      onSuccess();

    } catch (err) {
      // User-friendly error handling based on error type
      if (err.message === "Network Error") {
        setError("Unable to connect to the server. Please try again later.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password. Please check your credentials.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Return JSX for login form UI
  return (
    <form onSubmit={handleSubmit}>
      
      {/* Email Input Field */}
      <div className="form-group">
        <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
      </div>

      {/* Password Input Field */}
      <div className="form-group">
        <FontAwesomeIcon icon={faLock} className="form-icon" />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="form-input"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="form-button">
        Login
      </button>

      {/* Error Message Feedback */}
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}

// Export LoginForm component as default export
export default LoginForm;
