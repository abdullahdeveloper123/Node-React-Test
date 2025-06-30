// Import necessary modules
import axios from "axios";

// Base API URL
const Api_Url = "http://localhost:8000/api";

/**
 * Authenticate user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${Api_Url}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Throw error if authentication fails
    if (response.status !== 200) {
      throw new Error("Login failed");
      }

    // Return Token
    return response.data;
    
  } catch (error) {
    throw error;
  }
};
