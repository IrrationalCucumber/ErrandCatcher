//Catcher side- user could see their application and can cancel them if they wanted
//03-06-24 updated Application page for Catcher --ash
//added pagination and table
//03-10-24 dara copied from employer applicant.jsx
// <Route path="/c-application" exact Component={Application}/>

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    applicant.status === "Pending" ? (
      <button
        className="cancel action-btn"
        onClick={() => handleCancel(applicant.id)}
      >
        Cancel
      </button>
    ) : applicant.status === "Cancel" ? (
      <button className="cancel action-btn" disabled>
        Cancelled
      </button>
    ) : null, // handle other statuses or add a default action
  ]);

  const handleCancel = (applicationId) => {
    console.log("Cancel application with id:", applicationId);
    // Add logic to handle accepting the application
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
