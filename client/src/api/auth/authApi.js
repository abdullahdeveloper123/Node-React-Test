// Import Axios HTTP client for API requests
import axios from "axios";

// Base API URL for authentication endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * loginUser API Function
 * Authenticates a user using provided email and password.
 * On success, stores the refresh token locally and returns the access token.
 */
export const loginUser = async (email, password) => {
  try {
    // Send POST request with credentials to login endpoint
    const response = await axios.post(
      `${Api_Url}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle non-200 status codes
    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    // Store refresh token in localStorage for future session renewal
    localStorage.setItem("refreshToken", response.data.refreshToken);

    // Return access token to caller
    return response.data;

  } catch (error) {
    // Propagate any errors to caller for UI handling
    throw error;
  }
};
