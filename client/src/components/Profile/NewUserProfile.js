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
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  FormLabel,
  Input,
  Sheet,
  Stack,
  Typography,
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

export function NewUserProfileui(props) {
  const { user } = useAuth();
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
                    {/* <p class="text-center text-secondary mb-4">Project Manager</p> */}
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
                    About Me
                  </div>
                  <div class="card-body">
                    {props.status === "Verified" ? (
                      <>{props.status.toLocaleUpperCase()}</>
                    ) : (
                      <>
                        {props.verStatus === "Pending" ? (
                          <>
                            <i>{props.verStatus.toLocaleUpperCase()}</i>
                          </>
                        ) : (
                          <>
                            <Link
                              to={`/profile/verification`}
                              style={{ textDecoration: "none" }}
                            >
                              {props.status.toLocaleUpperCase()}
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* about me section */}
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary"></div>
                  <div class="card-body">
                    <div className="buttons">
                      {props.type === "Catcher" && (
                        <button onClick={() => setButtonPopup1(true)}>
                          Reviews
                        </button>
                      )}
                      <button onClick={() => setButtonPopup2(true)}>
                        Documents
                      </button>

                      {/* <button onClick={() => setButtonPopup3(true)}>Change Password?</button> */}
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
                        //display sumbitted IDs of user
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
                        //display sumbitted docs/additional ids of user
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
              </div>

              {/* <div class="col-12">
                                <div class="card widget-card border-light shadow-sm">
                                    <div class="card-header text-bg-primary">Skills</div>
                                    <div class="card-body">
                                        <span class="badge text-bg-primary">HTML</span>
                                        <span class="badge text-bg-primary">SCSS</span>
                                        <span class="badge text-bg-primary">Javascript</span>
                                        <span class="badge text-bg-primary">React</span>
                                        <span class="badge text-bg-primary">Vue</span>
                                        <span class="badge text-bg-primary">Angular</span>
                                        <span class="badge text-bg-primary">UI</span>
                                        <span class="badge text-bg-primary">UX</span>
                                    </div>
                                </div>
                            </div> */}

              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">Skills</div>
                  <div class="card-body">
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography level="h4" sx={{ marginBottom: 1 }}>
                        Skills Qualification:
                      </Typography>
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
                            size="sm"
                            variant="soft"
                            sx={{ margin: 1 }}
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
            </div>
          </div>

          {/* section............ */}
          <div class="col-12 col-lg-8 col-xl-9">
            <div class="card widget-card border-light shadow-sm">
              <div class="card-body p-4">
                {/* tab..... */}
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
                </ul>
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
                        <div class="p-2">First Name</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.fname}</div>
                      </div>

                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Last Name</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.lname}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Address</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.address}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Email</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.email}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Contact</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.cnum}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Gender</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.sex}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Age</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{GetUserAge(props.bday)}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Birthdate</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.bday}</div>
                      </div>
                    </div>
                  </div>

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
                          </div>

                          <div class="col-12">
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
                          Phone
                        </label>
                        <input
                          type="tel"
                          class="form-control"
                          name="cnum"
                          onChange={props.handleChange}
                          value={props.cnum}
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

                  <div
                    class="tab-pane fade"
                    id="password-tab-pane"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                    tabindex="0"
                  >
                    <form action="#!">
                      <div class="row gy-3 gy-xxl-4">
                        <div class="col-12">
                          <label for="currentPassword" class="form-label">
                            Current Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="currentPassword"
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
                          />
                        </div>
                        <div class="col-12">
                          <label for="confirmPassword" class="form-label">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            class="form-control"
                            id="confirmPassword"
                          />
                        </div>
                        <div class="col-12">
                          <button type="submit" class="btn btn-primary">
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
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
                    {/* <p class="text-center text-secondary mb-4">Project Manager</p> */}
                  </div>
                </div>
              </div>

              {/* about me section */}
              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">About Me</div>
                  <div class="card-body">
                    {props.status === "Verified" ? (
                      <>{props.status.toLocaleUpperCase()}</>
                    ) : (
                      <>
                        {props.verStatus === "Pending" ? (
                          <>
                            <i>{props.verStatus.toLocaleUpperCase()}</i>
                          </>
                        ) : (
                          <>
                            <Link
                              to={`/profile/verification`}
                              style={{ textDecoration: "none" }}
                            >
                              {props.status.toLocaleUpperCase()}
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* about me section */}
              <div class="col-12">
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

                      {/* <button onClick={() => setButtonPopup3(true)}>Change Password?</button> */}
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
                        //display sumbitted IDs of user
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
                        //display sumbitted docs/additional ids of user
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
              </div>

              <div class="col-12">
                <div class="card widget-card border-light shadow-sm">
                  <div class="card-header text-bg-primary">Skills</div>
                  <div class="card-body">
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography level="h4" sx={{ marginBottom: 1 }}>
                        Skills Qualification:
                      </Typography>
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
                            size="sm"
                            variant="soft"
                            sx={{ margin: 1 }}
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
            </div>
          </div>

          {/* section............ */}
          <div class="col-12 col-lg-8 col-xl-9">
            <div class="card widget-card border-light shadow-sm">
              <div class="card-body p-4">
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
                        <div class="p-2">First Name</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.fname}</div>
                      </div>

                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Last Name</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.lname}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Address</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.address}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Email</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.email}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Contact</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.cnum}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Gender</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.sex}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Age</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{GetUserAge(props.bday)}</div>
                      </div>
                      <div class="col-5 col-md-3 bg-light border-bottom border-white border-3">
                        <div class="p-2">Birthdate</div>
                      </div>
                      <div class="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                        <div class="p-2">{props.bday}</div>
                      </div>
                    </div>
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
