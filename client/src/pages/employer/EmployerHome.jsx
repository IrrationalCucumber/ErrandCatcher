//added Sticky button
//03-27-24 updated the design
import React from "react";
import NavBar from "../../components/Navbar/Navbar";
//import HeroSection from '../components/HeroSection'
import { useLocation } from "react-router-dom";
import Menu from "../Menu";
import StickyButton from "../../components/Sticky Button/StickyButton";
import EmployerCard from "../../components/Employer Cards/EmployerCards";
import Cards from "../../components/Cards/Cards";
import Footer from "../../components/Footer";

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
        page2="ERRANDS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        page4="MAP"
        map={`/e-map/${userID}`}
      />

      <EmployerCard />
      <div>
        <h2
          className="recently-posted"
          style={{
            borderBottom: "1px solid gray",
            fontSize: "18px",
            paddingTop: "60px",
            paddingLeft: "20px",
            color: "Black",
          }}
        >
          Recently Posted
        </h2>
        {/* Add your component or content for displaying recently posted items here */}
        <Cards />
      </div>

      {/* <Menu /> */}

      {/*destination is post commission */}
      <StickyButton
        buttonText="Post Errand"
        destination={`/post-commission/${userID}`}
      />
      <Footer />
    </div>
  );
}

export default EmployerHome;
