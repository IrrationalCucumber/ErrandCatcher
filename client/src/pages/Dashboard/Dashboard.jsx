import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";
import "./css/navbar.css";
import { Badge } from "@mui/joy";
import { ApplicantsCount } from "../../components/Display/DsiplayFunctions";

function Dashboard() {
  const { user } = useAuth();
  // const type = user.userType.toLocaleLowerCase();
  return (
    <>
      {user ? (
        <>
          {user.userType === "Employer" && (
            <>
              <Navbar
                navbar_ui={"navbar__employer"}
                page1="ONGOING ERRANDS"
                one={`/dashboard/ongoing`}
                page2="ERRAND LIST"
                commissionList={`/dashboard/errands`}
                page3={
                  <>
                    <Badge
                      badgeContent={ApplicantsCount(user.userID)}
                      color="danger"
                      size="sm"
                      variant="soft"
                      sx={{ p: 0.5 }}
                    >
                      APPLICANT
                    </Badge>
                  </>
                }
                applicants={`/dashboard/applicants`}
                page4="MAP"
                map={`/dashboard/e-map`}
              />
              <Outlet />
            </>
          )}
          {user.userType === "Catcher" && (
            <>
              <Navbar
                navbar_ui={"navbar__catcher"}
                page3="ERRANDS"
                applicants={`/dashboard/catcher-errands`}
                page4="MAP"
                map={`/dashboard/c-map`}
              />
              <Outlet />
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
                applicants={`/dashboard/admin/errand-list`}
                page4="MAP"
                map={`/dashboard/admin/map`}
              />
              <Outlet />
            </>
          )}

          <Footer />
        </>
      ) : (
        <p>Not signed in</p>
      )}
    </>
  );
}

export default Dashboard;
