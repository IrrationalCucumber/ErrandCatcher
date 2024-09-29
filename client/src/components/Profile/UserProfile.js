import React from "react";
import "./profile.css";
import StarRating from "../Display/StarRating";
import { Link } from "react-router-dom";

function UserProfile(props) {
  return (
    <>
      <div className="profile-page-container">
        {/* Left Profile Section */}
        <div className="profile-left">
          {props.profileImg ? (
            <img
              src={`http://localhost:8800/images/profile/${props.profileImg}`}
              alt="ProfPic"
            />
          ) : (
            <img src="/images/employer.png" alt="Profile Picture" />
          )}

          <div className="upload-container">
            <input
              type="file"
              id="file"
              onChange={props.handleImage}
              style={{ width: "100px" }}
            />
            <button onClick={props.handleUpload}>
              <i
                className="fa-solid fa-arrow-up-from-bracket"
                style={{ color: "#fff", width: "20px" }}
              ></i>
            </button>
          </div>

          <div className="info">
            {props.address}
            <br />
            {props.email}
            <br />
            {props.cnum}
          </div>
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
              <div className="verified">{props.status}</div>
            </>
          ) : (
            <Link to={`/profile/verification`}>
              <div className="unverified">{props.status}</div>
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
