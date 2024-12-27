import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../components/AuthContext";
import "./css/navbar.css";
import { Badge } from "@mui/joy";
import { ApplicantsCount } from "../../components/Display/DsiplayFunctions";
import axios from "axios";

function Dashboard() {
  const { user, updateUser } = useAuth();
  useEffect(() => {
    const fetchHasErrand = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/check-has-errand/${user.userID}`
        );

        // Create a new object with updated `hasErrand` but keeping other fields the same
        const updatedUserData = {
          ...user, // Spread the existing user data
          hasErrand: res.data.userHasErrand, // Update only `hasErrand`
        };

        // Update user in the context
        updateUser(updatedUserData);

        console.log("Updated hasErrand:", res.data.userHasErrand);
      } catch (error) {
        console.error("Error fetching hasErrand:", error);
      }
    };

    fetchHasErrand(); // Fetch initially
    const interval = setInterval(fetchHasErrand, 110000); // Fetch every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user, updateUser]); // Ensure the effect runs when `user` or `updateUser` changes

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
                      size="md"
                      variant="solid"
                      sx={{
                        "& .MuiBadge-badge": {
                          border: "none",
                          boxShadow: "none",
                        },
                        p: 0.5,
                      }}
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
