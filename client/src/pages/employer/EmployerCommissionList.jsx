//03-10-24 updated w/ filter
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar.js";
import "./ecommission.css";
import Table from "../../components/Table.js";
import Pagination from "../../components/Pagination.js";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import IconButton from "@mui/joy/IconButton";
//import Settings from "@mui/icons-material/Settings";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });

  const location = useLocation();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const userID = location.pathname.split("/")[2];
  //pathname to array from

  //handle error
  //rretrieve data
  // Frontend code
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/your-commission/${userID}`
        ); // Pass userID in the URL
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, [userID]); // Add userID to the dependency array

  //funtion to delete commission
  const handleDelete = async (commissionID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/delete-errand/${commissionID}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
    // const termMatch2 = commission.userFirstname
    //   .toLowerCase()
    //   .includes(searchTerm.term.toLowerCase());
    // const termMatch3 = commission.userLastname
    //   .toLowerCase()
    //   .includes(searchTerm.term.toLowerCase());
    const status = commission.commissionStatus.includes(searchTerm.status);

    return type && termMatch && status;
  });

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

  //Display format to date
  // months into words
  const formattedDate = (theDate) => {
    const date = new Date(theDate);
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

  //need front end
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
      <div className="Commission-page-container">
        <div className="Commission-page">
          <h1>Commission List</h1>
          <div className="commissions">
            <div className="search-filter">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm.term}
                  name="term"
                  onChange={handleChange}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className="filter">
                <select
                  onChange={handleChange}
                  name="status"
                  value={searchTerm.status}
                >
                  <option value="">All Status</option>
                  <option value="Taken">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Available">Available</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            <Table
              headers={[
                "ID",
                "ERRAND TITLE",
                "TYPE",
                "START DATE",
                "DUE DATE",
                "STATUS",
                "ACTION",
              ]}
              // update the data here
              data={currentItems.map((commissionItem) => [
                commissionItem.commissionID,
                commissionItem.commissionTitle,
                commissionItem.commissionType,
                formattedDate(commissionItem.DatePosted),
                formattedDate(commissionItem.commissionDeadline),
                commissionItem.commissionStatus,
                <React.Fragment>
                  <ButtonGroup
                    spacing="0.5rem"
                    aria-label="spacing button group"
                  >
                    <Button
                      onClick={() => handleDelete(commissionItem.commissionID)}
                    >
                      DELETE
                    </Button>
                    <Button>
                      <Link
                        to={`/view-errand/${userID}/${commissionItem.commissionID}`}
                      >
                        View
                      </Link>
                    </Button>
                  </ButtonGroup>
                </React.Fragment>,
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
      <button className="add-errand">
        <Link to={`/post-commission/${userID}`}>
          <i className="fa-solid fa-plus"></i> Add Errand
        </Link>
      </button>
    </div>
  );
};

export default CommissionList;
