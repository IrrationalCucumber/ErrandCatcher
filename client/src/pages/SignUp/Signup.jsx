//need change for the backend
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import RadioInputs from "./RadioInputs";
//import "./Error.css";
import "./passignup.css";
import ModalFeedback from "../../components/ModalFeedback";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../../components/LoadingSpinner";
import { ArrowBack } from "@mui/icons-material";

const Signup = () => {
  const [account, setAccount] = useState({
    regUsername: "",
    regPassword: "",
    regPassword2: "",
    lastName: "",
    firstName: "",
    gender: "",
    bday: "",
    email: "",
    contact: "",
    address: "",
    type: "",
    dateCreated: "",
  });

  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  //handle state of error message
  // const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  // const [catcherErrorMessage, setCatcherErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [emails, setEmails] = useState([]);
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  //get username
  useEffect(() => {
    const fetchResp = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get-username/`);
        const usernameArray = res.data.map((user) => user.username);
        setUsernames(usernameArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResp();
  }, []);
  //check email
  useEffect(() => {
    const fetchResp2 = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/get-email/`);
        const emailArray = res.data.map((email) => email.userEmail);
        setEmails(emailArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResp2();
  }, [account.email]);

  console.log(emails);

  // Error handling if empty fields
  const validateForm = () => {
    const newErrors = {};

    if (!account.regUsername) {
      newErrors.regUsername = "Username is required";
    } else if (usernames.includes(account.regUsername)) {
      newErrors.regUsername = "Username is already taken";
    }

    if (!account.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(account.email)) {
      newErrors.email = "Email is invalid";
    } else if (emails.includes(account.email)) {
      newErrors.email = "Email Address is already taken";
    }
    if (!account.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!account.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!account.bday) {
      newErrors.bday = "Birthday is required";
    } else {
      const age = calculateAge(account.bday);
      if (age < 18) {
        newErrors.bday = "You must be at least 18 years old to register";
      }
      // Additional validation for future dates
      if (new Date(account.bday) > new Date()) {
        newErrors.bday = "Birthday cannot be a future date";
      }
    } 
    if (!account.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!account.contact) {
      newErrors.contact = "Contact number is required";
    } else if (account.contact < 11 || !/([0-9])/.test(account.contact)) {
      newErrors.contact = "Contact number is incorrect";
    }
    if (!account.address) {
      newErrors.address = "Address is required";
    }
    if (!account.type) {
      newErrors.type = "Please select a type of User";
    }
    // Alphanumeric password
    if (!account.regPassword) {
      newErrors.regPassword = "Password is required";
    } else if (account.regPassword.length < 8) {
      newErrors.regPassword = "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
        account.regPassword
      )
    ) {
      newErrors.regPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    if (!account.regPassword2) {
      newErrors.regPassword2 = "Confirm Password is required";
    } else if (account.regPassword !== account.regPassword2) {
      newErrors.regPassword2 = "Passwords do not match";
    }
    //console.log(account);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //handle state of error message
  // const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  // const [catcherErrorMessage, setCatcherErrorMessage] = useState("");

  // const [errorMessage, setErrorMessage] = useState("");

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
      contact: "",
      address: "",
      type: "",
      dateCreated: "",
    });
    // setEmployerErrorMessage("");
    // setCatcherErrorMessage("");
    // setErrorMessage("");
  };

  function evaluatePasswordStrength(password) {
    let score = 0;

    if (!password) return "";

    // Check password length
    if (password.length > 8) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains numbers
    if (/\d/.test(password)) score += 1;
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
        return "Medium";
      case 4:
      case 5:
        return "Strong";
    }
  }

  const getStrengthColor = (strength) => {
    switch (strength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "green";
      default:
        return "transparent";
    }
  };

  const getStrengthWidth = (strength) => {
    switch (strength) {
      case "Weak":
        return "30%";
      case "Medium":
        return "66%";
      case "Strong":
        return "100%";
      default:
        return "0";
    }
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

  // Get the current date and calculate the date (18 years ago)
  const getMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 18; // adjust year restricted
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Format the date as yyyy-mm-dd
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
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

  // modal message pop-up
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/sign-in");
  };

  //save the data into db
  // do logic here
  const handleClick = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted:", account);

      try {
        account.dateCreated = getCurrentDate();
        await axios.post("http://localhost:8800/sign-up", account); // new enpoint
        // alert("Success");
        // navigate("/sign-in");
        // modal popup message

        setLoading(true);

        setTimeout(() => {
          setLoading(false);
          // modal will pop-up in 2 seconds
          handleOpen();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  //console.log(account);

  return (
    <>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Success!"
        contentMes="You have successfully created an account. 🎉"
        color="success"
        colorText="green"
        // icon={ErrorIcon}
      />

      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait while Creating Your Account"
        icons={<HourglassBottomIcon />}
      />

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
            <div className="col" style={{ flex: "1", padding: "0 15px" }}>
              <div className="text-center mb-4">
                <h3>Signup to Errand Catcher</h3>
              </div>
              <form className="mt-4 mb-4">
                <div className="col">
                  <label className="SUlabel">User type</label>
                  <select
                    // className={errorMessage ? "error" : ""}
                    className={errors.type ? "error" : ""}
                    required
                    style={{ width: "100%" }}
                    value={account.type}
                    onChange={handleChange}
                    name="type"
                  >
                    <option value="">Select Type</option>
                    <option value="Employer">Employer</option>
                    <option value="Catcher">Catcher</option>
                  </select>
                  {errors.type && (
                    <span style={{ color: "#f02849", fontSize: "14px" }}>
                      {errors.type}
                    </span>
                  )}
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
                      className={errors.firstName ? "error" : ""}
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={account.firstName}
                      required
                    />
                    {errors.firstName && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Last Name</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      className={errors.lastName ? "error" : ""}
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={account.lastName}
                      required
                    />
                    {errors.lastName && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.lastName}
                      </span>
                    )}
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
                      className={errors.bday ? "error" : ""}
                      type="date"
                      placeholder="Birthday"
                      required
                      name="bday"
                      value={account.bday}
                      onChange={(e) => {
                        handleChange(e);
                        // Clear the error when user starts typing
                        if (errors.bday) {
                          setErrors(prev => ({ ...prev, bday: "" }));
                        }
                      }}
                      max={getMaxDate()}
                    />
                    {errors.bday && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.bday}
                      </span>
                    )}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Gender</label>
                    <select
                      // className={errorMessage ? "error" : ""}
                      className={errors.gender ? "error" : ""}
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
                    {errors.gender && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.gender}
                      </span>
                    )}
                  </div>
                </div>{" "}
                {/* start */}
                <div
                  className="SUrow"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 -15px",
                  }}
                >
                  <div className="col">
                    <label className="SUlabel">Contact Number</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      className={errors.contact ? "error" : ""}
                      type="text"
                      placeholder="Enter Contact number..."
                      onChange={handleChange}
                      name="contact"
                      value={account.contact}
                      autocomplete="off"
                      required
                    />
                    <div className="err">
                      {" "}
                      {errors.contact && (
                        <span style={{ color: "#f02849", fontSize: "14px" }}>
                          {errors.contact}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <label className="SUlabel">Address</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      className={errors.address ? "error" : ""}
                      type="text"
                      placeholder="Enter Address..."
                      onChange={handleChange}
                      name="address"
                      value={account.address}
                      required
                    />
                    {errors.address && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.address}
                      </span>
                    )}
                  </div>
                </div>
                {/* end */}
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
                      className={errors.regUsername ? "error" : ""}
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="regUsername"
                      value={account.regUsername}
                      autocomplete="off"
                      required
                    />
                    <div className="err">
                      {" "}
                      {errors.regUsername && (
                        <span style={{ color: "#f02849", fontSize: "14px" }}>
                          {errors.regUsername}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <label className="SUlabel">Email Address</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      className={errors.email ? "error" : ""}
                      type="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      name="email"
                      value={account.email}
                      required
                    />
                    {errors.email && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.email}
                      </span>
                    )}
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
                      className={errors.regPassword ? "error" : ""}
                      type="password"
                      placeholder="Password"
                      // onChange={handleChange}
                      onChange={(event) => {
                        setAccount((prev) => ({
                          ...prev,
                          [event.target.name]: event.target.value,
                        }));
                        setStrength(
                          evaluatePasswordStrength(event.target.value)
                        );
                      }}
                      name="regPassword"
                      value={account.regPassword}
                      autoComplete="off"
                      required
                    />
                    {errors.regPassword && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.regPassword}
                      </span>
                    )}
                    {account.regPassword && (
                      <>
                        <div
                          className={`password-strength ${
                            strength === "Weak"
                              ? "strength-weak"
                              : strength === "Medium"
                              ? "strength-medium"
                              : strength === "Strong"
                              ? "strength-strong"
                              : ""
                          }`}
                        >
                          Password strength: {strength}
                        </div>

                        <div className="strength-meter">
                          <div
                            className="strength-meter-fill"
                            style={{
                              width: getStrengthWidth(strength),
                              backgroundColor: getStrengthColor(strength),
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col">
                    <label className="SUlabel">Confirm Password</label>
                    <input
                      // className={errorMessage ? "error" : ""}
                      className={errors.regPassword2 ? "error" : ""}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      name="regPassword2"
                      value={account.regPassword2}
                      autoComplete="off"
                      required
                    />
                    {errors.regPassword2 && (
                      <span style={{ color: "#f02849", fontSize: "14px" }}>
                        {errors.regPassword2}
                      </span>
                    )}
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
                        height: "40px",
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
                  {/* {errorMessage && (
                    <div className="m-4" style={{ color: "red" }}>
                      {errorMessage}
                      </div>
                      )} */}
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
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer", fontSize: "20px" }}
                  >
                    <ArrowBack />
                  </span>
                </div>
              </form>
            </div>
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
            .SUcontainer input[type="date"],
            .SUcontainer select {
              width: calc(50% - 5px);
              padding: 10px;
              margin-bottom: 6px;
              border: 1px solid #ccc;
              border-radius: 4px;
            box-sizing: border-box;
            text-align: start;
          }
          
          .SUcontainer input.error {
            border: 0.1px solid red;
            font-size: 16px;
            }
            
            .SUcontainer select.error {
              border: 0.1px solid red;
              font-size: 16px;
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
            cursor: pointer;
            border: none;
            }
            
            .signup-button:hover {
              background-color: #04354a;
              }
              `}
        </style>
      </div>
    </>
  );
};

export default Signup;
