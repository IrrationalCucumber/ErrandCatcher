import React from "react";
import "./css/style.css";

function SearchBar(props) {
  return (
    <div className="search__bar__container">
      <h1>Search what errands you want</h1>
      <div className="search__bar">
        <input
          type="text"
          placeholder="Search..."
          value={props.value}
          onChange={props.onChange}
        />
        <button onClick={props.onClick} style={{ backgroundColor: "#1679AB" }}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;