/**
 *
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "../style.css";
import ErrandInputs from "../../components/ErrandInputs";
import "./Commission.css"; // Import your CSS file
import { useAuth } from "../../components/AuthContext";
import { ViewMap, ViewMapBox } from "../../components/Map/Map";
import ApplicationQualificationModal from "../../components/ApplicationModal/ApplicationQualificationModal";
import {
  Alert,
  Button,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { CheckCircle, CloseRounded } from "@mui/icons-material";
import ModalFeedback from "../../components/ModalFeedback";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../../components/LoadingSpinner";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ErrandPage = () => {
  const [commission, setCommission] = useState({
    employerID: "",
    comTitle: "",
    comStart: "",
    comDeadline: "",
    comLocation: "",
    comType: "",
    comDescription: "",
    comPay: "",
    comStatus: "",
    comTo: "",
    DateCompleted: "",
    ContactNo: "",
    comLong: "",
    comLat: "",
    last: "",
    first: "",
    destLng: "",
    destLat: "",
    tags: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // modal message pop-up
  const [openFeedmodal, setOpenFeedmodal] = useState(false);
  const handleOpen = () => {
    setOpenFeedmodal(true);
  };
  const handleClose = () => {
    setOpenFeedmodal(false);
    window.location.reload();
  };

  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split("/")[3];
  const { user } = useAuth();
  const userID = user.userID;
  const accessToken =
    "pk.eyJ1IjoibWlyYWthNDQiLCJhIjoiY20xcWVhejZ0MGVzdjJscTF5ZWVwaXBzdSJ9.aLYnU19L7neFq2Y7J_UXhQ";
  const [distance, setDistance] = useState();
  //alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMesg, setAlerMsg] = useState("");
  const [alrtColor, setAlrtColor] = useState("");

  //APS - 19/03/24
  //CHeck if Catcher already applied
  //setState if applies
  const [isApplied, setIsApplied] = useState(false);
  // const [appID, setAppID] = useState("");
  useEffect(() => {
    if (user.userType === "Catcher") {
      const fetchApp = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8800/get-apply/${userID}/${commissionID}`
          );
          console.log(res.data[0]);
          if (!!res.data[0]) {
            setIsApplied(true);
          }
          console.log(isApplied);
        } catch (err) {
          console.log(err);
        }
      };
      fetchApp();
      const interval = setInterval(fetchApp, 3000);
      return () => clearInterval(interval);
    }
  }, [isApplied, user.userType, userID, commissionID]);

  //pre-fill the fields
  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/errand/${commissionID}`
        );
        const retrievedCommission = res.data[0];
        //format date
        // const formattedDate = new Date(retrievedCommission.commissionDeadline)
        //   .toISOString()
        //   .substr(0, 10);
        // const formatStart = new Date(retrievedCommission.commissionStartDate)
        //   .toISOString()
        //   .substr(0, 10);

        const options = {
          timeZone: "Asia/Manila",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };

        // Format Deadline
        const formattedDate = new Date(retrievedCommission.commissionDeadline)
          .toLocaleDateString("en-CA", options) // Use "en-CA" for ISO-style YYYY-MM-DD
          .split("/")
          .reverse()
          .join("-"); // Optional, to ensure consistent formatting

        // Format Start Date
        const formatStart = new Date(retrievedCommission.commissionStartDate)
          .toLocaleDateString("en-CA", options) // Same as above
          .split("/")
          .reverse()
          .join("-");

        // Update the state with retrieved account data
        setCommission({
          employerID: retrievedCommission.employerID,
          comTitle: retrievedCommission.commissionTitle,
          comDeadline: formattedDate,
          comStart: formatStart,
          comLocation: retrievedCommission.commissionLocation,
          comTo: retrievedCommission.commissionTo,
          comType: retrievedCommission.commissionType,
          comDescription: retrievedCommission.commissionDesc,
          comPay: retrievedCommission.commissionPay,
          comStatus: retrievedCommission.commissionStatus,
          catcherID: retrievedCommission.catcherID,
          //DatePosted:"",
          //DateCompleted:retrievedCommission.,
          ContactNo: retrievedCommission.ContactNumber,
          comLong: retrievedCommission.commissionLong,
          comLat: retrievedCommission.commissionLat,
          last: retrievedCommission.userLastname,
          first: retrievedCommission.userFirstname,
          destLat: retrievedCommission.commissionDestLat,
          destLng: retrievedCommission.commissionDestLong,
          tags: retrievedCommission.commissionTags,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCommission();
  }, [commissionID]);

  //Transfer to update page
  const handleClick = (e) => {
    e.preventDefault();
    try {
      //alert("You have updated your Errand");
      navigate(`/errand/update/${commissionID}`);
    } catch (err) {
      console.log(err);
    }
  };

  //apply for errand
  // Application state
  const [application, setApplication] = useState({
    catcherID: "",
    comID: "",
    applicationDate: "",
  });

  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
  });
  //get current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //button clicked apply
  const handleApply = async (e) => {
    try {
      //console.log(userID); // Check if userID is correct

      //assign values to the variables in application
      application.applicationDate = getCurrentDate();
      application.comID = commissionID;
      application.catcherID = user.userID;

      console.log(application); // Check the updated commission object
      await axios.post("http://localhost:8800/apply", application);

      //add a notification to the commission's employer
      notif.notifDesc = "A Catcher has applied to on of your errand";
      notif.userID = commission.employerID;
      notif.notificationType = "Errand Application";

      await axios.post("http://localhost:8800/notify", notif);
      // setAlerMsg("You have applied to this Errand!");
      // setShowAlert(true);
      // setAlrtColor("success");
      // handleScrollToTop();

      setLoading(true);

      setTimeout(() => {
        handleScrollToTop();
        setLoading(false);
        // modal will pop-up in 2 seconds
        handleOpen();
      }, 2000);

      //alert(application.qualifications);
      //navigate(`/application/${userID}`);
      //console.log(notif); // check variables state
    } catch (err) {
      console.log(err);
    }
  };
  //scroll on top to see alert
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Makes the scrolling smooth
    });
  };
  // console.log(commission);

  //check for matching skills
  const [catcher, setCatcher] = useState([]);
  const [matchSkillCount, setMatchSkillCount] = useState(0);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios(`http://localhost:8800/user/${user.userID}`);
        const skillArray = res.data.map((skill) => skill.userQualification);
        setCatcher(skillArray[0].split(",")); // Ensure catcher is an array
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
  }, [user.userID]);

  useEffect(() => {
    if (catcher.length > 0 && commission.tags) {
      const commissionTagsArray = commission.tags.split(","); // Ensure commission.tags is an array
      const matchedSkills = catcher.filter((skill) =>
        commissionTagsArray.includes(skill)
      );
      setMatchSkillCount(matchedSkills.length);
    }
  }, [catcher, commission.tags]);
  console.log(user);
  return (
    <>
      {showAlert && (
        <Alert
          color={alrtColor}
          size="md"
          variant="solid"
          startDecorator={<CheckCircle />}
          sx={{ borderRadius: "none" }}
          endDecorator={
            <IconButton
              variant="soft"
              color={alrtColor}
              onClick={() => setShowAlert(false)}
            >
              <CloseRounded />
            </IconButton>
          }
        >
          {alertMesg}
        </Alert>
      )}

      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait while Applying to Errand"
        icons={<HourglassBottomIcon />}
      />

      <ModalFeedback
        open={openFeedmodal}
        handleClose={handleClose}
        headerMes="Success!"
        contentMes="You have applied to this Errand!"
        color="success"
        colorText="green"
      />

      <div className="errand-cont">
        <div className="input-cont">
          <div className="errand-inputs">
            <ErrandInputs
              employer="Employer"
              fname={commission.first}
              lname={commission.last}
              statusHeader="Status"
              status={commission.comStatus}
              variant="solid"
              title="comTitle"
              readOnly={true}
              methodValue={commission.method}
              titleValue={commission.comTitle}
              startValue={commission.comStart}
              dlValue={commission.comDeadline}
              locValue={commission.comLocation}
              toValue={commission.comTo}
              typeValue={commission.comType}
              descValue={commission.comDescription}
              payValue={commission.comPay}
              numValue={commission.ContactNo}
              distance={distance}
              tags="comTags"
              tagValue={commission.tags}
            />
          </div>
          {commission.comType !== "Delivery" &&
            commission.comType !== "Transportation" && (
              <>
                <ViewMap id={commissionID} />
              </>
            )}
          {commission.comType === "Delivery" && (
            <>
              <ViewMapBox
                accessToken={accessToken}
                interactive={false}
                getDistanceCallback={(distance, origin, destination) => {
                  console.log(distance, origin, destination);
                  setDistance(distance);
                }}
                initialOrigin={{
                  lat: commission.comLat,
                  lng: commission.comLong,
                }}
                initialDestination={{
                  lat: commission.destLat,
                  lng: commission.destLng,
                }}
              />
            </>
          )}
          {commission.comType === "Transportation" && (
            <>
              <ViewMapBox
                accessToken={accessToken}
                interactive={false}
                getDistanceCallback={(distance, origin, destination) => {
                  console.log(distance, origin, destination);
                  setDistance(distance);
                }}
                initialOrigin={{
                  lat: commission.comLat,
                  lng: commission.comLong,
                }}
                initialDestination={{
                  lat: commission.destLat,
                  lng: commission.destLng,
                }}
              />
            </>
          )}
        </div>
        {commission.employerID === user.userID && (
          <button className="formButton" onClick={handleClick}>
            UPDATE
          </button>
        )}

        {user.hasErrand === "true" ? (
          <Typography
            level="body-sm"
            sx={{
              ml: "1.5rem",
              mt: ".5rem",
              mb: "0.5rem",
              fontSize: "1.040rem",
              fontWeight: 500,
            }}
          >
            <WorkOutlineOutlinedIcon color="primary" /> <i>You still have an Errand to do!</i>
          </Typography>
        ) : null}
        <Typography
          level="body-sm"
          sx={{
            ml: "1.5rem",
            mt: ".5rem",
            mb: "0.5rem",
            fontSize: "1.035rem",
            fontWeight: 400,
            fontStyle: "italic",
            // color: "#1679ab",
          }}
        >
          <HowToRegIcon color="primary" /> Match Skills: {matchSkillCount}
        </Typography>
        {user.userType === "Catcher" &&
          user.status === "Verified" &&
          user.hasErrand === "false" &&
          matchSkillCount > 0 && (
            <div>
              <div className="formButton">
                <Button
                  className="formButton"
                  disabled={isApplied ? true : false}
                  size="lg"
                  variant="solid"
                  onClick={
                    isApplied
                      ? null
                      : (e) => {
                        handleApply(true);
                      }
                  }
                  style={{
                    backgroundColor: isApplied ? "none" : "",
                  }}
                >
                  {isApplied ? "Applied" : "APPLY"}
                </Button>
              </div>
            </div>
          )}
        {/* <button className="formButton" onClick={handleClick}>
          UPDATE
        </button> */}
      </div>
    </>
  );
};

export default ErrandPage;
