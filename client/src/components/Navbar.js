import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import { Button } from "./NavButton";
import "./Navbar.css";
import { useAuth } from "./AuthContext";
import NotificationIcon from "./notif-icon";
import NavDropdown from "./NavDropdown";

function Navbar(props) {
  //change the state of the menu
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  //reverse the state of the above funstion
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
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
                style={{ backgroundColor: "#3d342f" }}
              >
                <img
                  src="/ERicon.png"
                  alt="ERRAND CATCHER Icon"
                  className="logo-image"
                  style={{ width: "50px", height: "50px" }} // Adjust the width and height as needed
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
                <NotificationIcon
                  to={`/notifications/${userID}`}
                  hasNotification={true}
                  onClick={() => console.log("Notification clicked!")}
                />
              </div>
            </li>
            <li className="nav-item">
              <div
                className="dropdown-container"
                style={{
                  marginRight: "1rem",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
              >
                <NavDropdown />
              </div>
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
