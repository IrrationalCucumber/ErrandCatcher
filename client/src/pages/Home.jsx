import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import EmployerCard from "../Employer Cards/EmployerCards";
import StickyButton from "../components/Sticky Button/StickyButton";
import Cards from "../components/Cards/Cards";
import Menu from "./Menu";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

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
            <EmployerCard />
            <StickyButton
              buttonText="Post Errand"
              destination={`/errand/post-commission`}
            />
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
            <Menu />
          </>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
