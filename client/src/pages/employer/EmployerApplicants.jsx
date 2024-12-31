//intended to see the catchers who applied for the errand posted by the employer
//03-06-24 updated the applicant page for employer --ash
//added pagination and table. contents for the td are based on the old code --ash
//03-10-24  <Route path="/e-applicants" exact Component={EmployerApplicants}/>
//03-14-24 inital fixing. 4:56pm fixed the error
//03-28-24 added view profile but modal doesnt have data

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table";
import "./applicant.css";
import Pagination from "../../components/Pagination";
import ProfileModal from "../../components/Profile Modal/ProfileModal";
import { useAuth } from "../../components/AuthContext";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import { ButtonGroup, ModalClose } from "@mui/joy";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { DisplayDate } from "../../components/DisplayDate";
import { BannerEmployerPages } from "../../components/Banner/HeroSection";
import ViewProfile from "../profile/ViewProfile";
import ModalFeedback from "../../components/ModalFeedback";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Box, Typography } from "@mui/material";
import { Refresh } from "@mui/icons-material";

const EmployerApplicants = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  //pathname to array from
  //get the id
  const userID = user.userID;
  //const [searchTerm, setSearchTerm] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState({ term: "" });

  //current page state --Ash
  const [currentPage, setCurrentPage] = useState(1);
  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);
  //ash
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState("");
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [acceptMoreModal, setAcceptMoreModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState("");
  const [selectedErrand, setSelectedErrand] = useState("");

  // modal message pop-up
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    //setSelectedApplicant(id);
    console.log("selected shit id");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAccept(false);
    //window.location.reload();
    setAcceptMoreModal(true);
  };

  const handleOpenAcceptModal = (id, ApplyID, errandID) => {
    setOpenAccept(true);
    setSelectedApplicant(id);
    setSelectedApplication(ApplyID);
    setSelectedErrand(errandID);
    console.log("selectedapplicant", id);
  };

  const handleOpenDeclineModal = (id, ApplyID, errandID) => {
    setOpenDecline(true);
    setSelectedApplicant(id);
    setSelectedApplication(ApplyID);
    setSelectedErrand(errandID);
  };
  //modal to view profile page of appicant
  const handleViewProfile = (id) => {
    setSelectedApplicant(id);
    console.log(id);
    setShowProfileModal(true);
  };

  //useEffect to handle error
  const fetchAllAccount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/applicants/${userID}` // show only pending
      );
      //http://localhost:8800/user - local
      //http://192.168.1.47:8800/user - network
      setApplicants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllAccount();
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({ ...prev, [name]: value }));
  };

  const filterApplicants = applicants.filter((applicant) => {
    console.log(applicant, "display data");

    const termMatch = applicant.commissionTitle
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");
    const termMatch2 = applicant.userFirstname
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");
    const termMatch3 = applicant.userLastname
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");

    return termMatch || termMatch2 || termMatch3;
  });

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterApplicants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const headers = [
    "ID",
    "DATE",
    "CATCHER",
    "AVAILABILITY",
    "ERRAND TITLE",
    "ACTION",
    "",
  ];
  const applicantData = applicants.map((applicant) => [
    applicant.applicationID,
    // DisplayDate(applicant.applicationDate),
    <Box display="flex" alignItems="center" gap={1}>
      <CalendarMonthOutlinedIcon sx={{ color: "#555" }} />
      {DisplayDate(applicant.applicationDate)}
    </Box>,
    ` ${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.userHasErrand === "true" ? "Unavailable" : "Available",
    // applicant.commissionTitle,
    <Box display="flex" alignItems="center" gap={1}>
      <BadgeOutlinedIcon sx={{ color: "#555" }} />
      <Typography
        sx={{
          color: "#565360",
          fontSize: "12",
        }}
      >
        {applicant.commissionTitle}
      </Typography>
    </Box>,
    applicant.applicationStatus === "Pending" ? (
      <>
        <ButtonGroup
          color="neutral"
          orientation="horizontal"
          variant="outlined"
          spacing="0"
        >
          {/* code here */}
          <Button
            color="success"
            onClick={() =>
              handleOpenAcceptModal(
                applicant.catcherID,
                applicant.applicationID,
                applicant.applicationErrandID
              )
            }
            disabled={applicant.userHasErrand === "true" ? true : false}
          >
            Accept
          </Button>
          {/* // code here */}
          <Button
            color="danger"
            onClick={() =>
              handleOpenDeclineModal(
                applicant.catcherID,
                applicant.applicationID,
                applicant.applicationErrandID
              )
            }
          >
            Decline
          </Button>
        </ButtonGroup>

        {/* button accept modal */}
        <Modal open={openAccept} onClose={() => setOpenAccept(false)}>
          <ModalDialog>
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to accept this applicant?{" "}
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="success"
                onClick={() =>
                  handleAccept(
                    selectedApplicant,
                    selectedApplication,
                    selectedErrand
                  )
                }
              >
                Accept
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenAccept(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>

        <Modal open={openDecline} onClose={() => setOpenDecline(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to decline this applicant?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() =>
                  handleDecline(
                    selectedApplicant,
                    selectedApplication,
                    selectedErrand
                  )
                }
              >
                Decline
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenDecline(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>

        <Modal
          open={acceptMoreModal}
          aria-labelledby="confirm-modal-title"
          aria-describedby="confirm-modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <Typography id="confirm-modal-title" variant="h6" component="h2">
              Accept Other Applicants?
            </Typography>
            <Typography id="confirm-modal-description" sx={{ mt: 2 }}>
              Do you want to accept other applicants for this errand?
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAcceptMoreModal(false)}
              >
                Yes, accept others
              </Button>
              <Button
                variant="contained"
                color="secondary"
                // selectedApplicant,
                // selectedApplication,
                // selectedErrand
                onClick={() =>
                  handleDenyOther(
                    // applicant.applicationErrandID,
                    selectedErrand,
                    // applicant.catcherID
                    selectedApplicant
                  )
                }
              >
                No, deny others
              </Button>
            </Box>
          </Box>
        </Modal>
      </>
    ) : applicant.applicationStatus === "Accepted" ? (
      <button className="accepted action-btn">Accepted</button>
    ) : (
      <button className="declined action-btn">Declined</button>
    ),
    <button
      style={style2.button}
      onClick={() => handleViewProfile(applicant.catcherID)}
    >
      View Profile
    </button>,
  ]);
  //FOR NOTIFICATION
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });
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
  //ADD TRANSACTION RECORD - 24/03/24
  //set variable fro trans
  const [trans, setTrans] = useState({
    comID: "",
    catcherID: "",
    dateAccepted: "",
    //dateCompleted: "",
    //reciept: "",
  });
  const handleAccept = async (
    catcherID,
    applicationID,
    applicationErrandID
  ) => {
    console.log(
      "Accepted application with id:",
      applicationID,
      applicationErrandID,

      "catcher numid"
    );

    // Add logic to handle accepting the application
    try {
      await axios.put(
        `http://localhost:8800/accept-apply/${applicationErrandID}/${applicationID}`
      );

      handleOpen();

      //transaction
      trans.comID = applicationErrandID;
      trans.catcherID = selectedApplicant;
      trans.dateAccepted = getTimeAndDate();
      //console.log(catcherID);
      await axios.post("http://localhost:8800/add-trans/", trans);
      //add a notification to the commission's applicant
      notif.notifDesc = "Your Errand application has been Accepted";
      notif.userID = selectedApplicant;
      notif.notificationType = "Application";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //set catcher has errand
      await axios.put(`http://localhost:8800/has-errand/${catcherID}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (
    catcherID,
    applicationID,
    applicationErrandID
  ) => {
    console.log("Declined application with id:", applicationID);
    // Add logic to handle declining the application
    try {
      await axios.put(
        `http://localhost:8800/deny-apply/${applicationErrandID}/${applicationID}`
      );
      //add a notification to the commission's applicant
      notif.notifDesc = "Your Errand application has been Denied";
      notif.userID = catcherID;
      notif.notificationType = "Application";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //  alert("You have Posted an Errand!");
      window.location.reload();
      setShowProfileModal(false);
      //navigate(`/my-application/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(applicants);
  //deny otther applicants
  const handleDenyOther = async (errandID, catcherID) => {
    try {
      //DENY other applicants
      const denyResponse = await axios.put(
        `http://localhost:8800/deny-other-apply/${errandID}/${catcherID}`
      );
      if (denyResponse.data.message === "No other applications to deny") {
        console.log("No other applications were found to deny.");
      } else {
        console.log("Other applications denied successfully.");
      }
      //set the errand status to caught
      await axios.put(`http://localhost:8800/errand-taken/${errandID}`);
    } catch (error) {
      console.log(error);
    }
    setAcceptMoreModal(false);
    // const interval = setInterval(fetchAllAccount, 1000);
    // return () => clearInterval(interval);
  };
  //refhresh table
  const handleRefresh = () => {
    const interval = setInterval(fetchAllAccount, 1000);
    return () => clearInterval(interval);
  };
  return (
    <>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Success!"
        contentMes="You have accepted a Catcher!"
        color="success"
        colorText="green"
      />

      <BannerEmployerPages
        bannerMessage={`Here are your Applicants, ${user.username.toUpperCase()}`}
      />
      <div className="applicants-container">
        <div className="applicants">
          <div className="employer__applicants__search">
            <Typography level="h1">Search:</Typography>
            &nbsp; &nbsp;
            <input
              type="text"
              placeholder="Enter name here..."
              name="term"
              value={searchTerm.term}
              onChange={handleInputChange}
            />
            <Button
              variant="plain"
              sx={{ ml: ".5rem" }}
              onClick={() => handleRefresh()}
            >
              <Refresh />
            </Button>
          </div>
          <div className="applicants-table">
            <Table headers={headers} data={applicantData} />
          </div>

          {/* added  by ash 
            Modal for Profile of Applicant
          */}
          <Modal
            open={showProfileModal}
            onClose={() => setShowProfileModal(false)}
          >
            <ModalDialog layout="fullscreen" sx={{ overflowY: "auto" }}>
              <ModalClose />
              <ViewProfile id={selectedApplicant} />
            </ModalDialog>
          </Modal>

          {/* Pagination controls */}
          {applicants.length > 0 && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={applicants.length}
              paginate={paginate}
            />
          )}
        </div>
        {/* <Footer/> */}
      </div>
    </>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "12px",
    backgroundColor: "#42a942",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    textAlign: "center",
  },
};

const style1 = {
  button: {
    padding: "10px 20px",
    fontSize: "12px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    textAlign: "center",
  },
};

const style2 = {
  button: {
    padding: "10px 20px",
    fontSize: "12px",
    backgroundColor: "#378CE7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    textAlign: "center",
  },
};
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EmployerApplicants;
