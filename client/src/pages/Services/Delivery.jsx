import React, { useEffect, useState } from "react";
import CatCards from "../../components/CatCards";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Delivery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [commissions, setCommissions] = useState([]);
  const [filter, setFilter] = useState({
    term: "",
    status: "",
    date: "",
    minPay: "",
    maxPay: "",
    location: "",
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/type/Delivery`);
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter((commission) => {
    const titleMatches = commission.commissionTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const locationMatches = commission.commissionLocation
      .toLowerCase()
      .includes(filter.location.toLowerCase());
    //if price range has been entered
    let priceMatches = true;
    if (filter.minPay !== "" && filter.maxPay !== "") {
      priceMatches =
        commission.commissionPay >= filter.minPay &&
        commission.commissionPay <= filter.maxPay;
    }

    return titleMatches && locationMatches && priceMatches;
  });

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setFilter((prev) => ({ ...prev, location: e.target.value }));
    } else {
      setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
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
        <option value="">Choose Location....</option>
        <option value="Cebu">Cebu</option>
        <option value="Cordova">Cordova</option>
        <option value="Mandaue">Mandaue</option>
        <option value="Lapu-Lapu">Lapu-Lapu</option>
        <option value="Talisay">Talisay</option>
      </select>
      <label htmlFor="">
        Payment range
        <input
          type="number"
          placeholder="Starting range..."
          name="minPay"
          onChange={handleChange}
          value={filter.minPay}
        />
        <input
          type="number"
          placeholder="Maximum range..."
          name="maxPay"
          onChange={handleChange}
          value={filter.maxPay}
        />
      </label>
      <CatCards commissions={filteredCommissions} />
    </>
  );
};

export default Delivery;
