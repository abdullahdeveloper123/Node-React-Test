// Import React core dependencies and API function
import React, { useState } from "react";
import { updateMeetings } from "../../api/meeting/updateMeeting";

/**
 * UpdateMeetingForm Component
 * Form interface to update an existing meeting's details.
 * Accepts initial values via props, manages form state locally,
 * and sends an update request to the backend API.
 */
export default function UpdateMeetingForm({ meetingId, initialTitle, initialDate, onUpdateSuccess }) {
  // Form input state for meeting title and date
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);

  // UI state for loading and user feedback messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Handles form submission event.
   * Sends updated meeting details to the API.
   * Provides user feedback and triggers optional callback on success.
   */
  const handleUpdateMeeting = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await updateMeetings(meetingId, title, date);
      console.log("Meeting updated:", result);
      setMessage("Meeting updated successfully!");

      // If a success callback was provided, trigger it
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      setMessage("Failed to update meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-meeting-container">
      <h2 className="heading text-center">Edit Meeting</h2>

      {/* Update Meeting Form */}
      <form onSubmit={handleUpdateMeeting} className="edit-meeting-form">
        
        {/* Title Input Field */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter new meeting title"
          />
        </div>

        {/* Date Input Field */}
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
          {loading ? "Updating..." : "Update Meeting"}
        </button>
      </form>

      {/* User feedback message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
