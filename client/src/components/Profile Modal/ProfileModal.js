import React from "react";
import "./profileModal.css"; // You can define custom styles for your profile modal if needed
import { Close } from "@mui/icons-material";

const ProfileModal = ({
  applicant,
  closeModal,
  handleAccept,
  handleDecline,
  username,
  fname,
  lname,
  email,
  num,
  rating,
  age,
}) => {
  return (
    <div className="profile-modal-container">
      <div className="profile-modal">
        <div className="profile-modal-header">
          <Close onClick={closeModal} />
        </div>
        <div className="profile-modal-content">
          <h2>{username}</h2>
          <p>
            Name: {fname} {lname}
          </p>
          <p>Age: {age}</p>
          <p>Email: {email}</p>
          <p>Contact Number: {num}</p>
          <p>Rating: {rating}</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDecline}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

//{`${applicant.userFirstname} ${applicant.userLastname}'s Profile`}
//{applicant.userEmail}
//{applicant.userContactNum}
