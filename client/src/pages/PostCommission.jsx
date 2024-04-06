//03-21-24 logic for the image is in here but needed testing

import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
//import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/NavBarPage";
import "./Commission.css"; // Import your CSS file
import ErrandInputs from "../components/ErrandInputs";
//image --ash
import deliveryImage from "./PostServices/img1.png";
import homeImage from "./PostServices/img3.png";
import transpoImage from "./PostServices/img2.png";

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
    comPay: "",
    DatePosted: "",
    //DateCompleted: "",
    Contactno: "",
    comLong: "",
    comLat: "",
  });

  const navigate = useNavigate();
  //get user id from url
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //use state for adding marker
  //const [addingMarker, setAddingMarker] = useState(false);

  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  // Add a state to track the marker's longitude and latitude
  const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

  //update the info that will be stored
  const handleChange = (e) => {
    if (e.target.name === "comType") {
      setCommission((prev) => ({ ...prev, comType: e.target.value }));
    } else {
      setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //pull the local time of the pc
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //FOR NOTIFICATION
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });
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

  //event handler when user add marker

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

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLng = position.coords.longitude;
        const currentLat = position.coords.latitude;

        const marker = new maplibregl.Marker({
          color: "#00FF00",
          draggable: true,
        }) // Set draggable to true
          .setLngLat([currentLng, currentLat])
          .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
          .addTo(map.current);

        setCurrentLocationMarker(marker);

        // Event listener for marker dragend event
        marker.on("dragend", () => {
          const newLngLat = marker.getLngLat();
          setCommission((prev) => ({
            ...prev,
            comLong: newLngLat.lng,
            comLat: newLngLat.lat,
          }));
        });
      });
    }
  }, [API_KEY, zoom]);

  // Handle dragend event of the marker to update coordinates
  useEffect(() => {
    if (currentLocationMarker) {
      currentLocationMarker.on("dragend", () => {
        const newLngLat = currentLocationMarker.getLngLat();
        setCommission((prev) => ({
          ...prev,
          comLong: newLngLat.lng,
          comLat: newLngLat.lat,
        }));
      });
    }
  }, [currentLocationMarker]);

  // --ash
  const getErrandImage = (type) => {
    switch (type) {
      case "delivery":
        return deliveryImage;
      case "home":
        return homeImage;
      case "transpo":
        return transpoImage;

      default:
        return null;
    }
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
      if (commission.comLat == "" && commission.comLong == "") {
        alert("Looks like you havent set the location in the Map");
      } else {
        await axios.post("http://localhost:8800/commission", updatedCommission);

        //add a notification to the commission's employer
        notif.notifDesc = "A new Errand has been posted";
        //notif.userID = commission.employerID;
        notif.notificationType = "New Errand";
        notif.notifDate = getTimeAndDate();

        await axios.post("http://localhost:8800/notify", notif);
        alert("You have Posted an Errand!");
        navigate(`/commissions/${userID}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="errand-cont">
        <ErrandInputs
          handleChange={handleChange}
          title="comTitle"
          start="comStart"
          deadline="comDeadline"
          location="comLocation"
          to="comTo"
          type="comType"
          typeValue={commission.comType}
          desc="comDescription"
          pay="comPay"
          number="Contactno"
          mapContainer={mapContainer}
          long={commission.comLong}
          lat={commission.comLat}
        />

        {commission.comType && (
          <div className="errand-image" style={{ display: "hidden" }}>
            <img
              src={getErrandImage(commission.comType)}
              alt={`${commission.comType} Errand`}
            />
          </div>
        )}
        {/* --ash */}
        {commission.comType === "delivery" && (
          <img src={deliveryImage} alt="Delivery" />
        )}
        {commission.comType === "home" && <img src={homeImage} alt="Home" />}
        {commission.comType === "transpo" && (
          <img src={transpoImage} alt="Transpo" />
        )}

        <div className="btn-container">
          <button onClick={handleClick} className="btn btn-yellow">
            POST
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCommission;
