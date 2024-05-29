/**
 * VIEW PROFILE
 * view profile of the user - readonlu
 * APS - 30/03/24
 */
import React, { useEffect, useState } from "react";
import NavbarPage from "../../components/Navbar/NavBarPage";
import "./profile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ViewProfile() {
  const [activeTab, setActiveTab] = useState("about");
  const [verified, setVerified] = useState(false);
  //get userID from url
  const location = useLocation();
  const userID = location.pathname.split("/")[3];
  //variable for account details
  const [account, setAccount] = useState({
    username: "",
    password: "",
    lname: "",
    fname: "",
    gender: "",
    email: "",
    contact: "",
    age: "",
    bday: "",
    address: "",
    desc: "",
    profileImage: "",
  });

  //pre-fill the fields
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${userID}`);
        const retrievedAccount = res.data[0];
        //format date
        const formattedDate = new Date(retrievedAccount.userBirthday)
          .toISOString()
          .substr(0, 10);

        // Update the state with retrieved account data
        setAccount({
          username: retrievedAccount.username,
          password: retrievedAccount.password,
          lname: retrievedAccount.userLastname,
          fname: retrievedAccount.userFirstname,
          gender: retrievedAccount.userGender,
          email: retrievedAccount.userEmail,
          contact: retrievedAccount.userContactNum,
          age: retrievedAccount.userAge,
          bday: formattedDate,
          address: retrievedAccount.userAddress,
          desc: retrievedAccount.userDesc,
          profileImage: retrievedAccount.profileImage,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, [userID]);

  //useState for Status
  const [status, setStatus] = useState("");
  //update display for status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-verify/${userID}`
        );
        //console.log(res.data[0].accountStatus);
        setStatus(res.data[0].accountStatus);
        if (status.toUpperCase === "VERIFIED") {
          setVerified(true);
          console.log(verified);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, [status, userID, verified]);

  //get the rating of the user
  const [rating, setRating] = useState("");
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${userID}`
        );
        //console.log(res.data[0].c);
        setRating(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [userID]);
  return (
    <div>
      <NavbarPage />
      <div className="profile">
        <div className="profile-info">
          <div className="description-form">
            <form>
              <div className="FileContainer">
                <img
                  src={
                    `http://localhost:8800/images/profile/` +
                    account.profileImage
                  }
                  alt="Profile"
                  width={150}
                  length={150}
                />
              </div>
              {/*username changed when user sign up*/}
              <div className="username-container">
                <label className="username">{account.username}</label>
                {/* Verification Icon */}
                <i
                  class={
                    verified
                      ? "fa-solid fa-circle-check"
                      : "fa-regular fa-circle-check"
                  }
                  style={{
                    marginLeft: "5px",
                    color: verified ? "green" : "gray",
                  }}
                >
                  {status}
                </i>
                {/* <FontAwesomeIcon
              icon={faCertificate}
              style={{
                marginLeft: "5px",
                color: verified ? "green" : "gray",
              }}
            /> */}
              </div>
              <div className="rating-box">
                <label className="Rating">Rating</label>
                <label className="RateNo">{rating} /5</label>
              </div>
              <textarea
                className="description"
                placeholder="Description"
              ></textarea>
            </form>
          </div>
          <div className="info-form">
            <form>
              <div className="toggle-button">
                <span
                  className={activeTab === "about" ? "active about-label" : ""}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </span>
                <span
                  className={
                    activeTab === "history" ? "active history-label" : ""
                  }
                  onClick={() => setActiveTab("history")}
                >
                  History
                </span>
              </div>
              {activeTab === "about" && (
                <div
                  className={`about-section ${
                    activeTab !== "about" ? "hidden" : ""
                  }`}
                >
                  {/* About section content */}
                  <div className="input-row">
                    <label className="PP">Name:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Name"
                      value={account.fname + " " + account.lname}
                    ></textarea>
                  </div>
                  <div className="input-row">
                    <label className="PP">Age</label>
                    <textarea
                      type="number"
                      className="display-data1"
                      placeholder="Age"
                      value={account.age}
                    ></textarea>
                  </div>
                  <div className="input-row">
                    <label className="PP">Birth Date</label>
                    <textarea
                      type="number"
                      className="display-data1"
                      placeholder="Date of birth"
                    ></textarea>
                  </div>
                  <div className="input-row">
                    <label className="PP">Gender</label>
                    <select className="display-data1">
                      gender
                      <option value="">Choose gender....</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="input-row">
                    <label className="PP">Contact Number:</label>
                    <textarea
                      type="number"
                      className="display-data"
                      placeholder="Contact Number"
                    ></textarea>
                  </div>
                  <div className="input-row">
                    <label className="PP">Email Address:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Email Address"
                    ></textarea>
                  </div>
                  <div className="input-row">
                    <label className="PP">Address:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Address"
                    ></textarea>
                  </div>
                </div>
              )}
              {activeTab === "history" && (
                <div
                  className={`history-section ${
                    activeTab !== "history" ? "hidden" : ""
                  }`}
                >
                  <label>THIS IS HISTORY WITH TRANSACTION</label>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
