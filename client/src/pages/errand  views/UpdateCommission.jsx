import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "../style.css";
import ErrandInputs from "../../components/ErrandInputs";
import "./Commission.css"; // Import your CSS file
import { useAuth } from "../../components/AuthContext";
import { MapLibre, ViewMapBox } from "../../components/Map/Map";

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
    ContactNo: "",
    comLong: "",
    comLat: "",
    destLng: "",
    destLat: "",
    method: "",
  });

  const [distance, setDistance] = useState(0);
  const accessToken =
    "pk.eyJ1Ijoiam9pbmVyIiwiYSI6ImNsdmNjbnF4NjBoajQycWxoaHV5b2M1NzIifQ.Z7Pi_LfWyuc7a_z01zKMFg";

  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const commissionID = location.pathname.split("/")[3];
  const { user } = useAuth();
  const userID = user.userID;
  // Add a state to track the marker's longitude and latitude
  // const [markerLngLat, setMarkerLngLat] = useState([123.8854, 10.3157]); // Default values
  // const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

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
        const formattedDate = new Date(retrievedCommission.commissionDeadline)
          .toISOString()
          .substr(0, 10);
        const formatStart = new Date(retrievedCommission.commissionStartDate)
          .toISOString()
          .substr(0, 10);
        // Update the state with retrieved account data
        setCommission({
          comTitle: retrievedCommission.commissionTitle,
          comDeadline: formattedDate,
          comStart: formatStart,
          comLocation: retrievedCommission.commissionLocation,
          comType: retrievedCommission.commissionType,
          comDescription: retrievedCommission.commissionDesc,
          comPay: retrievedCommission.commissionPay,
          comStatus: retrievedCommission.commissionStatus,
          ContactNo: retrievedCommission.ContactNumber,
          comLong: retrievedCommission.commissionLong,
          comLat: retrievedCommission.commissionLat,
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        commission.commissionDeadline > Date.now() ||
        commission.comStart > Date.now()
      ) {
        //account.dateCreated = getCurrentDate();
        commission.comStatus = "Available";
        await axios.put(
          `http://localhost:8800/update-errand/${commissionID}`,
          commission
        );
        alert("UPdate successful");
        navigate(`dashboard/commissions/${userID}`);
      } else {
        alert("Please Update the Dates in your errands");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(commission);

  return (
    <div>
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
              numValue={commission.ContactNo}
              distance={distance}
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
              <ViewMapBox
                interactive={true}
                accessToken={accessToken}
                initialOrigin={{
                  lat: commission.comLat,
                  lng: commission.comLong,
                }}
                initialDestination={{
                  lat: commission.destLat,
                  lng: commission.destLng,
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
                    destLng: destinationCoordinates[0],
                    destLat: destinationCoordinates[1],
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
                  lat: commission.destLat,
                  lng: commission.destLng,
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
                    destLng: destinationCoordinates[0],
                    destLat: destinationCoordinates[1],
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
