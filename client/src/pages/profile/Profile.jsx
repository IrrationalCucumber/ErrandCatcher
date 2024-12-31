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
import UpdateIcon from "@mui/icons-material/Update";
import Snackbar from "@mui/joy/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import NewUserProfile, {
  NewUserProfileui,
} from "../../components/Profile/NewUserProfile";
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
    skills: "",
    profileImage: "",
  });
  //variables to store verification details
  const [docs, setDocs] = useState({
    frontID: "",
    backID: "",
    doc1: "",
    doc2: "",
    dr1: "",
    dr2: "",
    requestStatus: "",
  });
  //fetch details and store them
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/ver-details/${userID}`
        );
        setDocs({
          requestStatus: res.data[0].requestStatus,
          frontID: res.data[0].id_picture_front,
          backID: res.data[0].id_picture_back,
          doc1: res.data[0].docu_1,
          doc2: res.data[0].docu_2,
          dr1: res.data[0].driversLicense1,
          dr2: res.data[0].driversLicense2,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [userID]);

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
    skills: false,
    desc: false,
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
          skills: retrievedAccount.userQualification,
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

      console.log("image is uploaded");
      window.location.reload();

      await axios
        .post(`http://localhost:8800/update-pic/${userID}`, formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  //Alert feedback
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [iconlert, setIconLert] = useState(null);

  // Snackbar feedback
  const [opensnack, setOpenSnack] = useState(false);
  const [snacColor, setSnacColor] = useState("");
  const [snacIcon, setSnacIcon] = useState(null);
  const [snacMess, setSnacMess] = useState("");

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
    // (parseInt(tempAccount.age) < 18)

    try {
      const formData = new FormData();
      if (hasError) {
        setMessage("Please input all the fields before saving!");
        setAlertColor("danger");
        setIconLert(<WarningIcon />);
        setShowAlert(true);
      } else if (!/\S+@\S+\.\S+/.test(tempAccount.email)) {
        setMessage("Invalid email please try again.");
        setAlertColor("danger");
        setIconLert(<WarningIcon />);
        setShowAlert(true);
      } else if (parseInt(tempAccount.age) < 18) {
        setSnacIcon(<CancelIcon />);
        setSnacMess("You must be at least 18 years old to proceed.");
        setSnacColor("danger");
        setOpenSnack(true);
      } else {
        // setMessage("Saved");
        // setAlertColor("success");
        formData.append("image", image);
        setAccount(tempAccount); // Save changes to the actual account
        setIsEditing(false); // Exit edit mode
        // await axios
        //   .post(`http://localhost:8800/update-pic/${userID}`, formData)
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));

        // setMessage("Profile details have been updated");
        // setAlertColor("success");
        // setIconLert(<UpdateIcon />);
        setSnacIcon(<UpdateIcon />);
        setSnacMess("Profile details have been updated.");
        setSnacColor("success");
        setOpenSnack(true);
        await axios.put("http://localhost:8800/update/" + userID, tempAccount);
        // setShowAlert(true);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Makes the scrolling smooth
      });
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

      <Snackbar
        variant="solid"
        color={snacColor}
        size="lg"
        open={opensnack}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        startDecorator={snacIcon}
        endDecorator={
          <Button
            onClick={() => setOpenSnack(false)}
            size="sm"
            variant="soft"
            color={snacColor}
          >
            Dismiss
          </Button>
        }
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          // padding: '19px',
          borderRadius: "8px",
        }}
      >
        {snacMess}
      </Snackbar>

      {/* <UserProfile
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
        //verification details
        verStatus={docs.requestStatus}
        verFront={docs.frontID}
        verBack={docs.backID}
        doc1={docs.doc1}
        doc2={docs.doc2}
        skills={tempAccount.skills}
      /> */}

      <NewUserProfileui
        profileImg={tempAccount.profileImage}
        address={tempAccount.address}
        contact={tempAccount.contact}
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
        //verification details
        verStatus={docs.requestStatus}
        verFront={docs.frontID}
        verBack={docs.backID}
        // driver license
        verDoc1={docs.doc1}
        verDoc2={docs.doc2}
        verDR1={docs.dr1}
        verDR2={docs.dr2}
        skills={tempAccount.skills}
      />
    </div>
  );
};

export default Profile;
