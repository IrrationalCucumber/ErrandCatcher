//intended to see the catchers who applied for the errand posted by the employer
//03-06-24 updated the applicant page for employer --ash
//added pagination and table. contents for the td are based on the old code --ash
//03-10-24  <Route path="/e-applicants" exact Component={EmployerApplicants}/>
//03-14-24 inital fixing. 4:56pm fixed the error
//03-28-24 added view profile but modal doesnt have data

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar/Navbar";
import Table from "../../components/Table";
import "./applicant.css";
import Pagination from "../../components/Pagination";
import ProfileModal from "../../components/Profile Modal/ProfileModal";
import { useAuth } from "../../components/AuthContext";
import { DisplayDate } from "../../components/DisplayDate";

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
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [rating, setRating] = useState("");

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
    //display rating of acathcer
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${applicant.catcherID}`
        );
        // if rating is null
        if (res.data[0].c == null) {
          setRating(0);
        } else {
          setRating(res.data[0].c);
        }
        // console.log(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
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

  const headers = ["DATE", "CATCHER", "ERRAND TITLE", "ACTION", ""];
  const applicantData = applicants.map((applicant) => [
    //applicant.applicationID,
    DisplayDate(applicant.applicationDate),
    `${applicant.userFirstname} ${applicant.userLastname}`,
    applicant.commissionTitle,
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
  });

  //ADD TRANSACTION RECORD - 24/03/24
  //set variable fro trans
  const [trans, setTrans] = useState({
    comID: "",
    catcherID: "",
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

      //console.log(catcherID);
      await axios.post("http://localhost:8800/add-trans/", trans);
      //add a notification to the commission's applicant
      notif.notifDesc = "Your Errand application has been Accepted";
      notif.userID = catcherID;
      notif.notificationType = "Application";

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
    <div>
      <div className="applicants">
        <h1 style={{ paddingBottom: "10px" }}>APPLICANTS</h1>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button type="submit" style={{ backgroundColor: "#1679AB" }}>
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
            rating={rating}
            handleAccept={() =>
              handleAccept(
                selectedApplicant.applicationID,
                selectedApplicant.applicationErrandID,
                selectedApplicant.catcherID
              )
            }
            handleDecline={() =>
              handleDecline(
                selectedApplicant.applicationID,
                selectedApplicant.applicationErrandID,
                selectedApplicant.catcherID
              )
            }
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
