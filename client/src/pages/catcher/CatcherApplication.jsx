//Catcher side- user could see their application and can cancel them if they wanted
//03-06-24 updated Application page for Catcher --ash
//added pagination and table
//03-10-24 dara copied from employer applicant.jsx
// <Route path="/c-application" exact Component={Application}/>

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import "./application.css";
import { useAuth } from "../../components/AuthContext";
import { DisplayDate } from "../../components/DisplayDate";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Alert, IconButton, ModalClose } from "@mui/joy";
import ViewProfile from "../profile/ViewProfile";

import { Box } from "@mui/material";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import { Capitalize } from "../../components/Display/DsiplayFunctions";
import { CloseRounded, Warning } from "@mui/icons-material";
import ModalFeedback from "../../components/ModalFeedback";

function Application() {
  const { user } = useAuth();
  const userID = user.userID;
  const [apply, setApply] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });

  const [openCancel, setOpenCancel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenCancelModal = () => {
    setOpenCancel(true);
    console.log("1st cancel");
  };

  const handleOpenDeleteModal = () => {
    setOpenDelete(true);
    console.log("2nd delete");
  };
  //alert message
  const [showAlert, setShowAlert] = useState(false);
  const [alertMesg, setAlerMsg] = useState("");
  const [alrtColor, setAlrtColor] = useState("");

  // modal message pop-up
  // cancel state
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

  };
  // delete state
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);

  };


  //data
  //useEffect to handle error
  const fetchAllAccount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/your-application/${userID}`
      );
      //http://localhost:8800/user - local
      //http://192.168.1.47:8800/user - network
      setApply(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllAccount();
  }, [userID]);

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "status") {
      setSearchTerm((prev) => ({ ...prev, status: e.target.value }));
    } else if (e.target.name === "type") {
      setSearchTerm((prev) => ({ ...prev, type: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setSearchTerm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //filter
  const filterApply = apply.filter((apply) => {
    // const type = apply.commissionType
    //   .toLowerCase()
    //   .includes(searchTerm.type.toLowerCase());

    // If value is null, use an empty string or a default value : ('')
    const termMatch = apply.commissionTitle
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");
    const termMatch2 = apply.userFirstname
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");
    const termMatch3 = apply.userLastname
      ?.toLowerCase()
      .includes(searchTerm.term?.toLowerCase() ?? "");
    const status = apply.applicationStatus?.includes(searchTerm.status ?? "");

    return (termMatch || termMatch2 || termMatch3) && status;
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState("");
  //veiw employer profile
  const handleViewProfile = (id) => {
    setSelectedApplicant(id);
    console.log(id);
    setShowProfileModal(true);
  };

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterApply.slice(indexOfFirstItem, indexOfLastItem);

  const headers = [
    "DATE APPLIED",
    "EMPLOYER",
    "ERRAND TITLE",
    "STATUS",
    "ACTION",
  ];
  const applicationData = currentItems.map((applicant) => [
    // DisplayDate(applicant.applicationDate),
    <Box display="flex" alignItems="center" gap={1}>
      <EditCalendarOutlinedIcon sx={{ color: "#555" }} />
      {DisplayDate(applicant.applicationDate)}
    </Box>,
    // `${applicant.userFirstname} ${applicant.userLastname}`,
    <Button
      variant="outlined"
      onClick={() => handleViewProfile(applicant.employerID)}
    >
      {Capitalize(`${applicant.userFirstname}`) +
        Capitalize(`${applicant.userLastname}`)}
    </Button>,
    applicant.commissionTitle,
    // applicant.applicationStatus,
    applicant.applicationStatus === "Accepted" ? (
      <>
        <CheckCircleOutlineOutlinedIcon style={{ color: "green" }} />
        <span> Accepted</span>
      </>
    ) : applicant.applicationStatus === "Cancelled" ? (
      <>
        <CancelOutlinedIcon style={{ color: "darkred" }} />
        <span> Canceled</span>
      </>
    ) : applicant.applicationStatus === "Pending" ? (
      <>
        <PendingOutlinedIcon style={{ color: "darkorange" }} />
        <span> Pending</span>
      </>
    ) : applicant.applicationStatus === "Denied" ? (
      <>
        <DoDisturbAltOutlinedIcon style={{ color: "red" }} />
        <span> Denied</span>
      </>
    ) : null,
    applicant.applicationStatus === "Pending" ? (
      <>
        <button
          className="cancel action-btn"
          // onClick={() => handleCancel(applicant.applicationID)}
          onClick={() => handleOpenCancelModal()}
        >
          Cancel
        </button>

        <Modal open={openCancel} onClose={() => setOpenCancel(false)}>
          <ModalDialog>
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to cancel this application?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => {
                  handleCancel(applicant.applicationID);
                  setOpenCancel(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenCancel(false)}
              >
                No
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </>
    ) : (
      <>
        <Button
          color="danger"
          variant="outlined"
          onClick={() => handleOpenDeleteModal()}
        >
          DELETE
        </Button>

        <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
          <ModalDialog>
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
              Are you sure you want to delete this application?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="success"
                onClick={
                  () => handleDelete(applicant.applicationID)
                  // console.log("clicked delete")
                }
              >
                Yes
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenDelete(false)}
              >
                No
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </>
    ), // handle other statuses or add a default action
  ]);
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
  const handleCancel = async (applicationID) => {
    console.log("Cancel application with id:", applicationID);
    // Add logic to handle accepting the application
    //e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8800/cancel-apply/${userID}/${applicationID}`
      );

      //add a notification to the commission's employer
      notif.notifDesc =
        "A Catcher has cancelled their application on of your errand";
      notif.userID = apply.employerID;
      notif.notificationType = "Application Cancelled";
      notif.notifDate = getTimeAndDate();

      await axios.post("http://localhost:8800/notify", notif);
      // window.location.reload();
      // navigate(`/my-application/${userID}`);

      // popup cancel modal
      setTimeout(() => {
        // setLoading(false);
        // modal will pop-up in 1 seconds
        handleOpen();
      }, 1000);
      // setAlerMsg("You have cancelled your Application");
      // setShowAlert(true);
      // setAlrtColor("warning");
      const interval = setInterval(fetchAllAccount, 1000);
      return () => clearInterval(interval);
    } catch (err) {
      console.log(err);
    }
  };
  // delete application
  const handleDelete = async (applicationID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/delete-apply/${applicationID}`);

      // popup delete modal
      setTimeout(() => {
        // setLoading(false);
        // modal will pop-up in 1 seconds
        handleOpenDel();
      }, 1000);

      // close if click "yes" modal
      setOpenDelete(false)

      // setAlerMsg("You have deleted your Application");
      // setShowAlert(true);
      // setAlrtColor("danger");
      const interval = setInterval(fetchAllAccount, 1000);
      return () => clearInterval(interval);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Cancelled!"
        contentMes="You have cancelled your Application"
        color="error"
        colorText="error"
        icon={CancelOutlinedIcon}
      />

      <ModalFeedback
        open={openDel}
        handleClose={handleCloseDel}
        headerMes="Deleted!"
        contentMes="You have deleted your Application"
        color="error"
        colorText="error"
        icon={CancelOutlinedIcon}
      />

      {showAlert && (
        <Alert
          color={alrtColor}
          size="md"
          variant="solid"
          startDecorator={<Warning />}
          sx={{ borderRadius: "none" }}
          endDecorator={
            <IconButton
              variant="soft"
              color={alrtColor}
              onClick={() => setShowAlert(false)}
            >
              <CloseRounded />
            </IconButton>
          }
        >
          {alertMesg}
        </Alert>
      )}
      <div className="application-container">
        <div className="application">
          <h1>Application</h1>
          <div className="searchApplication">
            <input
              type="text"
              placeholder="Search Employer or Errand title..."
              name="term"
              onChange={handleChange}
            />

            <select
              className="CLstatus"
              onChange={handleChange}
              value={searchTerm.status}
              name="status"
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Denied">Denied</option>
              <option value="Accepted">Accepted</option>
            </select>
          </div>
          <Table headers={headers} data={applicationData} />
        </div>
      </div>
      <Modal open={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <ModalDialog layout="fullscreen" sx={{ overflowY: "auto" }}>
          <ModalClose />
          <ViewProfile id={selectedApplicant} />
        </ModalDialog>
      </Modal>
      {/* Pagination controls */}
      {apply.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={apply.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default Application;
