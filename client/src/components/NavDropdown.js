//navdropdown for the profile and signout
//css/style combined here
//03-05-24 fetch&pulled, added the /:userID

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function NavDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  const profileLink = `/profile/${userID}`; // URL for the profile page
  const signOutLink = "/sign-in"; // URL for the sign out page

  return (
    <div className="profile-container" style={{ position: "relative" }}>
      <div
        className="profile-rect"
        style={{
          backgroundColor: "transparent",
          border: "1px solid white",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <button
          className="dropbtn"
          onClick={toggleDropdown}
          style={{
            fontSize: "16px",
            border: "none",
            outline: "none",
            color: "white",
            backgroundColor: "inherit",
            fontFamily: "inherit",
            margin: "0",
          }}
        >
          Profile&nbsp;
          <i className="fa-regular fa-user"></i>
        </button>
      </div>
      {/* Conditionally render dropdown content based on dropdownOpen state */}
      {dropdownOpen && (
        <div
          className="dropdown-content"
          style={{
            position: "absolute",
            backgroundColor: "#f9f9f9",
            minWidth: "160px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: "1",
          }}
        >
          <Link
            to={profileLink}
            style={{
              display: "block",
              padding: "12px 16px",
              textDecoration: "none",
              color: "black",
            }}
          >
            My Profile
          </Link>
          <Link
            to={signOutLink}
            style={{
              display: "block",
              padding: "12px 16px",
              textDecoration: "none",
              color: "black",
            }}
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavDropdown;
