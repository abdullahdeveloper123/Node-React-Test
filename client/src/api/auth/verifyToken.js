import axios from "axios";

// Base API URL
const Api_Url = "http://localhost:8000/api";

/**
 * Verify the validity of the current access token by calling the backend
 */
export const verifyAccessToken = async () => {
  try {
    const response = await axios.get(`${Api_Url}/verifyAccessToken`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // If the token is valid (status 200)
    return response.status === 200;

  } catch (error) {
    // If token is invalid, expired or request failed
    console.error("Token verification failed:", error);
    return false;
  }
};
