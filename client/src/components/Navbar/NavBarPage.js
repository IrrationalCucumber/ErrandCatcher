import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./NavButton";
import "./Navbar.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Close, More } from "@mui/icons-material";

function Navbar() {
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

  const navigate = useNavigate();

  //function for my back
  const goBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  return (
    <>
      <nav className="navbar__page">
        <div className="navbar-container justify-center">
          {/* <Link className="navbar-logo" onClick={goBack}>
            <ArrowBackIcon />
          </Link> */}
          <Link
            // to={`/home/${userID}`}
            to={`/dashboard/home`}
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
            <li className="nav-item"></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
/**
 * <li className='nav-item'>
                    <Link to='/commission' className='nav-links' onClick={closeMobileMenu}>
                      Commission
                    </Link>
                  </li>
 */
