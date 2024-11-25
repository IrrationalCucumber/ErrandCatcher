import React, { useEffect, useState } from "react";
//import Cards from '../../components/Cards';
import OngoingCards from "./OngoingCards";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import "./ongoing.css";
import { BannerOngoingSection } from "../../components/Banner/HeroSection";
import OngoingCardsNew from "./OngoingCardsNew";
import "../../components/Cards/cardsNew.css";

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
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });

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

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "status") {
      setSearchTerm((prev) => ({ ...prev, status: e.target.value }));
    } else if (e.target.name === "type") {
      setSearchTerm((prev) => ({ ...prev, type: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setSearchTerm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  //filter
  // const filterErrands = commissions.filter((commission) => {
  //   const type = commission.commissionType
  //     ?.toLowerCase()
  //     .includes(searchTerm.type.toLowerCase() ?? "");
  //   const termMatch = commission.commissionTitle
  //     ?.toLowerCase()
  //     .includes(searchTerm.term.toLowerCase() ?? "");
  //   const termMatch2 = commission.userFirstname
  //     ?.toLowerCase()
  //     .includes(searchTerm.term.toLowerCase() ?? "");
  //   const termMatch3 = commission.userLastname
  //     ?.toLowerCase()
  //     .includes(searchTerm.term.toLowerCase() ?? "");

  //   // const status = commission.errandStatus.includes(searchTerm.status);
  //   const status = commission.errandStatus === searchTerm.status; // Compare directly instead of using includes

  //   return type && (termMatch || termMatch2 || termMatch3) && status;
  // });

  // filter fix 
  const filterErrands = commissions.filter((commission) => {
    const type = searchTerm.type
      ? commission.commissionType?.toLowerCase() === searchTerm.type.toLowerCase()
      : true;

    const termMatch =
      searchTerm.term &&
      [commission.commissionTitle, commission.userFirstname, commission.userLastname]
        .map((field) => field?.toLowerCase() ?? "")
        .some((field) => field.includes(searchTerm.term.toLowerCase()));

    const status = searchTerm.status
      ? commission.errandStatus === searchTerm.status
      : true;

    return type && (!searchTerm.term || termMatch) && status;
  });

  return (
    <div className="concards">
      {/* No user ID */}
      <BannerOngoingSection username={user.username} />

      <div
        className="searchOngoing"
      // style={{
      //   marginTop: "10px",
      //   marginBottom: "10px",
      //   display: "flex",
      //   alignItems: "center",
      //   width: "50%",
      //   marginLeft: "50px"
      // }}
      >
        <input
          className="inputSearchAdmin"
          type="text"
          name="term"
          placeholder="Search..."
          value={searchTerm.term}
          onChange={handleChange}
        // style={{
        //   padding: "8px",
        //   fontSize: "12px",
        //   border: "1px solid #ccc",
        //   borderRadius: "4px",
        //   margin: "10px 0px 10px 0px",
        // }}
        />
        {/* <button
            type="submit"
            //onClick={fetchSearchResults}
            style={{
              padding: "8px",
              fontSize: "12px",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#CE9251",
              color: "white",
              borderRadius: "4px",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            
          </button> */}

        <div
          className="filter__admin__accountList"
          style={{ display: "flex", alignItems: "center", width: "60%" }}
        >
          <select
            className="CLstatus"
            name="status"
            onChange={handleChange}
            value={searchTerm.status}
          // style={{
          //   padding: "8px",
          //   fontSize: "12px",
          //   border: "1px solid #ccc",
          //   borderRadius: "4px",
          //   margin: "10px 20px",
          // }}
          >
            <option value="">Status</option>
            <option value="Taken">Pending</option>
            <option value="Complete">Complete</option>
            <option value="Cancelled">Cancel</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Complete Paid">Complete Paid</option>
          </select>
          <select
            className="CLtype"
            onChange={handleChange}
            value={searchTerm.type}
            name="type"
          // style={{
          //   padding: "8px 10px 8px 10px",
          //   fontSize: "12px",
          //   border: "1px solid #ccc",
          //   borderRadius: "4px",
          //   margin: "10px",
          // }}
          >
            <option value="">Type</option>
            <option value="HomeService - Indoor">HomeService Indoor</option>
            <option value="HomeService - Outdoor">HomeService Outdoor</option>
            <option value="Transportation">Transportation</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
      </div>
      {/* <OngoingCards commissions={filterErrands} to={`/view-errand/${userID}`} /> */}

      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {filterErrands.map((commission) => (
              <OngoingCardsNew
                key={commission.commissionID}
                icon={commission.commissionType}
                title={commission.commissionTitle}
                type={commission.commissionType}
                location={commission.commissionLocation}
                desc={commission.commissionDesc}
                pay={commission.commissionPay}
                status={commission.errandStatus}
                path={`/errand/view/${commission.commissionID}`}
                // Employer side
                userFname={commission.userFirstname}
                userLname={commission.userLastname}
                // handle payment
                // pay={commission.commissionPay}
                // type={commission.commissionType}
                // userFname={commission.userFirstname}
                // userLname={commission.userLastname}
                transID={commission.transactID}
                // title={commission.commissionTitle}
                comID={commission.commissionID}
                transCatID={commission.transCatcherID}
                // Catcher side
                // marked complete and cancel
                // transID={commission.transactID}
                empID={commission.employerID}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ongoing;
