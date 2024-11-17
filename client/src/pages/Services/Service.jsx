import React from "react";
import Navbar from "../../components/Navbar/NavBarPage";
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
          <Footer
            footerUserType={`footer-container__${user.userType.toLocaleLowerCase()}`}
          />
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </>
  );
}

export default Service;
