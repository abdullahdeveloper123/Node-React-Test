// Import global styles
import "../../assets/main.css";

// Import React Router hook for programmatic navigation
import { useNavigate } from "react-router-dom";

// Import core dependancy
import { formatDistanceToNow } from 'date-fns';


// Import icons library 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';


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
const MeetingCard = ({ meetingId, meetingTitle, meetingDate, timeStamp, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      {/* Card Header with meeting title */}
      <div className="card-header">
        <h2 className="card-title"><FontAwesomeIcon icon={faHeading} className="mr-2 text-gray-600" />
          {meetingTitle}</h2>
          
        <p className="created-time">
          Created {formatDistanceToNow(new Date(timeStamp))} ago
        </p>
      </div>

      {/* Display meeting date */}
      <p className="card-date"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-600" />
        {meetingDate}</p>

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
