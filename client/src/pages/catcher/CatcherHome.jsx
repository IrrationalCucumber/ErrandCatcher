//gi tangtang nako ang herosection for homepageee

import React from "react";
import NavBar from "../../components/Navbar/Navbar";
//import HeroSection from "../components/HeroSection";
import { useLocation } from "react-router-dom";
import Menu from "../Menu";

function CatcherHome() {
  //get the id from the address bar
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/c-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/catcher-errands/${userID}`}
        page3="APPLICATIONS"
        applicants={`/my-application/${userID}`}
        map={`/c-map/${userID}`}
        page4="MAP"
      />

      <Menu />
      {/* <Footer/> */}
    </div>
  );
}

export default CatcherHome;
