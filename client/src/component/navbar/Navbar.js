// Import core React dependencies and router/link functionality
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import FontAwesome and necessary icons for navigation UI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faList,
  faPlusCircle,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Navbar Component
 * Renders a responsive, clean navigation bar with app branding,
 * primary navigation links, and a mobile-friendly menu toggle.
 */
function Navbar() {
  // State to control the visibility of the mobile navigation menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* App logo and brand link */}
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

      {/* Navigation links section — toggles active class on mobile */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">
          <FontAwesomeIcon icon={faList} /> Meetings
        </Link>
        <Link to="/add-meeting">
          <FontAwesomeIcon icon={faPlusCircle} /> Add Meeting
        </Link>
      </div>
    </nav>
  );
}

// Export Navbar component as default export
export default Navbar;
