//03-10-24 updated w/ filter
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar.js";
import "./ecommission.css";
import Table from "../components/Table.js";
import Pagination from "../components/Pagination.js";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  // state for Filter%search
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  //search query
  const [search, setSearch] = useState({
    search: "",
    //type: "",
    status: "",
  });

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

  //fetch posted commission
  const fetchSearchResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/search-employer-commission/${userID}`,
        {
          params: { term: searchTerm }, // Pass the search term as a query parameter
        }
      );
      setCommissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm]); // Trigger the search whenever searchTerm changes

  // APS - 12/03/24
  // // filter type //
  const fetchType = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/filter-my-errand/${userID}`,
        {
          params: {
            //type: type,
            status: status,
          }, // Pass the search term as a query parameter
        }
      );
      setCommissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const fetchSearch = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:8800/filter-my-errand/${userID}` + search
  //     );
  //     setCommissions(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetchType();
  }, [status]); // reflect changes

  //funtion to delete commission
  const handleDelete = async (commissionID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/commission/${commissionID}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commissions.slice(indexOfFirstItem, indexOfLastItem);

  //need front end
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/e-home/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        map={`/map/${userID}`}
        button="SIGN OUT"
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className="filter">
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  name="status"
                >
                  <option>All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Available">Available</option>
                </select>
              </div>
            </div>

            <Table
              headers={[
                "ID",
                "CATCHER",
                "ERRAND TITLE",
                "DATE POSTED",
                "STATUS",
                "ACTION",
              ]}
              data={currentItems.map((commission) => [
                commission.commissionID,
                commission.catcherID,
                commission.commissionTitle,
                commission.DatePosted,
                commission.commissionStatus,
                <React.Fragment>
                  <button onClick={() => handleDelete(commission.commissionID)}>
                    DELETE
                  </button>
                  <button className="update">
                    <Link
                      to={`/update-commission/${commission.commissionID}/${userID}`}
                    >
                      View
                    </Link>
                  </button>
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
