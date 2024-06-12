//need change for the backend
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import RadioInputs from "./RadioInputs";
//import "./Error.css";

const Signup = () => {
  const [account, setAccount] = useState({
    regUsername: "",
    regPassword: "",
    firstName: "",
    lastName: "",
    regPassword2: "",
    bday: "",
    gender: "",
    email: "",
    contactNumber: "",
    type: "",
    dateCreated: "",
  });

  //handle state of error message
  // const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  // const [catcherErrorMessage, setCatcherErrorMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const resetForm = () => {
    setAccount({
      regUsername: "",
      regPassword: "",
      firstName: "",
      lastName: "",
      regPassword2: "",
      bday: "",
      gender: "",
      email: "",
      contactNumber: "",
      type: "",
      dateCreated: "",
    });
    // setEmployerErrorMessage("");
    // setCatcherErrorMessage("");
    setErrorMessage("");
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedType, setSelectedType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { label: "Employer", value: "Employer" },
    { label: "Catcher", value: "Catcher" },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTypeChange = () => {
    setSelectedType(selectedOption);
    console.log(selectedOption);
    if (selectedOption == "Catcher") {
      // Checkbox is checked, store one value
      setAccount((prev) => ({ ...prev, type: "Catcher" }));
    } else {
      // Checkbox is not checked, store another value
      setAccount((prev) => ({ ...prev, type: "Employer" }));
    }
  };

  const handleReset = () => {
    setSelectedType("");
    setSelectedOption("");
    resetForm();
  };

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax

    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //save the data into db
  const handleClick = async (e) => {
    e.preventDefault();
    //if fileds are empty
    //error message
    if (
      !account.firstName ||
      !account.lastName ||
      !account.regPassword ||
      !account.regPassword2 ||
      !account.email ||
      //!account.contactNumber ||
      !account.type
    ) {
      //error
      setErrorMessage("Please fill in all required fields.");
      return;
    } else if (account.regPassword.length < 8) {
      setErrorMessage("Password is too short.");

      return;
    } else if (account.regPassword !== account.regPassword2) {
      setErrorMessage("Password does not match.");
      return;
    }
    //save to db if no error
    e.preventDefault();
    try {
      account.dateCreated = getCurrentDate();
      await axios.post("http://localhost:8800/sign-up", account); // new enpoint
      //alert("Success");
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(account);

  return (
    <div
      className="SUcontainer"
      style={{
        maxWidth: "950px",
        margin: "20px auto",
        padding: "0 15px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "sans-serif",
          paddingTop: "20px",
          color: "#005a80",
        }}
      >
        Errand Catcher
      </h2>
      <form>
        <div className="SUrow">
          {!selectedType && (
            <div className="col text-center">
              <div
                className="SUcontainer"
                style={{
                  maxWidth: "950px",
                  margin: "0 auto",
                  padding: "20px 20px 20px 20px",
                  textAlign: "center",
                }}
              >
                <h2>Join as an Employer or a Catcher</h2>
              </div>
              <RadioInputs
                options={options}
                selectedOption={selectedOption}
                onChange={handleOptionChange}
              />
              <div>
                <button
                  onClick={handleTypeChange}
                  disabled={!selectedOption}
                  style={{
                    padding: "10px",
                    width: "200px",
                    borderRadius: "5px",
                    border: "ridge",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#005a80"; // Change background color on hover
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = ""; // Revert back to initial background color
                    e.target.style.color = "";
                  }}
                >
                  {selectedOption
                    ? `Join as ${
                        selectedOption.charAt(0).toUpperCase() +
                        selectedOption.slice(1)
                      }`
                    : "Create Account"}
                </button>
              </div>
              <div className="m-4" style={{ paddingTop: "20px" }}>
                Already have an account? <Link to="/sign-in">Sign in</Link>
              </div>
            </div>
          )}
          {selectedType && (
            <div className="col" style={{ flex: "1", padding: "0 15px" }}>
              <div className="text-center mb-4">
                <h3>Signup to Errand Catcher</h3>
              </div>
              <form className="mt-4 mb-4">
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div className="col">
                    <label className="SUlabel">Username</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="regUsername"
                      value={account.regUsername}
                      autocomplete="off"
                      required
                    />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Email Address</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      name="email"
                      value={account.email}
                      required
                    />
                  </div>
                </div>
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div className="col">
                    <label className="SUlabel">First Name</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={account.firstName}
                      required
                    />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Last Name</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={account.lastName}
                      required
                    />
                  </div>
                </div>
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div className="col">
                    <label className="SUlabel">Birthday</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="date"
                      placeholder="Birthday"
                      required
                      name="bday"
                      value={account.bday}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Gender</label>
                    <select
                      // className={errorMessage ? "error" : ""}
                      required
                      style={{ width: "100%" }}
                      value={account.gender}
                      onChange={handleChange}
                      name="gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div className="col">
                    <label className="SUlabel">Password</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      name="regPassword"
                      value={account.regPassword}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Confirm Password</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      name="regPassword2"
                      value={account.regPassword2}
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div
                    className="col text-center"
                    style={{ paddingTop: "20px" }}
                  >
                    <button
                      onClick={handleClick}
                      style={{
                        width: "200px",
                        height: "30px",
                        borderRadius: "10px",
                        backgroundColor: "#005a80",
                        color: "#fff",
                        transition: "background-color 0.3s ease",
                      }}
                      className="signup-button"
                    >
                      Sign Up
                    </button>
                  </div>
                  {/* Error message display */}
                  {errorMessage && (
                    <div className="m-4" style={{ color: "red" }}>
                      {errorMessage}
                    </div>
                  )}
                </div>
                <div className="m-4" style={{ paddingTop: "20px" }}>
                  Already have an account? <Link to="/sign-in">Sign in</Link>
                </div>
                <div
                  className="m-4-return"
                  style={{
                    paddingTop: "20px",
                    paddingLeft: "20px",
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <span
                    onClick={handleReset}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  >
                    <i class="fa-solid fa-arrow-left" />
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </form>
      <style>
        {`
          .SUcontainer h2 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .SUcontainer input[type="text"],
          .SUcontainer input[type="email"],
          .SUcontainer input[type="password"],
          .SUcontainer select {
            width: calc(50% - 5px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          .SUcontainer button[type="submit"] {
            background-color: #007bff;
            color: #fff;
            width: 200px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }

          .SUcontainer button[type="submit"]:hover {
            background-color: #0056b3;
          }

          .SUcontainer .text-center {
            text-align: center;
            padding-top: 20px;
          }

          .SUcontainer .mb-4 {
            margin-bottom: 1.5rem;
          }

          .SUlabel {
            color: black;
            text-align: left;
            display: block;
          }

          .SUrow {
            gap: 20px;
          }

          .col {
            flex: 1;
          }

          .m-4-return span {
            color: #007bff;
            text-decoration: underline; 
            margin-right: 5px;
          }

          .signup-button {
            width: 200px;
            height: 30px;
            border-radius: 10px;
            background-color: #005a80;
            color: #fff;
            transition: background-color 0.3s ease;
          }
          
          .signup-button:hover {
            background-color: #04354a;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
