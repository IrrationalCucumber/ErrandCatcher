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
import { ModalClose } from "@mui/joy";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { DisplayDate } from "../../components/DisplayDate";
import { BannerEmployerPages } from "../../components/Banner/HeroSection";
import ViewProfile from "../profile/ViewProfile";

const EmployerApplicants = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  //pathname to array from
  //get the id
  const userID = user.userID;
  //const [searchTerm, setSearchTerm] = useState('');
  const [applicants, setApplicants] = useState([]);

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

  const handleOpenAcceptModal = () => {
    setOpenAccept(true);
  };

  const handleOpenDeclineModal = () => {
    setOpenDecline(true);
  };
  //modal to view profile page of appicant
  const handleViewProfile = (id) => {
    setSelectedApplicant(id);
    console.log(id);
    setShowProfileModal(true);
  };

  //useEffect to handle error
  useEffect(() => {
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
    fetchAllAccount();
  }, [userID]);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applicants.slice(indexOfFirstItem, indexOfLastItem);

  const headers = [
    "DATE",
    "CATCHER",
    "QUALIFICATION",
    "ERRAND TITLE",
    "ACTION",
    "",
  ];
  const applicantData = applicants.map((applicant) => [
    //applicant.applicationID,
    DisplayDate(applicant.applicationDate),
    `${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.applicationQualification,
    applicant.commissionTitle,
    applicant.applicationStatus === "Pending" ? (
      <>
        <button
          style={styles.button}
          className="accept action-btn"
          onClick={() => handleOpenAcceptModal()}
        >
          Accept
        </button>
        {/* button accept modal */}
        <Modal open={openAccept} onClose={() => setOpenAccept(false)}>
          <ModalDialog>
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to accept this applicant?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="success"
                onClick={() =>
                  handleAccept(
                    applicant.applicationID,
                    applicant.applicationErrandID,
                    applicant.catcherID
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
        <button
          style={style1.button}
          className="decline action-btn"
          onClick={() => handleOpenDeclineModal()}
        >
          Decline
        </button>

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
                    applicant.applicationID,
                    applicant.applicationErrandID,
                    applicant.catcherID
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
      </>
    ) : applicant.applicationStatus === "Accepted" ? (
      <button className="accepted action-btn">Accepted</button>
    ) : (
      <button className="declined action-btn">Declined</button>
    ),
    <button
      style={style2.button}
      onClick={() => handleViewProfile(applicant.catcherID)}
      // onClick={() => navigate(`/profile/user/${applicant.catcherID})`)}
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
    applicationID,
    applicationErrandID,
    catcherID
  ) => {
    console.log(
      "Accepted application with id:",
      applicationID,
      applicationErrandID
    );
    // Add logic to handle accepting the application
    try {
      await axios.put(
        `http://localhost:8800/accept-apply/${applicationErrandID}/${applicationID}`
      );
      //transaction
      trans.comID = applicationErrandID;
      trans.catcherID = catcherID;
      trans.dateAccepted = getTimeAndDate();
      //console.log(catcherID);
      await axios.post("http://localhost:8800/add-trans/", trans);
      //add a notification to the commission's applicant
      notif.notifDesc = "Your Errand application has been Accepted";
      notif.userID = catcherID;
      notif.notificationType = "Application";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //DENY other applicants
      await axios.put(
        `http://localhost:8800/deny-other-apply/${applicationErrandID}/${catcherID}`
      );
      //set the errand status to caught
      await axios.put(
        `http://localhost:8800/errand-taken/${applicationErrandID}`
      );
      //replace modular
      alert("You have accepted a Cather!");
      window.location.reload();
      setOpenAccept(false);
      // create set upload modal heree...................................................................
      //navigate(`/my-application/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async (
    applicationID,
    applicationErrandID,
    catcherID
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
  return (
    <>
      <BannerEmployerPages
        bannerMessage={`Here are your Applicants, ${user.username}`}
      />
      <div className="applicants-container">
        <div className="applicants">
          <h1 style={{ paddingBottom: "10px" }}>APPLICANTS</h1>
          <div className="search">
            <input type="text" placeholder="Search..." />
            <button type="submit" style={{ backgroundColor: "#1679AB" }}>
              <i className="fa fa-search" place></i>
            </button>
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

export default EmployerApplicants;
