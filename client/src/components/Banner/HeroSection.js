import React from "react";
import "./HeroSection.css";
import "../../App.css";

export function HeroSection(props) {
  return (
    <div className="hero-container">
      <h1>
        {props.type} {props.username}
      </h1>
      <p>WELCOME BACK!</p>
    </div>
  );
}

export function BannerOngoingSection(props) {
  return (
    <div className="ongoing-hero-container">
      <h1>
        Your currently <i>Catched</i> errands, {props.username}
      </h1>
    </div>
  );
}

export function BannerEmployerPages(props) {
  return (
    <>
      <div className="employer__hero__container">
        <h1>{props.bannerMessage}</h1>
      </div>
    </>
  );
}
