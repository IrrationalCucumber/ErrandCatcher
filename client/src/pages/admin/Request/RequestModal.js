import axios from "axios";
import React, { useState } from "react";
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
import { Close, WarningRounded } from "@mui/icons-material";
import Snackbar from "@mui/joy/Snackbar";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../../../components/LoadingSpinner";
import { GetUserAge } from "../../../components/Display/DsiplayFunctions";

const RequestModal = ({ request, handleClose }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  //FOR NOTIFICATION
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });

  const [open, setOpen] = useState(false);
  const [openSus, setOpenSus] = useState(false);
  const [opensnack, setOpenSnack] = useState(false);
  const [opensnackun, setOpenSnackUn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleOpenSusModal = () => {
    setOpenSus(true);
  };

  //get current time and date for notif
  const getTimeAndDate = () => {
    const currentDate = new Date();
    // Get the date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    // Get the time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Create a string representing the current date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleVerify = async (requestUserID, requestID) => {
    try {
      const status = "Verified";
      await axios.put(
        `http://localhost:8800/change-status/${requestUserID}/${status}`
      );
      console.log("Request verified:", request);
      setIsButtonClicked(true);
      //add a notification to the request user
      notif.notifDesc = "Your Verification request has been approved";
      notif.userID = requestUserID;
      notif.notificationType = "Verification";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //update request to complete
      await axios.put(`http://localhost:8800/done-request/${requestID}`);

      setLoading(true);
      // 2 seconds cd
      setTimeout(() => {
        setLoading(false);

        setOpenSnack(true);
      }, 2000);

      // setOpenSnack(true);

      // Close the modal after 5 seconds
      setOpen(false);
      // delay
      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
    console.log("Verified");
  };

  const handleUnverify = async (requestUserID, requestID) => {
    // You can implement the logic to mark the request as unverified here
    try {
      const status = "Suspended";
      await axios.put(
        `http://localhost:8800/change-status/${requestUserID}/${status}`
      );
      console.log("Request verified:", request);
      setIsButtonClicked(true);
      //add a notification to the request user
      notif.notifDesc = "Your account has been suspended";
      notif.userID = requestUserID;
      notif.notificationType = "Suspension";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //update request to complete
      await axios.put(`http://localhost:8800/done-request/${requestID}`);
      // handleClose();

      setLoading(true);
      // 2 seconds cd
      setTimeout(() => {
        setLoading(false);
        setOpenSnackUn(true);
      }, 2000);

      // setOpenSnackUn(true);

      // Close the modal after 5 seconds
      setOpenSus(false);
      // delay
      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (err) {
      console.log(err);
    }
    console.log("unVerified");
  };

  const formattedDate = (theDate) => {
    const date = new Date(theDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]; // Get the month and year from the date object
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Construct the formatted date string
    return `${month} ${date.getDate()}, ${year}`;
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={handleClose} style={closeStyle}>
          <Close />
        </span>
        <h2 style={headingStyle}>Verification Request Details</h2>
        <p>
          <strong>Full Name:</strong> {request.userFirstname}{" "}
          {request.userLastname}
        </p>
        <p>
          <strong>Gender:</strong> {request.userGender}
        </p>
        <p>
          <strong>Age:</strong> {GetUserAge(request.userBirthday)}
        </p>
        <p>
          <strong>Birthdate:</strong> {formattedDate(request.userBirthday)}
        </p>
        <p>
          <strong>Address:</strong> {request.userAddress}
        </p>
        <p>
          <strong>Contact Number:</strong> {request.contactNumber}
        </p>
        <p>
          <strong>Email Address:</strong> {request.userEmail}
        </p>
        {request.images && (
          <div>
            <h3>Images</h3>
            {request.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </div>
        )}
        <div>
          <div style={buttonContainerStyle}>
            <button
              // onClick={(e) =>
              //   handleVerify(request.requestUserID, request.requestID)
              // }
              onClick={() => handleOpenModal()}
              style={Veributton}
            >
              Verify
            </button>
            <button
              // onClick={(e) =>
              //   handleUnverify(request.requestUserID, request.requestID)
              // }
              onClick={() => handleOpenSusModal()}
              style={UnVeributton}
            >
              Suspend
            </button>
          </div>
        </div>
      </div>

      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait on processing..."
        icons={<HourglassBottomIcon />}
      />

      <ButtonGroup aria-label="spacing button group">
        {/* verified modal */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRounded />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to Verify this account?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#28a745",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#218838",
                  },
                }}
                onClick={(e) =>
                  handleVerify(request.requestUserID, request.requestID)
                }
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(false)}
                sx={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#c82333",
                  },
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </ButtonGroup>

      <ButtonGroup aria-label="spacing button group">
        {/* unverified modal*/}
        <Modal open={openSus} onClose={() => setOpenSus(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRounded />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to Suspend this account?
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="white"
                sx={{
                  backgroundColor: "#28a745",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#218838",
                  },
                }}
                onClick={(e) =>
                  handleUnverify(request.requestUserID, request.requestID)
                }
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenSus(false)}
                sx={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#c82333",
                  },
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </ButtonGroup>

      {/* verified message */}
      <Snackbar
        variant="solid"
        color="success"
        size="lg"
        open={opensnack}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<VerifiedUserIcon />}
        endDecorator={
          <Button
            onClick={() => setOpenSnack(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        The account was successfully Verified.
      </Snackbar>
      {/* suspended message */}
      <Snackbar
        variant="solid"
        color="danger"
        size="lg"
        open={opensnackun}
        onClose={() => setOpenSnackUn(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        startDecorator={<CancelIcon />}
        endDecorator={
          <Button
            onClick={() => setOpenSnackUn(false)}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        The account was successfully Suspended.
      </Snackbar>
    </div>
  );
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  marginTop: "20px",
  gap: "11px",
};

const Veributton = {
  // width: "100px",
  // height: "30px",
  // borderRadius: "10px",

  // margin: "20px",
  // gap: "20px",
  // cursor: "pointer",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "background-color 0.3s ease",
};

const UnVeributton = {
  padding: "10px 20px",
  backgroundColor: "#dc3545",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
  transition: "background-color 0.3s ease",
};

Veributton[":hover"] = {
  backgroundColor: "#4CAF50",
  color: "white",
};

Veributton[":active"] = {
  backgroundColor: "#45a049",
  color: "white",
};

const headingStyle = {
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "700",
  color: "rgb(22, 121, 171)",
  textAlign: "center",
};

const modalStyle = {
  // display: "block",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  // zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const modalContentStyle = {
  // position: "absolute",
  // top: "12%",
  // left: "31%",
  backgroundColor: "#fefefe",
  // margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
  maxWidth: "500px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const closeStyle = {
  // color: "#aaa",
  float: "left",
  position: "absolute",
  right: "3%",
  top: "1%",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#dc3545",
  cursor: "pointer",
};

export default RequestModal;
