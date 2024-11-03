import React from "react";
import { Button } from "./Navbar/NavButton";
import { Link } from "react-router-dom";
import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Twitter, Instagram } from "@mui/icons-material";

function Footer(props) {
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
                to="https://www.facebook.com/profile.php?id=61559396743151"
                target="_blank"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </Link>

              <Link
                className="social-icon-link instagram"
                to="/"
                target="_blank"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>

              <Link
                className="social-icon-link twitter"
                to="/"
                target="_blank"
                aria-label="Twitter"
              >
                <Twitter />
              </Link>

              <Link
                className="social-icon-link linkedin"
                to="https://www.linkedin.com/in/adrean-paul-soro%C3%B1o-400b712a3/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
