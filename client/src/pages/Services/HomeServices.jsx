import React, { useEffect, useState } from "react";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
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
  return (
    <>
      <Navbar />
      <h1 style={{ paddingTop: "20px" }}>Home Services</h1>
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
