/**
 * WRITTEN BY: META AI FT MONDE
 * 10/31/24
 * Component display preview Cards
 */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardItemNew from "./CardsItemNew";
import axios from "axios";
import "./cardsNew.css";

function CardsNew() {
  const [commissions, setCommissions] = useState([]);

  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get("http://localhost:8800/available");
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);
  const location = useLocation();
  //pathname to array from
  //get the id
  const userID = location.pathname.split("/")[2];

  return (
    <div className="cards">
      {/* <h1>Check out this epic Destination!</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {commissions.map((commission) => (
              <CardItemNew
                key={commission.commissionID}
                icon={commission.commissionType}
                title={commission.commissionTitle}
                type={commission.commissionType}
                location={commission.commissionLocation}
                desc={commission.commissionDesc}
                price={commission.commissionPay}
                path={`/errand/view/${commission.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsNew;
