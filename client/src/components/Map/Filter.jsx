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
    <>
      {/* <Input placeholder="Enter title here.." name="term" /> */}

      <select
        className="map__filter__type"
        name="type"
        onChange={handleChange}
        value={filter}
      >
        <option value="">Errand Type</option>
        <option value="HomeService">Home Service</option>
        <option value="Delivery">Delivery</option>
        <option value="Transportation">Transportations</option>
      </select>
      {/* <button onClick={SetFilters}>SEARCH</button> */}
    </>
  );
}

export default Filter;
