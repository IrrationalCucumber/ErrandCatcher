import React, { useState } from "react";
import Cards from "../../components/CatCards";
import Navbar from "../../components/Navbar";

const Delivery = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <Navbar />
      <h1 style={{paddingTop:"20px"}}>Delivery</h1>
      <div className="search-bar" style={{display: "flex", justifyContent:"center", alignItems:"center", margin: "44px 5%"}}>
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

export default Delivery;
