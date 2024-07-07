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
import { Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ImageIcon from "@mui/icons-material/Image";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Grow from "@mui/material/Grow";

// Step 1: Component: Basic Info
const Step1 = ({ onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      age.trim() === "" ||
      date.trim() === ""
    ) {
      setAlertOpen(true);
    } else if (parseInt(age) < 18) {
      setAgeLimit(true);
    } else {
      onNext(); // Move to the next step
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [ageLimit, setAgeLimit] = useState(false);

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
              // required
            ></input>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              // required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Email Address</label>
            <input
              type="text"
              placeholder="Enter your Email Address"
              // required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Age</label>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              placeholder=""
              // required
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Home Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              // required
            ></input>
          </div>
          <div className="input-rows">
            <label className="label">Contact Number</label>
            <input
              type="text"
              placeholder="Enter your Contact Number"
              // required
            ></input>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btnn" type="submit">
              Next
            </button>
          </div>
          {/* alert error handling */}
          {alertOpen && (
            <Grow in={alertOpen} style={{ transformOrigin: "center" }}>
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  position: "fixed",
                  right: "16px",
                  top: "90px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClose={() => setAlertOpen(false)}
              >
                Please fill in all the required fields.
              </Alert>
            </Grow>
          )}

          {ageLimit && (
            <Grow in={ageLimit} style={{ transformOrigin: "center" }}>
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  position: "fixed",
                  right: "16px",
                  top: "90px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClose={() => setAgeLimit(false)}
              >
                You must be at least 18 years old to proceed.
              </Alert>
            </Grow>
          )}
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
  const [alertOpen, setAlertOpen] = useState(false);

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

    if (!image1 || !image2) {
      // setOpen(false);
      // alert("Please upload both image before submitting.");
      setAlertOpen(true);
      console.log("please upload your images");
      setOpen(false);

      return;
    } else {
      onNext(); // Move to the next step
    }
    const formData = new FormData();

    formData.append("image1", image1);
    formData.append("image2", image2);
    console.log(formData);
    await axios
      .post(`http://localhost:8800/upload/${userID}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // setCurrentStep(currentStep + 1);
    setOpen(false);
    // alert("Successful upload file");
  };

  function handleDelete(image) {
    if (image === "image1") {
      setImage1(null);
      setPreview1(null);
    } else if (image === "image2") {
      setImage2(null);
      setPreview2(null);
    }
  }

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
              <input
                type="file"
                id="fileInput" //define id
                accept="image/*"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  // set into display: none because i use label as input htmlFor attribute
                  // remove display none for debug display file path name
                  display: "none",
                }}
              />
              <label
                htmlFor="fileInput"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <ImageIcon />
                Choose Image File
              </label>
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
                style={{
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  display: "flex",
                  alignContent: "center",
                  marginBottom: "12px",
                  //  i set into display: none because i use label as htmlFor attribute
                  display: "none",
                }}
              />
              <label
                htmlFor="fileInput1"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <ImageIcon />
                Choose Image File
              </label>

              {preview1 && (
                <div className="image-preview">
                  <img
                    src={preview1}
                    alt="Preview"
                    style={{
                      maxWidth: "300px",
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("image1")}
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      top: "-1px",
                      right: "-16px",
                      fontWeight: "900",
                    }}
                  >
                    X
                  </button>
                </div>
              )}

              <input
                type="file"
                id="fileInput2"
                name="image2"
                accept="image/*"
                onChange={handleImage}
                required
                style={{
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  display: "flex",
                  alignContent: "center",
                  //  i set into display: none because i use label as htmlFor attribute
                  display: "none",
                }}
              />
              <label
                htmlFor="fileInput2"
                style={{
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <ImageIcon />
                Choose Image File
              </label>
              {preview2 && (
                <div className="image-preview">
                  <img
                    src={preview2}
                    alt="Preview"
                    style={{
                      maxWidth: "300px",
                      marginTop: "15px",
                      marginBottom: "15px",
                      position: "relative",
                    }}
                  />
                  <button
                    className="buttdel"
                    type="button"
                    onClick={() => handleDelete("image2")}
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      top: "-1px",
                      right: "-16px",
                      fontWeight: "900",
                    }}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <div>
                <button className="btnn" type="button" onClick={onPrev}>
                  Prev
                </button>
                {/* <button className="btnn" type="submit" style={{}}>
                Next
              </button> */}
              </div>
              {/* alert error handling */}
              {alertOpen && (
                <Grow in={alertOpen} style={{ transformOrigin: "center" }}>
                  <Alert
                    variant="filled"
                    severity="error"
                    sx={{
                      position: "fixed",
                      right: "16px",
                      top: "90px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    onClose={() => setAlertOpen(false)}
                  >
                    Please upload both images before submitting.
                  </Alert>
                </Grow>
              )}
              <ButtonGroup aria-label="spacing button group">
                <Button
                  variant="outlined"
                  color="green"
                  sx={{
                    // Custom color
                    backgroundColor: "",
                    "&:hover": {
                      backgroundColor: "#1A97DE", // Darker green on hover
                    },
                    margin: "20px",
                    padding: "10px",
                    width: "100px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#1679ab",
                    color: "#fff",
                    border: "none",
                    fontSize: "13px",
                  }}
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
              </ButtonGroup>
              {/* </div>
            <button className="btnn" onClick={handleUpload}>SUBMIT</button>
            <div className="input-rows" style={{ justifyContent: "center" }}>
              <button className="btnn" type="button" onClick={onPrev}>
                Prev
              </button> */}
              {/* <button className="btnn" type="submit" style={{}}>
                Next
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Step 3:
const Step3 = ({ onPrev }) => {
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <div className="step">
      <form className="form-container">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Sending Verification to the Admin!
        </h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            margin: "110px",
          }}
        >
          <VerifiedIcon
            sx={{
              fontSize: "large",
              height: "600px",
              width: "250px",
              color: "skyblue",
            }}
          />
        </Box>
        {showSuccess && (
          <Grow in={showSuccess} style={{ transformOrigin: "center" }}>
            <Alert
              variant="filled"
              severity="success"
              sx={{
                position: "fixed",
                right: "16px",
                top: "90px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "white",
              }}
              onClose={() => setShowSuccess(false)}
            >
              Wait Admin for the confirmation process.
            </Alert>
          </Grow>
        )}
        <p
          style={{
            marginBottom: "5px",
            // marginLeft: "150px",
            fontSize: "15px",
            marginTop: "16vh",
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
