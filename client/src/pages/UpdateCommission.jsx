import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { useNavigate, Link, useLocation } from "react-router-dom";
//import "../style.css";
import ErrandInputs from "../components/ErrandInputs";
import Navbar from "../components/NavBarPage";
import "./Commission.css"; // Import your CSS file

const UpdateCommission = () => {
  const [commission, setCommission] = useState({
    comTitle: "",
    comDeadline: "",
    comLocation: "",
    comType: "",
    comDescription: "",
    comPay: "",
    comStatus: "",
    //catcherID:"",
    //DatePosted:"",
    DateCompleted: "",
    ContactNo: "",
    comLong: "",
    comLat: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split("/")[2];
  console.log(location.pathname.split("/")[2]);
  const userID = location.pathname.split("/")[3];

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

  //funtion to delete commission
  const handleDelete = async (commissionID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/commission/${commissionID}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
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

    //if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const currentLng = position.coords.longitude;
    //     const currentLat = position.coords.latitude;
    //     const marker = new maplibregl.Marker({
    //       color: "#00FF00",
    //       draggable: true,
    //     }) // Set draggable to true
    //       .setLngLat([currentLng, currentLat])
    //       .setPopup(new maplibregl.Popup().setHTML("<h3>Add location</h3>"))
    //       .addTo(map.current);
    //     setCurrentLocationMarker(marker);
    //     // Event listener for marker dragend event
    //     marker.on("dragend", () => {
    //       const newLngLat = marker.getLngLat();
    //       setCommission((prev) => ({
    //         ...prev,
    //         comLong: newLngLat.lng,
    //         comLat: newLngLat.lat,
    //       }));
    //     });
    //   });

    //display the current coordinate of the errand
    fetchLoc().then((commissions) => {
      commissions.forEach((commission) => {
        const currentLng = commission.commissionLong;
        const currentLat = commission.commissionLat;
        const marker = new maplibregl.Marker({
          color: "#FF0000",
          draggable: true,
        }) // Red marker for commissions
          .setLngLat([currentLng, currentLat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${commission.commissionTitle}</h3><p>${commission.commissionDesc}</p>`
            )
          )
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
    });
  }, [API_KEY, zoom]);

  // Handle dragend event of the marker to update coordinates
  useEffect(() => {
    if (currentLocationMarker) {
      const updateLngLat = () => {
        const newLngLat = currentLocationMarker.getLngLat();
        setCommission((prev) => ({
          ...prev,
          comLong: newLngLat.lng,
          comLat: newLngLat.lat,
        }));
      };

      currentLocationMarker.on("dragend", updateLngLat);

      return () => {
        // Remove the event listener when the component unmounts
        currentLocationMarker.off("dragend", updateLngLat);
      };
    }
  }, [currentLocationMarker]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //account.dateCreated = getCurrentDate();
      await axios.put(
        "http://localhost:8800/update-commission/" + commissionID,
        commission
      );
      navigate(`/commissions/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(commission);

  return (
    <div>
      <Navbar />
      <div className="errand-cont">
        <ErrandInputs
          handleChange={handleChange}
          title="comTitle"
          titleValue={commission.comTitle}
          deadline="comDeadline"
          dlValue={commission.comDeadline}
          location="comLocation"
          locValue={commission.comLocation}
          type="comType"
          typeValue={commission.comType}
          desc="comDescription"
          descValue={commission.comDescription}
          pay="comPay"
          payValue={commission.comPay}
          number="Contactno"
          numValue={commission.ContactNo}
          mapContainer={mapContainer}
          long={commission.comLong}
          lat={commission.comLat}
        />
        <br />
        <button className="formButton" onClick={handleClick}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UpdateCommission;
/**
 * <label>
        Commission Title
        <input
          type="text"
          placeholder="Commission Title"
          onChange={handleChange}
          name="comTitle"
          value={commission.comTitle}
        />
      </label>
      <label>
        Deadline
        <input
          type="date"
          placeholder="Deadline"
          onChange={handleChange}
          name="comDeadline"
          value={commission.comDeadline}
        />
      </label>
      Location
      <input
        type="text"
        placeholder="Location"
        onChange={handleChange}
        name="comLocation"
        value={commission.comLocation}
      />
      <label htmlFor="">
        Commission Type
        <select
          name="comType"
          onChange={handleChange}
          value={commission.comType}
        >
          <option value="">Choose type....</option>
          <option value="HomeService - Indoor">Home Service - Indoor</option>
          <option value="HomeService - Outdoor">Home Service - Outdoor</option>
          <option value="Delivery">Delivery Service</option>
          <option value="Transport">Transport Service</option>
        </select>
      </label>
      <textarea
        cols="20"
        rows="11"
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="comDescription"
        value={commission.comDescription}
      />
      <label>
        Amount: ₱
        <input
          type="number"
          placeholder="0.00"
          onChange={handleChange}
          name="comPay"
          value={commission.comPay}
        />
      </label>
      <input
        type="text"
        value={commission.ContactNo}
        onChange={handleChange}
        placeholder="Contact Number"
        name="ContactNo"
      />{" "}
      */
