//03-21-24 logic for the image is in here but needed testing

import React, { useRef, useEffect, useState } from "react";
//map
import maplibregl from "maplibre-gl";
//import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/NavBarPage";
import "./Commission.css"; // Import your CSS file
import ErrandInputs from "../../components/ErrandInputs";
//image --ash
import { useAuth } from "../../components/AuthContext";

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
    comDestLong: 0,
    comDestLat: 0,
  });

  const navigate = useNavigate();
  //get user id from url
  const { user } = useAuth();
  const userID = user.userID;
  //use state for adding marker
  //const [addingMarker, setAddingMarker] = useState(false);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  // Add a state to track the marker's longitude and latitude
  // const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

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
      center: [123.8854, 10.3157],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLng = position.coords.longitude;
        const currentLat = position.coords.latitude;
        setCommission((prev) => ({
          ...prev,
          comLong: currentLng,
          comLat: currentLng,
        }));

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
  //add another marker if delvery or transpo
  const [marker, setMarker] = useState(null);
  const addMarker = () => {
    const newLngLat = currentLocationMarker.getLngLat();
    const currentLng = newLngLat.lng;
    const currentLat = newLngLat.lat;
    setCommission((prev) => ({
      ...prev,
      comDestLong: currentLng,
      comDestLat: currentLat,
    }));

    const newMarker = new maplibregl.Marker({
      draggable: true,
    })
      .setLngLat([currentLng, currentLat])
      .setPopup(new maplibregl.Popup().setHTML("<h3>Add Destination</h3>"))
      .addTo(map.current);
    //add new marker
    newMarker.on("dragend", () => {
      const newLngLat = newMarker.getLngLat();
      setCommission((prev) => ({
        ...prev,
        comDestLong: newLngLat.lng,
        comDestLat: newLngLat.lat,
      }));
    });
    //ad
    setMarker(newMarker);
  };
  // Function to handle removing marker
  const removeMarker = () => {
    if (marker) {
      marker.remove();
      setMarker(null);
    }
  };
  //add or remove marker if type is correct
  useEffect(() => {
    const type = commission.comType;
    if (type === "Delivery" || type === "Transportation") {
      if (type === "Delivery") {
        addMarker();
      } else if (type === "Transportation") {
        addMarker();
      }
    }
    if (type !== "Delivery" || type !== "Transportation") {
      removeMarker();
    }
  }, [commission.comType]); // Add dependencies if your conditions depend on props or state

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
      if (
        !commission.comTitle ||
        !commission.comStart ||
        !commission.comDeadline ||
        !commission.comLocation ||
        !commission.comType ||
        !commission.comPay ||
        !commission.Contactno ||
        !commission.comDescription
      ) {
        if (
          commission.comType == "Delivery" ||
          commission.comType == "Transportation"
        ) {
          if (
            !commission.comTitle ||
            !commission.comStart ||
            !commission.comDeadline ||
            !commission.comType ||
            !commission.comPay ||
            !commission.comLocation ||
            !commission.comTo ||
            !commission.Contactno ||
            !commission.comDescription
          )
            alert("Empty fields");
        }
      } else if (commission.comLat === "" && commission.comLong === "") {
        alert("Looks like you havent set the location in the Map");
      } else {
        await axios.post("http://localhost:8800/commission", updatedCommission);
        await axios.post("http://localhost:8800/notify-catcher");

        alert("You have Posted an Errand!");
        navigate(`/dashboard/commissions`);
        // setOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="errand-cont">
        <ErrandInputs
          handleChange={handleChange}
          variant="soft"
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
          destlong={commission.comDestLong}
          destlat={commission.comDestLat}
          
        />
        <div className="btn-container">
          <button onClick={handleClick} className="btn btn-yellow" style={{}}>
            POST
          </button>
        </div>
      </div>
    </>
  );
};

export default PostCommission;
