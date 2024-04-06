import React, { useState } from "react";
//import EmployerForm from '../components/EmployerForm.js';
import { useNavigate, Link } from "react-router-dom";
//import tawo from '../imgs/tawo.png';
import "./SignUp.css";
import axios from "axios";
import "./Error.css";

const SignUp = () => {
  const [account, setAccount] = useState({
    regUsername: "",
    regPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    // age: "",
    // bday: "",
    contactNumber: "",
    type: "Employer",
    dateCreated: "",
    regPassword2: "",
  });

  //handle state of error message
  const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  const [catcherErrorMessage, setCatcherErrorMessage] = useState("");
  //state for type checkbox
  const [isChecked, setIsChecked] = useState(false);
  //handle the state event
  const resetForm = () => {
    setAccount({
      regUsername: "",
      regPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      // age: "",
      // bday: "",
      contactNumber: "",
      type: isChecked ? "Employer" : "Catcher",
      dateCreated: "",
      regPassword2: "",
    });
    setEmployerErrorMessage("");
    setCatcherErrorMessage("");
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    resetForm();
  };
  //function for getting current date
  //triggers when  button clicked
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //function to navigate pages
  const navigate = useNavigate();

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax

    if (e.target.name === "type") {
      if (isChecked) {
        // Checkbox is checked, store one value
        setAccount((prev) => ({ ...prev, type: "Catcher" }));
      } else {
        // Checkbox is not checked, store another value
        setAccount((prev) => ({ ...prev, type: "Employer" }));
      }
    } else {
      // For other fields, use spread syntax as before
      setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //save the data into db
  const handleClick = async (e) => {
    //if fileds are empty
    //error message
    if (
      !account.firstName ||
      !account.lastName ||
      !account.regPassword ||
      !account.regPassword2 ||
      !account.email ||
      !account.contactNumber ||
      !account.type
    ) {
      if (account.type === "Employer") {
        setEmployerErrorMessage("Missing fields. Please try again.");
      } else {
        setCatcherErrorMessage("Missing fields. Please try again.");
      }
      return;
    } else if (account.regPassword.length < 8) {
      if (account.type === "Employer") {
        setEmployerErrorMessage("Password is too short.");
      } else {
        setCatcherErrorMessage("Password is too short.");
      }
      return;
    } else if (account.regPassword !== account.regPassword2) {
      if (account.type === "Employer") {
        setEmployerErrorMessage("Password does not match.");
      } else {
        setCatcherErrorMessage("Password does not match.");
      }
      return;
    }

    //save to db if no error
    e.preventDefault();
    try {
      account.dateCreated = getCurrentDate();
      await axios.post("http://localhost:8800/sign-up/", account); // new enpoint
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="body">
      <div className="container">
        <input
          type="checkbox"
          id="flip"
          className="flip"
          checked={isChecked}
          onChange={handleCheckboxChange} // Handle checkbox change
        />
        <div className="cover">
          <div className="front">
            <img src="/images/tawo.png" alt="Tawo" />
          </div>
          <div className="back">
            <img className="ErrandCatcher" src="" alt="" />
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="employer-form">
              <div className="title">Employer</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={account.firstName}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={account.lastName}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="regUsername"
                      value={account.regUsername}
                      autocomplete="off"
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                      value={account.email}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Contact Number"
                      onChange={handleChange}
                      name="contactNumber"
                      value={account.contactNumber}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Password (8-20)"
                      onChange={handleChange}
                      name="regPassword"
                      value={account.regPassword}
                      autoComplete="off"
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Confirm password.."
                      onChange={handleChange}
                      name="regPassword2"
                      value={account.regPassword2}
                    />
                    <br />
                    <p className="em">
                      <i>{employerErrorMessage}</i>
                    </p>
                    <div className="button1">
                      <button type="button" onClick={handleClick}>
                        Sign Up
                      </button>
                    </div>
                    <div className="sign-up-text">
                      Switch to <label htmlFor="flip">Catcher</label>
                    </div>
                    <div className="toSignIn">
                      Already got an account?{" "}
                      <div style={{ display: "block", marginTop: "5px" }}></div>
                      <i>
                        <Link to="/sign-in">Sign-in!</Link>
                      </i>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="Catcher-form">
              <div className="title">Catcher</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={account.firstName}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={account.lastName}
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="regUsername"
                      value={account.regUsername}
                      autoComplete="off"
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                      value={account.email}
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Contact Number"
                      onChange={handleChange}
                      name="contactNumber"
                      value={account.contactNumber}
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Password (8-20 characters)"
                      onChange={handleChange}
                      name="regPassword"
                      value={account.regPassword}
                      autoComplete="off"
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Confirm password..."
                      onChange={handleChange}
                      name="regPassword2"
                      autoComplete="off"
                      value={account.regPassword2}
                    />
                    <br />
                    <p className="em">
                      <i>{catcherErrorMessage}</i>
                    </p>
                    <div className="button1">
                      <button type="button" onClick={handleClick}>
                        Sign Up
                      </button>
                    </div>
                    <div className="sign-up-text">
                      Switch to <label htmlFor="flip">Employer</label>
                    </div>
                    <div className="toSignIn">
                      Already got an account?{" "}
                      <div style={{ display: "block", marginTop: "5px" }}></div>
                      <i>
                        <Link to="/sign-in">Sign-in!</Link>
                      </i>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
