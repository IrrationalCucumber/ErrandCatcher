import React from "react";
import Navbar from "../../components/Navbar/NavBarPage";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

function Errands() {
  const { user } = useAuth();
  return (
    <>
      {/* {user.userType} */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Errands;
