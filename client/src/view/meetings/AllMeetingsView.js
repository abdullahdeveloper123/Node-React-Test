import React, { useEffect, useState } from "react";
import "../../assets/main.css";
import Navbar from "../../component/navbar/Navbar";
import { getMeetings } from "../../api/meeting/allMeetings";
import MeetingCard from "../../component/card/meetingCard";
import { deleteMeetings } from "../../api/meeting/deleteMeeting";

// FontAwesome icons library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function AllMeetingsView() {
  // *
  // * Local State Management
  // *
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState("");
  const [order, setOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const meetingsPerPage = 5;

  // *
  // * Fetch meetings on mount
  // *
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

  useEffect(() => {
    loadMeetings();
  }, []);

  // *
  // * Reset pagination to Page 1
  // * whenever search or order changes
  // *
  useEffect(() => {
    setCurrentPage(1);
  }, [search, order]);

  // *
  // * Delete a meeting 
  //*
  const handleMeetingDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this meeting?");
    if (!confirmDelete) return;

    try {
      const res = await deleteMeetings(id);
      if (res.status === 200) loadMeetings();
    } catch (err) {
      console.error("Failed to delete meeting:", err);
    }
  };

  // *
  // * Handle Sorting (Latest / Oldest)
  // *
  const displayedMeetings = order === "latest" ? [...meetings].reverse() : meetings;

  // *
  // * Apply search filter
  // *
  const filteredMeetings = displayedMeetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(search.toLowerCase())
  );

  // *
  // * Handle Pagination Slicing
  // *
  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = filteredMeetings.slice(indexOfFirstMeeting, indexOfLastMeeting);

  // *
  // * Final Component Render
  // *
  return (
    <>
      <Navbar />

      <div className="container meetings-wrapper">
        {/* Header Section: Title, Search & Sort Filter */}
        <div className="header flex py-6">
          <h1 className="heading ml-6 my-auto">All Meetings</h1>

          {/* Search Bar */}
          <div className="search-bar-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input
              type="text"
              placeholder="Search meetings by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-bar"
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="ml-4 mr-4 my-auto">
            <label htmlFor="order" className="mr-2 font-medium">
              Sort by:
            </label>
            <select
              id="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="border rounded p-1"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Conditional Rendering: Loader / Errors / Empty State */}
        {loading && <p>Loading meetings...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && meetings.length === 0 && <p>No meetings found.</p>}

        {/* Meeting Cards List */}
        {!loading &&
          currentMeetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meetingId={meeting.id}
              meetingTitle={meeting.title}
              meetingDate={meeting.date}
              timeStamp={meeting.timeStamp}
              onDelete={handleMeetingDelete}
            />
          ))}

        {/* Pagination Controls */}
        {filteredMeetings.length > meetingsPerPage && (
          <div className="pagination-buttons">
            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn btn-light"
            >
              Previous
            </button>

            {/* Next Page */}
            <button
              onClick={() => {
                const pages = filteredMeetings.length / meetingsPerPage;
                const totalPages = Number.isInteger(pages) ? pages : parseInt(pages) + 1;

                if (currentPage < totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              disabled={
                currentPage ===
                (Number.isInteger(filteredMeetings.length / meetingsPerPage)
                  ? filteredMeetings.length / meetingsPerPage
                  : parseInt(filteredMeetings.length / meetingsPerPage) + 1)
              }
              className="pagination-btn btn-dark"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </>
  );
}
