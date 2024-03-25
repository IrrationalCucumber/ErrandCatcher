//Catcher side- user could see their application and can cancel them if they wanted
//03-06-24 updated Application page for Catcher --ash
//added pagination and table
//03-10-24 dara copied from employer applicant.jsx
// <Route path="/c-application" exact Component={Application}/>

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import "./application.css";

function Application() {
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  const [apply, setApply] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  //data
  //useEffect to handle error
  useEffect(() => {
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
    fetchAllAccount();
  }, [userID]);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apply.slice(indexOfFirstItem, indexOfLastItem);

  const headers = ["DATE", "EMPLOYER", "ERRAND TITLE", "ACTION"];
  const applicationData = currentItems.map((applicant) => [
    new Date(applicant.applicationDate).toLocaleDateString(),
    `${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.commissionTitle,
    applicant.applicationStatus === "Pending" ? (
      <button
        className="cancel action-btn"
        onClick={() => handleCancel(applicant.applicationID)}
      >
        Cancel
      </button>
    ) : applicant.status === "Cancel" ? (
      <button className="cancel action-btn" disabled>
        Cancelled
      </button>
    ) : null, // handle other statuses or add a default action
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
      alert("You have cancelled your Application");
      //add a notification to the commission's employer
      notif.notifDesc =
        "A Catcher has cancelled their application on of your errand";
      notif.userID = apply.employerID;
      notif.notificationType = "Errand Application Cancelled";
      notif.notifDate = getTimeAndDate();

      await axios.post("http://localhost:8800/notify", notif);
      window.location.reload();
      //navigate(`/my-application/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar
        page1="HOME"
        home={`/c-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/catcher-errands/${userID}`}
        page3="APPLICATIONS"
        applicants={`/my-application/${userID}`}
        map={`/c-map/${userID}`}
        page4="MAP"
      />
      <div className="application-container">
        <div className="application">
          <h1>Application</h1>
          <div className="search">
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <i className="fa fa-search" place></i>
            </button>
            {/*<select name="type" id="">
            <option value=""></option>
            <option value="employer">Employer</option>
            <option value="catcher">Catcher</option>
            <option value="admin">Admin</option>
          </select>
          <select name="status" id="">
            <option value=""></option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="Suspended">Suspended</option>
          </select>*/}
          </div>
          <Table headers={headers} data={applicationData} />
        </div>
      </div>
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
