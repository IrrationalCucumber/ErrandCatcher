// Catcher side
//
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import "./commissionpage.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import OngoingCards from "../Dropdown/OngoingCards";
import { DisplayDate } from "../../components/DisplayDate";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import OngoingCardsNew from "../Dropdown/OngoingCardsNew";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RotateRightOutlinedIcon from "@mui/icons-material/RotateRightOutlined";
import { Box } from "@mui/material";

function CommissionPage() {
  const headers = ["DATE", "EMPLOYER", "ERRAND TITLE", "STATUS"];
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
    date: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // modal
  const [openCancel, setOpenCancel] = useState(false);

  const handleOpenCancelModal = () => {
    setOpenCancel(true);
    console.log("canceled");
  };

  //getuserID
  const { user } = useAuth();
  const userID = user.userID;

  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/accepted-errand/${userID}`
        );
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
    const interval = setInterval(fetchAllCommission, 5000);
    return () => clearInterval(interval);
  }, []);
  //for payment errand
  const [forPayment, setForPayment] = useState([]);
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/catcher/ongoing/${userID}`
        );

        setForPayment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPending();
    // const interval = setInterval(fetchPending, 11000);
    // return () => clearInterval(interval);
  }, []);
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
  const filterErrands = commissions.filter((commission) => {
    const type = commission.commissionType
      ?.toLowerCase()
      .includes(searchTerm.type.toLowerCase() ?? "");
    const termMatch =
      commission.commissionTitle
        ?.toLowerCase()
        .includes(searchTerm.term.toLowerCase()) ?? "";
    const termMatch2 =
      commission.userFirstname
        ?.toLowerCase()
        .includes(searchTerm.term.toLowerCase()) ?? "";
    let deadline = true;
    if (searchTerm.date) {
      deadline = commission.commissionDeadline >= searchTerm.date;
    }
    const status = commission.transStatus.includes(searchTerm.status);

    return type && (termMatch || termMatch2) && status && deadline;
  });

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });
  //get current date
  //for cancel and notif
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

  //CANCEL TRANSACTION
  const handleCancel = async (transactID, employerID) => {
    try {
      // alert(transactID);

      // add a notification to the commission's employer
      notif.notifDesc = "A Catcher has cancelled in doing an errand";
      notif.userID = employerID;
      notif.notificationType = "Errand Cancelled";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //cancel the transaction
      await axios.put(
        `http://localhost:8800/catcher/cancel/${transactID}/${userID}`
      );
      /**
       * ADD METHOD TO CHANGE ALSO THE STATUS OF ERRAND TO CANCELLED
       */
      alert("You have cancelled an errand.");
      window.location.reload();
      setOpenCancel(false);
    } catch (err) {
      console.log(err);
    }
  };
  //ERRAND IS DONE
  const handleComplete = async (transID, empID) => {
    try {
      notif.notifDesc = "A Catcher has completed your errand";
      notif.userID = empID;
      notif.notificationType = "Errand Completed";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //cancel the transaction
      await axios.put(
        `http://localhost:8800/catcher/complete/${transID}/${userID}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="Commission-page-container">
        <div className="Commission-page">
          {" "}
          {/* Apply Commission-page class here */}
          <h1>
            Errands you have <i>Catched</i>
          </h1>
          <div className="searcherrand">
            <input
              type="text"
              placeholder="Search Errand title..."
              name="term"
              onChange={handleChange}
            />
            <input type="date" name="date" onChange={handleChange} />

            <select
              className="CLstatus"
              onChange={handleChange}
              value={searchTerm.status}
              name="status"
            >
              <option value="">Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="For Payment">For Payment</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <h6>Catcher can see the status of the commission</h6>
          <Table
            headers={[
              "EMPLOYER",
              "ERRAND TITLE",
              "START",
              "DEADLINE",
              "STATUS",
              "ACTION",
            ]}
            data={currentItems.map((commission, rowIndex) => [
              `${commission.userFirstname} ${commission.userLastname}`,
              commission.commissionTitle,
              // commission.commissionStart,
              DisplayDate(commission.commissionStartDate),
              // DisplayDate(commission.commissionDeadline),
              <Box display="flex" alignItems="center" gap={1}>
                < DateRangeOutlinedIcon
                  sx={{ color: "#555" }}
                />
                {DisplayDate(commission.commissionDeadline)}
              </Box>,
              // commission.errandStatus,
              commission.transStatus === "Completed" ? (
                <>
                  <AssignmentTurnedInOutlinedIcon style={{ color: "green" }} />
                  <span> Completed</span>
                </>
              ) : commission.transStatus === "Cancelled" ? (
                <>
                  <CancelOutlinedIcon style={{ color: "orange" }} />
                  <span> Canceled</span>
                </>
              ) : commission.transStatus === "For Payment" ? (
                <>
                  <PaymentsOutlinedIcon style={{ color: "brown" }} />
                  <span> For Payment</span>
                </>
              ) : commission.transStatus === "Ongoing" ? (
                <>
                  <RotateRightOutlinedIcon style={{ color: "#378ce7" }} />
                  <span> Ongoing</span>
                </>
              ) : null,
              commission.transStatus === "Ongoing" ? (
                <>
                  <button
                    className="cancel-btn"
                    // onClick={() =>
                    //   handleCancel(commission.transactID, commission.employerID)
                    // }
                    onClick={handleOpenCancelModal}
                  >
                    CANCEL
                  </button>

                  {/*cancel modal */}
                  <Modal open={openCancel} onClose={() => setOpenCancel(false)}>
                    <ModalDialog>
                      <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                      </DialogTitle>
                      <Divider />
                      <DialogContent>
                        Are you sure you want to Cancel this errand?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="solid"
                          color="danger"
                          onClick={
                            () =>
                              handleCancel(
                                commission.transactID,
                                commission.employerID
                              )
                            // console.log("cancel commission")
                          }
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
              ) : null,
            ])}
          />
        </div>
      </div>

      {/* <OngoingCards commissions={commissions} to={`/view-errand/${userID}`} /> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {forPayment.map((commission) => (
              <OngoingCardsNew
                key={commission.commissionID}
                icon={commission.commissionType}
                title={commission.commissionTitle}
                type={commission.commissionType}
                location={commission.commissionLocation}
                desc={commission.commissionDesc}
                pay={commission.commissionPay}
                status={commission.errandStatus}
                path={`/errand/view/${commission.commissionID}`}
                // Employer side
                userFname={commission.userFirstname}
                userLname={commission.userLastname}
                // handle payment
                // pay={commission.commissionPay}
                // type={commission.commissionType}
                // userFname={commission.userFirstname}
                // userLname={commission.userLastname}
                transID={commission.transactID}
                // title={commission.commissionTitle}
                comID={commission.commissionID}
                transCatID={commission.transCatcherID}
                // Catcher side
                // marked complete and cancel
                // transID={commission.transactID}
                empID={commission.employerID}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      {commissions.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={commissions.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default CommissionPage;
