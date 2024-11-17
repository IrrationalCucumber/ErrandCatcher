import React from "react";
import Navbar, { NoUserNabar } from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";

function Us() {
  const { user } = useAuth();
  return (
    <>
      {!user ? (
        <>
          <NoUserNabar />
        </>
      ) : (
        <>
          {user.userType === "Employer" && (
            <>
              <Navbar
                navbar_ui={"navbar__employer"}
                page1="ONGOING"
                one={`/dashboard/ongoing`}
                page2="COMMISSIONS"
                commissionList={`/dashboard/errands`}
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
                navbar_ui={"navbar__catcher"}
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
                navbar_ui={"navbar__admin"}
                page1="REQUESTS"
                one={`/dashboard/admin/request`}
                // {`admin-home/${userID}`}
                page2="ACCOUNTS"
                commissionList={`/dashboard/admin/accounts`}
                page3="ERRANDS"
                applicants={`/dashboard/admin/commission-list`}
                page4="MAP"
                map={`/dashboard/admin/map`}
              />
            </>
          )}
        </>
      )}

      <Outlet />
      <Footer
        footerUserType={`footer-container__${user.userType.toLocaleLowerCase()}`}
      />
    </>
  );
}

export default Us;
