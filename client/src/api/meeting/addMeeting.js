// Import Axios HTTP client
import axios from "axios";

// Base API URL for meeting-related endpoints
const Api_Url = "http://localhost:8000/api";

/**
 * addMeetings API Function
 * Sends a POST request to create a new meeting.
 */
export const addMeetings = async (title, date) => {
  try {
    // Send POST request with meeting details and access token
    const response = await axios.post(
      `${Api_Url}/addMeeting`,
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

    // Return the created meeting data if request is successful
    return response.data;

  } catch (err) {
    // Handle specific unauthorized error case
    if (err.response?.status === 401) {
      console.error("Unauthorized User!");
      throw new Error("Unauthorized User!");
    } else {
      // Log general API error
      console.error("Error adding meeting:", err);
      throw new Error("Failed to add meeting.");
    }
  }
};
