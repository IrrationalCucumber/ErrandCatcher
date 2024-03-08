import React from "react";
import NavBar from "../components/Navbar";
import Cards from "../components/Cards";
import { useLocation } from "react-router-dom";

function CatcherHome() {
  //get the id from the address bar
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        map={`/map/${userID}`}
        button="SIGN OUT"
      />
      <Cards></Cards>
    </div>
  );
}

export default CatcherHome;
