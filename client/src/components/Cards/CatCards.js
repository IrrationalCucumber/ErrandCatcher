/**
 * 13/4/24
 * CatCards is now a props
 * Called in Services pages to be used
 * Can display based on serhes
 */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardItem from "./CardItem";
import axios from "axios";
import "./Cards.css";

function CatCards({ commissions }) {
  const [commissionslist, setCommissionslist] = useState([]);
  const location = useLocation();
  //pathname to array from
  //get the id
  const userID = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[3];
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/type/${type}`);
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissionslist(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, [type]);
  return (
    <div className="cards">
      {/* <h1>Check out this epic Destination!</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {commissions.map((commission) => (
              <CardItem
                key={commission.commissionID}
                src="/images/hr.png"
                text={commission.commissionTitle}
                pay={commission.commissionPay}
                label={commission.commissionType}
                location={commission.commissionLocation}
                path={`/errand/view-errand/${commission.commissionID}`}
                //`/view-errand/${userID}/${commission.commissionID}`
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatCards;
