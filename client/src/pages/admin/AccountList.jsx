//updated
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import "./accountlist.css";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  // const [type, setType] = useState("");
  // const [status, setStatus] = useState("");
  // const [NoSearch, setNoSearch] = useState(true);
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  //pagination --Ash
  const [currentPage, setCurrentPage] = useState(1);

  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);

  //useEffect to handle error
  useEffect(() => {
    if (
      searchTerm.type != "" ||
      searchTerm.status != "" ||
      searchTerm.term != ""
    ) {
      const fetchSearchResults = async () => {
        try {
          //http://localhost:8800/user - local
          //http://192.168.1.47:8800/user - network
          const res = await axios.get("http://localhost:8800/search-user", {
            params: {
              term: searchTerm.term,
              type: searchTerm.type,
              status: searchTerm.status,
            }, // Pass the search term as a query parameter
          });
          setAccounts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSearchResults();
    } else {
      const fetchAllAccount = async () => {
        try {
          const res = await axios.get("http://localhost:8800/users");
          //http://localhost:8800/user - local
          //http://192.168.1.47:8800/user - network
          setAccounts(res.data);
          //console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllAccount();
    }
  }, [searchTerm]);
  //fetch all accounts
  //triggers when search input is filled
  // const fetchSearchResults = async () => {
  //   try {
  //     //http://localhost:8800/user - local
  //     //http://192.168.1.47:8800/user - network
  //     const res = await axios.get("http://localhost:8800/search-user", {
  //       params: {
  //         term: searchTerm.term,
  //         type: searchTerm.type,
  //         status: searchTerm.status,
  //       }, // Pass the search term as a query parameter
  //     });
  //     setAccounts(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     try {
  //       //http://localhost:8800/user - local
  //       //http://192.168.1.47:8800/user - network
  //       const res = await axios.get("http://localhost:8800/search-user", {
  //         params: {
  //           term: searchTerm.term,
  //           type: searchTerm.type,
  //           status: searchTerm.status,
  //         }, // Pass the search term as a query parameter
  //       });
  //       setAccounts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchSearchResults();
  // }, [searchTerm]); // Trigger the search whenever searchTerm changes

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

  // filter type //
  // const fetchType = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:8800/filter-type", {
  //       params: { type: type, status: status }, // Pass the search term as a query parameter
  //     });
  //     setAccounts(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchType();
  // }, [type, status]); // reflect changes

  //Logic of Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    "ID",
    "Username",
    "Name",
    "Email",
    "Type",
    "Date Created",
    "Status",
  ];
  const accountData = currentAccounts.map((account) => [
    account.userID,
    account.username,
    `${account.userFirstname} ${account.userLastname}`,
    account.userEmail,
    account.accountType,
    new Date(account.dateCreated).toLocaleDateString(),
    account.accountStatus,
  ]);
  console.log(searchTerm);

  //list need to be in a column
  //need filter
  return (
    <div>
      <NavBar
        page1="HOME"
        home={`/admin-home/${userID}`}
        // {`admin-home/${userID}`}
        page2="ACCOUNT LIST"
        commissionList={`/accounts/${userID}`}
        page3="COMMISSION LIST"
        applicants={`/commission-list/${userID}`}
        page4="MAP"
        map={`/map/${userID}`}
      />

      <h1
        className="header"
        style={{
          paddingLeft: "20px",
          justifyContent: "center",
          fontFamily:
            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        }}
      >
        Account List
      </h1>
      <div
        className="search"
        style={{
          paddingLeft: "20px",
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
            marginRight: "10px",
            marginBottom: "10px",
          }}
        />
        <select
          className="ALtype"
          name="type"
          onChange={handleChange}
          value={searchTerm.type}
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
          <option value="Employer">Employer</option>
          <option value="Catcher">Catcher</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="ALstatus"
          name="status"
          onChange={handleChange}
          value={searchTerm.status}
          id=""
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
          <option value="">Status</option>
          <option value="Verified">Verified</option>
          <option value="Unverified">Unverified</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <div className="accounts">
        {/*table*/}
        <Table headers={headers} data={accountData} />

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={accounts.length}
          paginate={paginate}
        />
      </div>
      <Link to="/add" style={{ textDecoration: "none" }}>
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
          Add account
        </button>
      </Link>
    </div>
  );
};

export default AccountList;
