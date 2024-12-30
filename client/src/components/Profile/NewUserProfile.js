/**
 * WRITTEN BY: YOLO
 * 5/12/24
 * Component New profileUI
 */

import React, { useState } from "react";
import "./profile.css";
import StarRating from "../Display/StarRating";
import ViewFeedback from "./ViewFeedback";
import Docu from "./Docu";
import Resetpassword from "./Resetpassword";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Input,
  Sheet,
  Stack,
  Typography,
  Alert,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  AmountDecimal,
  Capitalize,
  DisplayDate,
  GetUserAge,
} from "../Display/DsiplayFunctions";
import { useAuth } from "../AuthContext";
import SkillsInputModal from "../Profile Modal/SkillsInputModal";
import { Call, Email, Home, Mail } from "@mui/icons-material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MyFeedback } from "../Dashbaord/Feedback";
import { maxHeight } from "@mui/system";

import PersonIcon from "@mui/icons-material/Person";
import Person2Icon from "@mui/icons-material/Person2";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";
import Experience, { ViewExperience } from "./Experience";

export function NewUserProfileui(props) {
  const { user } = useAuth();
  const userID = user.userID;
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

    if (props.handleImage) {
      props.handleImage(e);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
  };
  //skills of user
  const skillsArray = props.skills ? props.skills.split(",") : [];

  const [account, setAccount] = useState({
    currentpass: "",
    password: "",
    conPassword: "",
  });

  //Alert feedback
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [iconlert, setIconLert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  //modal for pics
  //adrean 12/17/2024
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filePath, setFilePath] = useState();
  const handleOpenModalDocs = (docs) => {
    setOpenModal(true);
    setFilePath(docs);
  };

  const [strength, setStrength] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  // finale
  const changePassword = async (event) => {
    event.preventDefault();

    try {
      // Make API request to update password
      const response = await axios.put(
        `http://localhost:8800/resetpassword/${userID}`,
        {
          currentpass: account.currentpass,
          password: account.password,
          conPassword: account.conPassword,
        }
      );

      // Show success message
      setMessage(response.data.message);
      setAlertColor("success");
      setIconLert(<CheckCircleOutlineIcon />);
      setShowAlert(true);

      // Reload page after successful password change
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      // Handle errors
      if (err.response && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
      }

      setAlertColor("danger");
      setIconLert(<WarningIcon />);
      setShowAlert(true);
    }
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
  console.log(account);

  const imageStyle = {
    padding: "20px",
    margin: "10px",
    maxWidth: "95%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const navigate = useNavigate();

  return (
    <>
      <div class="container">
        <div class="row gy-4 gy-lg-0">
          <div class="col-12 col-lg-4 col-xl-3">
            <div class="row gy-4">
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">
                    Welcome, {props.fname} {props.lname}
                  </div>
                  <div class="card-body">
                    <div class="text-center mb-3">
                      {props.profileImg ? (
                        <img
                          className="user_profile_pic"
                          src={`http://localhost:8800/images/profile/${props.profileImg}`}
                          alt="ProfPic"
                        />
                      ) : (
                        <img src="/images/employer.png" alt="Profile Picture" />
                      )}
                    </div>
                    <h5 class="text-center mb-1">
                      {props.fname} {props.lname}
                    </h5>

                    {props.type === "Employer" ? (
                      <p class="text-center text-secondary mb-4">Employer</p>
                    ) : props.type === "Catcher" ? (
                      <p class="text-center text-secondary mb-4">Catcher</p>
                    ) : props.type === "admin" ? (
                      <p class="text-center text-secondary mb-4">Admin</p>
                    ) : null}


                    {/* --------------------- Rating --------------------- */}
                    {props.type === "Catcher" ? (
                      <div class="text-center text-secondary mb-4">
                        <div className="rating">
                          Overall Rating:
                          <span>
                            <StarRating rating={props.rate} />
                            <p>
                              <i>
                                {props.rate
                                  ? props.rate.toFixed(1)
                                  : "No Rating"}
                              </i>
                            </p>
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* about me section */}
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div
                    class="card-header text-bg-primary"
                    style={{ background: "#378ce7" }}
                  >
                    Account Status
                  </div>
                  <div class="card-body d-flex justify-content-center align-items-center">
                    {props.status === "Verified" ? (
                      <>
                        <Chip
                          sx={{
                            fontSize: "1.1rem",
                            height: "30px",
                            padding: "20px 15px",
                          }}
                          size="sm"
                          variant="solid"
                          color="success"
                        >
                          <VerifiedIcon /> {props.status.toLocaleUpperCase()}
                        </Chip>
                      </>
                    ) : (
                      <>
                        <>
                          <Chip
                            sx={{
                              fontSize: "1.1rem",
                              height: "30px",
                              padding: "20px 15px",
                            }}
                            size="sm"
                            variant="solid"
                            color="danger"
                          >
                            <ErrorIcon /> {props.status.toLocaleUpperCase()}
                          </Chip>
                        </>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {user.userType === "Catcher" && (
                <div class="col-12">
                  <div class="card widget-card border-light shadow-sm">
                    <div class="card-header text-bg-primary">
                      {props.type === "Catcher" ? "Skills" : "Tags"}
                    </div>
                    <div class="card-body">
                      <Box
                        sx={{
                          flex: "1 1 auto",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {skillsArray.length > 0 ? ( // Check if there are any skills to display
                          <>
                            <Stack
                              direction="row"
                              flexWrap="wrap"
                              sx={{ gap: 1 }} // Ensures spacing between items
                            >
                              {skillsArray.map((skill, index) => (
                                <Chip
                                  key={index}
                                  variant="solid" // Gives a subtle background color
                                  color="primary" // Choose the color theme (primary, secondary, etc.)
                                  size="md" // Medium size for better visibility
                                >
                                  {skill.trim()}{" "}
                                  {/* Trims any unnecessary whitespace */}
                                </Chip>
                              ))}
                            </Stack>
                            <Button
                              size="lg"
                              variant="soft"
                              sx={{
                                margin: 1,
                                width: "100%",
                                borderRadius: "8px",
                              }}
                              onClick={() => setOpen(true)}
                            >
                              UPDATE
                            </Button>
                          </>
                        ) : (
                          <>
                            <Typography level="body2" color="neutral">
                              No skills provided.
                            </Typography>
                            <Button
                              size="lg"
                              variant="soft"
                              sx={{
                                margin: 1,
                                width: "100%",
                                borderRadius: "8px",
                              }}
                              onClick={() => setOpen(true)}
                            >
                              ADD
                            </Button>
                          </>
                        )}
                        <SkillsInputModal
                          skills={skillsArray}
                          open={open}
                          close={() => setOpen(false)}
                        />
                      </Box>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sections............ */}
          <div class="col-12 col-lg-8 col-xl-9">
            <div class="card widget-card border-light shadow-sm">
              <div class="card-body p-4">
                {/* Tabs..... */}
                <ul class="nav nav-tabs" id="profileTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="overview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#overview-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="overview-tab-pane"
                      aria-selected="true"
                    >
                      Overview
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Profile
                    </button>
                  </li>

                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#password-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="password-tab-pane"
                      aria-selected="false"
                    >
                      Password
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="documets-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#documents-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="documents-tab-pane"
                      aria-selected="false"
                    >
                      Documents
                    </button>
                  </li>

                  {user.userType === "Catcher" ? (
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="reviews-tab-pane"
                        aria-selected="false"
                      >
                        Reviews
                      </button>
                    </li>
                  ) : null}

                  {user.userType === "Catcher" ? (
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="exp-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#exp-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="exp-tab-pane"
                        aria-selected="false"
                      >
                        Experience
                      </button>
                    </li>
                  ) : null}
                </ul>
                {/* ------------------------ Overview tab ---------------------------- */}
                <div class="tab-content pt-4" id="profileTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="overview-tab-pane"
                    role="tabpanel"
                    aria-labelledby="overview-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">About: </h5>
                    <p class="lead mb-3">
                      {props.fname} is {props.desc}
                    </p>

                    <h5 class="mb-3">Profile</h5>
                    <div class="row g-0">
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PersonIcon /> First Name
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.fname}</div>
                      </div>

                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <Person2Icon /> Last Name
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.lname}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <HomeIcon /> Address
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.address}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <EmailIcon /> Email
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.email}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <AccountBoxIcon /> Username
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.username}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PhoneIcon /> Contact
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.contact}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <WcIcon /> Gender
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.sex}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PlusOneIcon /> Age
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{GetUserAge(props.bday)}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <CakeIcon /> Birthdate
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.bday}</div>
                      </div>
                    </div>
                  </div>

                  {/* ---------------------------- Profile tab ------------------------ */}
                  <div
                    class="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabindex="0"
                  >
                    <form onSubmit={props.click} class="row gy-3 gy-xxl-4">
                      <div class="col-12">
                        <div class="row gy-2">
                          <label class="col-12 form-label m-0">
                            Profile Image
                          </label>

                          <div class="col-12">
                            {preview ? (
                              <>
                                {/* Display Preview Image */}
                                <img
                                  className="user_profile_pic"
                                  src={preview}
                                  alt="Preview Image"
                                  // width={250}
                                  // height={250}
                                  style={{
                                    padding: "20px",
                                    border: "1px solid skyblue",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                                  }}
                                />
                                <button
                                  onClick={handleDeleteImage}
                                  style={{
                                    border: "none",
                                    backgroundColor: isHovered
                                      ? "#ffcccc"
                                      : "transparent",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                  }}
                                >
                                  <DeleteIcon
                                    sx={{ fontSize: 30 }}
                                    color="error"
                                  />
                                </button>
                              </>
                            ) : (
                              // If no preview, show existing profile image or default
                              <>
                                {props.profileImg ? (
                                  <img
                                    className="user_profile_pic"
                                    src={`http://localhost:8800/images/profile/${props.profileImg}`}
                                    alt="ProfPic"
                                  />
                                ) : (
                                  <img
                                    src="/images/employer.png"
                                    alt="Profile Picture"
                                  />
                                )}
                              </>
                            )}

                            <div className="upload-container">
                              <input
                                type="file"
                                id="file"
                                onChange={handleImage}
                                style={{ display: "none" }}
                              />
                              <label
                                // className="prolabel"
                                htmlFor="file"
                                style={{
                                  // border: "1px dashed black",
                                  border: "none",
                                  flexDirection: "row",
                                  gap: "4px",
                                  alignItems: "center",
                                  backgroundColor: "#f0f0f0",
                                  maxWidth: "18rem",
                                  display: "flex",
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <AddAPhotoIcon color="primary" />
                                Choose Image File
                              </label>

                              <Button
                                loading={false}
                                onClick={props.handleUpload}
                                size="md"
                                variant="solid"
                              >
                                <FileUploadIcon />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputFirstName" class="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={props.handleChange}
                          name="fname"
                          value={props.fname}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputLastName" class="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="lname"
                          onChange={props.handleChange}
                          value={props.lname}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputPhone" class="form-label">
                          Contact Number
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          name="contact"
                          onChange={props.handleChange}
                          value={props.contact}
                        />
                      </div>

                      <div class="col-12 col-md-6">
                        <label for="inputEmail" class="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          onChange={props.handleChange}
                          name="email"
                          value={props.email}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputEmail" class="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={props.handleChange}
                          name="username"
                          value={props.username}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputEmail" class="form-label">
                          Birthdate
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          onChange={props.handleChange}
                          name="bday"
                          value={props.bday}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputEmail" class="form-label">
                          Age
                        </label>
                        <input
                          type="number"
                          name="age"
                          class="form-control"
                          placeholder="Age"
                          onChange={props.handleChange}
                          value={GetUserAge(props.bday)}
                          disabled={true}
                        ></input>
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputAddress" class="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={props.handleChange}
                          name="address"
                          value={props.address}
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="inputCountry" class="form-label">
                          Gender
                        </label>
                        <select
                          // className="display-data1"
                          className="form-select"
                          value={props.sex}
                          onChange={props.handleChange}
                          name="gender"
                        >
                          {/* gender */}
                          <option value="">Choose gender....</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div class="col-12">
                        <label for="inputAbout" class="form-label">
                          About
                        </label>
                        <textarea
                          class="form-control"
                          name="desc"
                          onChange={props.handleChange}
                          value={props.desc}
                        >
                          {props.desc}
                        </textarea>
                      </div>
                      <div class="col-12">
                        <button type="submit" class="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* -------------------------- Password tab ------------------------------ */}

                  {/* alert handling */}
                  {showAlert && (
                    <Alert
                      sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        zIndex: 9999,
                        transform: showAlert
                          ? "translateX(0)"
                          : "translateX(100%)",
                        transition: "transform 0.5s ease-in-out",
                      }}
                      color={alertColor}
                      size="lg"
                      variant="solid"
                      // icon={iconlert}
                      startDecorator={iconlert}
                      endDecorator={
                        <Button
                          size="sm"
                          variant="solid"
                          color={alertColor}
                          onClick={(e) => setShowAlert(false)}
                        >
                          <CloseIcon />
                        </Button>
                      }
                    >
                      {message}
                    </Alert>
                  )}

                  <div
                    class="tab-pane fade"
                    id="password-tab-pane"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                    tabindex="0"
                  >
                    <form onSubmit={changePassword}>
                      <div class="row gy-3 gy-xxl-4">
                        <div class="col-12">
                          <label for="currentPassword" class="form-label">
                            Current Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="currentPassword"
                            name="currentpass"
                            value={account.currentpass}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div class="col-12">
                          <label for="newPassword" class="form-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="newPassword"
                            name="password"
                            value={account.password}
                            // onChange={handleChange}
                            required
                            onChange={(event) => {
                              setAccount((prev) => ({
                                ...prev,
                                [event.target.name]: event.target.value,
                              }));
                              setStrength(
                                evaluatePasswordStrength(event.target.value)
                              );
                            }}
                          />

                          {account.password && (
                            <>
                              <div
                                className={`password-strength ${strength === "Weak"
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
                        <div class="col-12">
                          <label for="confirmPassword" class="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="confirmPassword"
                            name="conPassword"
                            value={account.conPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div class="col-12">
                          <button
                            type="submit"
                            class="btn btn-primary"
                          // className="form-submit-btn"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* -------------------------- Documents tab ------------------------------ */}
                  <div
                    class="tab-pane fade"
                    id="documents-tab-pane"
                    role="tabpanel"
                    aria-labelledby="documents-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">Documents: </h5>
                    {!props.verFront || !props.verBack ? (
                      <>
                        <Button
                          onClick={() => navigate(`/profile/verification`)}
                        >
                          UPLOAD
                        </Button>
                      </>
                    ) : null}
                    {
                      //display sumbitted IDs of user
                      props.verFront || props.verBack ? (
                        <>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verFront}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verFront}`}
                              alt="Front"
                            />
                          </div>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verBack}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verBack}`}
                              alt="Back"
                            />
                          </div>
                        </>
                      ) : null
                    }
                    {
                      //display sumbitted docs/additional ids of user
                      // driver license additional info fetch
                      props.verDR1 || props.verDR2 ? (
                        <>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verDR1}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verDR2}`}
                              alt="License"
                            />
                          </div>
                          <div className="id_2">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verDR2}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verDR2}`}
                              alt="License"
                            />
                          </div>
                        </>
                      ) : null
                    }
                    {
                      //display sumbitted docs/additional ids of user
                      // driver license additional info fetch
                      props.verDoc1 || props.verDoc2 ? (
                        <>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verDoc1}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verDoc1}`}
                              alt="License"
                            />
                          </div>
                          <div className="id_2">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verDoc2}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verDoc2}`}
                              alt="License"
                            />
                          </div>
                        </>
                      ) : null
                    }

                    <>
                      <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                      >
                        <ModalDialog layout="fullscreen">
                          <ModalClose
                            color="danger"
                            variant="solid"
                            size="lg"
                          />
                          <DialogContent>
                            <img
                              src={filePath}
                              alt={`Doc Image`}
                              style={imageStyle}
                            />
                          </DialogContent>
                        </ModalDialog>
                      </Modal>
                    </>
                  </div>

                  {/* -------------------------- Feedback tab ------------------------------ */}
                  <div
                    class="tab-pane fade"
                    id="reviews-tab-pane"
                    role="tabpanel"
                    aria-labelledby="documents-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">Feedback: </h5>
                    <MyFeedback id={props.userID} />
                  </div>

                  {/* -------------------------- Experience tab ------------------------------ */}
                  <div
                    class="tab-pane fade"
                    id="exp-tab-pane"
                    role="tabpanel"
                    aria-labelledby="documents-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">Experience: </h5>
                    <Experience id={props.userID} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * VIEW USER PROFILE
 * ADREAN 10/25/2024
 */
export function NewViewUserProfile(props) {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [buttonPopup3, setButtonPopup3] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

    if (props.handleImage) {
      props.handleImage(e);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreview(null);
  };
  //skills
  //split it into array
  const skillsArray = props.skills ? props.skills.split(",") : [];
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  //modal for pics
  //adrean 12/17/2024
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filePath, setFilePath] = useState();
  const handleOpenModalDocs = (docs) => {
    setOpenModal(true);
    setFilePath(docs);
  };

  const imageStyle = {
    padding: "20px",
    margin: "10px",
    maxWidth: "95%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  return (
    <>
      <div class="container">
        <div class="row gy-4 gy-lg-0">
          <div class="col-12 col-lg-4 col-xl-3">
            <div class="row gy-4">
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">
                    Profile {props.type}
                  </div>

                  <div class="card-body">
                    <div class="text-center mb-3">
                      {props.profileImg ? (
                        <img
                          className="user_profile_pic"
                          src={`http://localhost:8800/images/profile/${props.profileImg}`}
                          alt="ProfPic"
                        />
                      ) : (
                        <img src="/images/employer.png" alt="Profile Picture" />
                      )}
                    </div>
                    <h5 class="text-center mb-1">
                      {props.fname} {props.lname}
                    </h5>
                    {props.type === "Employer" ? (
                      <p class="text-center text-secondary mb-4">Employer</p>
                    ) : (
                      <p class="text-center text-secondary mb-4">Catcher</p>
                    )}

                    {/* --------------------- Rating --------------------- */}
                    {props.type === "Catcher" ? (
                      <div class="text-center text-secondary mb-4">
                        <div className="rating">
                          Overall Rating:
                          <span>
                            <StarRating rating={props.rate} />
                            <p>
                              <i>{props.rate ? props.rate.toFixed(1) : null}</i>
                            </p>
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* about me section */}
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div
                    class="card-header text-bg-primary"
                    style={{ background: "#378ce7" }}
                  >
                    Account Status
                  </div>
                  <div class="card-body d-flex justify-content-center align-items-center">
                    {props.status === "Verified" ? (
                      <>
                        <Chip
                          sx={{
                            fontSize: "1.1rem",
                            height: "30px",
                            padding: "20px 15px",
                          }}
                          size="sm"
                          variant="solid"
                          color="success"
                        >
                          <VerifiedIcon /> {props.status.toLocaleUpperCase()}
                        </Chip>
                      </>
                    ) : (
                      <>
                        {props.verStatus === "Pending" ? (
                          <>
                            <Chip
                              sx={{
                                fontSize: "1.1rem",
                                height: "30px",
                                padding: "20px 15px",
                              }}
                              size="sm"
                              variant="solid"
                              color="warning"
                            >
                              <PendingIcon />{" "}
                              <i>{props.verStatus.toLocaleUpperCase()}</i>
                            </Chip>
                          </>
                        ) : (
                          <>
                            <Chip
                              sx={{
                                fontSize: "1.1rem",
                                height: "30px",
                                padding: "20px 15px",
                              }}
                              size="sm"
                              variant="solid"
                              color="danger"
                            >
                              <Link
                                to={`/profile/verification`}
                                style={{ textDecoration: "none" }}
                              >
                                <ErrorIcon /> {props.status.toLocaleUpperCase()}
                              </Link>
                            </Chip>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary"></div>
                  <div class="card-body">
                    <div className="buttons">
                      <button onClick={() => setButtonPopup1(true)}>
                        Reviews
                      </button>

                      <button onClick={() => setButtonPopup2(true)}>
                        Documents
                      </button>


                    </div>
                    <ViewFeedback
                      userID={user.userID}
                      trigger={buttonPopup1}
                      setTrigger={setButtonPopup1}
                    >
                      <h1>Feedback</h1>
                    </ViewFeedback>
                    <Docu trigger={buttonPopup2} setTrigger={setButtonPopup2}>
                      {

                        props.verFront || props.verBack ? (
                          <>
                            <div className="id_1">
                              <img
                                src={`http://localhost:8800/images/docu/${props.verFront}`}
                                alt="Front"
                              />
                            </div>
                            <div className="id_1">
                              <img
                                src={`http://localhost:8800/images/docu/${props.verBack}`}
                                alt="Back"
                              />
                            </div>
                          </>
                        ) : null
                      }
                      {

                        props.doc1 ? (
                          <>
                            <div className="id_1">
                              <img
                                src={`http://localhost:8800/images/docu/${props.doc1}`}
                                alt="License"
                              />
                            </div>
                          </>
                        ) : null
                      }
                    </Docu>
                  </div>
                </div>
              </div> */}

              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">
                    {props.type === "Employer" ? "Tags" : "Skills"}
                  </div>
                  <div class="card-body">
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {skillsArray.length > 0 ? ( // Check if there are any skills to display
                        <>
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            sx={{ gap: 1 }} // Ensures spacing between items
                          >
                            {skillsArray.map((skill, index) => (
                              <Chip
                                key={index}
                                variant="solid" // Gives a subtle background color
                                color="primary" // Choose the color theme (primary, secondary, etc.)
                                size="md" // Medium size for better visibility
                              >
                                {skill.trim()}{" "}
                                {/* Trims any unnecessary whitespace */}
                              </Chip>
                            ))}
                          </Stack>
                        </>
                      ) : (
                        <>
                          <Typography level="body2" color="neutral">
                            No skills provided.
                          </Typography>
                        </>
                      )}
                      <SkillsInputModal
                        skills={skillsArray}
                        open={open}
                        close={() => setOpen(false)}
                      />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sections............ */}
          <div class="col-12 col-lg-8 col-xl-9">
            <div class="card widget-card border-light shadow-sm">
              <div class="card-body p-4">
                {/* ---------------------- Tabs ------------------------ */}
                <ul class="nav nav-tabs" id="profileTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="overview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#overview-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="overview-tab-pane"
                      aria-selected="true"
                    >
                      Overview
                    </button>
                  </li>

                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="documets-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#documents-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="documents-tab-pane"
                      aria-selected="false"
                    >
                      Documents
                    </button>
                  </li>

                  {props.type === "Catcher" ? (
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#reviews-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="reviews-tab-pane"
                        aria-selected="false"
                      >
                        Reviews
                      </button>
                    </li>
                  ) : null}
                  {props.type === "Catcher" ? (
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="exp-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#exp-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="exp-tab-pane"
                        aria-selected="false"
                      >
                        Experience
                      </button>
                    </li>
                  ) : null}
                  {/* <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="reviews-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reviews-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="reviews-tab-pane"
                      aria-selected="false"
                    >
                      Reviews
                    </button>
                  </li> */}
                </ul>
                {/* ------------------------ Overview tab ---------------------------- */}
                <div class="tab-content pt-4" id="profileTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="overview-tab-pane"
                    role="tabpanel"
                    aria-labelledby="overview-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">About: </h5>
                    <p class="lead mb-3">
                      {props.fname} is {props.desc}
                    </p>

                    <h5 class="mb-3">Profile</h5>
                    <div class="row g-0">
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PersonIcon /> First Name
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.fname}</div>
                      </div>

                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <Person2Icon /> Last Name
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.lname}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <HomeIcon /> Address
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.address}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <EmailIcon /> Email
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.email}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <AccountBoxIcon /> Username
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.username}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PhoneIcon /> Contact
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.contact}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <WcIcon /> Gender
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.sex}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <PlusOneIcon /> Age
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{GetUserAge(props.bday)}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">
                          <CakeIcon /> Birthdate
                        </div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.bday}</div>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------- Documents tab ------------------------------ */}
                  <div
                    class="tab-pane fade"
                    id="documents-tab-pane"
                    role="tabpanel"
                    aria-labelledby="documents-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">Documents: </h5>

                    {
                      //display sumbitted IDs of user
                      props.verFront || props.verBack ? (
                        <>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verFront}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verFront}`}
                              alt="Front"
                            />
                          </div>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verBack}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verBack}`}
                              alt="Back"
                            />
                          </div>
                        </>
                      ) : null
                    }
                    {
                      //display sumbitted docs/additional ids of user
                      // driver license additional info fetch
                      props.verDoc1 ? (
                        <>
                          <div className="id_1">
                            <img
                              onClick={() =>
                                handleOpenModalDocs(
                                  `http://localhost:8800/images/docu/${props.verDoc1}`
                                )
                              }
                              src={`http://localhost:8800/images/docu/${props.verDoc1}`}
                              alt="License"
                            />
                          </div>
                        </>
                      ) : null
                    }
                    <>
                      <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                      >
                        <ModalDialog layout="fullscreen">
                          <ModalClose
                            color="danger"
                            variant="solid"
                            size="lg"
                          />
                          <DialogContent>
                            <img
                              src={filePath}
                              alt={`Doc Image`}
                              style={imageStyle}
                            />
                          </DialogContent>
                        </ModalDialog>
                      </Modal>
                    </>
                  </div>

                  {/* -------------------------- Feedback tab ------------------------------ */}
                  {props.type === "Catcher" ? (
                    <div
                      class="tab-pane fade"
                      id="reviews-tab-pane"
                      role="tabpanel"
                      aria-labelledby="documents-tab"
                      tabindex="0"
                    >
                      <h5 class="mb-3">Feedback: </h5>
                      <h5 class="mb-3">
                        Previous Employers feedbacks & rating
                      </h5>
                      <MyFeedback id={props.userID} />
                      <MyFeedback id={props.id} />
                    </div>
                  ) : null}
                  {/* -------------------------- Experience tab ------------------------------ */}
                  {props.type === "Catcher" ? (
                    <div
                      class="tab-pane fade"
                      id="exp-tab-pane"
                      role="tabpanel"
                      aria-labelledby="documents-tab"
                      tabindex="0"
                    >
                      <h5 class="mb-3">Experience: </h5>

                      <ViewExperience id={props.id} />
                    </div>
                  ) : null}

                  {/* <div
                    class="tab-pane fade"
                    id="reviews-tab-pane"
                    role="tabpanel"
                    aria-labelledby="documents-tab"
                    tabindex="0"
                  >
                    <h5 class="mb-3">Feedback: </h5>
                    <h5 class="mb-3">Previous Employers feedbacks & rating</h5>
                    <MyFeedback id={props.userID} />
                    <MyFeedback id={props.id} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
