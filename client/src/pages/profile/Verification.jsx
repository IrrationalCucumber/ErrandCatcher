//for verification
import React, { useState } from "react";
import Stepper from "../../components/stepper"; // Corrected import path
import "./verification.css"; // Import the provided CSS styles
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

function Verification() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const userID = user.userID;

  const handleNext = () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      age.trim() === ""
    ) {
      alert("Please fill in all the required fields.");
    } else if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to proceed.");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  function handleImage(e) {
    // const selectedFiles = e.target.files;
    // if (selectedFiles.length > 2) {
    //   // If more than two files are selected, alert the user
    //   alert("You can only upload up to two images.");
    //   // Clear the file input
    //   e.target.value = null;
    //   return;
    // }
    // // Set the images state with the selected files
    // setImages(selectedFiles);
    if (e.target.name === "image1") {
      setImage1(e.target.files[0]);
    } else if (e.target.name === "image2") {
      setImage2(e.target.files[0]);
    }
  }
  // console.log(image1);
  // console.log(image2);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // for (const fileKey in files) {
    //   if (files.hasOwnProperty(fileKey)) {
    //     const fileArray = files[fileKey];
    //     if (Array.isArray(fileArray)) {
    //       fileArray.forEach((file) => {
    //         formData.append("files", file);
    //       });
    //     } else {
    //       formData.append("files", fileArray);
    //     }
    //   }
    // }
    //append them into one
    formData.append("image1", image1);
    formData.append("image2", image2);
    console.log(formData);
    await axios
      .post(`http://localhost:8800/upload/${userID}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setCurrentStep(currentStep + 1);
  };
  //console.log();

  const list = [
    <div className="step">
      <h1>Basic Information</h1>
      {/*step 1 for input logic part is lacking where user input auto fill up */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <div className="input-rows">
            <label className="label">Full Name</label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></input>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Email Address</label>
            <input
              type="text"
              placeholder="Enter your Email Address"
              required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Age</label>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder=""
              required
            ></input>

            <label className="label">Gender</label>
            <select className="select">
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-rows">
            <label className="label">Birthdate</label>
            <input type="date" required></input>
          </div>

          <div className="input-rows">
            <label className="label">Home Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              required
            ></input>
          </div>
          <div className="input-rows">
            <label className="label">Contact Number</label>
            <input
              type="text"
              placeholder="Enter your Contact Number"
              required
            ></input>
          </div>

          <div>
            <button
              type="submit"
              onClick={handleNext}
              style={{
                margin: "20px",
                padding: "10px",
                width: "100px",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>,
    <div className="step">
      <h1>Upload Image</h1>
      <div className="form-group1">
        <form className="form-container">
          <div className="input-rows2">
            <label
              className="label2"
              style={{ marginTop: "5px" }}
              htmlFor="fileInput1"
            >
              Upload your documents in here
            </label>
            <p
              style={{
                marginBottom: "5px",
                marginLeft: "10px",
                fontSize: "10px",
              }}
            >
              Upload your legal documents here
            </p>
          </div>
          <div className="input-rows2">
            <input type="file" id="fileInput1" accept="image/*" />
          </div>
          <div className="input-rows2">
            <label
              className="label2"
              style={{ marginTop: "20px" }}
              htmlFor="fileInput2"
            >
              Upload your image here
            </label>
            <p
              style={{
                marginBottom: "5px",
                marginLeft: "10px",
                fontSize: "10px",
              }}
            >
              Upload your identification card here
            </p>
          </div>
          <div className="input-rows2">
            <input
              type="file"
              id="fileInput1"
              name="image1"
              accept="image/*"
              onChange={handleImage}
              required
            />
            <input
              type="file"
              id="fileInput2"
              name="image2"
              accept="image/*"
              onChange={handleImage}
              required
            />
          </div>
          <button onClick={handleUpload}>SUBMIT</button>
          <div className="input-rows" style={{ justifyContent: "center" }}>
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{
                margin: "20px",
                padding: "10px",
                width: "100px",
                borderRadius: "5px",
              }}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              style={{
                margin: "20px",
                padding: "10px",
                width: "100px",
                borderRadius: "5px",
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>,

    <div className="step">
      <form className="form-container">
        <h1>Sending Verifification to the Admin!</h1>
        <p
          style={{ marginBottom: "5px", marginLeft: "150px", fontSize: "15px" }}
        >
          Explore the services in Errand Catcher
        </p>
      </form>
    </div>,
  ];

  return (
    <div className="App">
      <Stepper list={list} currentStep={currentStep} />
    </div>
  );
}

export default Verification;
