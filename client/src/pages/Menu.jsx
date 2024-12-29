import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cards from "../components/Cards/Cards";
//  import NavBar from '../components/Navbar';
//import Footer from "../components/Footer";
import "./Menu.css";
//import CardItem from '../components/CardItem';
import { useAuth } from "../components/AuthContext";
import SearchBar from "../components/Search Bar/SearchBar";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoadingBackdrop from "../components/LoadingSpinner";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ModalFeedback from "../components/ModalFeedback";
import ErrorIcon from "@mui/icons-material/Error";

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // modal message pop-up
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger loading state
    if (searchQuery === "") {
      // alert("Please input your fields");
      handleOpen();
    } else {
      setLoading(true);
      // 3 seconds cd
      setTimeout(() => {
        setLoading(false); // Remove the loading spinner
        navigate(`/search/${searchQuery}`);
      }, 3000);
    }
  };

  return (
    <>
      <SearchBar
        hasErrand={user.hasErrand}
        user={user.userType}
        value={searchQuery}
        onClick={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ModalFeedback
        open={open}
        handleClose={handleClose}
        headerMes="Oppps!"
        contentMes="Please input your fields, please try again."
        color="error"
        colorText="error"
        icon={ErrorIcon}
      />

      <LoadingBackdrop
        open={loading}
        text={`Searching for Errand: "${searchQuery}" please wait a seconds...`}
        icons={<HourglassBottomIcon />}
      />

      {user.hasErrand === "false" || user.userType === "admin" || user.userType === "Catcher" ? (
        <section className="Menu" id="Menu">
          {/* bootstrap class applied */}
          <div className="box-container d-flex justify-content-center align-items-center">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div className="box">
                    <Link to={`/service/HomeService/${"HomeService"}`}>
                      <button style={{}}>
                        {/* <img src="/images/img6.png" alt="" /> */}
                        <OtherHousesIcon
                          sx={{ color: "#0073aa", fontSize: 100 }}
                        />
                        <div className="content">
                          <p style={{ paddingTop: "20px" }}>Home Service</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
                <div class="col">
                  <div className="box">
                    <Link to={`/service/Transpo/${"Transport"}`}>
                      <button style={{}}>
                        {/* <img src="/images/img4.png" alt="" /> */}
                        <DirectionsCarIcon
                          sx={{ color: "#0073aa", fontSize: 100 }}
                        />
                        <div className="content">
                          <p style={{ paddingTop: "20px" }}>Transportation</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
                <div class="col">
                  <div className="box">
                    <Link to={`/service/Delivery/${"Delivery"}`}>
                      <button style={{}}>
                        {/* <img src="/images/img5.png" alt="" /> */}
                        <LocalShippingIcon
                          sx={{ color: "#0073aa", fontSize: 100 }}
                        />
                        <div className="content">
                          <p style={{ paddingTop: "20px" }}>Delivery</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
export default Menu;
