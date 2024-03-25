import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardItem from "./CardItem";
import axios from "axios";
import "./Cards.css";

function Cards() {
  //Simulated commission data
  // const commissions = [
  //   {
  //     commissionID: 1,
  //     commissionTitle: 'Commission 1',
  //     commissionType: 'Type A',
  //   },
  //   {
  //     commissionID: 2,
  //     commissionTitle: 'Commission 2',
  //     commissionType: 'Type B',
  //   },
  //   {
  //     commissionID: 3,
  //     commissionTitle: 'Commission 3',
  //     commissionType: 'Type C',
  //   },
  //   {
  //     commissionID: 4,
  //     commissionTitle: 'Commission 3',
  //     commissionLocation: 'basak',
  //     commissionType: 'Home Service',
  //   },
  // ];

  // const userID = 123; // Example userID

  const [commissions, setCommissions] = useState([]);

  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get("http://localhost:8800/recent-commission");
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
              <CardItem
                key={commission.commissionID}
                src="images/hr.png"
                text={commission.commissionTitle}
                label={commission.commissionType}
                path={`/view-errand/${userID}/${commission.commissionID}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
