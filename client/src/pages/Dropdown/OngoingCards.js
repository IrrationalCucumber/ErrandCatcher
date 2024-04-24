import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

function OngoingCards({ commissions, to }) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCommissionId, setSelectedCommissionId] = useState(null);
  const { user } = useAuth();

  const handleButtonClick = (e) => {
    setIsClicked(true);
    // Add any other logic you want to perform when the button is clicked
  };

  const markAsCompleted = (commissionId) => {
    // Perform the logic to mark the commission as completed
    console.log(`Commission ${commissionId} marked as completed`);
  };

  const cancel = (commissionId) => {
    // Perform the logic to cancel the commission
    console.log(`Commission ${commissionId} cancelled`);
  };

  return (
    <div className="Oncards">
      <div className="Oncards__container">
        <div className="Oncards__wrapper">
          <div className="Oncards__items">
            {commissions.map((commission) => (
              <div className="Oncard" key={commission.id}>
                <img
                  src="/images/hr.png"
                  alt="Commission"
                  className="Oncard__img"
                />
                <div className="Oncard__info">
                  <h1
                    className="title"
                    style={{ fontSize: "16px", paddingTop: "10px" }}
                  >
                    {commission.commissionTitle}
                  </h1>
                  <p className="type" style={{ paddingTop: "10px" }}>
                    Type: {commission.commissionType}
                  </p>
                  <p style={{ paddingTop: "10px" }}>
                    Location: {commission.commissionLocation}
                  </p>
                  <Link
                    to={`${to}/${commission.commissionID}`}
                    className="Oncard__link"
                  >
                    View Errand
                  </Link>
                  {user.userType === "Employer" && (
                    <>
                      <p>CATCHER: {commission.transCatcherID}</p>
                      <p>
                        {commission.userFirstname} {commission.userLastname}
                      </p>
                    </>
                  )}
                  {user.userType === "Catcher" && (
                    <>
                      <button
                        onClick={() => markAsCompleted(commission.commissionID)}
                        style={{
                          backgroundColor: "#cccccc",
                          color: "#ffffff",
                          padding: "10px 10px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "5px",
                          marginBottom: "10px",
                          transition: "background-color 0.3s",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "block",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#00cc00";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#cccccc";
                        }}
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => cancel(commission.commissionID)}
                        style={{
                          backgroundColor: "#cccccc",
                          color: "#ffffff",
                          padding: "10px 10px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "5px",
                          marginBottom: "10px",
                          transition: "background-color 0.3s",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "block",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#00cc00";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#cccccc";
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {user.userType === "Employer" && (
                    <>
                      <button
                        style={{
                          backgroundColor: isClicked ? "#fa9d6e" : "#facd46", // Change color when clicked
                          color: "#ffffff",
                          padding: "10px 10px",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginTop: "5px",
                          marginBottom: "10px",
                          transition: "background-color 0.3s",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "block",
                          width: "130px",
                          // Hover effects
                          ":hover": {
                            backgroundColor: isClicked ? "#fa9d6e" : "#ffbb33", // Change color on hover
                          },
                        }}
                        onClick={handleButtonClick}
                      >
                        Feedback
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          .Oncards {
            background-color: #fff;
          }

          .Oncards__container {
            display: flex;
            flex-wrap: wrap;
            margin: 5rem;
          }

          .Oncards__wrapper {
            display: relative;
            margin: 20px 0 25px 0;
            width: 100%;
          }

          .Oncards__items {
            display: flex;
            flex-wrap: wrap;
            gap: 10px; 
            justify-content: space-between;
            width: 100%;
          }

          .Oncard {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20px;
            // justify-content: flex-end;
            width: calc(25% - 20px); /* Adjust the width to fit 4 cards per row */
            height: 400px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: none;
            transition: transform 0.3s ease;
            border: groove;
          }

          .Oncard__img {
            width: 200px;
            height: 200px;

          }

          .Oncard__info {
            font-size: 12px;
            text-align: center;
          }

          .Oncard__link {
            color: #252e48;
            font-size: 12px;
            font-weight: 600;
            line-height: 24px;
            text-align: center;
            margin-left: 5px;
            padding-bottom: 10px;
          }

          .Oncard__link:hover {
            transform: scale(1.1);
          }

          .Oncard__info h5, .card__info p {
            margin: 5px;
          }
        `}
      </style>
    </div>
  );
}

export default OngoingCards;
