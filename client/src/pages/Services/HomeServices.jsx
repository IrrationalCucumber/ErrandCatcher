import React, { useState } from "react";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";

const HomeServices = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
      <Cards />
      <div></div>
    </>
  );
};

export default HomeServices;
