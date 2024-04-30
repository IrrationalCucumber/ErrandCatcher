//03-21-24 logic for the image is in here but needed testing

import React, { useRef, useEffect, useState } from "react";
//map
// import maplibregl from "maplibre-gl";
//import 'maplibre-gl/dist/maplibre-gl.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Commission.css"; // Import your CSS file
import ErrandInputs from "../../components/ErrandInputs";
import Map from "../../components/Map/MapBox";
import MapLibre from "../../components/Map/MapLibre";
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
    comPay: 0,
    DatePosted: "",
    //DateCompleted: "",
    Contactno: "",
    comLong: "",
    comLat: "",
    comDestLong: 0,
    comDestLat: 0,
    method: "",
  });

  const navigate = useNavigate();
  //get user id from url
  const { user } = useAuth();
  const userID = user.userID;
  //use state for adding marker
  //const [addingMarker, setAddingMarker] = useState(false);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [distance, setDistance] = useState(0);
  const accessToken =
    "pk.eyJ1Ijoiam9pbmVyIiwiYSI6ImNsdmNjbnF4NjBoajQycWxoaHV5b2M1NzIifQ.Z7Pi_LfWyuc7a_z01zKMFg";

  // Add a state to track the marker's longitude and latitude
  // const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values

  //update the info that will be stored
  const handleChange = (e) => {
    if (e.target.name === "comType") {
      setCommission((prev) => ({ ...prev, comType: e.target.value }));
    } else if (e.target.name === "method") {
      setCommission((prev) => ({ ...prev, method: e.target.value }));
    } else {
      setCommission((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
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

      setCommission((prev) => ({
        ...prev,
        comPay: total,
      }));
    } else {
      setCommission((prev) => ({
        ...prev,
        comPay: "",
      }));
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
              type="comType"
              typeValue={commission.comType}
              desc="comDescription"
              pay="comPay"
              payValue={commission.comPay}
              method="method"
              methodValue={commission.method}
              number="Contactno"
              //mapContainer={mapContainer}
              long={commission.comLong}
              lat={commission.comLat}
              destlong={commission.comDestLong}
              destlat={commission.comDestLat}
            />
          </div>
          {commission.comType !== "Delivery" &&
            commission.comType !== "Transportation" && (
              <div className="map--wrap">
                {/* <div ref={mapContainer} className="map-small" /> */}
                <MapLibre
                  getCoords={(lat, long) => {
                    setCommission((prev) => ({
                      ...prev,
                      comLat: lat,
                      comLong: long,
                    }));
                  }}
                />
                <p className="coords">
                  X: {commission.comLong} Y: {commission.comLat}
                </p>
              </div>
            )}
          {commission.comType === "Delivery" && (
            <>
              <Map
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
          {commission.comType === "Transportation" && (
            <>
              <Map
                accessToken={accessToken}
                getDistanceCallback={(distance) => {
                  setDistance(distance);
                }}
              />
            </>
          )}
        </div>
        <button onClick={handleClick} className="btn btn-yellow" style={{}}>
          POST
        </button>
      </div>
    </>
  );
};

export default PostCommission;
