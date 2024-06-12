import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./commissionlist.css";
import Pagination from "../../components/Pagination.js";
import Table from "../../components/Table.js";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { DisplayDate } from "../../components/DisplayDate.js";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  //current page state --Ash
  const [currentPage, setCurrentPage] = useState(1);

  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);

  //handle error
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get("http://localhost:8800/errands");
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

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
    const termMatch2 = commission.userFirstname
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const termMatch3 = commission.userLastname
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const status = commission.commissionStatus.includes(searchTerm.status);

    return type && (termMatch || termMatch2 || termMatch3) && status;
  });

  //Logic of Pagination
  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //need front end
  return (
    <div>
      {/* <NavBar
       page1="REQUESTS"
        one={`/request/${userID}`}
        // {`admin-home/${userID}`}
        page2="ACCOUNTS"
        commissionList={`/accounts/${userID}`}
        page3="ERRANDS"
        applicants={`/commission-list/${userID}`}
        page4="MAP"
        map={`/map/${userID}`}
      /> */}
      <div className="commissions">
        <h1
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          Errand List
        </h1>
        <div
          className="search"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="term"
            placeholder="Search..."
            value={searchTerm.term}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "0",
              marginBottom: "10px",
            }}
          />
          {/* <button
            type="submit"
            //onClick={fetchSearchResults}
            style={{
              padding: "8px",
              fontSize: "12px",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#CE9251",
              color: "white",
              borderRadius: "4px",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            <i className="fa fa-search"></i>
          </button> */}

          <div
            className="filter"
            style={{ display: "flex", alignItems: "center" }}
          >
            <select
              className="CLstatus"
              onChange={handleChange}
              value={searchTerm.status}
              name="status"
              defaultValue={""}
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Expired">Expired</option>
              <option value="Caught">Caught</option>
            </select>
            <select
              className="CLtype"
              onChange={handleChange}
              value={searchTerm.type}
              name="type"
              style={{
                padding: "8px",
                fontSize: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "10px",
                marginBottom: "10px",
                width: "150px",
              }}
            >
              <option value="">Type</option>
              <option value="Home">Home</option>
              <option value="Transportation">Transportation</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        <Table
          headers={[
            "ID",
            "Title",
            "Employer",
            "Type",
            "Payment",
            "Posted",
            "Completed",
            "Status",
            "Action",
          ]}
          data={currentItems.map((Commission) => [
            Commission.commissionID,
            Commission.commissionTitle,
            `${Commission.userFirstname} ${Commission.userLastname}`,
            Commission.commissionType,
            Commission.commissionPay,
            DisplayDate(Commission.DatePosted),
            Commission.DateCompleted === ""
              ? DisplayDate(Commission.DateCompleted)
              : "",
            Commission.commissionStatus,
            <>
              {/* <button onClick={() => handleDelete(Commission.commissionID)}>
              <i class="fa-solid fa-trash"></i>
              </button> */}
              <button className="update">
                <Link to={`/errand/view-errand/${Commission.commissionID}`}>
                  <i class="fa-solid fa-eye"></i>
                </Link>
              </button>
            </>,
          ])}
        />
        {/* Pagination controls */}
        {commissions.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={commissions.length}
            paginate={paginate}
          />
        )}
      </div>
      {/* onClick={handleAddCommission} logic for the button since this is a link inside a button */}
      {/* <Link to="/post-commission" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginLeft: "20px",
            padding: "8px 12px",
            fontSize: "12px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#CE9251",
            color: "white",
            borderRadius: "4px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "1.5",
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          Add Errand
        </button>
      </Link> */}
    </div>
  );
};

export default CommissionList;
