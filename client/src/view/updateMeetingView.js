// Import core dependencies and components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMeetings } from "../api/meeting/allMeetings";
import UpdateMeetingForm from "../component/form/updateMeetingForm";
import Navbar from "../component/navbar/Navbar";

/**
 * UpdateMeetingView Component
 * View for editing a specific meeting.
 * Fetches the target meeting based on route parameter `id`
 * and passes its data to the update form component.
 */
export default function UpdateMeetingView() {
  // Extract the meeting ID from the URL params
  const { id } = useParams();

  // Local state to store the specific meeting details
  const [meeting, setMeeting] = useState(null);

  /**
   * Fetch and load the meeting data on component mount.
   * Retrieves all meetings, finds the one with the matching ID,
   * and updates local state.
   */
  useEffect(() => {
    fetchMeeting();
  }, []);

  const fetchMeeting = async () => {
    const allMeetings = await getMeetings();
    const found = allMeetings.find((m) => m.id === id);
    setMeeting(found);
  };

  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      {/* Section container for the update form */}
      <section className="updateMeeting">
        {/* Conditional rendering: show form if meeting found, else show loading message */}
        {meeting ? (
          <UpdateMeetingForm
            meetingId={id}
            initialTitle={meeting.title}
            initialDate={meeting.date}
          />
        ) : (
          <p>Loading meeting details...</p>
        )}
      </section>
    </>
  );
}
