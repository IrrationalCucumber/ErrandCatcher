import React, { useState } from "react";
import Cards from "../components/Cards/Cards";
import StarRating from "../components/Display/StarRating";
import { Link } from "react-router-dom";
// import Menu from './Menu'

function testpage() {
  const username = "ash1";
  const password = "";
  const lname = "Catcher";
  const fname = "ash";
  const gender = "Female";
  const email = "ash_catcher@email.com";
  const contact = "098875321";
  const age = "22";
  const bday = "";
  const address = "lapu-lapu city";
  const desc = "";
  const status = "Unverified";
  const type = "Catcher";
  const profileImage = "";
  const rate = 2.6;
  return (
    <div>
      <style>
        {`
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Times New Roman', sans-serif;
            background-color: #f5f5f5;
            padding: 40px;
        }

        .profile-container {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }

        .profile-left, .profile-right {
            flex: 1;
            margin-right: 30px;
        }

        .profile-left img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
        }

        .profile-left {
            text-align: center;
        }

        .profile-left .info {
            margin-top: 20px;
            font-size: 18px;
            line-height: 1.8;
        }

        .profile-left ul {
            list-style-type: disc;
            margin-top: 20px;
            font-size: 18px;
        }
        
        .profile-left li::marker {
            color: white;
        }

        .profile-left .rating {
            margin-top: 20px;
            font-weight: bold;
            font-size: 20px;
        }

        .profile-right {
            display: flex;
            flex-direction: column;
        }

        .profile-right h2 {
            font-size: 28px;
            margin-bottom: 25px;
        }

        .profile-right label {
            display: block;
            margin: 10px 0;
            font-size: 18px;
        }

        .profile-right input[type="text"] {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 18px;
        }

        .profile-right .buttons {
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }

        .profile-right .buttons button {
            background-color: #ccc;
            padding: 15px 30px;
            border: none;
            border-radius: 6px;
            margin-right: 15px;
            cursor: pointer;
            font-size: 18px;
        }

        .profile-right .buttons button:hover {
            background-color: #bbb;
        }

        .unverified {
            background-color: red;
            color: white;
            padding: 15px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
            font-size: 20px;
        }
        
        .profile-right .buttons button:last-child, button:first-child {
            margin-left: 25px;
        }

        .rating {
            color: #333;
        }
      `}
      </style>
      <h1>Hello world!</h1>
      {/* <Cards /> */}
      {/* 
      
      */}

      {/* 
        ADjusted Profile UI design
      */}
      <div className="profile-page-container">
        {/* Left Profile Section */}
        <div className="profile-left">
          {profileImage ? (
            <img
              //profile file path in backend
              src={`http://localhost:8800/images/profile/${profileImage}`}
              alt="ProfPic"
            />
          ) : (
            <img src="/images/employer.png" alt="Profile Picture" />
          )}

          <div className="upload-container">
            <input
              type="file"
              id="file"
              // onChange={props.handleImage} // to be able to edit
              style={{ width: "100px" }}
            />
            <button>
              <i
                className="fa-solid fa-arrow-up-from-bracket"
                style={{ color: "#fff", width: "20px" }}
              ></i>
            </button>
          </div>

          <div className="info">
            {address}
            <br />
            {email}
            <br />
            {contact}
          </div>
          <textarea
            className="description"
            placeholder="Description"
            // onChange={handleChange}
            name="desc"
            value={desc}
          ></textarea>
          {type === "Catcher" && (
            <div className="rating">
              Overall Rating:
              <span>
                <StarRating rating={rate} />
                <p>
                  <i>{rate}</i>
                </p>
              </span>
            </div>
          )}
        </div>

        {/* Right Profile Section */}
        <div className="profile-right">
          {status === "Verified" ? (
            <>
              <div className="verified">{status}</div>
            </>
          ) : (
            <Link to={`/profile/verification`}>
              <div className="unverified">{status}</div>
            </Link>
          )}
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Username"
            name="username"
            value={username}
            //onChange={props.handleChange}
          ></input>

          <label htmlFor="first-name">First name :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Name"
            name="fname"
            value={fname}
            //onChange={props.handleChange}
          ></input>

          <label htmlFor="last-name">Last name :</label>
          <input
            type="text"
            // className="display-data"
            placeholder="Last name"
            name="lname"
            value={lname}
            //onChange={props.handleChange}
          ></input>

          <label htmlFor="sex">Sex :</label>
          <select
            className="display-data1"
            value={gender}
            //onChange={props.handleChange}
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
            value={age}
            //onChange={props.handleChange}
            min={1}
            max={99}
          ></input>
          <input
            type="date"
            className="display-data1"
            value={bday}
            //onChange={props.handleChange}
            placeholder="Date of birth"
          ></input>

          <div className="buttons">
            {/* <button>Edit</button> */}
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default testpage;

// {/* <div className="profile-container"> */}
//{/* Left Profile Section */}
{
  /* <div className="profile-left">
  <img src="https://via.placeholder.com/100" alt="Profile Picture" />
  <div className="info">
    Gun-ob, Lapu-Lapu City
    <br />
    Adreanpaul@gmail.com
    <br />
    09123456789
  </div>
  <ul>
    <li>Loyal</li>
    <li>Volunteer Award</li>
    <li>Proficient in Photoshop</li>
    <li>Fluent in English;</li>
    <li>And writing</li>
  </ul>
  <div className="rating">
    Rating: <span style={{ color: "red" }}>4.5 / 5</span>
  </div>
</div> */
}

{
  /* Right Profile Section */
}
{
  /* <div className="profile-right">
  <div className="unverified">Unverified</div>
  <label htmlFor="username">Username :</label>
  <input type="text" id="username" value="Cucumber" />

  <label htmlFor="first-name">First name :</label>
  <input type="text" id="first-name" value="Adrean Paul" />

  <label htmlFor="last-name">Last name :</label>
  <input type="text" id="last-name" value="Sorono" />

  <label htmlFor="sex">Sex :</label>
  <input type="text" id="sex" value="Male" />

  <label htmlFor="age">Age :</label>
  <input type="text" id="age" value="25" />

  <div className="buttons">
    <button>Edit</button>
    <button>Save</button>
  </div>
</div>
</div> */
}
