import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardItem from "./CardItem";
import axios from "axios";
import "./Cards.css";

function CatCards() {
  const [commissions, setCommissions] = useState([]);
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
        setCommissions(res.data);
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
                label={commission.commissionType}
                location={commission.commissionLocation}
                path={`/view-errand/${userID}/${commission.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatCards;
