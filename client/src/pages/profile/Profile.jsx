import React, { useEffect, useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import UserProfile from "../../components/Profile/UserProfile";
import { Alert, Button } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import UpdateIcon from '@mui/icons-material/Update';
const Profile = () => {
  const [verified, setVerified] = useState(false);
  //APS - 03/03/24
  //get userID from url
  const { user } = useAuth();
  const userID = user.userID;
  //variable for account details
  const [account, setAccount] = useState({
    username: "",
    // password: "", // comment ky mo error endpoint update..
    lname: "",
    fname: "",
    gender: "",
    email: "",
    contact: "",
    age: "",
    bday: "",
    address: "",
    desc: "",
    status: "",
    type: "",
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempAccount, setTempAccount] = useState(account); // Store temporary edits

  const [validationErrors, setValidationErrors] = useState({
    username: false,
    // password: false,
    lname: false,
    fname: false,
    gender: false,
    age: false,
    bday: false,
    // desc: false,
    email: false,
    address: false,
    contact: false,
    profileImage: false,
    // Add other fields...
  });

  //RV & APS 02/03/24
  //useState for Status
  //pre-fill the fields
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${userID}`);
        const retrievedAccount = res.data[0];
        //format date
        const formattedDate = new Date(retrievedAccount.userBirthday)
          .toISOString()
          .substr(0, 10);

        // Update the state with retrieved account data
        const updatedAccount = {
          username: retrievedAccount.username,
          // password: retrievedAccount.password,
          lname: retrievedAccount.userLastname,
          fname: retrievedAccount.userFirstname,
          gender: retrievedAccount.userGender,
          email: retrievedAccount.userEmail,
          contact: retrievedAccount.userContactNum,
          age: retrievedAccount.userAge,
          bday: formattedDate,
          address: retrievedAccount.userAddress,
          desc: retrievedAccount.userDesc,
          status: retrievedAccount.accountStatus,
          type: retrievedAccount.accountType,
          profileImage: retrievedAccount.profileImage,
        };

        setAccount(updatedAccount);
        setTempAccount(updatedAccount);

        //setStatus(res.data);
        if (account.status.toUpperCase() === "VERIFIED") {
          setVerified(true);
          console.log(verified);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, [userID, account.status, verified]);

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "gender") {
      setTempAccount((prev) => ({ ...prev, gender: e.target.value }));
    } else if (e.target.name === "type") {
      setTempAccount((prev) => ({ ...prev, type: e.target.value }));
    } else if (e.target.name === "desc") {
      setTempAccount((prev) => ({ ...prev, desc: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setTempAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  console.log(tempAccount); // actual
  console.log(account); // delay

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   setAccount(tempAccount); // Save changes to the actual account
  //   setIsEditing(false);
  // };

  const handleCancel = () => {
    setTempAccount(account); // Revert changes
    setIsEditing(false);
  };

  //APS - 03/03/24
  //get the rating of the user
  const [rating, setRating] = useState("");
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${userID}`
        );
        //console.log(res.data[0].c);
        setRating(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [userID]);

  const [image, setImage] = useState("");
  function handleImage(e) {
    //console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const [showAlert, setShowAlert] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    if (image === "") {
      setMessage("Please choose your image before uploading");
      setAlertColor("warning");
      setIconLert(<WarningIcon />);
      setShowAlert(true); // Update state to show alert
      return; // Prevent further execution if no image is found
    } else {
      setMessage("Image picture has been updated");
      setAlertColor("success");
      setIconLert(<UpdateIcon />);
      setShowAlert(true);
      const formData = new FormData();
      formData.append("image", image);
      // await axios
      //   .post(`http://localhost:8800/update-pic/${userID}`, formData)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
    }
  };

  //Alert feedback
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [iconlert, setIconLert] = useState(null);

  //Save CHanges
  const handleClick = async (e) => {
    //const updatedAccount = { ...account };
    //refresh the page when button is clicked
    e.preventDefault();

    // change Eror check
    const newValidationErrors = {
      email: tempAccount.email === "",
      address: tempAccount.address === "",
      username: tempAccount.username === "",
      lname: tempAccount.lname === "",
      fname: tempAccount.fname === "",
      gender: tempAccount.gender === "",
      age: tempAccount.age === "",
      bday: tempAccount.bday === "",
      contact: tempAccount.contact === "",
      // profileImage: account.profileImage === "",
      // desc: false,
      // Add other fields here
    };

    setValidationErrors(newValidationErrors);

    const hasError = Object.values(newValidationErrors).some((error) => error);

    try {
      const formData = new FormData();
      if (hasError) {
        setMessage("Please input all the fields before saving!");
        setAlertColor("danger");
        setIconLert(<WarningIcon />);
        setShowAlert(true);
      }
      else {
        setMessage("Saved");
        setAlertColor("success");
        formData.append("image", image);
        setAccount(tempAccount); // Save changes to the actual account
        setIsEditing(false); // Exit edit mode
        // await axios
        //   .post(`http://localhost:8800/update-pic/${userID}`, formData)
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));

        setMessage("Profile details have been updated");
        setAlertColor("success");
        setIconLert(<UpdateIcon />);
        await axios.put("http://localhost:8800/update/" + userID, tempAccount);
        setShowAlert(true);
      }
      // console.log(account);
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(account);

  return (
    <div>
      {showAlert && (
        <Alert
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
            transform: showAlert ? "translateX(0)" : "translateX(100%)",
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

      <UserProfile
        profileImg={tempAccount.profileImage}
        address={tempAccount.address}
        cnum={tempAccount.contact}
        email={tempAccount.email}
        rate={rating}
        type={tempAccount.type}
        desc={tempAccount.desc}
        handleChange={handleChange}
        handleImage={handleImage}
        handleUpload={handleUpload}
        validationErrors={validationErrors}
        //right hemisphere
        username={tempAccount.username}
        fname={tempAccount.fname}
        lname={tempAccount.lname}
        sex={tempAccount.gender}
        age={tempAccount.age}
        bday={tempAccount.bday}
        status={tempAccount.status}
        userID={userID}
        click={handleClick}
        isEditing={isEditing}
        clickEdit={handleEdit}
        clickCancel={handleCancel}
      />
      {/* <div className="profile">
        <div className="profile-info">
          <div className="description-form">
            <form>
              <div className="Image-container">
                <label>Upload Image</label>
                <div className="image-container">
                  <img
                    src={`http://localhost:8800/images/profile/${account.profileImage}`}
                    alt="PRofile"
                    width={250}
                    height={250}
                    style={{ padding: "20px" }}
                  />
                </div>
                <div className="upload-container">
                  <input
                    type="file"
                    id="file"
                    onChange={handleImage}
                    style={{ width: "100px" }}
                  />
                  <button onClick={handleUpload}>
                    <i
                      className="fa-solid fa-arrow-up-from-bracket"
                      style={{ color: "#fff", width: "20px" }}
                    ></i>
                  </button>
                </div>
              </div>
              //username changed when user sign up
              <div className="username-container">
                <label className="username">{account.username}</label>
                {account.status === "Unverified" && (
                  <Link to={`/verification/${userID}`}>
                    <i
                      className="fa-regular fa-circle-check"
                      style={{ color: "gray", cursor: "pointer" }}
                    >
                      UNVERIFIED
                    </i>
                  </Link>
                )}

                {account.status === "Verified" ? (
                  <>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "green" }}
                    >
                      {account.status}
                    </i>
                  </>
                ) : (
                  <Link to={`/profile/verification`}>
                    <i
                      className="fa-regular fa-circle-check"
                      style={{ color: "gray", cursor: "pointer" }}
                    >
                      UNVERIFIED
                    </i>
                  </Link>
                )}
              </div>
              {account.type === "Catcher" && (
                <div className="rating-box">
                  <label className="Rating">Rating</label>
                  <label className="RateNo">{rating} /5</label>
                </div>
              )}
              <textarea
                className="description"
                placeholder="Description"
                onChange={handleChange}
                name="desc"
                value={account.desc}
              ></textarea>
            </form>
          </div>
          <div className="info-form">
            <form>
              <div className="about-section">
                // About section content 
                <div className="input-row">
                  <label className="PP">Name:</label>
                  <input
                    type="text"
                    className="display-data"
                    placeholder="Name"
                    name="fname"
                    value={account.fname}
                    onChange={handleChange}
                  ></input>

                  <input
                    type="text"
                    className="display-data"
                    value={account.lname}
                    placeholder="username"
                    onChange={handleChange}
                    name="lname"
                  ></input>
                </div>
                <div className="input-row">
                  <label className="PP">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="display-data1"
                    placeholder="Age"
                    value={account.age}
                    onChange={handleChange}
                    min={1}
                    max={99}
                  ></input>
                </div>
                <div className="input-row">
                  <label className="PP">Birth Date</label>
                  <input
                    type="date"
                    className="display-data1"
                    value={account.bday}
                    placeholder="Date of birth"
                  ></input>
                </div>
                <div className="input-row">
                  <label className="PP">Gender</label>
                  <select
                    className="display-data1"
                    value={account.gender}
                    onChange={handleChange}
                    name="gender"
                  >
                    gender
                    <option value="">Choose gender....</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="input-row">
                  <label className="PP">Contact Number:</label>
                  <input
                    type="number"
                    className="display-data"
                    placeholder="Contact Number"
                    name="contact"
                    value={account.contact}
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="input-row">
                  <label className="PP">Email Address:</label>
                  <input
                    type="email"
                    className="display-data"
                    placeholder="Email Address"
                    value={account.email}
                    name="email"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="input-row">
                  <label className="PP">Address:</label>
                  <textarea
                    type="text"
                    className="display-data"
                    placeholder="Address"
                    value={account.address}
                    name="address"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button onClick={handleClick} style={{ borderRadius: "10px" }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
