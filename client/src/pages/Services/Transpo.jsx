import React, { useState } from "react";
import { Link } from "react-router-dom";
//import Footer from '../components/Footer';
import axios from "axios";
import "../Services/Transpo.css";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";

const Transportation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar />
      <h1>Transportation</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button>Search</button>
      </div>
      <Cards />
      <div></div>
    </>
  );
};

export default Transportation;
