import axios from "axios";
import React, { useState } from "react";

const RequestModal = ({ request, handleClose }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleVerify = async (requestUserID) => {
    try {
      const status = "Verified";
      await axios.put(
        `http://localhost:8800/change-status/${requestUserID}/${status}`
      );
      console.log("Request verified:", request);
      setIsButtonClicked(true);
      /**
       * ADD NOTFICATION FOR REQUESTER
       */
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnverify = async (requestUserID) => {
    // You can implement the logic to mark the request as unverified here
    try {
      const status = "Suspended";
      await axios.put(
        `http://localhost:8800/change-status/${requestUserID}/${status}`
      );
      console.log("Request verified:", request);
      setIsButtonClicked(true);
      /**
       * ADD NOTFICATION FOR REQUESTER
       */
    } catch (err) {
      console.log(err);
    }
  };

  const formattedDate = (theDate) => {
    const date = new Date(theDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]; // Get the month and year from the date object
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Construct the formatted date string
    return `${month} ${date.getDate()}, ${year}`;
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={handleClose} style={closeStyle}>
          <i className="far fa-circle-xmark"></i>
        </span>
        <h2 style={{ margin: "20px" }}>Verification Request Details</h2>
        <p>
          <strong>Full Name:</strong> {request.userFirstname}{" "}
          {request.userLastname}
        </p>
        <p>
          <strong>Gender:</strong> {request.userGender}
        </p>
        <p>
          <strong>Age:</strong> {request.userAge}
        </p>
        <p>
          <strong>Birthdate:</strong> {formattedDate(request.userBirthday)}
        </p>
        <p>
          <strong>Address:</strong> {request.userAddress}
        </p>
        <p>
          <strong>Contact Number:</strong> {request.contactNumber}
        </p>
        <p>
          <strong>Email Address:</strong> {request.userEmail}
        </p>
        {request.images && (
          <div>
            <h3>Images</h3>
            {request.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </div>
        )}
        <div>
          <button
            onClick={(e) => handleVerify(request.requestUserID)}
            style={Veributton}
          >
            VerifY
          </button>
          <button
            onClick={(e) => handleUnverify(request.requestUserID)}
            style={Veributton}
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
};

const Veributton = {
  width: "100px",
  height: "30px",
  borderRadius: "10px",

  margin: "20px",
  gap: "20px",
  cursor: "pointer",
};

Veributton[":hover"] = {
  backgroundColor: "#4CAF50",
  color: "white",
};

Veributton[":active"] = {
  backgroundColor: "#45a049",
  color: "white",
};

const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const modalContentStyle = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
  maxWidth: "500px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const closeStyle = {
  color: "#aaa",
  float: "right",
  fontSize: "28px",
  fontWeight: "bold",
};

export default RequestModal;
