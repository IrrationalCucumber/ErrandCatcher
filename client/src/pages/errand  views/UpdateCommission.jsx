import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "../style.css";
import ErrandInputs from "../../components/ErrandInputs";
import "./Commission.css"; // Import your CSS file
import { useAuth } from "../../components/AuthContext";
import { UpdateMapLibre, ViewMapBox } from "../../components/Map/Map";
import { Alert, IconButton } from "@mui/joy";
import { CloseRounded, Warning } from "@mui/icons-material";
import ModalFeedback from "../../components/ModalFeedback";

const UpdateCommission = () => {
  const [commission, setCommission] = useState({
    comTitle: "",
    comDeadline: "",
    comStart: "",
    comLocation: "",
    comTo: "",
    comType: "",
    comDescription: "",
    comPay: "",
    comStatus: "",
    Contactno: "",
    comLong: "",
    comLat: "",
    comDestLong: "",
    comDestLat: "",
    comTags: "",
  });

  const [distance, setDistance] = useState(0);
  const accessToken =
    "pk.eyJ1IjoibWlyYWthNDQiLCJhIjoiY20xcWVhejZ0MGVzdjJscTF5ZWVwaXBzdSJ9.aLYnU19L7neFq2Y7J_UXhQ";

  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split("/")[3];
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMesg, setAlerMsg] = useState("");
  const [alrtColor, setAlrtColor] = useState("");
  // Add a state to track the marker's longitude and latitude
  // const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values
  // const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  // modal message pop-up
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //handle changes
  const handleChange = (e) => {
    if (e.target.name === "comType") {
      setCommission((prev) => ({ ...prev, comType: e.target.value }));
      //setImageURL(commissionTypeImages[e.target.value]);
    } else if (e.target.name === "comDescription") {
      setCommission((prev) => ({ ...prev, comDescription: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

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

        const options = { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" };

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
          comTitle: retrievedCommission.commissionTitle,
          comDeadline: formattedDate,
          comStart: formatStart,
          comLocation: retrievedCommission.commissionLocation,
          comType: retrievedCommission.commissionType,
          comDescription: retrievedCommission.commissionDesc,
          comPay: `${retrievedCommission.commissionPay}.00`,
          comStatus: retrievedCommission.commissionStatus,
          Contactno: retrievedCommission.ContactNumber,
          comLong: retrievedCommission.commissionLong,
          comLat: retrievedCommission.commissionLat,
          comDestLat: retrievedCommission.commissionDestLat,
          comDestLong: retrievedCommission.commissionDestLong,
          comTags: retrievedCommission.commissionTags,
          comTo: retrievedCommission.commissionTo,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCommission();
  }, [commissionID]);

  const [minimum, setMinimum] = useState(0);
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
    }
  }, [commission.comType, distance]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
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
        //End date must be after the start date. Error message
      } else if (!isEndDateValid) {
        setAlerMsg("End date must be after the start date!");
        setShowAlert(true);
        setAlrtColor("danger");
        handleScrollToTop();
      } else if (
        commission.commissionDeadline < Date.now() ||
        commission.comStart < Date.now()
      ) {
        setAlerMsg("Please Update the Dates in your errands");
        setShowAlert(true);
        setAlrtColor("danger");
        handleScrollToTop();
      } else if (commission.comPay < minimum) {
        setAlerMsg("The salary is lower than the suggested payment!");
        setShowAlert(true);
        setAlrtColor("danger");
        handleScrollToTop();
      } else {
        //account.dateCreated = getCurrentDate();
        commission.comStatus = "Available";
        await axios.put(
          `http://localhost:8800/update-errand/${commissionID}`,
          commission
        );
        // popup update modal
        setTimeout(() => {
          // setLoading(false);
          // modal will pop-up in half a seconds
          handleOpen();
        }, 500);

        // setAlerMsg("Errand have been successfully updated");
        // setAlrtColor("success");
        // setShowAlert(true);
        // handleScrollToTop();
      }
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

  //console.log(commission);

  return (
    <div>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Success"
        contentMes="Errand have been successfully updated!"
        color="success"
        colorText="green"
        // icon={CancelOutlinedIcon}
      />

      {showAlert && (
        <Alert
          color={alrtColor}
          size="md"
          variant="solid"
          startDecorator={<Warning />}
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
      <div className="errand-cont">
        <div className="input-cont">
          <div className="errand-inputs">
            <ErrandInputs
              statusHeader="Status"
              status={commission.comStatus}
              handleChange={handleChange}
              title="comTitle"
              titleValue={commission.comTitle}
              deadline="comDeadline"
              start="comStart"
              startValue={commission.comStart}
              dlValue={commission.comDeadline}
              location="comLocation"
              locValue={commission.comLocation}
              to="comTo"
              toValue={commission.comTo}
              type="comType"
              typeValue={commission.comType}
              desc="comDescription"
              descValue={commission.comDescription}
              pay="comPay"
              payValue={commission.comPay}
              method="method"
              methodValue={commission.method}
              number="Contactno"
              numValue={commission.Contactno}
              distance={distance}
              minimum={minimum}
              tags="comTags"
              tagValue={commission.comTags}
            />
          </div>
          {commission.comType !== "Delivery" &&
            commission.comType !== "Transportation" && (
              <div className="map--wrap">
                {/* <div ref={mapContainer} className="map-small" /> */}
                <UpdateMapLibre
                  getCoords={(lat, long) => {
                    setCommission((prev) => ({
                      ...prev,
                      comLat: lat,
                      comLong: long,
                    }));
                  }}
                  id={commissionID}
                />
              </div>
            )}
          {commission.comType === "Delivery" && (
            <>
              <ViewMapBox
                interactive={true}
                accessToken={accessToken}
                initialOrigin={{
                  lat: commission.comLat,
                  lng: commission.comLong,
                }}
                initialDestination={{
                  lat: commission.comDestLat,
                  lng: commission.comDestLong,
                }}
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
          {commission.comType === "Transportation" && (
            <>
              <ViewMapBox
                interactive={true}
                accessToken={accessToken}
                initialOrigin={{
                  lat: commission.comLat,
                  lng: commission.comLong,
                }}
                initialDestination={{
                  lat: commission.comDestLat,
                  lng: commission.comDestLong,
                }}
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

        <br />
        <button className="formButton" onClick={handleClick}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UpdateCommission;
