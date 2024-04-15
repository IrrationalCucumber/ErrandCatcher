// Catcher side
//
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import "./commissionpage.css";
import { useLocation } from "react-router-dom";

function CommissionPage() {
  const headers = ["DATE", "EMPLOYER", "ERRAND TITLE", "STATUS"];
  const [commissions, setCommissions] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  //getuserID
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

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
  }, []);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commissions.slice(indexOfFirstItem, indexOfLastItem);

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
      <Navbar
        page1="HOME"
        home={`/home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/catcher-errands/${userID}`}
        page3="APPLICATIONS"
        applicants={`/my-application/${userID}`}
        map={`/c-map/${userID}`}
        page4="MAP"
      />
      <div className="Commission-page-container">
        <div className="Commission-page">
          {" "}
          {/* Apply Commission-page class here */}
          <h1>Commission</h1>
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
              new Date(commission.commissionDeadline)
                .toISOString()
                .substr(0, 10),
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
