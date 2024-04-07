import React, { useState } from "react";
import RadioInputs from "./RadioInputs";

const Signup = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { label: "Employer", value: "employer" },
    { label: "Catcher", value: "catcher" },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTypeChange = () => {
    setSelectedType(selectedOption);
  };

  const handleReset = () => {
    setSelectedType("");
    setSelectedOption("");
  };

  const onSubmit = async (data) => {
    try {
      // Your HTTP request code for sign-up goes here
      console.log(data);
      // Redirect to login page after successful sign-up
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="SUcontainer" style={{ maxWidth: "950px", margin: "20px auto", padding: "0 15px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "sans-serif", paddingTop: "20px" }}>Errand Catcher</h2>
      <form onSubmit={onSubmit}>
        <div className="SUrow">
          {!selectedType && (
            <div className="col text-center">
              <div className="SUcontainer" style={{ maxWidth: "950px", margin: "0 auto", padding: "20px 20px 20px 20px", textAlign: "center" }}>
                <h2>Join as an Employer or a Catcher</h2>
              </div>
              <RadioInputs
                options={options}
                selectedOption={selectedOption}
                onChange={handleOptionChange}
              />
              <div>
                <button onClick={handleTypeChange} disabled={!selectedOption}
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
                    ? `Join as ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}`
                    : "Create Account"}
                </button>
              </div>
              <div className="m-4" style={{ paddingTop: "20px" }}>
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          )}
          {selectedType && (
            <div className="col" style={{ flex: "1", padding: "0 15px" }}>
              <div className="text-center mb-4">
                <h3>Signup to Errand Catcher</h3>
              </div>
              <form
                className="mt-4 mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                <div className="SUrow" style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}>
                  <div className="col">
                    <label className="SUlabel">Username</label>
                    <input type="text" placeholder="Username" required />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Email Address</label>
                    <input type="email" placeholder="Email Address" required />
                  </div>
                </div>
                <div className="SUrow" style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}>
                  <div className="col">
                    <label className="SUlabel">First Name</label>
                    <input type="text" placeholder="First Name" required />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Last Name</label>
                    <input type="text" placeholder="Last Name" required />
                  </div>
                </div>
                <div className="SUrow" style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}>
                  <div className="col">
                    <label className="SUlabel">Birthday</label>
                    <input type="date" placeholder="Birthday" required />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Gender</label>
                    <select required style={{ width: "100%" }}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="SUrow" style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}>
                  <div className="col">
                    <label className="SUlabel">Password</label>
                    <input type="password" placeholder="Password" required />
                  </div>
                  <div className="col">
                    <label className="SUlabel">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" required />
                  </div>
                </div>
                <div className="SUrow" style={{ display: "flex", flexWrap: "wrap", margin: "0 -15px" }}>
                  <div className="col text-center">
                    <button type="submit">Sign Up</button>
                  </div>
                </div>
                <div className="m-4" style={{ paddingTop: "20px" }}>
                  Already have an account? <a href="/login">Login</a>
                </div>
                <div className="m-4-return" style={{ paddingTop: "20px", paddingLeft:"20px", border:"none",  position: "absolute", top: 0, left: 0 }}>
                  <span  onClick={handleReset} style={{cursor:"pointer", fontSize: "20px"}}>
                    <i class="fa-solid fa-arrow-left"/>
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
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
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
