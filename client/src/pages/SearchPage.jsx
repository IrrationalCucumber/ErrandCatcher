import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../components/Cards/CatCards";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../components/AuthContext";

function SearchPage() {
  const [commissions, setCommissions] = useState([]);
  // const navigate = useNavigate();
  //  const { user } = useAuth();
  const location = useLocation();
  const term = location.pathname.split("/")[2];
  const [message, setMessage] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  //filter varibales
  const [filter, setFilter] = useState({
    type: "",
    status: "",
    date: "",
    minPay: "",
    maxPay: "",
    location: "",
  });
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

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter((commission) => {
    const type = commission.commissionType
      .toLowerCase()
      .includes(filter.type.toLowerCase());
    const titleMatches = commission.commissionTitle
      .toLowerCase()
      .includes(term.toLowerCase());
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

    return titleMatches && locationMatches && priceMatches && type;
  });
  //handle filter values changes
  const handleChange = (e) => {
    if (e.target.name === "location") {
      setFilter((prev) => ({ ...prev, location: e.target.value }));
    } else if (e.target.name === "type") {
      setFilter((prev) => ({ ...prev, type: e.target.value }));
    } else {
      setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <Navbar />
      {message}
      {/* FILTERS */}
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={(e) => {
            navigate(`/search/${userID}/${searchQuery}`);
          }}
        >
          Search
        </button>
      </div> */}
      <select name="type" id="type" value={filter.type} onChange={handleChange}>
        <option value="">Choose Location....</option>
        <option value="HomeService">Home Service</option>
        <option value="Delivery">Delivery</option>
        <option value="Transportation">Transportation</option>
      </select>
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
      <Cards commissions={filteredCommissions} />
    </>
  );
}

export default SearchPage;
