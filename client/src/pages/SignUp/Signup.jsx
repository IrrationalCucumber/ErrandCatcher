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
  const [errors, setErrors] = useState({});

  //handle state of error message
  const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  const [catcherErrorMessage, setCatcherErrorMessage] = useState("");

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
    setEmployerErrorMessage("");
    setCatcherErrorMessage("");
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

  // const onSubmit = async (data) => {
  //   try {
  //     // Your HTTP request code for sign-up goes here
  //     console.log(data);
  //     // Redirect to login page after successful sign-up
  //     window.location.href = "/sign-in";
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error
  //   }
  // };

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax

    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  // Error handling if empty fields 
  const validateForm = () => {
    const newErrors = {};

    if (!account.regUsername) {
      newErrors.username = 'Username is required';
    }
    if (!account.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(account.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!account.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!account.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!account.bday) {
      newErrors.bday = 'Birthday is required';
    }
    if (!account.gender) {
      newErrors.gender = 'Gender is required';
    }
    // Alphanumeric password
    if (!account.regPassword) {
      newErrors.regPassword = 'Password is required';
    } else if (account.regPassword.length < 8) {
      newErrors.regPassword = 'Password must be at least 6 characters long';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(account.regPassword)) {
      newErrors.regPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!account.regPassword2) {
      newErrors.regPassword2 = 'Confirm Password is required';
    } else if (account.regPassword !== account.regPassword2) {
      newErrors.regPassword2 = 'Passwords do not match';
    }
    console.log(account);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };

  //save the data into db
  const handleClick = async (e) => {
    //save to db if no error
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log('Form submitted:', account);
      
    try {
      account.dateCreated = getCurrentDate();
      await axios.post("http://localhost:8800/sign-up", account); // new enpoint
      alert("Success");
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
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
      <h2 style={{ fontFamily: "sans-serif", paddingTop: "20px" }}>
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
                    width: "190px",
                    borderRadius: "17px",
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: "Neue MontReal, Helvetica Neue, sans-serif;",
                    border: "1px solid grey",
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
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="regUsername"
                      value={account.regUsername}
                      autocomplete="off"
                      required
                    />
                    {errors.username && <span style={{color: "red"}}>{errors.username}</span>}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Email Address</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      name="email"
                      value={account.email}
                      required
                    />
                     {errors.email && <span style={{color: "red"}}>{errors.email}</span>}
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
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={account.firstName}
                      required
                    />
                     {errors.firstName && <span style={{color: "red"}}>{errors.firstName}</span>}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={account.lastName}
                      required
                    />
                     {errors.lastName && <span style={{color: "red"}}>{errors.lastName}</span>}
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
                      type="date"
                      placeholder="Birthday"
                      required
                      name="bday"
                      value={account.bday}
                      onChange={handleChange}
                    />
                     {errors.bday && <span style={{color: "red"}}>{errors.bday}</span>}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Gender</label>
                    <select
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
                    {errors.gender && <span style={{color: "red"}}>{errors.gender}</span>}
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
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      name="regPassword"
                      value={account.regPassword}
                      autoComplete="off"
                      required
                    />
                     {errors.regPassword && <span style={{color: "red"}}>{errors.regPassword}</span>}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      name="regPassword2"
                      value={account.regPassword2}
                      autoComplete="off"
                      required
                    />
                     {errors.regPassword2 && <span style={{color: "red"}}>{errors.regPassword2}</span>}
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
                  <div className="col text-center">
                    <button onClick={handleClick}
                    style={{
                      padding: "10px",
                      width: "140px",
                      borderRadius: "17px",
                      fontSize: "16px",
                      fontWeight: "400",
                      fontFamily: "Neue MontReal, Helvetica Neue, sans-serif;",
                      border: "1px solid grey",
                      background: "rgb(0, 98, 128)",
                      // background-color: "rgb(0, 98, 128)";
                      cursor: "pointer",
                      color: "white"
                    }}
                    
                    >Sign Up</button>
                  </div>
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
        `}
      </style>
    </div>
  );
};

export default Signup;
