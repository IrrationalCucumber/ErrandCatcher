import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Modals from "../../components/Modals";

function OngoingCards({ commissions, to }) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCommissionId, setSelectedCommissionId] = useState(null);
  const { user } = useAuth();

  const [feedback, setFeedback] = useState({
    catcherID: "",
    commissionID: "",
    feedbackComment: "",
    feedbackCount: 0,
    feebackDate: "",
    employerID: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState({ feedbacks: "" });

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setFeedback({ ...feedback, feedbackCount: value });
    setFeedback({ ...feedback, feedbackComment: value });
    //setInputValue(e.target.value);
  };

  const handleStarClick = (rating) => {
    // Update feedbackCount based on the star rating clicked
    setFeedback({ ...feedback, feedbackCount: rating });
  };

  const handleSubmit = async (e) => {
    // setIsClicked(true);
    // Add any other logic you want to perform when the button is clicked
    e.preventDefault();
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      feedback.feebackDate = getCurrentDate();
      //feedback.employerID = commission.

      //feedback.commissionID = fetchLoc().commissionID;
      const response = await axios.post("http://localhost:8800/rate", feedback);
      setSuccessMsg(response.data);
    } catch (err) {
      console.log(err);
    }

    console.log("Submitted value:", inputValue);
    handleCloseModal();
  };

  const markAsCompleted = (commissionId) => {
    // Perform the logic to mark the commission as completed
    console.log(`Commission ${commissionId} marked as completed`);
  };

  const cancel = (commissionId) => {
    // Perform the logic to cancel the commission
    console.log(`Commission ${commissionId} cancelled`);
  };

  const handlePayment = (pay, type, fname, lname, id, comTitle) => {
    const paymentUrl = "http://localhost:8800/process-payment";
    // Change the amount
    const amount = pay;
    const errType = type;
    const name = fname + " " + lname;
    const errand = id + " " + comTitle;

    axios
      .post(paymentUrl, {
        pay: amount,
        type: errType,
        name: name,
        errand: errand,
        id: id,
      })
      .then((response) => {
        window.open(response.data.url);
      });
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
                  <p>Payment: {commission.commissionPay}</p>
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
                        onClick={handleOpenModal}
                        style={{
                          backgroundColor: "#1679AB",
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
                          // ":hover": {
                          //   backgroundColor: isClicked ? "#fa9d6e" : "#ffbb33",
                          // },
                        }}
                      >
                        Feedback
                      </button>

                      {/* modal trigger if clicked */}
                      <Modals isOpen={isModalOpen} onClose={handleCloseModal}>
                        <h4>Rate Catcher:</h4>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            style={{
                              cursor: "pointer",
                              fontSize: "24px",
                              color:
                                value <= feedback.feedbackCount
                                  ? "gold"
                                  : "gray",
                            }}
                            onClick={() => handleStarClick(value)}
                          >
                            ★
                          </span>
                        ))}
                        <h4>Feedback:</h4>
                        <input
                          type="text"
                          value={inputValue.feedbackComment}
                          onChange={handleInputChange}
                          placeholder="Enter your comment here...."
                          style={{
                            marginBottom: "10px",
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                          }}
                        />

                        <div style={styles.buttonContainer}>
                          <button style={styles.button} onClick={handleSubmit}>
                            Post
                          </button>
                          <button
                            style={styles.button}
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                        </div>
                      </Modals>

                      <button
                        style={{
                          backgroundColor: "grey",
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
                        }}
                        onClick={() => {
                          handlePayment(
                            commission.commissionPay,
                            commission.commissionType,
                            commission.userFirstname,
                            commission.userLastname,
                            commission.transactID,
                            commission.commissionTitle
                          );
                        }}
                      >
                        Payment
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

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    textAlign: "center",
    backgroundColor: "#1679AB",
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
};

// background-color: "#1679AB",
//     color: "white",
//     font-weight: "bold",
//     cursor: pointer;
//     border-radius: 10px;

export default OngoingCards;
