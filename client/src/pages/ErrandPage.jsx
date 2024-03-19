import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { useNavigate, Link, useLocation } from "react-router-dom";
//import "../style.css";
import ErrandInputs from "../components/ErrandInputs";
import Navbar from "../components/NavBarPage";
import "./Commission.css"; // Import your CSS file

const ErrandPage = () => {
  const [commission, setCommission] = useState({
    employerID: "",
    comTitle: "",
    comDeadline: "",
    comLocation: "",
    comType: "",
    comDescription: "",
    comPay: "",
    comStatus: "",
    DateCompleted: "",
    ContactNo: "",
    comLong: "",
    comLat: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split("/")[3];
  //console.log(location.pathname.split("/")[2]);
  const userID = location.pathname.split("/")[2];

  //setState for account type
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get-type/${userID}`);
        //console.log(res.data);
        setType(res.data);
        console.log(type);
        // if (status.toUpperCase == "VERIFIED" || status == "Verified") {
        //   setVerified(true);
        //   console.log(verified);
        // }
      } catch (err) {
        console.log(err);
      }
    };
    fetchType();
  }, [type]);

  // Add a state to track the marker's longitude and latitude
  const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

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

  //get the coordinates of the cerrand
  const fetchLoc = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/commission/${commissionID}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  //pre-fill the fields
  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/commission/${commissionID}`
        );
        const retrievedCommission = res.data[0];
        //format date
        const formattedDate = new Date(retrievedCommission.commissionDeadline)
          .toISOString()
          .substr(0, 10);

        // Update the state with retrieved account data
        setCommission({
          employerID: retrievedCommission.employerID,
          comTitle: retrievedCommission.commissionTitle,
          comDeadline: formattedDate,
          comLocation: retrievedCommission.commissionLocation,
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
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCommission();
  }, [commissionID]);

  //MAP
  //variables for map
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [API_KEY] = useState("ZQyqv6eWtI6zNE29SPDd");
  const [zoom] = useState(10);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: markerLngLat,
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    //display the current coordinate of the errand
    fetchLoc().then((commissions) => {
      commissions.forEach((commission) => {
        const currentLng = commission.commissionLong;
        const currentLat = commission.commissionLat;
        const marker = new maplibregl.Marker({
          color: "#FF0000",
          //draggable: true,
        }) // Red marker for commissions
          .setLngLat([currentLng, currentLat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${commission.commissionTitle}</h3><p>${commission.commissionDesc}</p>`
            )
          )
          .addTo(map.current);

        setCurrentLocationMarker(marker);
      });
    });
  }, [API_KEY, zoom]);
  //Transfer to update page
  const handleClick = (e) => {
    e.preventDefault();
    try {
      //alert("You have updated your Errand");
      navigate(`/update-commission/${commissionID}/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(commission);
  //APS - 19/03/2024
  //funtion to apply as Catcher
  //setSate object for apply
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
    notifDate: "", //time and date notif is added
  });
  //get current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //get current time and date for notif
  const getTimeAndDate = () => {
    const currentDate = new Date();
    // Get the date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    // Get the time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Create a string representing the current date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  //click event for apply
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      console.log(userID); // Check if userID is correct

      //   //assign values to the variables in application
      //   application.applicationDate = getCurrentDate();
      //   application.comID = commissionID;
      //   application.catcherID = userID;

      //   console.log(application); // Check the updated commission object
      //   await axios.post("http://localhost:8800/apply", application);

      //add a notification to the commission's employer
      notif.notifDesc = "A Catcher has applied to on of your errand";
      notif.userID = commission.employerID;
      notif.notificationType = "Errand Application";
      notif.notifDate = getTimeAndDate();

      await axios.post("http://localhost:8800/notify", notif);
      alert("You have applied to this Errand!");
      //navigate(`/application/${userID}`);
      console.log(notif); // check variables state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="errand-cont">
        <ErrandInputs
          handleChange={handleChange}
          //   title="comTitle"
          titleValue={commission.comTitle}
          //   deadline="comDeadline"
          dlValue={commission.comDeadline}
          //   location="comLocation"
          locValue={commission.comLocation}
          //   type="comType"
          typeValue={commission.comType}
          //   desc="comDescription"
          descValue={commission.comDescription}
          //   pay="comPay"
          payValue={commission.comPay}
          //   number="Contactno"
          numValue={commission.ContactNo}
          mapContainer={mapContainer}
          long={commission.comLong}
          lat={commission.comLat}
        />
        <br />
        {type === "Employer" && (
          <button className="formButton" onClick={handleClick}>
            UPDATE
          </button>
        )}
        {type === "Catcher" && (
          <button className="formButton" onClick={handleApply}>
            APPLY
          </button>
        )}
        {/* <button className="formButton" onClick={handleClick}>
          UPDATE
        </button> */}
      </div>
    </div>
  );
};

export default ErrandPage;
