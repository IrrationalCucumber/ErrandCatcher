import React, { useEffect, useState } from "react";
import NavbarPage from "../components/NavBarPage";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [verified, setVerified] = useState(false);
  //APS - 03/03/24
  //get userID from url
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
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
    // profileImage:"",
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
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, [userID]);
  //RV & APS 02/03/24
  //useState for Status
  const [status, setStatus] = useState("");
  //update display for status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-verify/${userID}`
        );
        console.log(res.data[0].accountStatus);
        setStatus(res.data[0].accountStatus);
        if (status.toUpperCase == "VERIFIED" || status == "Verified") {
          setVerified(true);
          console.log(verified);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, [status]);
  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else if (e.target.name === "type") {
      setAccount((prev) => ({ ...prev, type: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  //APS - 03/03/24
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

  //sSave CHanges
  const handleClick = async (e) => {
    //const updatedAccount = { ...account };
    //refresh the page when button is clicked
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8800/update-account/" + userID,
        account
      );

      alert("Profile updated *Replace this*");
      //console.log(account);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavbarPage />
      <div className="profile">
        <div className="profile-info">
          <div className="description-form">
            <form>
              <div className="FileContainer">
                <label htmlFor="file" className="File">
                  Upload Image
                </label>
                <input type="file" id="file" className="file" />
              </div>
              {/*username changed when user sign up*/}
              <div className="username-container">
                <label className="username">Username</label>
                {/* Verification Icon */}
                {/* Verification Icon */}
                <p>
                  Click
                  <Link to="/verification">
                    <i
                      className={
                        verified
                          ? "fa-solid fa-circle-check"
                          : "fa-regular fa-circle-check"
                      }
                      style={{
                        marginLeft: "5px",
                        color: verified ? "green" : "gray",
                        cursor: "pointer", // Make the cursor change to a pointer to indicate it's clickable
                      }}
                    ></i>
                  </Link>
                  UNVERIFIED
                </p>

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
                    <input
                      type="text"
                      className="display-data"
                      placeholder="Name"
                      name="fname"
                      value={account.fname}
                      onChange={handleChange}
                    ></input>

                    <input
                      type="text"
                      className="display-data"
                      value={account.lname}
                      placeholder="username"
                      onChange={handleChange}
                      name="lname"
                    ></input>
                  </div>
                  <div className="input-row">
                    <label className="PP">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="display-data1"
                      placeholder="Age"
                      value={account.age}
                      onChange={handleChange}
                      min={1}
                      max={99}
                    ></input>
                  </div>
                  <div className="input-row">
                    <label className="PP">Birth Date</label>
                    <input
                      type="date"
                      className="display-data1"
                      value={account.bday}
                      placeholder="Date of birth"
                    ></input>
                  </div>
                  <div className="input-row">
                    <label className="PP">Gender</label>
                    <select
                      className="display-data1"
                      value={account.gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      gender
                      <option value="">Choose gender....</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="input-row">
                    <label className="PP">Contact Number:</label>
                    <input
                      type="number"
                      className="display-data"
                      placeholder="Contact Number"
                      name="contact"
                      value={account.contact}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="input-row">
                    <label className="PP">Email Address:</label>
                    <input
                      type="email"
                      className="display-data"
                      placeholder="Email Address"
                      value={account.email}
                      name="email"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="input-row">
                    <label className="PP">Address:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Address"
                      value={account.address}
                      name="address"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button onClick={handleClick}>Save</button>
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
};

export default Profile;
