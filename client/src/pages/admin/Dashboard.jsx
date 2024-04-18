import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <>
          {user.userType === "Employer" && (
            <>
              <Navbar
                page2="COMMISSIONS"
                commissionList={`/dashboard/commissions`}
                page3="APPLICANTS"
                applicants={`/dashboard/applicants`}
                page4="MAP"
                map={`/dashboard/e-map`}
              />
            </>
          )}
          {user.userType === "Catcher" && (
            <>
              <Navbar
                page2="COMMISSIONS"
                commissionList={`/dashboard/catcher-errands`}
                page3="APPLICATIONS"
                applicants={`/dashboard/my-application`}
                map={`/dashboard/c-map`}
                page4="MAP"
              />
            </>
          )}
          {user.userType.toLocaleUpperCase() === "ADMIN" && (
            <>
              <Navbar
                page1="HOME"
                home={`/dashboard/home`}
                // {`admin-home/${userID}`}
                page2="ACCOUNTS"
                commissionList={`/dashboard/accounts`}
                page3="ERRANDS"
                applicants={`/dashboard/commission-list`}
                page4="MAP"
                map={`/dashboard/map`}
              />
            </>
          )}
          <Outlet />
          <Footer />
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </>
  );
}

export default Dashboard;
