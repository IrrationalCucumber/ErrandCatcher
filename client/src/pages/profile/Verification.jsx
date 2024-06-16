//for verification
import React, { useState, useEffect } from "react";
import Stepper from "../../components/stepper"; // Corrected import path
import "./verification.css"; // Import the provided CSS styles
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

// Step 1: Component: Basic Info
const Step1 = ({ onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      age.trim() === ""
    ) {
      alert("Please fill in all the required fields.");
    } else if (parseInt(age) < 18) {
      alert("You must be at least 18 years old to proceed.");
    } else {
      onNext(); // Move to the next step
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="step">
      <h1 style={{ textAlign: "center" }}>Basic Information</h1>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btnn" type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Step 2: Upload file
const Step2 = ({ onPrev, onNext }) => {
  const { user } = useAuth();
  const userID = user.userID;
  const [open, setOpen] = useState(false); // modal

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

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
    const file = e.target.files[0];
    if (file) {
      const previewPic = URL.createObjectURL(file);
      if (e.target.name === "image1") {
        // setImage1(e.target.files[0]);
        setImage1(file);
        setPreview1(previewPic);
      } else if (e.target.name === "image2") {
        // setImage2(e.target.files[0]);
        setImage2(file);
        setPreview2(previewPic);
      }
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
    // setCurrentStep(currentStep + 1);
    setOpen(false);
    alert("Successful upload file");
  };

  return (
    <div>
      <div className="step">
        <h1 style={{ textAlign: "center" }}>Upload Image</h1>
        <div className="form-group1">
          <form className="form-container" onSubmit={handleSubmit}>
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
              {preview1 && (
                <img
                  src={preview1}
                  alt="Preview"
                  style={{
                    maxWidth: "300px",
                    marginTop: "15px",
                    marginBottom: "15px",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignContent: "center",
                  }}
                />
              )}
              <input
                type="file"
                id="fileInput2"
                name="image2"
                accept="image/*"
                onChange={handleImage}
                required
              />
              {preview2 && (
                <img
                  src={preview2}
                  alt="Preview"
                  style={{
                    maxWidth: "300px",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <ButtonGroup aria-label="spacing button group">
                <Button
                  variant="outlined"
                  color="green"
                  sx={{
                    // Custom color
                    backgroundColor: "",
                    "&:hover": {
                      backgroundColor: "skyblue", // Darker green on hover
                    },
                  }}
                  // endDecorator={<DeleteForever />}
                  onClick={() => handleOpenModal()}
                >
                  Submit file
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                      <WarningRoundedIcon />
                      Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                      Are you sure you want to submit this upload file?
                      {/* Display the current ID from state */}
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="plain"
                        color="neutral"
                        onClick={handleUpload} // Upload the file if Yes
                      >
                        Yes
                      </Button>
                      <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </ModalDialog>
                </Modal>
                {/* <Button
                    onClick={() => handleDelete(commissionItem.commissionID)}
                  >
                    DELETE
                  </Button> */}
              </ButtonGroup>
            </div>
            {/* <button className="btnn" onClick={handleUpload}>SUBMIT</button> */}
            <div className="input-rows" style={{ justifyContent: "center" }}>
              <button className="btnn" type="button" onClick={onPrev}>
                Prev
              </button>
              <button className="btnn" type="submit" style={{}}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Step 3:
const Step3 = ({ onPrev }) => {
  const showAlert = () => {
    alert(
      "Please wait for the confirmation of your verification from the Admin!"
    );
  };
  useEffect(() => {
    showAlert();
  }, []);

  return (
    <div className="step">
      <form className="form-container">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Sending Verification to the Admin!
        </h1>
        <p
          style={{
            marginBottom: "5px",
            // marginLeft: "150px",
            fontSize: "15px",
            marginTop: "45vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          Explore the services in Errand Catcher
        </p>
      </form>
    </div>
  );
};

const Verification = () => {
  const steps = [<Step1 />, <Step2 />, <Step3 />];

  return (
    <div className="App">
      <Stepper list={steps} />
    </div>
  );
};

export default Verification;
