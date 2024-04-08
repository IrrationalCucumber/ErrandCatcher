//intended to see the catchers who applied for the errand posted by the employer
//03-06-24 updated the applicant page for employer --ash
//added pagination and table. contents for the td are based on the old code --ash
//03-10-24  <Route path="/e-applicants" exact Component={EmployerApplicants}/>
//03-14-24 inital fixing. 4:56pm fixed the error
//03-28-24 added view profile but modal doesnt have data

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Table from "../components/Table";
import "./applicant.css";
import Pagination from "../components/Pagination";
import ProfileModal from "../components/Profile Modal/ProfileModal";

const EmployerApplicants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //pathname to array from
  //get the id
  const userID = location.pathname.split("/")[2];
  //const [searchTerm, setSearchTerm] = useState('');
  const [applicants, setApplicants] = useState([]);

  //current page state --Ash
  const [currentPage, setCurrentPage] = useState(1);
  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);
  //ash
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
    //console.log(selectedApplicant.userFirstname);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  //useEffect to handle error
  useEffect(() => {
    const fetchAllAccount = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/applicants/${userID}`
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
  //fetch all accounts
  //triggers when search input is filled
  //     const fetchSearchResults = async () => {
  //       try {
  //             //http://localhost:8800/user - local
  //             //http://192.168.1.47:8800/user - network
  //           const res = await axios.get('http://localhost:8800/search-user', {
  //               params: { term: searchTerm } // Pass the search term as a query parameter
  //           });
  //           setApplicants(res.data);
  //       } catch (err) {
  //           console.log(err);
  //       }
  //   };
  //   useEffect(() => {
  //       fetchSearchResults();
  //   }, [searchTerm]); // Trigger the search whenever searchTerm changes

  //list need to be in a column
  //need filter

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = applicants.slice(indexOfFirstItem, indexOfLastItem);

  const headers = ["DATE", "CATCHER", "ERRAND TITLE", "ACTION", ""];
  const applicantData = currentItems.map((applicant) => [
    //applicant.applicationID,
    new Date(applicant.applicationDate).toLocaleDateString(),
    `${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.commissionTitle,
    <button
      onClick={() => navigate(`/view-profile/${userID}/${applicant.catcherID}`)}
      //`/view-profile/${applicant.catcherID}`
    >
      <i className="fa-regular fa-user"></i>
    </button>,
    applicant.applicationStatus === "Pending" ? (
      <>
        <button
          className="accept action-btn"
          onClick={() =>
            handleAccept(
              applicant.applicationID,
              applicant.applicationErrandID,
              applicant.catcherID
            )
          }
        >
          Accept
        </button>
        <button
          className="decline action-btn"
          onClick={() =>
            handleDecline(
              applicant.applicationID,
              applicant.applicationErrandID,
              applicant.catcherID
            )
          }
        >
          Decline
        </button>
      </>
    ) : applicant.applicationStatus === "Accepted" ? (
      <button className="accepted action-btn">Accepted</button>
    ) : (
      <button className="declined action-btn">Declined</button>
    ),
    <button onClick={() => handleViewProfile(applicant, applicant.username)}>
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
      //replace modular
      alert("You have accepted a Cather!");
      window.location.reload();
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
      //navigate(`/my-application/${userID}`);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(applicants);
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        map={`/e-map/${userID}`}
        page4="MAP"
      />
      <div className="applicants">
        <h1>APPLICANTS</h1>
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
        <Table headers={headers} data={applicantData} />

        {/* added  by ash */}

        {showProfileModal && (
          <ProfileModal
            username={selectedApplicant.username}
            fname={selectedApplicant.userFirstname}
            lname={selectedApplicant.userLastname}
            email={selectedApplicant.userEmail}
            num={selectedApplicant.userContactNum}
            age={selectedApplicant.userAge}
            applicant={selectedApplicant}
            rating={selectedApplicant.c}
            closeModal={handleCloseProfileModal}
          />
        )}
        {/* Pagination controls */}
        {applicants.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={applicants.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerApplicants;
