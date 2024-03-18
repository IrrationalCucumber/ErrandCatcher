import React from "react";
import NavBar from "../components/Navbar";
import { useLocation } from "react-router-dom";

function AdminHome() {
  //carry id to other page
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //pathname to array from

  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/admin-home`}
        // {`admin-home/${userID}`}
        page2="ACCOUNT LIST"
        commissionList={`/accounts`}
        page3="COMMISSION LIST"
        applicants={`/commission-list`}
        page4="MAP"
        map={`/map`}
      />
    </div>
  );
}

export default AdminHome;
