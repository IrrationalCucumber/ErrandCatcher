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

  //getuserID
  const { user } = useAuth();
  const userID = user.userID;

  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/catcher/ongoing/${userID}`
        );
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
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
      .toLowerCase()
      .includes(searchTerm.type.toLowerCase());
    const termMatch = commission.commissionTitle
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const termMatch2 = commission.userFirstname
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    let deadline = true;
    if (searchTerm.date) {
      deadline = commission.commissionDeadline >= searchTerm.date;
    }
    const status = commission.commissionStatus.includes(searchTerm.status);

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
      //alert(employerID);

      // add a notification to the commission's employer
      notif.notifDesc = "A Catcher has cancelled in doing an errand";
      notif.userID = employerID;
      notif.notificationType = "Errand Cancelled";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
      //cancel the transaction
      await axios.put(`http://localhost:8800/cancel-trans/${transactID}`, {
        params: { date: getTimeAndDate() },
      });
      /**
       * ADD METHOD TO CHANGE ALSO THE STATUS OF ERRAND TO CANCELLED
       */
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="Commission-page-container">
        <div className="Commission-page">
          {" "}
          {/* Apply Commission-page class here */}
          <h1>Commission</h1>
          <div className="search">
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
              commission.commissionStart,
              DisplayDate(commission.commissionDeadline),
              commission.errandStatus,
              commission.errandStatus === "Ongoing" ? (
                <button
                  onClick={() =>
                    handleCancel(commission.transactID, commission.employerID)
                  }
                >
                  CANCEL
                </button>
              ) : null,
            ])}
          />
        </div>
      </div>
      <OngoingCards commissions={commissions} to={`/view-errand/${userID}`} />
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
