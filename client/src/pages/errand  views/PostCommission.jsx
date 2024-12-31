//03-21-24 logic for the image is in here but needed testing

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Commission.css"; // Import your CSS file
import ErrandInputs from "../../components/ErrandInputs";
import { MapLibre, PostMapBox } from "../../components/Map/Map";
//image --ash
import { useAuth } from "../../components/AuthContext";
import { Alert, IconButton } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button } from "@mui/joy";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../../components/LoadingSpinner";
import Snackbar from "@mui/joy/Snackbar";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ModalFeedback from "../../components/ModalFeedback";

const PostCommission = () => {
  const [commission, setCommission] = useState({
    empID: "",
    comTitle: "",
    comStart: "",
    comDeadline: "",
    comLocation: "",
    comTo: "",
    comType: "",
    comDescription: "",
    comPay: 0,
    DatePosted: "",
    Contactno: "",
    comLong: "",
    comLat: "",
    comDestLong: 0,
    comDestLat: 0,
    comTags: "",
  });

  const navigate = useNavigate();
  //get user id from url
  const { user } = useAuth();
  const userID = user.userID;
  //use state for adding marker
  //const [addingMarker, setAddingMarker] = useState(false);
  //const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [distance, setDistance] = useState(0);
  const accessToken =
    "pk.eyJ1IjoibWlyYWthNDQiLCJhIjoiY20xcWVhejZ0MGVzdjJscTF5ZWVwaXBzdSJ9.aLYnU19L7neFq2Y7J_UXhQ";
  // Add a state to track the marker's longitude and latitude
  // const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values
  //alert feedback
  const [alertMesg, setAlerMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opensnack, setOpenSnack] = useState(false);

  // modal message pop-up
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate(`/dashboard/errands`);
  };
  //update the info that will be stored
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle specific fields that need to be parsed as numbers
    if (["comPay", "comDestLong", "comDestLat"].includes(name)) {
      // Parse as a float for these fields
      setCommission((prev) => ({ ...prev, [name]: parseFloat(value) }));
    }
    // Handle dropdowns like "comType" and "method"
    else if (name === "comType" || name === "method") {
      setCommission((prev) => ({ ...prev, [name]: value }));
    }
    // Handle other fields as strings
    else {
      setCommission((prev) => ({ ...prev, [name]: value }));
    }
  };

  //set minimum pay for delvery and transpo
  const [minimum, setMinimum] = useState(500);
  const handleStartLocationSelect = (coordinates) => {
    setCommission((prev) => ({
      ...prev,
      comLat: coordinates[1], // Set latitude for starting location
      comLong: coordinates[0], // Set longitude for starting location
    }));
  };

  const handleLocationSelect = (coordinates) => {
    setCommission((prev) => ({
      ...prev,
      comDestLat: coordinates[1], // Set latitude for destination
      comDestLong: coordinates[0], // Set longitude for destination
    }));
  };

  useEffect(() => {
    if (
      commission.comType === "Delivery" ||
      commission.comType === "Transportation"
    ) {
      const km = distance / 1000; //meter to km
      const baseAmount = 100;
      const total = Math.round(km) * 15 + baseAmount;
      // Correctly update commission state without losing other fields
      setMinimum(total);
      setCommission((prev) => ({
        ...prev,
        comPay: total,
      }));
    } else {
      setCommission((prev) => ({
        ...prev,
        comPay: "",
      }));
      setMinimum(500);
    }
  }, [commission.comType, distance]);

  //pull the local time of the pc
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //store the inputted info to db
  //trigers when clicked
  console.log(commission);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const currentDate = getCurrentDate();
      const updatedCommission = {
        ...commission,
        DatePosted: currentDate,
        empID: userID,
      };

      // Add end date validation
      const isEndDateValid =
        !commission.comStart ||
        !commission.comDeadline ||
        new Date(commission.comDeadline) > new Date(commission.comStart);

      if (
        !commission.comTitle ||
        !commission.comStart ||
        !commission.comDeadline ||
        !commission.comLocation ||
        !commission.comType ||
        !commission.comPay ||
        !commission.Contactno ||
        !commission.comDeadline ||
        !commission.comDescription
      ) {
        setAlerMsg("Some fields are missing!");
        setShowAlert(true);
        handleScrollToTop();
      } else if (!isEndDateValid) {
        setAlerMsg("End date must be after the start date!");
        setShowAlert(true);
        handleScrollToTop();
      } else if (commission.comPay < minimum) {
        setAlerMsg("The salary is lower than the suggested payment!");
        setShowAlert(true);
        handleScrollToTop();
      } else if (
        (commission.comType === "Delivery" ||
          commission.comType === "Transportation") &&
        (!commission.comDestLat || !commission.comDestLong || !commission.comTo)
      ) {
        setAlerMsg("Some fields are missing!");
        setShowAlert(true);
        handleScrollToTop();
      } else {
        await axios.post("http://localhost:8800/commission", updatedCommission);
        await axios.post("http://localhost:8800/notify-catcher");

        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          // modal will pop-up in 2 seconds
          handleOpen();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Makes the scrolling smooth
    });
  };

  return (
    <>
      {showAlert && (
        <Alert
          color="danger"
          size="md"
          variant="solid"
          startDecorator={<WarningIcon />}
          endDecorator={
            <IconButton
              variant="soft"
              color="danger"
              onClick={() => setShowAlert(false)}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          {alertMesg}
        </Alert>
      )}
      <Snackbar
        variant="solid"
        color="success"
        size="lg"
        open={opensnack}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<PostAddIcon />}
        endDecorator={
          <Button
            onClick={() => navigate(`/dashboard/errands`)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        Successfully You have Posted an Errand!
      </Snackbar>
      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait while Posting Your Errand"
        icons={<HourglassBottomIcon />}
      />
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Success!"
        contentMes="You have successfully posted an Errand"
        color="success"
        colorText="green"
      />
      <div className="errand-cont">
        <div className="input-cont">
          <div className="errand-inputs">
            <ErrandInputs
              handleChange={handleChange}
              variant="soft"
              title="comTitle"
              start="comStart"
              deadline="comDeadline"
              location="comLocation"
              to="comTo"
              toValue={commission.comTo}
              accessToken={accessToken}
              onStartLocationSelect={handleStartLocationSelect}
              onLocationSelect={handleLocationSelect}
              type="comType"
              typeValue={commission.comType}
              desc="comDescription"
              pay="comPay"
              payValue={commission.comPay}
              method="method"
              methodValue={commission.method}
              number="Contactno"
              long={commission.comLong}
              lat={commission.comLat}
              destlong={commission.comDestLong}
              destlat={commission.comDestLat}
              distance={distance}
              minimum={minimum}
              tagValue={commission.comTags}
              tags="comTags"
            />
          </div>
          {commission.comType !== "Delivery" &&
            commission.comType !== "Transportation" && (
              <div className="map--wrap">
                <MapLibre
                  getCoords={(lat, long) => {
                    setCommission((prev) => ({
                      ...prev,
                      comLat: lat,
                      comLong: long,
                    }));
                  }}
                />
              </div>
            )}
          {(commission.comType === "Delivery" ||
            commission.comType === "Transportation") && (
            <>
              <PostMapBox
                accessToken={accessToken}
                getDistanceCallback={(
                  distance,
                  originCoordinates,
                  destinationCoordinates
                ) => {
                  setDistance(distance);
                  setCommission((prev) => ({
                    ...prev,
                    comLat: originCoordinates[1],
                    comLong: originCoordinates[0],
                    comDestLong: destinationCoordinates[0],
                    comDestLat: destinationCoordinates[1],
                  }));
                }}
              />
            </>
          )}
        </div>
        <div className="butonn">
          <Box sx={{ display: "flex", marginLeft: 2 }}>
            <Button
              sx={{ width: "200px", borderRadius: "20px" }}
              size="lg"
              color="primary"
              onClick={handleClick}
            >
              POST
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default PostCommission;
