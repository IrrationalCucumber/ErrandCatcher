import React, { useState } from "react";
import "./profile.css";
import StarRating from "../Display/StarRating";
import { Link } from "react-router-dom";
import { Button, Input } from "@mui/joy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function UserProfile(props) {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

    if (props.handleImage) {
      props.handleImage(e);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <>
      <div className="profile-page-container">
        {/* Left Profile Section */}
        <div className="profile-left">
          {preview ? (
            <>
              {/* Display Preview Image */}
              <img
                src={preview}
                alt="Preview Image"
                // width={250}
                // height={250}
                style={{
                  padding: "20px",
                  border: "1px solid skyblue",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                }}
              />
              <button
                onClick={handleDeleteImage}
                style={{
                  border: "none",
                  backgroundColor: isHovered ? "#ffcccc" : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                <DeleteIcon
                  sx={{ fontSize: 30 }}
                  color="error"
                />
              </button>
            </>
          ) : (
            // If no preview, show existing profile image or default
            <>
              {props.profileImg ? (
                <img
                  src={`http://localhost:8800/images/profile/${props.profileImg}`}
                  alt="ProfPic"
                />
              ) : (
                <img src="/images/employer.png" alt="Profile Picture" />
              )}
            </>
          )}

          <div className="upload-container">
            <input
              type="file"
              id="file"
              onChange={handleImage}
              style={{ display: "none" }}
            />
            <label htmlFor="file"
              style={{
                // border: "1px dashed black",
                border: "none",
                flexDirection: "row",
                gap: "4px",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                maxWidth: "18rem",
                display: "flex",
                alignContent: "center",
                justifyContent: "center"
              }}>
              <AddAPhotoIcon color="primary" />
              Choose Image File
            </label>

            <Button
              loading={false}
              onClick={props.handleUpload}
              size="md"
              variant="solid"
            >
              <FileUploadIcon />
            </Button>
          </div>

          <div className="info">
            {/* {props.address} */}

            <input
              type="text"
              className="profile__info__left"
              placeholder="Address"
              name="address"
              value={props.address}
              onChange={props.handleChange}
            />
            {/* {props.email} */}
            <input
              type="email"
              className="profile__info__left"
              placeholder="Email Address"
              name="email"
              value={props.email}
              onChange={props.handleChange}
            />
            {/* {props.cnum} */}
            <input
              type="number"
              className="profile__info__left"
              placeholder="Contact Number"
              name="cnum"
              value={props.cnum}
              onChange={props.handleChange}
            />
            <br />
          </div>
          <br />
          <textarea
            className="description"
            placeholder="Description"
            // onChange={handleChange}
            name="desc"
            value={props.desc}
          ></textarea>
          {props.type === "Catcher" && (
            <div className="rating">
              Overall Rating:
              <span>
                <StarRating rating={props.rate} />
                <p>
                  <i>{props.rate}</i>
                </p>
              </span>
            </div>
          )}
        </div>

        {/* Right Profile Section */}
        <div className="profile-right">
          {props.status === "Verified" ? (
            <>
              <div className="verified">{props.status.toLocaleUpperCase()}</div>
            </>
          ) : (
            <Link
              to={`/profile/verification`}
              style={{ textDecoration: "none" }}
            >
              <div className="unverified">
                {props.status.toLocaleUpperCase()}
              </div>
            </Link>
          )}
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Username"
            name="username"
            value={props.username}
            onChange={props.handleChange}
          ></input>

          <label htmlFor="first-name">First name :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Name"
            name="fname"
            value={props.fname}
            onChange={props.handleChange}
          ></input>

          <label htmlFor="last-name">Last name :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Last name"
            name="lname"
            value={props.lname}
            onChange={props.handleChange}
          ></input>

          <label htmlFor="sex">Sex :</label>
          <select
            className="display-data1"
            value={props.sex}
            onChange={props.handleChange}
            name="gender"
          >
            gender
            <option value="">Choose gender....</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="age">Age :</label>
          <input
            type="number"
            name="age"
            // className="display-data1"
            placeholder="Age"
            value={props.age}
            onChange={props.handleChange}
            min={1}
            max={99}
          ></input>
          <input
            type="date"
            className="display-data1"
            value={props.bday}
            onChange={props.handleChange}
            placeholder="Date of birth"
          ></input>

          <div className="buttons">
            {/* <button>Edit</button> */}
            <button onClick={props.click}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
