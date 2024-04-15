import React, { useState, useEffect } from "react";
import "../Services/Transpo.css";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Transportation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //pathname to array from
  //get the id
  const [commissions, setCommissions] = useState([]);
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[3];
  const [message, setMessage] = useState("");

  //rretrieve data
  useEffect(() => {
    //add condition if search term is empty
    // revert to all errnds
    // if (term == "") {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/type/${type}`);
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
    setMessage("");
    // }
    //add 'term' as dependencies
    // to trigger if its empty
  }, [type]);
  //display errands based on term
  //if search is clicked
  const handleSearch = () => {
    const fetchSearch = async () => {
      const res = await axios.get(`http://localhost:8800/search/${type}`, {
        params: { term: searchQuery },
      });
      setCommissions(res.data);
    };
    fetchSearch();
    setMessage(`You have searched for ${searchQuery}`);
  };

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter((commission) =>
    commission.commissionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <h1 className="headingTranspo" style={{ paddingTop: "20px" }}>
        Transportation
      </h1>
      <div
        className="search-bar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "44px 5%",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <CatCards commissions={filteredCommissions} />
      {/* 
      SHOW A MESSAGE OF WHAT USER SEARCHED
        ADD DESIGN OR REMOVE THIS SEARCH MESSAGE
        */}
      {message}
      {commissions.map((commission) => (
        <Cards
          id={commission.commissionID}
          title={commission.commissionTitle}
          type={commission.commissionType}
          location={commission.commissionLocation}
          path={`/view-errand/${userID}/${commission.commissionID}`}
        />
      ))}
      <div></div>
    </>
  );
};

export default Transportation;
