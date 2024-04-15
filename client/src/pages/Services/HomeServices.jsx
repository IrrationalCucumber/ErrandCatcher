import React, { useState, useEffect } from "react";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";
import CatCards from "../../components/CatCards";
import axios from "axios";

const HomeServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [commissions, setCommissions] = useState([]);
  const [filter, setFilter] = useState({
    status: "",
    date: "",
    location: "",
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get("http://localhost:8800/type/Home");
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter(
    (commission) => (
      commission.commissionTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
      commission.commissionLocation.includes(filter.location)
    )
  );

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setFilter((prev) => ({ ...prev, location: e.target.value }));
    } else {
      setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <Navbar />
      <h1>Home Services</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button>Search</button>
      </div>
      <select
        name="location"
        id="location"
        value={filter.location}
        onChange={handleChange}
      >
        <option value=""></option>
        <option value="Mandaue">Mandaue</option>
        <option value="cordova">Cordova</option>
      </select>
      <CatCards commissions={filteredCommissions} />
      <div></div>
    </>
  );
};

export default HomeServices;
