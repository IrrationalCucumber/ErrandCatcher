import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="home">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <div className="content">
          <img src="./images/tawo.png" alt="" />
        </div>
        <div className="content">
          <h1>
            Your <span>Errand Service</span> Website
          </h1>
          <p>
            Errand Catchers offer a convenient solution for individuals
            requiring assistance with various task and chores. Whether it
            involves grocery shopping, picking up prescriptions, mailing
            packages, or managing daily errands, these services focus on saving
            time and streamlining life.
          </p>
          <div className="ld_btn">
            <a href="sign-up" id="getStartedLink">
              <i className="fa-solid fa-house"></i> GET STARTED
            </a>
          </div>
          <div className="btns">
            <a href="map">
              <i className="fa fa-eye"></i> VIEW ERRANDS{" "}
            </a>
          </div>
        </div>
      </div>

      <section className="Services" id="Services">
        <h1>
          <span>S</span>ervices
        </h1>
        <div className="box-container">
          <div className="box">
            <img src="/images/img1.png" alt="" />
            <div className="content">
              <p>Transportation</p>
              <h3>
                {" "}
                <i className="fas fa-map-marker-alt"></i> Mandaue City{" "}
              </h3>
              <div className="btn">
                <a href="sign-up">
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <img src="/images/img2.png" alt="" />
            <div className="content">
              <p>Delivery</p>
              <h3>
                {" "}
                <i className="fas fa-map-marker-alt"></i> Lapu-Lapu City{" "}
              </h3>

              <div className="btn">
                <a href="sign-up">
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <img src="/images/img3.png" alt="" />
            <div className="content">
              <p>Home Service</p>
              <h3>
                {" "}
                <i className="fas fa-map-marker-alt"></i> Cebu City{" "}
              </h3>
              <div className="btn">
                <a href="sign-up">
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="box">
            <img src="/images/img1.png" alt="" />
            <div className="content">
              <p>Transportation</p>
              <h3>
                {" "}
                <i className="fas fa-map-marker-alt"></i> Cebu City{" "}
              </h3>

              <div className="btn">
                <a href="sign-up">
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="People" id="People">
        <h1>
          <span>P</span>eople
        </h1>
        <div className="box-container">
          <div className="box">
            <div className="content">
              <h3>Employer</h3>
              <p>
                The individuals that seeks assistance from the catcher to
                complete an errand
              </p>
            </div>
            <img src="/images/employer.png" alt="" />
          </div>

          <div className="box">
            <div className="content">
              <h3>Catcher</h3>
              <p>
                The service providers that offers their service and skill to the
                employer's errands
              </p>
            </div>
            <img src="/images/employee.png" alt="" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
