import React from "react";
import Navbar from "../../components/Navbar/NavBarPage.js";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../components/AuthContext.js";

function ProfilePage() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer
        footerUserType={`footer-container__${user.userType.toLocaleLowerCase()}`}
      />
    </>
  );
}

export default ProfilePage;
