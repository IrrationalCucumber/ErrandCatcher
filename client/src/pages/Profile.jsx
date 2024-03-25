import React, { useEffect, useState } from "react";
import NavbarPage from "../components/NavBarPage";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [verified, setVerified] = useState(false);
  //check if user type
  const [isCatcher, setIsCatcher] = useState(false);
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
    type: "",
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
        if (retrievedAccount.accountType === "Catcher") {
          setIsCatcher(true);
        }
        // console.log(retrievedAccount);
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
          type: retrievedAccount.accountType,
          //profileImage: retrievedAccount.profileImage, //this
        });
        // Set profileImage after retrieving the file from the server
        const profileImageRes = await axios.get(
          `http://localhost:8800/user/${userID}`
        );
        const profileImageBlob = new Blob([profileImageRes.data], {
          type: "image/jpeg",
        });
        setAccount((prevState) => ({
          ...prevState,
          profileImage: profileImageBlob,
        }));
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
        setStatus(res.data[0].accountStatus);
        setVerified(res.data[0].accountStatus.toUpperCase() === "VERIFIED");
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, [status]);
  //APS - 03/03/24
  //get the rating of the user
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${userID}`
        );
        setRating(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [userID]);

  const handleChange = (e) => {
    // For file input, update profileImage directly
    if (e.target.name === "profileImage") {
      setAccount((prev) => ({ ...prev, profileImage: e.target.files[0] }));
    } else if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else if (e.target.name === "desc") {
      setAccount((prev) => ({ ...prev, desc: e.target.value }));
    } else {
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  //APS - 07/03/24
  //save the data into db
  const navigate = useNavigate();
  const handleClick = async (e) => {
    //const updatedAccount = { ...account };
    //refresh the page when button is clicked
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/update-account/${userID}`,
        account
      );
      navigate(`/profile/${userID}`);
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
                <input
                  type="file"
                  id="file"
                  name="profileImage"
                  className="file"
                  onChange={handleChange}
                />
                {account.profileImage && (
                  <img
                    src={URL.createObjectURL(account.profileImage)}
                    width={20}
                  />
                )}
              </div>
              {/*username changed when user sign up*/}
              <div className="username-container">
                <label className="username">{account.username}</label>
                {/* Verification Icon */}
                <i
                  className={`fa-solid fa-circle-check ${
                    verified ? "verified" : ""
                  }`}
                  style={{ marginLeft: "5px" }}
                ></i>
              </div>
              {isCatcher && (
                <div className="rating-box">
                  <label className="Rating">Rating</label>
                  <label className="RateNo">{rating} /5</label>
                </div>
              )}
              {/* <div className="rating-box">
                <label className="Rating">Rating</label>
                <label className="RateNo">{rating} /5</label>
              </div> */}
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
                    />
                  </div>
                  <div className="input-row">
                    <label className="PP">Age</label>
                    <textarea
                      type="number"
                      className="display-data1"
                      placeholder="Age"
                      name="age"
                      value={account.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-row">
                    <label className="PP">Birth Date</label>
                    <textarea
                      type="number"
                      className="display-data1"
                      placeholder="Date of birth"
                    />
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
                    />
                  </div>
                  <div className="input-row">
                    <label className="PP">Email Address:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="input-row">
                    <label className="PP">Address:</label>
                    <textarea
                      type="text"
                      className="display-data"
                      placeholder="Address"
                    />
                  </div>
                  <button onClick={handleClick}>Save</button>
                  <button>Edit</button>
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
