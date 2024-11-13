import React, { useState } from "react";
import "./profile.css";
import StarRating from "../Display/StarRating";
import { Link } from "react-router-dom";
import { Button, Input, Sheet, Typography } from "@mui/joy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Capitalize,
  DisplayDate,
  GetUserAge,
} from "../Display/DsiplayFunctions";

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
                className="user_profile_pic"
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
                <DeleteIcon sx={{ fontSize: 30 }} color="error" />
              </button>
            </>
          ) : (
            // If no preview, show existing profile image or default
            <>
              {props.profileImg ? (
                <img className="user_profile_pic"
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
            <label
              // className="prolabel"
              htmlFor="file"
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
                justifyContent: "center",
              }}
            >
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
              // className="profile__info__left"
              className={`profile__info__left ${props.validationErrors.address ? "error" : ""
                }`}
              placeholder="Address"
              name="address"
              value={props.address}
              onChange={props.handleChange}
              disabled={!props.isEditing}
            />
            {/* {props.email} */}
            <input
              type="email"
              // className="profile__info__left"
              className={`profile__info__left ${props.validationErrors.email ? "error" : ""
                }`}
              placeholder="Email Address"
              name="email"
              value={props.email}
              onChange={props.handleChange}
              disabled={!props.isEditing}
            />
            {/* {props.cnum} */}
            <input
              type="number"
              // className="profile__info__left"
              className={`profile__info__left ${props.validationErrors.contact ? "error" : ""
                }`}
              placeholder="Contact Number"
              name="contact"
              value={props.cnum}
              onChange={props.handleChange}
              disabled={!props.isEditing}
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
          {
            //display sumbitted IDs of user
            props.verFront || props.verBack ? (
              <>
                <div className="id_1">
                  <img
                    src={`http://localhost:8800/images/docu/${props.verFront}`}
                    alt="Front"
                  />

                </div>
                <div className="id_1">
                  <img
                    src={`http://localhost:8800/images/docu/${props.verBack}`}
                    alt="Back"
                  />
                </div>
              </>
            ) : null
          }
          {
            //display sumbitted docs/additional ids of user
            props.doc1 ? (
              <>
                <div className="id_1">
                  <img
                    src={`http://localhost:8800/images/docu/${props.doc1}`}
                    alt="License"
                  />
                </div>
              </>
            ) : null
          }
        </div>

        {/* Right Profile Section */}
        <div className="profile-right">
          {props.status === "Verified" ? (
            <>
              <div className="verified">{props.status.toLocaleUpperCase()}</div>
            </>
          ) : (
            <>
              {props.verStatus === "Pending" ? (
                <>
                  <div className="pending">
                    <i>{props.verStatus.toLocaleUpperCase()}</i>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={`/profile/verification`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="unverified">
                      {props.status.toLocaleUpperCase()}
                    </div>
                  </Link>
                </>
              )}
            </>
          )}
          <label className="prolabel" htmlFor="username">Username :</label>
          <input
            type="text"
            className={props.validationErrors.username ? "error" : ""}
            // className="display-data"
            placeholder="Username"
            name="username"
            value={props.username}
            onChange={props.handleChange}
            disabled={!props.isEditing}
          ></input>

          <label className="prolabel" htmlFor="first-name">First name :</label>
          <input
            type="text"
            className={props.validationErrors.fname ? "error" : ""}
            // className="display-data"
            placeholder="Name"
            name="fname"
            value={props.fname}
            onChange={props.handleChange}
            disabled={!props.isEditing}
          ></input>

          <label className="prolabel" htmlFor="last-name">Last name :</label>
          <input
            type="text"
            className={props.validationErrors.lname ? "error" : ""}
            // className="display-data"
            placeholder="Last name"
            name="lname"
            value={props.lname}
            onChange={props.handleChange}
            disabled={!props.isEditing}
          ></input>

          <label className="prolabel" htmlFor="sex">Gender :</label>
          <select
            // className="display-data1"
            className={`display-data1 ${props.validationErrors.gender ? "error" : ""
              }`}
            value={props.sex}
            onChange={props.handleChange}
            name="gender"
            disabled={!props.isEditing}
          >
            {/* gender */}
            <option value="">Choose gender....</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label className="prolabel" htmlFor="age">Age :</label>
          <input
            type="number"
            //className={props.validationErrors.age ? "error" : ""}
            name="age"
            className="display-data1"
            placeholder="Age"
            value={GetUserAge(props.bday)}
            disabled={true}
          ></input>
          <input
            type="date"
            className={`display-data1 ${props.validationErrors.bday ? "error" : ""
              }`}
            name="bday"
            // className="display-data1"
            value={props.bday}
            onChange={props.handleChange}
            placeholder="Date of birth"
            disabled={!props.isEditing}
            // Set max year to 18 years ago
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]}
          ></input>

          <div className="buttons">
            {props.isEditing ? (
              <>
                {/* <button>Edit</button> */}
                <button onClick={props.clickCancel}>Cancel</button>
                <button onClick={props.click}>Save</button>
              </>
            ) : (
              <button onClick={props.clickEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;

/**
 * VIEW USER PROFILE
 * ADREAN 10/25/2024
 */
export function ViewUserProfile(props) {
  return (
    <>
      <div className="profile-page-container">
        {/* Left Profile Section */}
        <div className="profile-left">
          {/* If no preview, show existing profile image or default */}
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

          <div className="info">
            {/* {props.address} */}

            <Typography
              className="profile__info__left"
              color="neutral"
              level="h4"
              variant="plain"
              sx={{ p: 1 }}
            >
              {props.address ? (
                `${props.address}`
              ) : (
                <i style={{ color: "red" }}>No Address</i>
              )}
            </Typography>
            {/* {props.email} */}
            <Typography
              className="profile__info__left"
              color="neutral"
              level="h4"
              variant="plain"
              sx={{ p: 1 }}
            >
              {props.email ? (
                `${props.email}`
              ) : (
                <i style={{ color: "red" }}>No Email</i>
              )}
            </Typography>
            {/* {props.cnum} */}

            <Typography
              color="neutral"
              level="h4"
              variant="plain"
              sx={{ p: 1 }}
            >
              {props.cnum ? (
                `${props.cnum}`
              ) : (
                <i style={{ color: "red" }}>No Contact Number</i>
              )}
            </Typography>

            <br />
          </div>
          <br />
          <textarea
            className="description"
            placeholder="Description"
            name="desc"
            value={props.desc}
            disabled
          ></textarea>

          <div className="rating">
            Overall Rating:
            <span>
              <StarRating rating={props.rate} />
              <p>
                <i>{props.rate}</i>
              </p>
            </span>
          </div>
          {/* 
            CHANGE TO PROPERLY DISPLAY IDs
          */}
          {
            //display sumbitted IDs of user
            props.verFront || props.verBack ? (
              <>
                <div className="id_1">
                  <img
                    src={`http://localhost:8800/images/docu/${props.verFront}`}
                    alt="Front"
                  />
                </div>
                <div className="id_2">
                  <img
                    src={`http://localhost:8800/images/docu/${props.verBack}`}
                    alt="Back"
                  />
                </div>
              </>
            ) : null
          }
          {
            //display sumbitted docs/additional ids of user
            // driver license additional info fetch
            props.verDoc1 ? (
              <>
                <div className="id_1">
                  <img
                    src={`http://localhost:8800/images/docu/${props.verDoc1}`}
                    alt="License"
                  />
                </div>
              </>
            ) : null
            
          }
        </div>

        {/* Right Profile Section */}
        <div className="profile-right">
          {props.status === "Verified" ? (
            <>
              <div className="verified">{props.status.toLocaleUpperCase()}</div>
            </>
          ) : (
            <div className="unverified">{props.status.toLocaleUpperCase()}</div>
          )}
          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography
              color="neutral"
              level="title-lg"
              variant="plain"
              sx={{ p: 0.5 }}
            >
              Username :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {props.username ? (
                `${props.username}`
              ) : (
                <i style={{ color: "red" }}>No Username</i>
              )}
            </Typography>
          </Sheet>

          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography color="neutral" level="title-lg" variant="plain">
              Firt Name :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {props.fname ? (
                `${Capitalize(props.fname)}`
              ) : (
                <i style={{ color: "red" }}>No First name</i>
              )}
            </Typography>
          </Sheet>

          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography color="neutral" level="title-lg" variant="plain">
              Last Name :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {props.lname ? (
                `${Capitalize(props.lname)}`
              ) : (
                <i style={{ color: "red" }}>No last name</i>
              )}
            </Typography>
          </Sheet>

          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography color="neutral" level="title-lg" variant="plain">
              Gender :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {props.sex ? (
                `${Capitalize(props.sex)}`
              ) : (
                <i style={{ color: "red" }}>No Gender</i>
              )}
            </Typography>
          </Sheet>

          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography color="neutral" level="title-lg" variant="plain">
              Birthdate :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {props.bday ? (
                `${DisplayDate(props.bday)}`
              ) : (
                <i style={{ color: "red" }}>No Birthdate</i>
              )}
            </Typography>
          </Sheet>

          <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
            <Typography
              color="neutral"
              level="title-lg"
              variant="plain"
              sx={{ p: 0.5 }}
            >
              Age :
            </Typography>
            <Typography color="neutral" level="h3" variant="outlined">
              {GetUserAge(props.bday)}
            </Typography>
          </Sheet>
        </div>
      </div>
    </>
  );
}
