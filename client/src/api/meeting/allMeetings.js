// Import Axios HTTP client for making API requests
import axios from "axios";

// Base API URL for meeting-related endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * getMeetings API Function
 * Fetches all meetings for the authenticated user.
 */
export const getMeetings = async () => {
  try {
    // Send GET request with access token in request header
    const response = await axios.get(`${Api_Url}/Meetings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Handle and return response based on status code
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      throw new Error("Unauthorized User!");
    } else {
      throw new Error("Failed to fetch meetings.");
    }

  } catch (err) {
    // Log and propagate any unexpected API or network error
    console.error("Error fetching meetings:", err);
    throw err;
  }
};
