// Import Axios HTTP client
import axios from "axios";

// Base API URL for meeting endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * updateMeetings API Function
 * Sends a PUT request to update an existing meeting by its ID.
 */
export const updateMeetings = async (id, title, date) => {
  try {
    // Send PUT request with updated meeting data and authorization token
    const response = await axios.put(
      `${Api_Url}/updateMeeting/${id}`,
      {
        title: title || "",
        date: date || "",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    // Return updated meeting data if request is successful
    return response.data;

  } catch (err) {
    // Handle unauthorized access separately
    if (err.response?.status === 401) {
      console.error("Unauthorized User!");
      throw new Error("Unauthorized User!");
    } else {
      // Log and propagate other API or network errors
      console.error("Error updating meeting:", err);
      throw new Error("Failed to update meeting.");
    }
  }
};
