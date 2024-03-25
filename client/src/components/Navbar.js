//03-16-24 to make the design responsive

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import { Button } from "./NavButton";
//import "./Navbar.css";
import { useAuth } from "./AuthContext";
import NotificationIcon from "./notif-icon";
import NavDropdown from "./NavDropdown";
import axios from "axios";

function Navbar(props) {
  //change the state of the menu
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  //reverse the state of the above funstion
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  //handles the resizing of window
  window.addEventListener("resize", showButton);

  //carry id to other page
  //pathname to array from
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //REVERT THIS FOR PRIVATEROUTE
  // log uot user
  // const { logout } = useAuth();
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   logout();
  //   navigate("/");
  // };

  //APS - 14/03/2024
  //display username
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchName = async () => {
      axios
        .get(`http://localhost:8800/username/${userID}`)
        .then((response) => {
          console.log(response.data[0].username);
          setUsername(response.data[0].username);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchName();
  }, [userID]);

  const [notifCount, setNotifCount] = useState("");
  useEffect(() => {
    const fetchNotif = async () => {
      axios
        .get(`http://localhost:8800/notif-count/${userID}`)
        .then((response) => {
          //console.log(response.data[0].c);
          setNotifCount(response.data[0].c);
          //console.log(notifCount);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchNotif();
  }, [userID]);

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    // Redirect to the sign-in page
    navigate("/sign-in");
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container justify-center">
          <Link
            to={props.home}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <Link
              to={props.home}
              className="navbar-logo"
              onClick={closeMobileMenu}
            >
              <div
                className="logo-container"
                style={{ backgroundColor: "transparent" }}
              >
                <img
                  src="/ERicon.png"
                  alt="ERRAND CATCHER Icon"
                  className="logo-image"
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "transparent",
                  }} // Adjust the width and height as needed
                />
                <span className="logo-text">Errand Catcher</span>
              </div>
            </Link>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="nav-item">
              <Link
                to={props.home}
                className="nav-links"
                onClick={closeMobileMenu}
                style={{ fontSize: "16px" }}
              >
                {props.page1}
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                to={props.commissionList}
                className="nav-links"
                onClick={closeMobileMenu}
                style={{ fontSize: "16px" }}
              >
                {props.page2}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={props.applicants}
                className="nav-links"
                onClick={closeMobileMenu}
                style={{ fontSize: "16px" }}
              >
                {props.page3}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={props.map}
                className="nav-links"
                onClick={closeMobileMenu}
                style={{ fontSize: "16px" }}
              >
                {props.page4}
              </Link>
            </li>
            <li className="nav-item">
              <div
                className="notification-icon"
                style={{ marginTop: "1.7rem" }}
              >
                {button ? (
                  <NotificationIcon
                    to={`/notifications/${userID}`}
                    hasNotification={true}
                    onClick={() => console.log("Notification clicked!")}
                    style={{ color: "white" }}
                    notificationCount={notifCount}
                  />
                ) : (
                  <div>
                    <Link
                      to={`/notifications/${userID}`}
                      className="nav-links"
                      onClick={closeMobileMenu}
                      style={{ fontSize: "16px" }}
                    >
                      NOTIFICATION
                    </Link>
                  </div>
                )}
              </div>
            </li>
            <li className="nav-item">
              {button ? (
                <div className="dropdown-container">
                  <NavDropdown name={username.toUpperCase()} />
                </div>
              ) : (
                <div className="profile-signout-container">
                  <Link
                    to={`/profile/${userID}`}
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ fontSize: "16px" }}
                  >
                    PROFILE
                  </Link>
                  <div className="sign-out-container">
                    <button className="sign-out-button" onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
          {/*Added by --Ash for notification */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

// {button && (
//<Button page={props.pageButton} buttonStyle="btn--outline">
//{props.button}
//</Button>
//)}
