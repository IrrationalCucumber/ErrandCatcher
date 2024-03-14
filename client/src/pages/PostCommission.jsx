import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
//import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./PostCommission.css"; // Import your CSS file
import ErrandInputs from "../components/ErrandInputs";
import Navbar from "../components/NavBarPage";

const PostCommission = () => {
  const [commission, setCommission] = useState({
    empID: "",
    comTitle: "",
    comDeadline: "",
    comLocation: "",
    comType: "",
    comDescription: "",
    comPay: "",
    DatePosted: "",
    DateCompleted: "",
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
  //store the inputted info to db
  //trigers when clicked
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const currentDate = getCurrentDate();
      const updatedCommission = {
        ...commission,
        DatePosted: currentDate,
        empID: userID,
      };

      await axios.post("http://localhost:8800/commission", updatedCommission);
      navigate(`/commissions/${userID}`);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <>
      <Navbar />
      <div className="errand-cont">
        <ErrandInputs
          handleChange={handleChange}
          title="comTitle"
          deadline="comDeadline"
          location="comLocation"
          type="comType"
          typeValue={commission.comType}
          desc="comDescription"
          pay="comPay"
          number="Contactno"
          mapContainer={mapContainer}
          long={commission.comLong}
          lat={commission.comLat}
        />
      </div>

      <button onClick={handleClick}>POST</button>
    </>
  );
};

export default PostCommission;
