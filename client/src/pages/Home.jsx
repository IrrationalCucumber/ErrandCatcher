import React, { useEffect, useState } from "react";
import EmployerCard from "../components/Employer Cards/EmployerCards";
import Menu from "./Menu";
import { useAuth } from "../components/AuthContext";
import {
  BannerEmployerPostErrand,
  HeroSection,
} from "../components/Banner/HeroSection";
import RequestHeroSection, {
  AdminHeroSection,
} from "../components/admin/RequestHeroSection";
import { HomeMap } from "../components/Map/Map";
import { Alert, Button, Sheet } from "@mui/joy";
import { MyFeedback, MyPostedFeedback } from "../components/Dashbaord/Feedback";
import TopCatcher from "../components/Carousel/TopCatcher";
import CardsNew from "../components/Cards/CardsNew";
import CardsRecentErrands from "../components/Cards/CardsRecentErrands";
import axios from "axios";

const Home = () => {
  const { user } = useAuth();
  const userID = user.userID;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/check-token/${userID}`
        );
        if (response.data.exists) {
          setShowAlert(true);
          console.log(response.data.exists);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };

    checkVerificationStatus();
  }, [userID]);

  return (
    <>
      <div>
        {showAlert && (
          <Alert
            color="warning"
            variant="solid"
            sx={{
              position: "fixed",
              top: "80", // Adjust this value based on your navbar height
              left: 0,
              right: 0,
              zIndex: 11,
              mb: 2,
              width: "100%",
            }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                Close
              </Button>
            }
          >
            You have not been verified yet. Please check your email for the
            verification link.
          </Alert>
        )}
        {user.userType === "Employer" && (
          <>
            {/* <Navbar
              page1="ONGOING"
              one={`/ongoing/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/commissions/${userID}`}
              page3="APPLICANTS"
              applicants={`/applicants/${userID}`}
              page4="MAP"
              map={`/e-map/${userID}`}
            /> */}
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <EmployerCard />
            <BannerEmployerPostErrand />
            <div className="landing__map">
              <HomeMap id={user.userID} />
            </div>
          </>
        )}
        {user.userType === "Catcher" && (
          <>
            {/* <Navbar
              // page1="HOME"
              // home={`/home/${userID}`}
              page2="COMMISSIONS"
              commissionList={`/catcher-errands/${userID}`}
              page3="APPLICATIONS"
              applicants={`/my-application/${userID}`}
              map={`/e-map/${userID}`}
              page4="MAP"
            /> */}
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <Menu />
          </>
        )}
        {user.userType.toLocaleUpperCase() === "ADMIN" && (
          <>
            <HeroSection
              type={user.userType.toLocaleUpperCase()}
              username={user.username}
            />
            <Menu />
            {/* <RequestHeroSection />
            <AdminHeroSection /> */}
            <TopCatcher />
          </>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
