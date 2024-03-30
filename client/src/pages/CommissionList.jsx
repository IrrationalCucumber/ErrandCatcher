import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar.js";
import "./commissionlist.css";
import Pagination from "../components/Pagination";
import Table from "../components/Table";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selStatus, setSelStatus] = useState("");
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');


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
        const res = await axios.get("http://localhost:8800/commission");
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

  //fetch all accounts
  //triggers when search input is filled
  const fetchSearchResults = async () => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      const res = await axios.get("http://localhost:8800/search-commission", {
        params: { term: searchTerm }, // Pass the search term as a query parameter
      });
      setCommissions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm]); // Trigger the search whenever searchTerm changes

  // filter type
  const fetchTypeResultses = async () => {
    try {
          //http://localhost:8800/user - local
          //http://192.168.1.47:8800/user - network
        const res = await axios.get('http://localhost:8800/type-commilist', {
            params: { status: status, type: type} // Pass the search term as a query parameter
        });
        setCommissions(res.data);
    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
  fetchTypeResultses();
}, [status, type]);

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

  //Logic of Pagination
  const indexOfLastItem = currentPage + itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commissions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //need front end
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/admin-home`}
        // {`admin-home/${userID}`}
        page2="ACCOUNT LIST"
        commissionList={`/accounts`}
        page3="ERRAND LIST"
        applicants={`/commission-list`}
        page4="MAP"
        map={`/map`}
      />

      <div className="commissions">
        <h1 style={{ marginTop:"10px", marginBottom: "10px", fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>Errand List</h1>
          <div className="search" style={{marginTop:"10px", marginBottom: "10px", display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "8px", fontSize: "12px", border: "1px solid #ccc", borderRadius: "4px", marginRight: "0", marginBottom:"10px" }}
            />
            <button type="submit" 
              onClick={fetchSearchResults} 
              style={{ padding: "8px", fontSize: "12px", cursor: "pointer", border: "none", backgroundColor: "#CE9251", color: "white", borderRadius: "4px", marginBottom:"10px", marginRight:"10px" }}>
              <i className="fa fa-search"></i>
            </button>
         
          <div className="filter"  style={{ display: "flex", alignItems: "center" }}>
            <select 
              className="CLstatus"
              onChange={(e) => setStatus(e.target.value)} 
              value={status}
              style={{ padding: "8px", fontSize: "12px", border: "1px solid #ccc", borderRadius: "4px", marginRight: "10px", marginBottom:"10px", width: "150px" }}
              >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select 
              className="CLtype"
              onChange={(e) => setType(e.target.value)} 
              value={type}
              style={{ padding: "8px", fontSize: "12px", border: "1px solid #ccc", borderRadius: "4px", marginRight: "10px", marginBottom:"10px", width: "150px" }}
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
            Commission.employerID,
            Commission.commissionType,
            Commission.commissionPay,
            Commission.DatePosted,
            Commission.DateCompleted,
            Commission.commissionStatus,
            <>
              <button onClick={() => handleDelete(Commission.commissionID)}>
              <i class="fa-solid fa-trash"></i>
              </button>
              <button className="update">
                <Link to={`/update-commission/${Commission.commissionID}`}>
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
      <Link to="/post-commission"  style={{ textDecoration: "none" }}>
        <button style={{ 
            marginLeft:"20px",
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
            fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"
          }}>
          Add Commission
        </button>
      </Link>
    </div>
  );
};

export default CommissionList;

// //<div className='search'>
// <input
// type='text'
// placeholder='Search...'
// value={searchTerm}
// onChange={(e) => setSearchTerm(e.target.value)}
// />
// <button type='submit' onClick={fetchSearchResults}>
// <i className='fa fa-search'></i>
// </button>
// </div>

//  const headers = ['ID', 'Title', 'Employer', 'Type', 'Commission Pay', 'Date Posted', 'Date Completed', 'Status'];
/*
  const commissionData = commissions.map(commission => ([
    commission.commissionID,
    commission.commissionTitle,
    commission.employerID,
    commission.commissionType,
    commission.commissionPay,
    commission.DatePosted,
    commission.DateCompleted,
    commission.commissionStatus
  ]));*/
/*
        <div className="commissions">
          <Table headers={headers} data={commissionData} />
        </div>
*/
