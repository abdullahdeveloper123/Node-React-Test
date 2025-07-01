// Import global styles
import "../../assets/main.css";

// Import React Router hook for programmatic navigation
import { useNavigate } from "react-router-dom";

/**
 * MeetingCard Component
 * Displays individual meeting details inside a card layout.
 * Provides action buttons to open, update, or delete the meeting.
 *
 * Props:
 * - meetingId: Unique identifier for the meeting
 * - meetingTitle: Title of the meeting
 * - meetingDate: Date of the meeting
 * - onDelete: Function to handle 'Delete' button click
 */
const MeetingCard = ({ meetingId, meetingTitle, meetingDate, onOpen, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      {/* Card Header with meeting title */}
      <div className="card-header">
        <h2 className="card-title">{meetingTitle}</h2>
      </div>

      {/* Display meeting date */}
      <p className="card-date">{meetingDate}</p>

      {/* Action Buttons: Open, Update, Delete */}
      <div className="card-actions">

        {/* Update Meeting button — navigates to update route */}
        <button className="card-btn edit-btn" onClick={() => navigate(`/update-meeting/${meetingId}`)}>
          Update
        </button>

        {/* Delete Meeting button */}
        <button className="card-btn delete-btn" onClick={() => onDelete(meetingId)}>
          Delete
        </button>
      </div>
    </div>
  );
};

// Export MeetingCard component as default export
export default MeetingCard;
