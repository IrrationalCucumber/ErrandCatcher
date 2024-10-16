import React from "react";
import "./css/style.css";

export default function Landing() {
  return <div>Landing</div>;
}

export function LandingServiceDetails() {
  return (
    <>
      <div className="wrapper">
        <section className="landing__cont">
          <div
            className="landing__bg__left"
            // style={{
            //   background:
            //     "rgb(255, 255, 255) url('/images/hs-i-4.jpg') no-repeat fixed left / 70% 100%",
            // }}
          >
            <button className="landing__service__btn__lt">VIEW ERRANDS</button>
          </div>
          <div className="landing__text__right">
            <h2>INDOOR SERVICES</h2>
            <p>
              From organizing your space to managing household chores, our
              indoor services are designed to make your home life stress-free.
            </p>
          </div>
        </section>
        <section className="landing__cont">
          <div className="landing__text__left">
            <h2>OUTDOOR SERVICES</h2>
            <p>
              Whether it’s yard work, pet walking, or running outdoor errands,
              we handle all the tasks you need outside your home.
            </p>
          </div>
          <div
            className="landing__bg__right"
            style={{
              background:
                "rgb(255, 255, 255) url('/images/hs-o-1.jpg') no-repeat fixed right / 70% 100%",
            }}
          >
            <button className="landing__service__btn__rt">VIEW ERRANDS</button>
          </div>
        </section>
        <section className="landing__cont">
          <div
            className="landing__bg__left"
            style={{
              background:
                "rgb(255, 255, 255) url('/images/d-1.jpg') no-repeat fixed left / 70% 100%",
            }}
          >
            <button className="landing__service__btn__lt">VIEW ERRANDS</button>
          </div>
          <div className="landing__text__right">
            <h2>DELIVERY</h2>
            <p>
              Need something delivered? Whether it's groceries, packages, or
              special orders, we've got you covered.
            </p>
          </div>
        </section>
        <section className="landing__cont">
          <div className="landing__text__left">
            <h2>TRANSPORTATION</h2>
            <p>
              Whether you need a ride to an important appointment, a stress-free
              airport transfer, or a comfortable vehicle for a road trip, our
              transportation services have you covered.
            </p>
          </div>
          <div
            className="landing__bg__right"
            style={{
              background:
                "rgb(255, 255, 255) url('/images/t-1.jpg') no-repeat fixed right / 70% 100%",
            }}
          >
            <button className="landing__service__btn__rt">VIEW ERRANDS</button>
          </div>
        </section>
      </div>
    </>
  );
}
