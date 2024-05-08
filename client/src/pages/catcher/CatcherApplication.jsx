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
    const termMatch = apply.commissionTitle
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const termMatch2 = apply.userFirstname
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const termMatch3 = apply.userLastname
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const status = apply.applicationStatus.includes(searchTerm.status);

    return (termMatch || termMatch2 || termMatch3) && status;
  });

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterApply.slice(indexOfFirstItem, indexOfLastItem);

  //Display format to date
  // months into words
  const formattedDate = (applicationDate) => {
    const date = new Date(applicationDate);
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

  const headers = ["DATE", "EMPLOYER", "ERRAND TITLE", "STATUS", "ACTION"];
  const applicationData = currentItems.map((applicant) => [
    formattedDate(applicant.applicationDate),
    `${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.commissionTitle,
    applicant.applicationStatus,
    applicant.applicationStatus === "Pending" ? (
      <button
        className="cancel action-btn"
        onClick={() => handleCancel(applicant.applicationID)}
      >
        Cancel
      </button>
    ) : (
      <button
        className=""
        onClick={() => handleDelete(applicant.applicationID)}
      >
        DELETE
      </button>
    ), // handle other statuses or add a default action
  ]);
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
  });

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
      notif.notificationType = "Application Cancelled";

      await axios.post("http://localhost:8800/notify", notif);
      window.location.reload();
      //navigate(`/my-application/${userID}`);
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="application-container">
        <div className="application">
          <h1>Application</h1>
          <div className="search">
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
