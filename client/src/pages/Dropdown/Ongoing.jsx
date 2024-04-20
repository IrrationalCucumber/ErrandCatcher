import React, { useEffect, useState } from "react";
//import Cards from '../../components/Cards';
import OngoingCards from "./OngoingCards";
import NavBar from "../../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Ongoing() {
  /**
   * ADD FUNCTION TO DETERMINE USER TYPE
   * DYNAMIC FOR EACH USER TYPE
   */
  const [commissions, setCommissions] = useState([]);
  //get user details
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/employer/ongoing/" + userID
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

  return (
    <div>
      {/* No user ID */}
      <NavBar
        page1="ONGOING"
        one={`/ongoing/${userID}`}
        page2="COMMISSIONS"
        commissionList={`/commissions/${userID}`}
        page3="APPLICANTS"
        applicants={`/applicants/${userID}`}
        map={`/e-map/${userID}`}
        page4="MAP"
      />

      <OngoingCards commissions={commissions} to={`/view-errand/${userID}`} />
    </div>
  );
}

export default Ongoing;
