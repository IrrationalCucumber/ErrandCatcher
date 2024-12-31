import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CatCards from "../../components/Cards/CatCards";
import axios from "axios";
import Search from "@mui/icons-material/Search";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HomeWork from "@mui/icons-material/HomeWork";
import CatCardsNew from "../../components/Cards/CatCardsNew";
import { Slider, Box, Typography, TextField } from "@mui/material";
import "./HomeServices.css";

const HomeServices = () => {
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

  const handleSliderChange = (event, newValue) => {
    setFilter((prev) => ({
      ...prev,
      minPay: newValue[0],
      maxPay: newValue[1],
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/type/HomeService`);
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

  // Search commmissions using JS filter method //
  const filteredCommissions = commissions.filter((commission) => {
    //   commission.commissionTitle
    //     .toLowerCase()
    //     .includes(searchQuery.toLowerCase()) &&
    //   commission.commissionLocation
    //     .toLowerCase()
    //     .includes(filter.location.toLowerCase()) &&
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
            <HomeWork
              sx={{
                color: "skyblue",
                // position: "absolute",
                marginRight: "7px",
                left: "15px",
                fontSize: 28,
              }}
            />
            Home Service
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
                <div style={{ textAlign: "center" }} >
                  <Typography color="#f5f5f5" variant="h6"
                    sx={{
                      fontSize: 18,
                      fontWeight: 460,
                      letterSpacing: "1.2px",
                      // fontStyle: "italic"
                    }}
                  >
                    Payment Range:
                  </Typography>

                  <Slider className="sliderpay"
                    value={[
                      Number(filter.minPay),
                      Number(filter.maxPay)
                    ]}
                    onChange={handleSliderChange}
                    // valueLabelDisplay="on"
                    min={500}
                    max={filter.maxPay}
                    // step={100}
                    sx={{
                      marginTop: 2,
                      color: "white",
                    }}
                  />
                </div>
                <label htmlFor="">
                  {/* <Typography variant="h7">Payment Range:</Typography> */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <input
                      style={{
                        padding: "4px 2px",
                      }}
                      className="inputNum"
                      type="number"
                      placeholder="Minimum"
                      name="minPay"
                      onChange={handleChange}
                      value={filter.minPay}
                    />
                    <SyncAltIcon sx={{ color: "#fff", fontSize: 24 }} />
                    <input
                      style={{
                        // border: "solid",
                        padding: "4px 2px",
                      }}
                      className="inputNum"
                      type="number"
                      placeholder="Maximum"
                      name="maxPay"
                      onChange={handleChange}
                      value={filter.maxPay}
                    />
                  </Box>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <CatCards commissions={filteredCommissions} /> */}
      {/* <CatCardsNew commissions={filteredCommissions} /> */}

      {filteredCommissions && filteredCommissions.length > 0 ? (
        <>
          <CatCardsNew commissions={filteredCommissions} />
        </>
      ) : (
        <>
          <div
            style={{
              height: "50vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <h1 style={{ fontWeight: "600" }}>
              Opps!
            </h1>
            <h2 style={{ textAlign: "center" }} >
              No errand found
              <span style={{
                fontStyle: "italic",
                fontWeight: "600",
                // color: "#378ce7",
              }}> "Home Service"</span> as of now..
            </h2>
          </div>
        </>
      )}

    </>
  );
};

export default HomeServices;


{/* <Box >
                <Typography variant="h6" gutterBottom>
                  Payment Range:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    label="Minimum"
                    type="number"
                    name="minPay"
                    value={filter.minPay}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: 120 }}
                  />
                  <SyncAltIcon sx={{ color: "#4caf50", fontSize: 24 }} />
                  <TextField
                    label="Maximum"
                    type="number"
                    name="maxPay"
                    value={filter.maxPay}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: 120 }}
                  />
                </Box>
                <Slider
                  value={[
                    Number(filter.minPay) || 0,
                    Number(filter.maxPay) || 1000, // Default max value
                  ]}
                  onChange={handleSliderChange}
                  // valueLabelDisplay="on"
                  min={0}
                  max={5000} // Adjust range as needed
                  step={100}
                  sx={{ marginTop: 3, color: "#4caf50" }}
                />
              </Box> */}