// Import required dependencies and components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import necessary icons from FontAwesome
import {
  faCalendarCheck,
  faList,
  faPlusCircle,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Navbar Component
 * Renders a responsive navigation bar with logo, navigation links, and a mobile menu toggle
 */
function Navbar() {
  // State to track whether mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <Link to="/" className="logo">
        <FontAwesomeIcon icon={faCalendarCheck} /> Meetings App
      </Link>

      {/* Mobile menu toggle button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/meetings">
          <FontAwesomeIcon icon={faList} /> Meetings
        </Link>
        <Link to="/add-meeting">
          <FontAwesomeIcon icon={faPlusCircle} /> Add Meeting
        </Link>
      </div>
    </nav>
  );
}

// Export Navbar component as default
export default Navbar;
