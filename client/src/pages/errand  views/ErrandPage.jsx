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
    method: "",
  });
  const [open, setOpen] = useState(false);
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
        const formattedDate = new Date(retrievedCommission.commissionDeadline)
          .toISOString()
          .substr(0, 10);
        const formatStart = new Date(retrievedCommission.commissionStartDate)
          .toISOString()
          .substr(0, 10);
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
          method: retrievedCommission.commissionPaymentMethod,
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
      alert("You have applied to this Errand!");
      //alert(application.qualifications);
      //navigate(`/application/${userID}`);
      //console.log(notif); // check variables state
    } catch (err) {
      console.log(err);
    }
  };

  console.log(commission);
  return (
    <>
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
        {user.userType === "Catcher" && user.status === "Verified" && (
          <button
            className="formButton"
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
          </button>
        )}
        {/* <button className="formButton" onClick={handleClick}>
          UPDATE
        </button> */}
        <ApplicationQualificationModal
          employerID={commission.employerID}
          userID={user.userID}
          commissionID={commissionID}
          open={open}
          close={() => setOpen(false)}
          type={commission.comType}
        />
      </div>
    </>
  );
};

export default ErrandPage;
