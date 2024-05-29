import React from "react";
import { NoUserNabar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";

function Us() {
  return (
    <>
      <NoUserNabar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Us;
