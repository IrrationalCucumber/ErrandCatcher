import React, { useEffect, useState } from "react";
import { Grow, Alert } from "@mui/material";
import {
  Button,
  DialogActions,
  DialogContent,
  ButtonGroup,
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  Box,
} from "@mui/joy";
import { Image, WarningRounded, Verified } from "@mui/icons-material";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "./css/style.css";
import { useNavigate } from "react-router-dom";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../LoadingSpinner";
import { Capitalize } from "../Display/DsiplayFunctions";

export default function StepContent() {
  return <div>StepContent</div>;
}
// STEP 1
//Basin info
export function Step1({ onNext, details, setDetail }) {
  const { user } = useAuth();
  const userID = user.userID;
  //detaill to be passed to step 2

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    if (
      details.fname === "" ||
      details.lname === "" ||
      details.email == "" ||
      details.address == "" ||
      details.gender == "" ||
      details.bday === "" ||
      details.contact == ""
    ) {
      console.log("Fields are empty bruh");
      setAlertOpen(true);
    } else if (parseInt(details.age) < 18) {
      setAgeLimit(true);
    } else {
      onNext(); // Move to the next step
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${userID}`);
        const d = res.data[0];

        setDetail({
          fname: d.userFirstname,
          lname: d.userLastname,
          bday: new Date(d.userBirthday).toISOString().substr(0, 10),
          gender: d.userGender,
          address: d.userAddress,
          email: d.userEmail,
          contact: d.userContactNum,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [userID]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [ageLimit, setAgeLimit] = useState(false);

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setDetail((prev) => ({ ...prev, gender: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

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

  return (
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
              name="fname"
              value={details.fname}
              onChange={handleChange}
            // required
            ></input>
            <input
              type="text"
              placeholder="Last name"
              value={details.lname}
              name="lname"
              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Email Address</label>
            <input
              type="text"
              value={details.email}
              name="email"
              placeholder="Enter your Email Address"
              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Gender</label>
            <select
              className="select"
              value={details.gender}
              name="gender"
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-rows">
            <label className="label">Birthdate</label>
            <input
              type="date"
              value={details.bday}
              name="bday"
              onChange={handleChange}
              max={getMaxDate()}
            ></input>
          </div>

          <div className="input-rows">
            <label className="label">Home Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              name="address"
              value={details.address}
              onChange={handleChange}
            // required
            ></input>
          </div>
          <div className="input-rows">
            <label className="label">Contact Number</label>
            <input
              type="number"
              value={details.contact}
              name="contact"
              placeholder="Enter your Contact Number"
              onChange={handleChange}
            // required
            ></input>
          </div>
          <div className="step__button">
            <button className="btnn" type="submit">
              Next
            </button>
          </div>
          {/* alert error handling */}
          {alertOpen && (
            <Grow className="step__grow" in={alertOpen}>
              <Alert
                variant="filled"
                severity="error"
                className="step__alert"
                onClose={() => setAlertOpen(false)}
              >
                Please fill in all the required fields.
              </Alert>
            </Grow>
          )}

          {ageLimit && (
            <Grow className="step__grow" in={ageLimit}>
              <Alert
                variant="filled"
                severity="error"
                className="step__age__alert"
                sx={{
                  fontWeight: "bold",
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
}
//STEP 2
// Upload Docu and ID
export function Step2({
  images,
  setImages,
  haveLicense,
  setHaveLicense,
  onNext,
  onPrev,
}) {
  const { user } = useAuth();
  const userID = user.userID;
  const [open, setOpen] = useState(false); // modal

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // move next
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const previewPic = URL.createObjectURL(file);
      if (e.target.name === "image1") {
        setImages((prevImages) => ({
          ...prevImages,
          image1: file,
          preview1: previewPic,
        }));
      } else if (e.target.name === "image2") {
        setImages((prevImages) => ({
          ...prevImages,
          image2: file,
          preview2: previewPic,
        }));
      } else if (e.target.name === "doc1") {
        setImages((prevImages) => ({
          ...prevImages,
          doc1: file,
          preview3: previewPic,
        }));
      }
    }
  }

  function handleDelete(image) {
    if (image === "image1") {
      setImages((prevImages) => ({
        ...prevImages,
        image1: null,
        preview1: "",
      }));
    } else if (image === "image2") {
      setImages((prevImages) => ({
        ...prevImages,
        image2: null,
        preview2: "",
      }));
    } else if (image === "doc1") {
      setImages((prevImages) => ({
        ...prevImages,
        doc1: null,
        preview3: "",
      }));
    }
  }

  return (
    <div>
      <div className="step">
        <h1>Upload Image</h1>
        <div className="form-group1">
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-rows2">
              <label
                className="label2"
                style={{ marginTop: "20px" }}
                htmlFor="fileInput2"
              >
                Upload your image here
              </label>
              <p>Upload your identification card here</p>
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
                  //  i set into display: none because i use label as htmlFor attribute
                  display: "none",
                }}
              />
              {!images.preview1 ? (
                <label htmlFor="fileInput1" className="step__img__input">
                  <Image />
                  Choose Image File
                </label>
              ) : null}

              {images.preview1 && (
                <div className="image-preview">
                  <img
                    src={images.preview1}
                    alt="Preview"
                    className="step2_img_preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("image1")}
                    className="step2_img_preview_btn"
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
                  //  i set into display: none because i use label as htmlFor attribute
                  display: "none",
                }}
              />
              {!images.preview2 ? (
                <label htmlFor="fileInput2" className="step__img__input">
                  <Image />
                  Choose Image File
                </label>
              ) : null}

              {images.preview2 && (
                <div className="image-preview">
                  <img
                    src={images.preview2}
                    alt="Preview"
                    className="step2_img_preview"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("image2")}
                    className="step2_img_preview_btn"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            {user.userType === "Catcher" && (
              <>
                {" "}
                <div className="input-rows2">
                  <label>
                    Have License?
                    <input
                      type="checkbox"
                      onClick={(e) => setHaveLicense(e.target.checked)}
                    />
                    YES
                  </label>
                </div>
                {/* UPLOAD LICESNE IF USER HAVE IT */}
                {/* Upload license section if the user has a license */}
                {haveLicense && (
                  <>
                    <div className="input-rows2">
                      <label className="label2" htmlFor="fileInput">
                        Please upload your Driver's License here:
                      </label>
                      <p>Select your file below:</p>
                    </div>

                    <div className="input-rows2">
                      <input
                        type="file"
                        name="doc1"
                        id="fileInput"
                        onChange={handleImage}
                        accept="image/*"
                        style={{
                          display: "none", // Hide the input
                        }}
                      />

                      {!images.doc1 ? (
                        <label htmlFor="fileInput" className="step__img__input">
                          <Image />
                          <span>Choose Image File</span>
                        </label>
                      ) : null}

                      {/* Preview the uploaded driver’s license */}
                      {images.doc1 && (
                        <div className="image-preview">
                          <img
                            src={images.preview3}
                            alt="Driver's License Preview"
                            className="step2_img_preview"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete("doc1")}
                            className="step2_img_preview_btn"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            <div className="step2__nav__button">
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
                    className="step2__alert__error"
                    sx={{
                      fontWeight: "bold",
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
                  className="step2__nav__btn__sbmt"
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
                      <WarningRounded />
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
                        onClick={onNext} // Upload the file if Yes
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
}
//STEP 3
// SUmmary and Submit Request
export function Step3({ details, images, haveLicense, onPrev, onNext }) {
  const { user } = useAuth();
  const userID = user.userID;
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  //FOR NOTIFICATION
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images.image1 || !images.image2) {
        setAlertOpen(true);
        console.log("please enter images");
        setOpen(false);

        return;
      }
      setOpen(false);
      setLoading(true);

      // 5 seconds cd
      setTimeout(() => {
        setLoading(false);

        onNext();
      }, 5000);

      // onNext();
      //wrap file images into formdata
      const formData = new FormData();

      formData.append("image1", images.image1);
      formData.append("image2", images.image2);
      formData.append("doc1", images.doc1);

      // console.log(formData);
      console.log("info successfully sent to server");
      //upload docs to server
      await axios
        .post(`http://localhost:8800/upload/${userID}`, formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //update accound data
      await axios.put("http://localhost:8800/update-info/" + userID, details);
      //add a notification to the admin
      notif.notifDesc = `${Capitalize(details.fname) + " " + Capitalize(details.lname)
        } has submitted a Verification request`;
      notif.userID = 1;
      notif.notificationType = "Verification Request";
      await axios.post("http://localhost:8800/notify", notif);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="step">
      <h1 className="step__title">Summary</h1>

      <div className="form-container">
        <div className="form-details">
          <p><strong>First Name:</strong> {details.fname}</p>
          <p><strong>Last Name:</strong> {details.lname}</p>
          <p><strong>Sex:</strong> {details.gender}</p>
          <p><strong>Birthday:</strong> {details.bday}</p>
          <p><strong>Email:</strong> {details.email}</p>
          <p><strong>Contact #:</strong> {details.contact}</p>
        </div>

        <div className="image-previews">
          {images.preview1 && (
            <img
              src={images.preview1}
              className="step__img__preview"
              alt="Preview 1"
            />
          )}
          {images.preview2 && (
            <img
              src={images.preview2}
              className="step__img__preview"
              alt="Preview 2"
            />
          )}
          {images.preview3 && (
            <img
              src={images.preview3}
              className="step__img__preview"
              alt="Preview 3"
            />
          )}
        </div>


        <LoadingBackdrop
          open={loading}
          text="Please wait... Your documents are uploading to the Admin."
          icons={<HourglassBottomIcon />}
        />

        {alertOpen && (
          <Grow in={alertOpen} style={{ transformOrigin: "center" }}>
            <Alert
              variant="filled"
              severity="error"
              className="step2__alert__error"
              sx={{
                fontWeight: "bold",
              }}
              onClose={() => setAlertOpen(false)}
            >
              Please upload both images before submitting.
            </Alert>
          </Grow>
        )}

        <div className="done__nav__btn">
          <Button
            className="btnn"
            onClick={onPrev}
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            BACK
          </Button>

          <Button
            variant="outlined"
            color="success"
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
            // onClick={onSubmit}
            onClick={() => handleOpenModal()}
          >
            Submit
          </Button>

          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRounded />
                Confirmation
              </DialogTitle>
              <Divider />
              <DialogContent>
                Are you sure you want to submit all your documents?
              </DialogContent>
              <DialogActions>
                <Button
                  variant="plain"
                  color="neutral"
                  // Upload the file if Yes
                  onClick={onSubmit}
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
        </div>
      </div>

    </div >
  );
}
//Success
export function Step4() {
  const [showSuccess, setShowSuccess] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="step">
      <form className="form-container">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Submitting Verification to the Admin!
        </h1>
        <Box className="step4__box">
          <Verified
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
        <p className="step4__text">Explore the services in Errand Catcher</p>
        <div className="done__nav__btn">
          <Button
            variant="outlined"
            color="success"
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
            onClick={() => navigate("/profile/me")}
          >
            Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
