import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/CatCards";
import axios from "axios";
import Navbar from "../components/Navbar";

function SearchPage() {
  const [commissions, setCommissions] = useState([]);
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  const term = location.pathname.split("/")[3];
  const [message, setMessage] = useState("");
  //  rretrieve data
  useEffect(() => {
    //add condition if search term is empty
    // revert to all errnds
    //if (term == "") {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/search-available`, {
          params: { term: term },
        });
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
    setMessage("You have search for " + term);
    // }
    //add 'term' as dependencies
    // to trigger if its empty
  }, [term]);
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default SearchPage;
