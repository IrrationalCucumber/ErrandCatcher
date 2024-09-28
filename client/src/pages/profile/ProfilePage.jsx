import React from "react";
import Navbar from "../../components/Navbar/NavBarPage.js";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default ProfilePage;
