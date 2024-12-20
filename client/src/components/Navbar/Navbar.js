//03-16-24 to make the design responsive

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import "./Navbar.css";
import { useAuth } from "../AuthContext";
import NotificationIcon from "./notif-icon";
import NavDropdown from "./NavDropdown";
import axios from "axios";
import { Button } from "./NavButton";
import Notification from "../NotificationNavbar/Notification";
import { Close, MenuBook, More } from "@mui/icons-material";

function Navbar(props) {
  const { user } = useAuth();
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
  const userID = user.userID;

  const [notifCount, setNotifCount] = useState("");
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/count/${userID}`);
        setNotifCount(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
    const intervalNotif = setInterval(fetchNotif, 1000);
    return () => clearInterval(intervalNotif);
  }, [userID]);

  return (
    <>
      <nav className="navbar__cont">
        <div className="navbar-container justify-center">
          <Link
            // to={`/home/${userID}`}
            to={`dashboard/home`}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <Link
              //to={`/home/${userID}`}
              to={`/dashboard/home`}
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
            {click ? <Close /> : <More />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {props.one ? (
              <li className="nav-item">
                <Link
                  to={props.one}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {props.page1}
                </Link>
              </li>
            ) : null}
            {props.commissionList ? (
              <li className="nav-item">
                <Link
                  to={props.commissionList}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {props.page2}
                </Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link
                to={props.applicants}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                {props.page3}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={props.map}
                className="nav-links"
                onClick={closeMobileMenu}
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
                  <>
                    <Notification count={notifCount} />
                    {/* <NotificationIcon
                      to={`/notifications`}
                      hasNotification={true}
                      onClick={() => console.log("Notification clicked!")}
                      style={{ color: "white" }}
                      notificationCount={parseInt(notifCount)}
                    /> */}
                  </>
                ) : (
                  <div>
                    <Link
                      to={`/notifications`}
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
                  <NavDropdown name={user.username.toUpperCase()} />
                </div>
              ) : (
                <div className="profile-signout-container">
                  <Link
                    to={`/profile/me`}
                    className="nav-links"
                    onClick={closeMobileMenu}
                    style={{ fontSize: "12px" }}
                  >
                    PROFILE
                  </Link>
                  <div className="sign-out-container">
                    <button className="sign-out-button">SIgn Out</button>
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

export function NoUserNabar() {
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
  return (
    //IF NO USER
    <>
      <nav className="navbar" style={{ position: "relative" }}>
        <div className="navbar-container justify-center">
          <Link
            // to={`/home/${userID}`}
            to={`/`}
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <Link
              //to={`/home/${userID}`}
              to={`/`}
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
            {click ? <Close /> : <More />}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
          </ul>
          {button && (
            <Button page={"/sign-in"} buttonStyle="btn--outline">
              SIGN IN
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

// {button && (
//<Button page={props.pageButton} buttonStyle="btn--outline">
//{props.button}
//</Button>
//)}
