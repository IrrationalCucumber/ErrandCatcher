import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TopCatcher() {
  const [catchers, setCatchers] = useState([]);
  //fetch top rated catchers
  useEffect(() => {
    const fetchCatchers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/top-rated");
        setCatchers(res.data);
      } catch (error) {
        console.error("Error fetching top rated catchers:", error);
      }
    };
    fetchCatchers();
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
    >
      {/* 
        Carusel card/items
      */}
      <div className="carousel-inner">
        {catchers.map((catcher, index) => (
          <div
            // set the first item  in the object to be active
            //
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={catcher.feedbackID}
            data-bs-interval="5000"
          >
            {/* 
              temp image
              Change image to profile or something appropriate
            */}
            <img
              src="/images/catcher.png"
              className="d-block w-100"
              alt="..."
            />
            {/* 
              change placeholder texts
            */}
            <div className="carousel-caption d-none d-md-block">
              <h4>{catcher.averageRate}</h4>
              <h5>{catcher.username}</h5>
              {/* <p>Some representative placeholder content for the slide.</p> */}
            </div>
          </div>
        ))}
      </div>
      {/* 
          Navigation Control buttons
        */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
