import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar/Navbar";
import { getMeetings } from "../api/meeting/allMeetings";
import MeetingCard from "../component/card/meetingCard";
import { deleteMeetings } from "../api/meeting/deleteMeeting";

export default function AllMeetingsView() {
  // State for managing loading, fetched meetings, and potential errors
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");

  /**
   * Load all meetings from the server.
   * Runs once when the component mounts via useEffect.
   * On success, updates the meetings state.
   * On failure, sets an error message.
   */
  const loadMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch meetings.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger data fetch immediately after component mounts
  useEffect(() => {
    loadMeetings();
  }, []);

  /**
   * Delete a specific meeting by its id.
   * After successful deletion, reload the meetings list.
   */
  const handleMeetingDelete = async (id) => {
    try {
      const res = await deleteMeetings(id);
      if (res.status === 200) loadMeetings();
    } catch (err) {
      console.error("Failed to delete meeting:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="meetings-wrapper">
        <h1 className="heading ml-6 my-4">All Meetings</h1>

        {/* Conditional UI feedback for loading, errors, or empty list */}
        {loading && <p>Loading meetings...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && meetings.length === 0 && <p>No meetings found.</p>}

        {/* Render all meeting cards dynamically once data is loaded */}
        {!loading &&
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meetingId={meeting.id}
              meetingTitle={meeting.title}
              meetingDate={meeting.date}
              onDelete={handleMeetingDelete}
            />
          ))}
      </div>
    </>
  );
}
