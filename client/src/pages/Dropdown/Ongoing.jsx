import React, { useEffect, useState } from "react";
//import Cards from '../../components/Cards';
import OngoingCards from "./OngoingCards";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import "./ongoing.css";
import { BannerOngoingSection } from "../../components/Banner/HeroSection";

function Ongoing() {
  /**
   * ADD FUNCTION TO DETERMINE USER TYPE
   * DYNAMIC FOR EACH USER TYPE
   */
  const [commissions, setCommissions] = useState([]);
  //get user details
  const { user } = useAuth();
  const location = useLocation();
  const userID = user.userID;
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/pending-errands/${userID}`
        );
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);
  /**
   * FILTER FUNCTION
   */
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  //filter
  const filterErrands = commissions.filter((commission) => {
    const type = commission.commissionType
      .toLowerCase()
      .includes(searchTerm.type.toLowerCase());
    const termMatch = commission.commissionTitle
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const status = commission.commissionStatus.includes(searchTerm.status);

    return type && termMatch && status;
  });
  const handleChange = (e) => {
    // For other fields, use spread syntax as before
    setSearchTerm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="concards">
      {/* No user ID */}
      <BannerOngoingSection username={user.username} />
      <div className="search-filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm.term}
            name="term"
            onChange={handleChange}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="filter">
          <select
            onChange={handleChange}
            name="status"
            value={searchTerm.status}
          >
            <option value="">All Status</option>
            <option value="Taken">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>
      </div>
      <OngoingCards commissions={filterErrands} to={`/view-errand/${userID}`} />
    </div>
  );
}

export default Ongoing;
