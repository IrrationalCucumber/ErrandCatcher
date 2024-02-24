import React, { useState } from "react";
//import EmployerForm from '../components/EmployerForm.js';
import { useNavigate, Link } from "react-router-dom";
//import tawo from '../imgs/tawo.png';
import "./SignUp.css";
import axios from "axios";
import "./Error.css";

const SignUp = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    password2: "",
    lname: "",
    fname: "",
    gender: "",
    email: "",
    contact: "",
    age: "",
    bday: "",
    address: "",
    // desc:"",
    type: "Employer",
    dateCreated: "",
    // profileImage:"",
  });
  //resets when changing forms
  const resetForm = () => {
    setAccount({
      username: "",
      password: "",
      password2: "",
      lname: "",
      fname: "",
      gender: "",
      email: "",
      contact: "",
      age: "",
      bday: "",
      address: "",
      type: "Employer", // Set the default type here
      dateCreated: "",
    });
  };

  //handle state of error message
  const [employerErrorMessage, setEmployerErrorMessage] = useState("");
  const [catcherErrorMessage, setCatcherErrorMessage] = useState("");
  //state for type checkbox
  const [isChecked, setIsChecked] = useState(false);
  //handle the state event
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox status
    setAccount((prevAccount) => ({
      ...prevAccount,
      type: isChecked ? "Employer" : "Catcher", // update type if checked/unchecked
    }));

    // Call resetForm to reset the form fields
    resetForm();
  };

  //function for getting current date
  //triggers when  button clicked
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //function to navigate pages
  const navigate = useNavigate();

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setAccount((prev) => ({ ...prev, gender: e.target.value }));
    }
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
      !account.username ||
      !account.password ||
      !account.email ||
      !account.fname ||
      !account.lname ||
      !account.contact ||
      !account.age ||
      !account.bday ||
      !account.gender ||
      !account.type ||
      !account.address
    ) {
      if (account.type === "Employer") {
        setEmployerErrorMessage("Missing fields. Please try again.");
      } else {
        setCatcherErrorMessage("Missing fields. Please try again.");
      }
      return;
    } else if (account.password.length < 8) {
      if (account.type === "Employer") {
        setEmployerErrorMessage("Password is too short.");
      } else {
        setCatcherErrorMessage("Password is too short.");
      }
      return;
    } else if (account.password !== account.password2) {
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
      await axios.post("http://localhost:8800/user", account);
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(account);

  return (
    <div className="body">
      <div className="container">
        <input
          type="checkbox"
          id="flip"
          className="flip"
          checked={isChecked} // Bind the checkbox to the state variable
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
                      placeholder="Username"
                      onChange={handleChange}
                      name="username"
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Password (8-20)"
                      onChange={handleChange}
                      name="password"
                    />
                    <input
                      className={employerErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Confirm password.."
                      onChange={handleChange}
                      name="password2"
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
                    <div className="text sign-up-text">
                      I am a <label htmlFor="flip">Catcher</label>
                    </div>
                    <div className="toSignIn">
                      Already got an account? Sign in{" "}
                      <i>
                        <Link to="/sign-in">here!</Link>
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
                      className={catcherErrorMessage ? "error" : ""}
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      name="username"
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Password (8-20 characters)"
                      onChange={handleChange}
                      name="password"
                    />
                    <input
                      className={catcherErrorMessage ? "error" : ""}
                      type="password"
                      placeholder="Confirm password..."
                      onChange={handleChange}
                      name="password2"
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
                    <div className="text sign-up-text">
                      Switch to <label htmlFor="flip">Employer</label>
                    </div>
                    <div className="toSignIn">
                      Already got an account? Sign in{" "}
                      <i>
                        <Link to="/sign-in">here!</Link>
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
