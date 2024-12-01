/**
 * RECENT AVAILABLE ERRANDS
 * Display cards of Available Errends recently posted
 * Upto 10 errands
 * WRITTEN BY: ADREAN
 * 12/1/2024
 */

import React, { useEffect, useState } from "react";
import CardItemNew from "./CardsItemNew";
import axios from "axios";
import "./cardsNew.css";

function CardsRecentErrands() {
  const [recentErrands, setRecentErrands] = useState([]);
  //get recently posted available errands
  useEffect(() => {
    const fetchErrands = async () => {
      try {
        const res = await axios.get("http://localhost:8800/recent");
        setRecentErrands(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchErrands();
  }, []);
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {recentErrands.map((errand) => (
              <CardItemNew
                key={errand.commissionID}
                icon={errand.commissionType}
                title={errand.commissionTitle}
                type={errand.commissionType}
                location={errand.commissionLocation}
                desc={errand.commissionDesc}
                price={errand.commissionPay}
                path={`/errand/view/${errand.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsRecentErrands;
