import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardItem from "./CardItem";
import axios from "axios";
import "./Cards.css";

function Cards() {
  const [commissions, setCommissions] = useState([]);
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  console.log(apiURL);
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get(`${apiURL}/available`);
        //"https://errand-catcher-backend-git-f68eb5a02ca4.herokuapp.com/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, [apiURL]);
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
              <CardItem
                key={commission.commissionID}
                src="/images/hr.png"
                text={commission.commissionTitle}
                label={commission.commissionType}
                location={commission.commissionLocation}
                path={`/errand/view/${commission.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
