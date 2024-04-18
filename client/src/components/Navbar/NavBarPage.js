import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./NavButton";
import "./Navbar.css";

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
      <nav className="navbar">
        <div className="navbar-container">
          <Link className="navbar-logo" onClick={goBack}>
            <i class="fa-solid fa-arrow-left"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
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
