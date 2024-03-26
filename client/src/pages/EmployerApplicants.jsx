//intended to see the catchers who applied for the errand posted by the employer
//03-06-24 updated the applicant page for employer --ash
//added pagination and table. contents for the td are based on the old code --ash
//03-10-24  <Route path="/e-applicants" exact Component={EmployerApplicants}/>
//03-14-24 inital fixing. 4:56pm fixed the error

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Table from "../components/Table";
import "./applicant.css";
import Pagination from "../components/Pagination";

const EmployerApplicants = () => {
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

  const headers = ["DATE", "CATCHER", "ERRAND TITLE", "ACTION"];
  const applicantData = currentItems.map((applicant) => [
    //applicant.applicationID,
    new Date(applicant.applicationDate).toLocaleDateString(),
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
      console.log(catcherID);
      await axios.post("http://localhost:8800/add-trans/", trans);
      //add a notification to the commission's applicant
      notif.notifDesc = "Your Errand application has been Accepted";
      notif.userID = catcherID;
      notif.notificationType = "Application";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
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
  console.log(applicants);
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
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
{
  /*
        <div className="accounts">
          <table>
            <thead>
              <tr>
                <th className='col1'>Commission</th>
                <th className='col2'>Commission ID</th>
                <th className='col3'>Catcher</th>
                <th className='col4'>Email</th>
                <th className='col5'>Contact Number</th>
                <th className='col6'>Date Applied</th>
                <th className='col7'>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(Applicant=>(
                    <tr className="account" key={Applicant.applicationID}>
                        <td className='col1'>{Applicant.commissionTitle}</td>
                        <td className='col2'>{Applicant.commissionID}</td>
                        <td className='col3'><Link to={`/update-account/${Applicant.catcherID}`}>{Applicant.userFirstname} {Applicant.userLastname}</Link></td>
                        <td className='col4'>{Applicant.userEmail}</td>
                        <td className='col5'>{Applicant.userContactNum}</td>
                        <td className='col6'>{new Date(Applicant.applicationDate).toLocaleDateString()}</td>
                        <td className='col7'>{Applicant.applicationStatus}</td>
                        <td><button className='update'><Link to={`/update-account/${Applicant.catcherID}`}>Update</Link></button></td>
                    </tr>
                    ))}
            </tbody>
          </table>
      </div>


          const handleAccept = (applicationId) => {
      console.log('Accepted application with id:', applicationId);
      // Add logic to handle accepting the application
    };
  
    const handleDecline = (applicationId) => {
      console.log('Declined application with id:', applicationId);
      // Add logic to handle declining the application
    };

      <Table
          headers={['DATE', 'EMPLOYER', 'ERRAND TITLE', 'ACTION']}
          data={currentItems.map((application, rowIndex) => {
            return (
              <tr key={rowIndex}>
                <td>{application.date}</td>
                <td>{application.employer}</td>
                <td>{application.errandTitle}</td>
                <td>
                  {application.action === 'Pending' && (
                    <>
                      <button className="accept action-btn" onClick={() => handleAccept(application.id)}>Accept</button>
                      <button className="decline action-btn" onClick={() => handleDecline(application.id)}>Decline</button>
                    </>
                  )}
                  {application.action === 'Accepted' && (
                    <button className="accepted action-btn">Accepted</button>
                  )}
                  {application.action === 'Declined' && (
                    <button className="declined action-btn">Declined</button>
                  )}
                </td>
              </tr>
            );
          })}
        />
*/
}
