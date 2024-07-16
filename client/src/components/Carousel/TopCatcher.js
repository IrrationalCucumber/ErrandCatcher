import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TopCatcher() {
  const [catchers, setCatchers] = useState([]);
  useEffect(() => {
    const fetchCatchers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/top-rated");
        setCatchers(res.data);
      } catch (error) {}
    };
    fetchCatchers();
  }, []);

  return (
    <>
      {/* <div>TopCatcher</div>
      {catchers.map((catcher) => (
        <div key={catcher.feedbackID}>
          {catcher.username} : {catcher.averageRate}
        </div>
      ))} */}
      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        {/* 
          Line Indicators 
          User can preess to select what to display
        */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
            data-bs-ride="carousel"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        {/* Item/Cards to display */}
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img src="/images/car.png" className="d-block w-50" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src="/images/hr.png" className="d-block w-50" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img src="/images/img2.png" className="d-block w-50" alt="..." />
          </div>
        </div>
        {/* 
          Previos and Next button
        */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
