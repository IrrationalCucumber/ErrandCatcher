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

function NewUserProfile(props) {
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
            <div className="profile-page-container">
                {/* Left Profile Section */}
                <div className="profile-left">
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
                                    backgroundColor: isHovered ? "#ffcccc" : "transparent",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: 30 }} color="error" />
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
                                <img src="/images/employer.png" alt="Profile Picture" />
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
                    {/* bootstrap classes */}
                    <div class="card widget-card border-light shadow-sm" style={{ marginTop: "28px" }}>
                        <div class="card-header text-bg-primary">About Me</div>
                        <div class="card-body">

                            <div className="info">
                                {/* {props.address} */}
                                <Input
                                    type="text"
                                    // className="profile__info__left"
                                    className={`profile__info__lefts ${props.validationErrors.address ? "error" : ""
                                        }`}
                                    variant="neutral"
                                    placeholder="Address"
                                    name="address"
                                    value={props.address}
                                    onChange={props.handleChange}
                                    disabled={!props.isEditing}
                                    startDecorator={<Home />}
                                    sx={{
                                        borderRadius: 0,
                                        "&::before": {
                                            transform: "scaleX(0)",
                                            left: 0,
                                            right: 0,
                                            bottom: "-2px",
                                            top: "unset",
                                            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                                            borderRadius: 0,
                                        },
                                        "&:focus-within::before": {
                                            transform: "scaleX(1)",
                                        },
                                    }}
                                />
                                {/* {props.email} */}
                                <Input
                                    type="email"
                                    // className="profile__info__left"
                                    className={`profile__info__left ${props.validationErrors.email ? "error" : ""
                                        }`}
                                    placeholder="Email Address"
                                    name="email"
                                    value={props.email}
                                    onChange={props.handleChange}
                                    disabled={!props.isEditing}
                                    variant="neutral"
                                    startDecorator={<Email />}
                                    sx={{
                                        borderRadius: 0,
                                        "&::before": {
                                            transform: "scaleX(0)",
                                            left: 0,
                                            right: 0,
                                            bottom: "-2px",
                                            top: "unset",
                                            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                                            borderRadius: 0,
                                        },
                                        "&:focus-within::before": {
                                            transform: "scaleX(1)",
                                        },
                                    }}
                                />
                                {/* {props.cnum} */}
                                <Input
                                    type="number"
                                    // className="profile__info__left"
                                    className={`profile__info__left ${props.validationErrors.contact ? "error" : ""
                                        }`}
                                    placeholder="Contact Number"
                                    name="contact"
                                    value={props.cnum}
                                    onChange={props.handleChange}
                                    disabled={!props.isEditing}
                                    variant="neutral"
                                    startDecorator={<Call />}
                                    sx={{
                                        borderRadius: 0,
                                        "&::before": {
                                            transform: "scaleX(0)",
                                            left: 0,
                                            right: 0,
                                            bottom: "-2px",
                                            top: "unset",
                                            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                                            borderRadius: 0,
                                        },
                                        "&:focus-within::before": {
                                            transform: "scaleX(1)",
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <>


                            {/* <div class="card widget-card border-light shadow-sm"> */}
                            {/* <div class="col-12" > */}
                            <div class="card widget-card border-light shadow-sm" style={{ marginTop: "28px" }}>
                                <div class="card-header text-bg-primary">Skills</div>
                                <div class="card-body">
                                    <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column", gap: 1 }}>
                                        {/* <Typography level="h4" sx={{ marginBottom: 1 }}>
                      Skills:
                    </Typography> */}
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
                                                            {skill.trim()} {/* Trims any unnecessary whitespace */}
                                                        </Chip>
                                                    ))}
                                                </Stack>
                                                <Button
                                                    size="lg"
                                                    variant="soft"
                                                    sx={{ margin: 1, width: "100%", borderRadius: "8px" }}
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

                            {/* </div> */}
                        </>

                    </div>
                    <textarea
                        className="description"
                        placeholder="Description"
                        // onChange={handleChange}
                        name="desc"
                        onChange={props.handleChange}
                        value={props.desc}
                        disabled={!props.isEditing}
                    ></textarea>
                    {props.type === "Catcher" && (
                        <div className="rating">
                            Overall Rating:
                            <span>
                                <StarRating rating={props.rate} />
                                <p>
                                    <i>{AmountDecimal(props.rate)}</i>
                                </p>
                            </span>
                        </div>
                    )}
                    {/*  */}
                    <div className="buttons">
                        {props.type === "Catcher" && (
                            <button onClick={() => setButtonPopup1(true)}>Reviews</button>
                        )}
                        <button onClick={() => setButtonPopup2(true)}>Documents</button>

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
                    <Resetpassword
                        trigger={buttonPopup3}
                        setTrigger={setButtonPopup3}
                    ></Resetpassword>
                </div>

                {/* Right Profile Section */}
                <div className="profile-right">
                    {props.status === "Verified" ? (
                        <>
                            <div className="verified">{props.status.toLocaleUpperCase()}</div>
                        </>
                    ) : (
                        <>
                            {props.verStatus === "Pending" ? (
                                <>
                                    <div className="pending">
                                        <i>{props.verStatus.toLocaleUpperCase()}</i>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to={`/profile/verification`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="unverified">
                                            {props.status.toLocaleUpperCase()}
                                        </div>
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                    <label className="prolabel" htmlFor="username">
                        Username :
                    </label>
                    <input
                        type="text"
                        className={props.validationErrors.username ? "error" : ""}
                        // className="display-data"
                        placeholder="Username"
                        name="username"
                        value={props.username}
                        onChange={props.handleChange}
                        disabled={!props.isEditing}
                    ></input>

                    <label className="prolabel" htmlFor="first-name">
                        First name :
                    </label>
                    <input
                        type="text"
                        className={props.validationErrors.fname ? "error" : ""}
                        // className="display-data"
                        placeholder="Name"
                        name="fname"
                        value={props.fname}
                        onChange={props.handleChange}
                        disabled={!props.isEditing}
                    ></input>

                    <label className="prolabel" htmlFor="last-name">
                        Last name :
                    </label>
                    <input
                        type="text"
                        className={props.validationErrors.lname ? "error" : ""}
                        // className="display-data"
                        placeholder="Last name"
                        name="lname"
                        value={props.lname}
                        onChange={props.handleChange}
                        disabled={!props.isEditing}
                    ></input>

                    <label className="prolabel" htmlFor="sex">
                        Gender :
                    </label>
                    <select
                        // className="display-data1"
                        className={`display-data1 ${props.validationErrors.gender ? "error" : ""
                            }`}
                        value={props.sex}
                        onChange={props.handleChange}
                        name="gender"
                        disabled={!props.isEditing}
                    >
                        {/* gender */}
                        <option value="">Choose gender....</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label className="prolabel" htmlFor="age">
                        Age :
                    </label>
                    <input
                        type="number"
                        //className={props.validationErrors.age ? "error" : ""}
                        name="age"
                        className="display-data1"
                        placeholder="Age"
                        value={GetUserAge(props.bday)}
                        disabled={true}
                    ></input>
                    <label className="prolabel" htmlFor="age">
                        Birthdate :
                    </label>
                    <input
                        type="date"
                        className={`display-data1 ${props.validationErrors.bday ? "error" : ""
                            }`}
                        name="bday"
                        // className="display-data1"
                        value={props.bday}
                        onChange={props.handleChange}
                        placeholder="Date of birth"
                        disabled={!props.isEditing}
                        // Set max year to 18 years ago
                        max={
                            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                                .toISOString()
                                .split("T")[0]
                        }
                    ></input>

                    <div className="buttonchange">
                        <button onClick={() => setButtonPopup3(true)}>
                            Change Password?
                        </button>
                    </div>

                    <div className="buttons">
                        {props.isEditing ? (
                            <>
                                {/* <button>Edit</button> */}
                                <button onClick={props.clickCancel}>Cancel</button>
                                <button onClick={props.click}>Save</button>
                            </>
                        ) : (
                            <button onClick={props.clickEdit}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewUserProfile;



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
                                    <div class="card-header text-bg-primary">Welcome, {props.fname} {props.lname}</div>
                                    <div class="card-body">
                                        <div class="text-center mb-3">
                                            <img src="./assets/img/profile-img-1.jpg" class="img-fluid rounded-circle" alt="Luna John" />
                                        </div>
                                        <h5 class="text-center mb-1"> {props.fname} {props.lname}</h5>
                                        {/* <p class="text-center text-secondary mb-4">Project Manager</p> */}
                                    </div>
                                </div>
                            </div>

                            {/* about me section */}
                            <div class="col-12">
                                <div class="card widget-card border-light shadow-sm">
                                    <div class="card-header text-bg-primary">About Me</div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush mb-0">
                                            <li class="list-group-item">
                                                <h6 class="mb-1">
                                                    <span class="bii bi-mortarboard-fill me-2"></span>
                                                    Address
                                                </h6>
                                                <span>{props.address}</span>
                                            </li>
                                            <li class="list-group-item">
                                                <h6 class="mb-1">
                                                    <span class="bii bi-geo-alt-fill me-2"></span>
                                                    Email
                                                </h6>
                                                <span>{props.email}</span>
                                            </li>
                                            <li class="list-group-item">
                                                <h6 class="mb-1">
                                                    <span class="bii bi-building-fill-gear me-2"></span>
                                                    Contact
                                                </h6>
                                                <span>{props.cnum}</span>
                                            </li>
                                        </ul>
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
                        </div>
                    </div>

                    {/* section............ */}
                    <div class="col-12 col-lg-8 col-xl-9">
                        <div class="card widget-card border-light shadow-sm">
                            <div class="card-body p-4">
                                {/* tab..... */}
                                <ul class="nav nav-tabs" id="profileTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview-tab-pane" type="button" role="tab" aria-controls="overview-tab-pane" aria-selected="true">Overview</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
                                    </li>

                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password-tab-pane" type="button" role="tab" aria-controls="password-tab-pane" aria-selected="false">Password</button>
                                    </li>
                                </ul>
                                <div class="tab-content pt-4" id="profileTabContent">
                                    <div class="tab-pane fade show active" id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab" tabindex="0">
                                        <h5 class="mb-3">About: </h5>
                                        <p class="lead mb-3">{props.fname} is {props.desc}</p>

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

                                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <form action="#!" class="row gy-3 gy-xxl-4">
                                            <div class="col-12">
                                                <div class="row gy-2">
                                                    <label class="col-12 form-label m-0">Profile Image</label>
                                                    <div class="col-12">
                                                        <img src="./assets/img/profile-img-1.jpg" class="img-fluid" alt="Luna John" />
                                                    </div>
                                                    <div class="col-12">
                                                        <a href="#!" class="d-inline-block bg-primary link-light lh-1 p-2 rounded">
                                                            <i class="bi bi-upload"></i>
                                                        </a>
                                                        <a href="#!" class="d-inline-block bg-danger link-light lh-1 p-2 rounded">
                                                            <i class="bi bi-trash"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label for="inputFirstName" class="form-label">First Name</label>
                                                <input type="text" class="form-control" id="inputFirstName" value="raymund" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputLastName" class="form-label">Last Name</label>
                                                <input type="text" class="form-control" id="inputLastName" value="Leo" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputEducation" class="form-label">Education</label>
                                                <input type="text" class="form-control" id="inputEducation" value="M.S Computer Science" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputSkills" class="form-label">Skills</label>
                                                <input type="text" class="form-control" id="inputSkills" value="HTML, SCSS, Javascript, React, Vue, Angular, UI, UX" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputJob" class="form-label">Job</label>
                                                <input type="text" class="form-control" id="inputJob" value="Project Manager" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputCompany" class="form-label">Company</label>
                                                <input type="text" class="form-control" id="inputCompany" value="GitHub Inc" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputPhone" class="form-label">Phone</label>
                                                <input type="tel" class="form-control" id="inputPhone" value="+12486798745" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputEmail" class="form-label">Email</label>
                                                <input type="email" class="form-control" id="inputEmail" value="leo@example.com" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputAddress" class="form-label">Address</label>
                                                <input type="text" class="form-control" id="inputAddress" value="Mountain View, California" />
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label for="inputCountry" class="form-label">Country</label>
                                                <select class="form-select" id="inputCountry">
                                                    <option value="Afghanistan">Afghanistan</option>
                                                    <option value="Åland Islands">Åland Islands</option>
                                                    <option value="Albania">Albania</option>
                                                    <option value="Kenya">Kenya</option>
                                                </select>
                                            </div>

                                            <div class="col-12">
                                                <label for="inputAbout" class="form-label">About</label>
                                                <textarea class="form-control" id="inputAbout">Ethan Leo is a seasoned and results-driven Project Manager who brings experience and expertise to project management. With a proven track record of successfully delivering complex projects on time and within budget, Ethan Leo is the go-to professional for organizations seeking efficient and effective project leadership.</textarea>
                                            </div>
                                            <div class="col-12">
                                                <button type="submit" class="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div class="tab-pane fade" id="password-tab-pane" role="tabpanel" aria-labelledby="password-tab" tabindex="0">
                                        <form action="#!">
                                            <div class="row gy-3 gy-xxl-4">
                                                <div class="col-12">
                                                    <label for="currentPassword" class="form-label">Current Password</label>
                                                    <input type="password" class="form-control" id="currentPassword" />
                                                </div>
                                                <div class="col-12">
                                                    <label for="newPassword" class="form-label">New Password</label>
                                                    <input type="password" class="form-control" id="newPassword" />
                                                </div>
                                                <div class="col-12">
                                                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                                                    <input type="password" class="form-control" id="confirmPassword" />
                                                </div>
                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-primary">Change Password</button>
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
    //skills
    //split it into array
    const skillsArray = props.skills ? props.skills.split(",") : [];
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);

    return (
        <>
            <div className="profile-page-container">
                {/* Left Profile Section */}
                <div className="profile-left">
                    {/* If no preview, show existing profile image or default */}
                    <>
                        {props.profileImg ? (
                            <img
                                className="user_profile_pic"
                                src={`http://localhost:8800/images/profile/${props.profileImg}`}
                                alt="ProfPic"
                            />
                        ) : (
                            <img src="/images/employer.png" alt="Profile Picture" />
                        )}
                    </>
                    <div className="info">
                        {/* {props.address} */}

                        <Typography
                            className="profile__info__left"
                            color="neutral"
                            level="h4"
                            variant="plain"
                            sx={{ p: 1 }}
                            startDecorator={<Home />}
                        >
                            {props.address ? (
                                `${props.address}`
                            ) : (
                                <i style={{ color: "red" }}>No Address</i>
                            )}
                        </Typography>
                        {/* {props.email} */}
                        <Typography
                            className="profile__info__left"
                            color="neutral"
                            level="h4"
                            variant="plain"
                            sx={{ p: 1 }}
                            startDecorator={<Mail />}
                        >
                            {props.email ? (
                                `${props.email}`
                            ) : (
                                <i style={{ color: "red" }}>No Email</i>
                            )}
                        </Typography>
                        {/* {props.cnum} */}

                        <Typography
                            color="neutral"
                            level="h4"
                            variant="plain"
                            sx={{ p: 1 }}
                            startDecorator={<Call />}
                        >
                            {props.cnum ? (
                                `${props.cnum}`
                            ) : (
                                <i style={{ color: "red" }}>No Contact Number</i>
                            )}
                        </Typography>

                        <br />
                        {props.type === "Catcher" ? (
                            <>
                                <Typography level="h4" sx={{ marginBottom: 1 }}>
                                    Skills:
                                </Typography>
                                {skillsArray.length > 0 ? ( // Check if there are any skills to display
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        flexWrap="wrap"
                                        sx={{ gap: 1 }} // Ensures spacing between items
                                    >
                                        {skillsArray.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                variant="soft" // Gives a subtle background color
                                                color="primary" // Choose the color theme (primary, secondary, etc.)
                                                size="md" // Medium size for better visibility
                                            >
                                                {skill.trim()} {/* Trims any unnecessary whitespace */}
                                            </Chip>
                                        ))}
                                    </Stack>
                                ) : (
                                    // Display a placeholder message if no skills are provided
                                    <Typography level="body2" color="neutral">
                                        No skills provided.
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <>
                                {skillsArray.length > 0 ? ( // Check if there are any skills to display
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        flexWrap="wrap"
                                        sx={{ gap: 1 }} // Ensures spacing between items
                                    >
                                        {skillsArray.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                variant="soft" // Gives a subtle background color
                                                color="primary" // Choose the color theme (primary, secondary, etc.)
                                                size="md" // Medium size for better visibility
                                            >
                                                {skill.trim()} {/* Trims any unnecessary whitespace */}
                                            </Chip>
                                        ))}
                                    </Stack>
                                ) : (
                                    // Display a placeholder message if no skills are provided
                                    <Typography level="body2" color="neutral">
                                        No Tags provided.
                                    </Typography>
                                )}
                            </>
                        )}
                    </div>
                    <br />
                    <textarea
                        className="description"
                        placeholder="Description"
                        name="desc"
                        value={props.desc}
                        disabled
                    ></textarea>
                    <div className="rating">
                        Overall Rating:
                        <span>
                            <StarRating rating={props.rate} />
                            <p>
                                <i>{AmountDecimal(props.rate)}</i>
                            </p>
                        </span>
                    </div>
                    <div className="buttons">
                        {/* {props.type === "Catcher" && (
              // -- need new endpoint for view applicants feedback display
              <button onClick={() => setButtonPopup1(true)}>Reviews</button>
            )} */}
                        <button onClick={() => setButtonPopup1(true)}>Reviews</button>
                        <button onClick={() => setButtonPopup2(true)}>Documents</button>
                    </div>
                    <ViewFeedback
                        userID={props.id}
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
                            // driver license additional info fetch
                            props.verDoc1 ? (
                                <>
                                    <div className="id_1">
                                        <img
                                            src={`http://localhost:8800/images/docu/${props.verDoc1}`}
                                            alt="License"
                                        />
                                    </div>
                                </>
                            ) : null
                        }
                    </Docu>
                </div>

                {/* Right Profile Section */}
                <div className="profile-right">
                    {props.status === "Verified" ? (
                        <>
                            <div className="verified">{props.status.toLocaleUpperCase()}</div>
                        </>
                    ) : (
                        <div className="unverified">{props.status.toLocaleUpperCase()}</div>
                    )}
                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography
                            color="neutral"
                            level="title-lg"
                            variant="plain"
                            sx={{ p: 0.5 }}
                        >
                            Username :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {props.username ? (
                                `${props.username}`
                            ) : (
                                <i style={{ color: "red" }}>No Username</i>
                            )}
                        </Typography>
                    </Sheet>

                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography color="neutral" level="title-lg" variant="plain">
                            Firt Name :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {props.fname ? (
                                `${Capitalize(props.fname)}`
                            ) : (
                                <i style={{ color: "red" }}>No First name</i>
                            )}
                        </Typography>
                    </Sheet>

                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography color="neutral" level="title-lg" variant="plain">
                            Last Name :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {props.lname ? (
                                `${Capitalize(props.lname)}`
                            ) : (
                                <i style={{ color: "red" }}>No last name</i>
                            )}
                        </Typography>
                    </Sheet>

                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography color="neutral" level="title-lg" variant="plain">
                            Gender :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {props.sex ? (
                                `${Capitalize(props.sex)}`
                            ) : (
                                <i style={{ color: "red" }}>No Gender</i>
                            )}
                        </Typography>
                    </Sheet>

                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography color="neutral" level="title-lg" variant="plain">
                            Birthdate :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {props.bday ? (
                                `${DisplayDate(props.bday)}`
                            ) : (
                                <i style={{ color: "red" }}>No Birthdate</i>
                            )}
                        </Typography>
                    </Sheet>

                    <Sheet sx={{ pt: 2, pb: 1, pr: 0, pl: 0 }}>
                        <Typography
                            color="neutral"
                            level="title-lg"
                            variant="plain"
                            sx={{ p: 0.5 }}
                        >
                            Age :
                        </Typography>
                        <Typography color="neutral" level="h3" variant="outlined">
                            {GetUserAge(props.bday)}
                        </Typography>
                    </Sheet>
                </div>
            </div>
        </>
    );
}
