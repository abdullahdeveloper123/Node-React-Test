// Import React dependencies and API function
import React, { useState } from "react";
import { addMeetings } from "../../api/meeting/addMeeting";

/**
 * CreateMeeting Component
 * Form interface to create a new meeting.
 * Manages form state locally and sends a POST request to the API.
 */
export default function CreateMeeting() {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // UI state for loading spinner and user feedback message
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Handle form submission.
   * Sends meeting details to the server, resets form on success,
   * and provides UI feedback.
   */
  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await addMeetings(title, date);
      console.log("Meeting created:", result);
      setMessage("Meeting created successfully!");
      setTitle("");
      setDate("");
    } catch (err) {
      setMessage("Failed to create meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-meeting-container">
      <h2 className="heading text-center">Create New Meeting</h2>

      {/* Meeting creation form */}
      <form onSubmit={handleCreateMeeting} className="create-meeting-form">
        {/* Title input */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter meeting title"
          />
        </div>

        {/* Date input */}
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Submit button with loading state */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>

      {/* User feedback message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
