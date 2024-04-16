import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";

function Root() {
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  const page = location.pathname.split("/")[1];
  //setState for account type
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get-type/${userID}`);
        //console.log(res.data);
        setType(res.data);
        console.log(type);
      } catch (err) {
        console.log(err);
      }
    };
    fetchType();
  }, [type]);
  return (
    <>
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
        </>
      )}
      {type.toLocaleUpperCase() === "ADMIN" && (
        <>
          <Navbar
            page1="HOME"
            home={`/home/${userID}`}
            // {`admin-home/${userID}`}
            page2="ACCOUNT LIST"
            commissionList={`/accounts/${userID}`}
            page3="COMMISSION LIST"
            applicants={`/commission-list/${userID}`}
            page4="MAP"
            map={`/map`}
          />
        </>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
