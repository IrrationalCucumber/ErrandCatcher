import React, { useEffect, useState } from "react";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const HomeServices = () => {
  const [term, setTerm] = useState("");
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
    if (term == "") {
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
    }
    //add 'term' as dependencies
    // to trigger if its empty
  }, [type, term]);
  //display errands based on term
  //if search is clicked
  const handleSearch = () => {
    const fetchSearch = async () => {
      const res = await axios.get(`http://localhost:8800/search/${type}`, {
        params: { term: term },
      });
      setCommissions(res.data);
    };
    fetchSearch();
    setMessage(`You have searched for ${term}`);
  };
  return (
    <>
      <Navbar />
      <h1 style={{ paddingTop: "20px", paddingLeft: "20px" }}>Home Services</h1>
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
          name="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
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

export default HomeServices;
