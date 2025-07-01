import React from "react";
import CreateMeeting from "../component/form/createMeetingForm";
import Navbar from "../component/navbar/Navbar";

/**
 * CreateMeetingView Component
 * Renders the page for creating a new meeting.
 */
export default function CreateMeetingView() {
  return (
    <>
      {/* Navigation bar for consistent page layout */}
      <Navbar />

      {/* Section container for the meeting creation form */}
      <section className="addMeeting">
        <CreateMeeting />
      </section>
    </>
  );
}
