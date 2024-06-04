import React from "react";
import { Button } from "./Navbar/NavButton";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <section className="footer-subscription">
          <div className="input-areas"></div>
        </section>
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items"></div>
          </div>
        </div>
        <section className="social-media">
          <div className="social-media-wrap">
            {/* About Us */}
            <div className="footer-logo">
              <Link to="/us/about" className="social-logo">
                About Us
              </Link>
            </div>
            {/* Contact Us */}
            <div className="footer-logo">
              <Link to={"/us/contact"} className="social-logo">
                Contact Us
              </Link>
            </div>
            <small className="website-rights">© ERRAND CATCHER</small>
            <div className="social-icons">
              <Link
                className="social-icon-link facebook"
                to="/"
                target="_blank"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>

              <Link
                className="social-icon-link instagram"
                to="/"
                target="_blank"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>

              <Link
                className="social-icon-link twitter"
                to="/"
                target="_blank"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </Link>

              <Link
                className="social-icon-link linkedin"
                to="/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
