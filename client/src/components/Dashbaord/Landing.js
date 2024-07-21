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
            <p>Details</p>
            <p>
              sample lng ni... Errand Catchers offer a convenient solution for
              individuals requiring assistance with various task and chores.
              Whether it involves grocery shopping, picking up prescriptions,
              mailing packages, or managing daily errands, these services focus
              on saving time and streamlining life.
            </p>
          </div>
        </section>
        <section className="landing__cont">
          <div className="landing__text__left">
            <h2>OUTDOOR SERVICES</h2>
            <p>Details</p>
            <p>
              sample lng ni... Errand Catchers offer a convenient solution for
              individuals requiring assistance with various task and chores.
              Whether it involves grocery shopping, picking up prescriptions,
              mailing packages, or managing daily errands, these services focus
              on saving time and streamlining life.
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
            <p>Details</p>
            <p>
              sample lng ni... Errand Catchers offer a convenient solution for
              individuals requiring assistance with various task and chores.
              Whether it involves grocery shopping, picking up prescriptions,
              mailing packages, or managing daily errands, these services focus
              on saving time and streamlining life.
            </p>
          </div>
        </section>
        <section className="landing__cont">
          <div className="landing__text__left">
            <h2>TRANSPORTATION</h2>
            <p>Details</p>
            <p>
              sample lng ni... Errand Catchers offer a convenient solution for
              individuals requiring assistance with various task and chores.
              Whether it involves grocery shopping, picking up prescriptions,
              mailing packages, or managing daily errands, these services focus
              on saving time and streamlining life.
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
