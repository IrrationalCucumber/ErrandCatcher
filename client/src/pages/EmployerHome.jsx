//added Sticky button
import React from "react";
import NavBar from "../components/Navbar";
//import HeroSection from '../components/HeroSection'
import { useLocation } from "react-router-dom";
import Menu from "./Menu";
import StickyButton from "../components/Sticky Button/StickyButton";
import EmployerCard from '../Employer Cards/EmployerCards'
import Cards from '../components/Cards'


function EmployerHome() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //pathname to array from

  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        page4="MAP"
        map={`/e-map/${userID}`}
      />
      <EmployerCard/>
      <div>
        <h2 style={{padding:"20px"}}>Recently Posted</h2>
        {/* Add your component or content for displaying recently posted items here */}
        <Cards/>
      </div>


      {/* <Menu /> */}
      {/*destination is post commission */}
      <StickyButton
        buttonText="Post Errand"
        destination={`/post-commission/${userID}`}
      />
    </div>
  );
}

export default EmployerHome;
