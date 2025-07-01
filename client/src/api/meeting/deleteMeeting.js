// Import necessary dependencies
import axios from "axios";

// Base API URL for meeting endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * deleteMeetings API Function
 * Sends a DELETE request to remove a meeting by its ID.
 */
export const deleteMeetings = async (id) => {
  try {
    // Send DELETE request with authorization header
    const response = await axios.delete(`${Api_Url}/deleteMeeting/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Handle server response based on HTTP status code
    if (response.status === 200) {
      return response; // Return full Axios response on successful delete
    } else if (response.status === 401) {
      throw new Error("Unauthorized User!");
    } else {
      throw new Error("Failed to delete meeting.");
    }

  } catch (err) {
    // Log and propagate any API or network error
    console.error("Error deleting meeting:", err);
    throw err;
  }
};
