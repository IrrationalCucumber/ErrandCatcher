import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./Landing.css";
import "../css/Carousel.css";
import EmblaCarousel from "../components/Carousel/Carousel";

const Landing = () => {
  const [errands, setErrands] = useState([]);
  //get recent errands
  useEffect(() => {
    const recentErrnads = async () => {
      const res = await axios.get(`http://localhost:8800/recent`);
      setErrands(res.data);
    };
    recentErrnads();
  }, []);
  console.log(errands);
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
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
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      <section className="Services" id="Services">
        <h1>
          <span>S</span>ervices
        </h1>
        <div className="box-container">
          <div className="box">
            <img src="/images/img1.png" alt="" />
            <div className="content">
              <p style={{ paddingLeft: "65px" }}>Transportation</p>
              <h3>
                {" "}
                <i
                  className="fas fa-map-marker-alt"
                  style={{ paddingLeft: "90px" }}
                ></i>{" "}
                Mandaue City{" "}
              </h3>
              <div className="btn">
                <a
                  href="sign-up"
                  style={{ backgroundColor: "#1679AB", fontSize: "16px" }}
                >
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <img src="/images/img2.png" alt="" />
            <div className="content">
              <p style={{ paddingLeft: "110px" }}>Delivery</p>
              <h3>
                {" "}
                <i
                  className="fas fa-map-marker-alt"
                  style={{ paddingLeft: "90px" }}
                ></i>{" "}
                Lapu-Lapu City{" "}
              </h3>

              <div className="btn">
                <a
                  href="sign-up"
                  style={{ backgroundColor: "#1679AB", fontSize: "16px" }}
                >
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>

          <div className="box">
            <img src="/images/img3.png" alt="" />
            <div className="content">
              <p style={{ paddingLeft: "70px" }}>Home Service</p>
              <h3>
                {" "}
                <i
                  className="fas fa-map-marker-alt"
                  style={{ paddingLeft: "100px" }}
                ></i>{" "}
                Cebu City{" "}
              </h3>
              <div className="btn">
                <a
                  href="sign-up"
                  style={{ backgroundColor: "#1679AB", fontSize: "16px" }}
                >
                  <i></i> Apply{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="box">
            <img src="/images/img1.png" alt="" />
            <div className="content">
              <p style={{ paddingLeft: "60px" }}>Transportation</p>
              <h3>
                {" "}
                <i
                  className="fas fa-map-marker-alt"
                  style={{ paddingLeft: "100px" }}
                ></i>{" "}
                Cebu City{" "}
              </h3>

              <div className="btn">
                <a
                  href="sign-up"
                  style={{ backgroundColor: "#1679AB", fontSize: "16px" }}
                >
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
