// Import React hooks and dependencies
import { useState } from "react";
import { loginUser } from "../../api/auth/authApi";
import '../../assets/main.css';

// Import FontAwesome icons for form UI
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LoginForm Component
 * Handles user authentication form UI and submission logic
 */
export function LoginForm({ onSuccess }) {

  // State variables for form fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /**
   * Form submission handler
   * Calls loginUser API, stores token on success, and triggers onSuccess callback
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call login API with provided credentials
      const token = await loginUser(email, password);

      // Store access token in local storage
      localStorage.setItem("accessToken", token);

      // Clear any existing error message
      setError("");

      onSuccess();

    } catch (err) {
      // display error message
       if (err.message === "Network Error") {
      setError("Unable to connect to the server. Please try again later.");
    } else if (err.response?.status === 401) {
      setError("Invalid email or password. Please check your credentials.");
    } else {
      setError("Something went wrong. Please try again.");
    }
    }
  };

  // Render the login form UI
  return (
    <form onSubmit={handleSubmit}>
    
      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Error Message */}
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}

// Export LoginForm component as default
export default LoginForm;
