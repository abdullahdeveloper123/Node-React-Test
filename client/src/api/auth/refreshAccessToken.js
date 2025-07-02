// Import Axios HTTP client
import axios from 'axios';

// Base API URL for authentication endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * refreshAccessToken Function
 * Sends a POST request to refresh the user's access token using their stored refresh token.
 * On success, updates the access token in localStorage.
 */
export const refreshAccessToken = async () => {
  // Retrieve refresh token from localStorage
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    // Send POST request to refresh access token
    const response = await axios.post(`${Api_Url}/refresh-token`, { refreshToken });

    // Replace old access token in localStorage
    localStorage.removeItem('accessToken');
    localStorage.setItem('accessToken', response.data.accessToken);
    
    // Replace old refresh TOken and new form response
    localStorage.removeItem('refreshToken')
    localStorage.setItem('refreshToken', response.data.refreshToken)

  } catch (error) {
    // Log token refresh failure
    console.error('Token refresh failed:', error);
  }
};
