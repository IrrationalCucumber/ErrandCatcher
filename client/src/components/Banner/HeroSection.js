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

export function bannerHeroSection() {
  return <div>Hi</div>;
}
