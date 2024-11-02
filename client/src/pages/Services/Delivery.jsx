import React, { useEffect, useState } from "react";
import "../Services/Delivery.css";
import CatCards from "../../components/Cards/CatCards";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Search from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CatCardsNew from "../../components/Cards/CatCardsNew";

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
      <div class="row bg-primary">
        <div class="col d-flex justify-content-center">
          <h1 style={{ position: "relative", color: "white" }}>
            <LocalShippingIcon
              sx={{
                color: "skyblue",
                // position: "absolute",
                marginRight: "7px",
                left: "15px",
                fontSize: 28,
              }}
            />
            Delivery
          </h1>
        </div>
      </div>

      <div class="row ">
        <div className="search-barborder">
          {/* <div class="col">
            <h1 className="headingTranspo">Transportation</h1>
          </div> */}

          <div className="box">
            <div class="col d-flex justify-content-start">
              <Search
                sx={{
                  position: "absolute",
                  color: "grey",
                  margin: "11px",
                }}
              />
              <input
                style={{ paddingLeft: "32px" }}
                className="inputSearch"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div class="col">
              <LocationOnIcon
                sx={{
                  position: "absolute",
                  color: "grey",
                  margin: "8px",
                }}
              />

              <select
                style={{ paddingLeft: "32px" }}
                className="selected"
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
            </div>

            <div class="col">
              <div className="Paylabel">
                <label htmlFor="">
                  Payment Range:
                  <input
                    className="inputNum"
                    type="number"
                    placeholder="Minimum"
                    name="minPay"
                    onChange={handleChange}
                    value={filter.minPay}
                  />
                  <SyncAltIcon
                    sx={{
                      color: "#fff",
                      fontSize: 24,
                    }}
                  />
                  <input
                    className="inputNum"
                    type="number"
                    placeholder="Maximum"
                    name="maxPay"
                    onChange={handleChange}
                    value={filter.maxPay}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <CatCards commissions={filteredCommissions} /> */}
      <CatCardsNew commissions={filteredCommissions} />
    </>
  );
};

export default Delivery;
