import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Modals from "../../components/Modals";
import 'bootstrap/dist/css/bootstrap.min.css';


function OngoingCards({ commissions, to }) {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCommissionId, setSelectedCommissionId] = useState(null);
  const { user } = useAuth();
  const userID = user.userID;

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
    const paymentUrl = `http://localhost:8800/process-payment/${userID}`;
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
        employerID: userID,
      })
      .then((response) => {
        window.open(response.data.url);
      })
      .catch((error) => {
        console.error("There was an error processing the payment!", error);
      });
  };

  return (
    <div className="container">
    <div className="row">
      {commissions.map((commission) => (
        <div className="col-md-3 mb-3" key={commission.commissionID}>
          <div className="card" style={{ width: "18rem" }}>
            {/* <img
              src="/images/hr.png"
              className="card-img-top"
              alt="Commission"
            /> */}
            <div className="card-body">
              <h5 className="card-title font-weight-bold">
                {commission.commissionTitle}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {commission.commissionType}
              </h6>
              <p className="card-text">
                {commission.commissionLocation}
              </p>
              <p className="card-text mb-1">PAYMENT : ₱{commission.commissionPay}</p>

              {user.userType === "Employer" && (
                <>
                  {/* <p className="card-text">
                    CATCHER: {commission.transCatcherID}
                  </p> */}
                  <p className="card-text">
                    CATCHER : {commission.userFirstname}{" "}
                    {commission.userLastname}
                  </p>  
                  <Link
                    to={`${to}/${commission.commissionID}`}
                    className="card-link"
                  >
                    View Errand
                  </Link>
                </>
              )}
              {user.userType === "Catcher" && (
                <>
                  <button
                    onClick={() =>
                      markAsCompleted(commission.commissionID)
                    }
                    className="btn btn-success btn-block my-2"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => cancel(commission.commissionID)}
                    className="btn btn-danger btn-block my-2"
                  >
                    Cancel
                  </button>
                </>
              )}
              {user.userType === "Employer" && (
                <>
                  <button
                    onClick={handleOpenModal}
                    className="btn btn-primary btn-sm my-1"
                  >
                    Feedback
                  </button>
                  <Modals
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                  >
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
                    <textarea
                      type="text"
                      value={inputValue.feedbackComment}
                      onChange={handleInputChange}
                      placeholder="Enter your comment here...."
                      style={{
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px",
                        fontSize: "12px",
                      }}

                    />
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success mx-2"
                        onClick={handleSubmit}
                      >
                        Post
                      </button>
                      <button
                        className="btn btn-secondary mx-2"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </Modals>
                  <button
                    className="btn btn-secondary btn-block my-2"
                    onClick={() =>
                      handlePayment(
                        commission.commissionPay,
                        commission.commissionType,
                        commission.userFirstname,
                        commission.userLastname,
                        commission.transactID,
                        commission.commissionTitle
                      )
                    }
                  >
                    Payment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
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
