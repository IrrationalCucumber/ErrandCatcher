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
          `http://localhost:8800/accepted-errands/${userID}`
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

  return (
    <div>
      <Navbar
        page1="HOME"
        home={`/c-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/catcher-errands/${userID}`}
        page3="APPLICATIONS"
        applicants={`/my-application/${userID}`}
        map={`/map/${userID}`}
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
              "ID",
              "EMPLOYER",
              "ERRAND TITLE",
              "START",
              "DEADLINE",
              "STATUS",
            ]}
            data={currentItems.map((commission, rowIndex) => [
              commission.commissionID,
              `${commission.userFirstname} ${commission.userLastname}`,
              commission.commissionTitle,
              commission.commissionStart,
              commission.commissionDeadline,
              commission.errandStatus,
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
