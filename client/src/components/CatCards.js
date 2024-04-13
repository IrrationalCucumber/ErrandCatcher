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

function CatCards(props) {
  return (
    <div className="cards">
      {/* <h1>Check out this epic Destination!</h1> */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <div className="cards__items">
            {/* {commissions.map((commission) => ( */}

            <CardItem
              key={props.id}
              src="/images/hr.png"
              text={props.title}
              label={props.type}
              location={props.location}
              path={props.path}
              //`/view-errand/${userID}/${commission.commissionID}`
            />
            {/* ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatCards;
