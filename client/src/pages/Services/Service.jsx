import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";

function Service() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </>
  );
}

export default Service;
