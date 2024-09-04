import React, { useEffect, useState } from "react";
//import Cards from '../../components/Cards';
import OngoingCards from "./OngoingCards";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import "./ongoing.css"
//import mockCommissions from "./mockdata";

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

  //const useMockData = true; 

  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/employer/ongoing/${userID}`
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

  // mockdata for design only
  // useEffect(() => {
  //   if (useMockData) {
  //     // Use mock data
  //     setCommissions(mockCommissions);
  //   } else {
  //     // Fetch real data
  //     const fetchAllCommission = async () => {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:8800/employer/ongoing/${userID}`
  //         );
  //         setCommissions(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchAllCommission();
  //   }
  // }, [userID, useMockData]);

  return (
    <div className="concards">
      {/* No user ID */}
      <h1 className="header text-left mb-4" style={{fontSize:"24px", paddingLeft:"20px"}}>Your Ongoing errands</h1>
      
      <OngoingCards commissions={commissions} to={`/view-errand/${userID}`} />
    </div>
  );
}

export default Ongoing;
