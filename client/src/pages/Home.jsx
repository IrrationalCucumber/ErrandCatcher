import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import EmployerCard from "../components/Employer Cards/EmployerCards";
import StickyButton from "../components/Sticky Button/StickyButton";
import Cards from "../components/Cards/Cards";
import Menu from "./Menu";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import {
  BannerEmployerPostErrand,
  HeroSection,
} from "../components/Banner/HeroSection";
import RequestHeroSection, {
  AdminHeroSection,
} from "../components/admin/RequestHeroSection";
import { HomeMap } from "../components/Map/Map";
import { Sheet } from "@mui/joy";
import { MyFeedback, MyPostedFeedback } from "../components/Dashbaord/Feedback";
import TopCatcher from "../components/Carousel/TopCatcher";

const Home = () => {
  const { user } = useAuth();
  const userID = user.userID;
  return (
    <>
      <div>
        {user.userType === "Employer" && (
          <>
            {/* <Navbar
              page1="ONGOING"
              one={`/ongoing/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/commissions/${userID}`}
              page3="APPLICANTS"
              applicants={`/applicants/${userID}`}
              page4="MAP"
              map={`/e-map/${userID}`}
            /> */}
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <EmployerCard />
            <BannerEmployerPostErrand />
            <div className="landing__map">
              <HomeMap id={user.userID} />
            </div>
            {/* <StickyButton
              buttonText="Post Errand"
              destination={`/errand/post-commission`}
            /> */}
            <Cards />
            <Sheet
              color="primary"
              sx={{
                width: "90%",
                height: "500px",
                overflowY: "auto",
              }}
            >
              <MyPostedFeedback />
            </Sheet>
          </>
        )}
        {user.userType === "Catcher" && (
          <>
            {/* <Navbar
              // page1="HOME"
              // home={`/home/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/catcher-errands/${userID}`}
              page3="APPLICATIONS"
              applicants={`/my-application/${userID}`}
              map={`/e-map/${userID}`}
              page4="MAP"
            /> */}
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />

            <Menu />
            <Sheet
              color="primary"
              sx={{
                width: "90%",
                height: "500px",
                overflowY: "auto",
              }}
            >
              <MyFeedback />
            </Sheet>
            <TopCatcher />
          </>
        )}
        {user.userType.toLocaleUpperCase() === "ADMIN" && (
          <>
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <Menu />
            <RequestHeroSection />
            <AdminHeroSection />
            <TopCatcher />
          </>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
