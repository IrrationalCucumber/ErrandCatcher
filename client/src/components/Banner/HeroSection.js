import React from "react";
import "./HeroSection.css";
import "../../App.css";
import { Button, Sheet, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

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

export function BannerEmployerPostErrand() {
  const navigate = useNavigate();
  return (
    <>
      <Sheet
        color="neutral"
        variant="soft"
        // className="employer__hero__container__post"
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color="primary" level="h1" variant="plain" sx={{ p: 2 }}>
          Hey there, want to add an Errand?
        </Typography>
        <Button
          onClick={() => navigate(`/errand/post-commission`)}
          color="primary"
          size="lg"
          variant="outlined"
          sx={{ p: 3 }}
        >
          CLICK HERE!
        </Button>
      </Sheet>
    </>
  );
}
