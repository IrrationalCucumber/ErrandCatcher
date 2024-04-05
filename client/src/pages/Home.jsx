import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmployerCard from "../Employer Cards/EmployerCards";
import StickyButton from "../components/Sticky Button/StickyButton";
import Cards from "../components/Cards";
import Menu from "./Menu";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  //setState for account type
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get-type/${userID}`);
        //console.log(res.data);
        setType(res.data[0].accountType);
        console.log(type);
      } catch (err) {
        console.log(err);
      }
    };
    fetchType();
  }, [type]);

  return (
    <>
      <div>
        {type === "Employer" && (
          <>
            <Navbar
              page1="HOME"
              home={`/home/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/commissions/${userID}`}
              page3="APPLICANTS"
              applicants={`/applicants/${userID}`}
              page4="MAP"
              map={`/e-map/${userID}`}
            />
            <EmployerCard />
            <StickyButton
              buttonText="Post Errand"
              destination={`/post-commission/${userID}`}
            />
            <Cards />
            <Footer />
          </>
        )}
        {type === "Catcher" && (
          <>
            <Navbar
              page1="HOME"
              home={`/home/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/catcher-errands/${userID}`}
              page3="APPLICATIONS"
              applicants={`/my-application/${userID}`}
              map={`/e-map/${userID}`}
              page4="MAP"
            />
            <Menu />
          </>
        )}
        {type.toLocaleUpperCase() === "ADMIN" && (
          <>
            <Navbar
              // {`admin-home/${userID}`}
              page2="ACCOUNT LIST"
              commissionList={`/accounts`}
              page3="COMMISSION LIST"
              applicants={`/commission-list`}
              page4="MAP"
              map={`/map`}
              pageButton="/sign-in"
              button="SIGN OUT"
            />
            <Menu />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
