import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import EmployerCard from "../components/Employer Cards/EmployerCards";
import StickyButton from "../components/Sticky Button/StickyButton";
import Cards from "../components/Cards/Cards";
import Menu from "./Menu";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { HeroSection } from "../components/Banner/HeroSection";
import RequestHeroSection, {
  AdminHeroSection,
} from "../components/admin/RequestHeroSection";

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

            {/* <StickyButton
              buttonText="Post Errand"
              destination={`/errand/post-commission`}
            /> */}

            <Cards />
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
          </>
        )}
        {user.userType.toLocaleUpperCase() === "ADMIN" && (
          <>
            {/* <Navbar
              page1="REQUESTS"
              one={`/request/${userID}`}
              // {`admin-home/${userID}`}
              page2="ACCOUNTS"
              commissionList={`/accounts/${userID}`}
              page3="ERRANDS"
              applicants={`/commission-list/${userID}`}
              page4="MAP"
              map={`/map/${userID}`}
 /> */}
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <Menu />
            <RequestHeroSection />
            <AdminHeroSection />
          </>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
