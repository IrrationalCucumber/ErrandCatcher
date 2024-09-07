import React from "react";
import "./HeroSection.css";
import "../App.css";

export function HeroSection(props) {
  return (
    <div className="hero-container">
      <video src="/videos/video-test-1.mp4" autoPlay loop muted />
      <h1>
        WELCOME BACK, {props.type} {props.username}
      </h1>
      <p>See what errand is available</p>
    </div>
  );
}

export function bannerHeroSection() {
  return <div>Hi</div>;
}
