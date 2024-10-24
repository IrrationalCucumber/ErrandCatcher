import React from "react";
import Navbar from "../../components/Navbar/NavBarPage";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

function Errands() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer footerUserType={`footer-container__admin`} />
    </>
  );
}

export default Errands;
