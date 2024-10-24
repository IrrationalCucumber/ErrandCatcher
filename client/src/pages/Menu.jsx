import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cards from "../components/Cards/Cards";
//  import NavBar from '../components/Navbar';
//import Footer from "../components/Footer";
import "./Menu.css";
//import CardItem from '../components/CardItem';
import { useAuth } from "../components/AuthContext";
import SearchBar from "../components/Search Bar/SearchBar";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoadingBackdrop from "../components/LoadingSpinner";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Trigger loading state
    if (searchQuery === "") {
      alert("Please input your fields");
    }
    else {
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
        value={searchQuery}
        onClick={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <LoadingBackdrop
        open={loading}
        text="Loading... Please wait"
        icons={<HourglassBottomIcon/>}
      />

      {/* <div className="search-bar">
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={(e) => {
            navigate(`/search/${searchQuery}`);
          }}
          style={{ backgroundColor: "#1679AB" }}
        >
          Search
        </button> 
      </div> */}
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
                      <OtherHousesIcon sx={{ color: '#0073aa', fontSize: 100 }} />
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
                      <DirectionsCarIcon sx={{ color: '#0073aa', fontSize: 100 }} />
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
                      <LocalShippingIcon sx={{ color: '#0073aa', fontSize: 100 }} />
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

      {/* <section className="Menu1" id="Menu1">
                <div className="box-container">
                <div className="box">
                <img src="/images/img1.png" alt="" />
                <div className="content">
                <p>Transportation</p>
                <h3>
                <i className="fas fa-map-marker-alt"></i> Cebu City{' '}
                </h3>
                                </div>
                       </div>
                    <div className="box">
                        <img src="/images/img2.png" alt="" />
                        <div className="content">
                            <p>Delivery</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i> Lapu-Lapu City{' '}
                            </h3>
                        </div>
                    </div>
                
                    <div className="box">
                        <img src="/images/img3.png" alt="" />
                        <div className="content">
                            <p>Home Service</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i> Mandaue City{' '}
                            </h3>
                        </div>
                        
                    </div>
                    <div className="box">
                        <img src="/images/img1.png" alt="" />
                        <div className="content">
                            <p>Transportation</p>
                            <h3>
                                <i className="fas fa-map-marker-alt"></i>  Consolacion{' '}
                            </h3>
                        </div>
                        
                    </div>

                </div>
            </section> */}
      {
        user.userType.toLocaleUpperCase() === "catcher" && (
          <>
            <Cards />
          </>
        )
      }
    </>
  );
};
export default Menu;
