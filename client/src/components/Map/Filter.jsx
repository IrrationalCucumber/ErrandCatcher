import { Input } from "@mui/material";
import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter); // Pass the selected filter value to the parent component
  };

  return (
    <div>
      <header>
        {/* <Input placeholder="Enter title here.." name="term" /> */}
        <select name="type" onChange={handleChange} value={filter}>
          <option value="">TYPE</option>
          <option value="HomeService">Home Service</option>
          <option value="Delivery">Delivery</option>
          <option value="Transportation">Transportations</option>
        </select>
        {/* <button onClick={SetFilters}>SEARCH</button> */}
      </header>
    </div>
  );
}

export default Filter;
