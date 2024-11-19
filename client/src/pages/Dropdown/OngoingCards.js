import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";
import Modals from "../../components/Modals";
import "./ongoing.css";
import {
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  ModalDialog,
  Chip,
  Typography,
} from "@mui/joy";

import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

function OngoingCards({ commissions, to }) {
  const { user } = useAuth();
  const userID = user.userID;

  const [feedback, setFeedback] = useState({
    catcherID: "",
    commissionID: "",
    feedbackComment: "",
    feedbackCount: 0,
    feedbackDate: "",
    feedbackPosterID: "",
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

  const handleSubmit = async (commissionID, catcherID) => {
    // setIsClicked(true);
    // Add any other logic you want to perform when the button is clicked
    //e.preventDefault();
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      feedback.feedbackDate = getCurrentDate();
      feedback.catcherID = catcherID;
      feedback.feedbackPosterID = user.userID;
      feedback.commissionID = commissionID;
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

  const [openMark, setOpenMark] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenMarkModal = () => {
    setOpenMark(true);
    console.log("marked");
  };

  const handleOpenCancelModal = () => {
    setOpenDelete(true);
    console.log("canceled");
  };

  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });

  //get current time and date for notif
  const getTimeAndDate = () => {
    const currentDate = new Date();
    // Get the date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    // Get the time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Create a string representing the current date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // const markAsCompleted = (commissionId) => {
  //   // Perform the logic to mark the commission as completed
  //   console.log(`Commission ${commissionId} marked as completed`);
  //   setOpenMark(false);
  // };

  // const cancel = (commissionId) => {
  //   // Perform the logic to cancel the commission
  //   console.log(`Commission ${commissionId} cancelled`);
  //   setOpenDelete(false);
  // };

  // cancel transaction
  const handleCancel = async (transactID, employerID) => {
    try {
      //alert(employerID);

      // add a notification to the commission's employer
      notif.notifDesc = "A Catcher has cancelled in doing an errand";
      notif.userID = employerID;
      notif.notificationType = "Errand Cancelled";
      notif.notifDate = getTimeAndDate();

      await axios.post("http://localhost:8800/notify", notif);
      //cancel the transaction
      await axios.put(`http://localhost:8800/cancel-trans/${transactID}`, {
        params: { date: getTimeAndDate() },
      });

      setOpenDelete(false);
    } catch (err) {
      console.log(err);
    }
  };

  // complete transaction
  const handleComplete = async (transactID, employerID) => {
    try {
      //alert(employerID);

      // add a notification to the commission's employer
      notif.notifDesc = "A Catcher has mark completed an errand";
      notif.userID = employerID;
      notif.notificationType = "Errand completed";
      notif.notifDate = getTimeAndDate();

      await axios.post("http://localhost:8800/notify", notif);
      //complete the transaction
      await axios.put(
        `http://localhost:8800/catcher/complete/${transactID}/${user.userID}`
      );
      console.log("status: completed");

      setOpenMark(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = (
    pay,
    type,
    fname,
    lname,
    id,
    comTitle,
    erID,
    catID
  ) => {
    const paymentUrl = `http://localhost:8800/process-payment/${userID}`;
    // Change the amount
    const amount = pay;
    const errType = type;
    const name = fname + " " + lname;
    const errand = id + " " + comTitle;
    const errandID = erID;
    const cateID = catID;

    axios
      .post(paymentUrl, {
        pay: amount,
        type: errType,
        name: name,
        errand: errand,
        id: id, // transactionID
        employerID: userID,
        errandID: errandID,
        catID: cateID,
      })
      .then((response) => {
        window.open(response.data.url);
      })
      .catch((error) => {
        console.error("There was an error processing the payment!", error);
      });
  };

  return (
    <div className="Oncards">
      <div className="Oncards__container">
        <div className="Oncards__wrapper">
          <div className="Oncards__items">
            {commissions.map((commission) => (
              <div className="Oncard" key={commission.id}>
                {(commission.commissionType === "HomeService - Indoor" ||
                  commission.commissionType === "HomeService - Outdoor") && (
                  <img
                    src="/images/hr.png"
                    alt="Commission"
                    className="Oncard__img"
                  />
                )}

                {commission.commissionType === "Transportation" && (
                  <img
                    src="/images/img5.png"
                    alt="Commission"
                    className="Oncard__img"
                  />
                )}
                {commission.commissionType === "Delivery" && (
                  <img
                    src="/images/img4.png"
                    alt="Commission"
                    className="Oncard__img"
                  />
                )}

                <div className="Oncard__info">
                  <Typography level="h1" color="neutral" variant="plain">
                    {commission.commissionTitle}
                  </Typography>
                  {user.userType === "Catcher" ? (
                    <Chip color="success" size="md" variant="outlined">
                      {commission.errandStatus}
                    </Chip>
                  ) : (
                    <Chip color="success" size="md" variant="outlined">
                      {commission.transStatus}
                    </Chip>
                  )}

                  <Typography className="ongoing__cards__txt" level="body-sm">
                    {commission.commissionType}
                  </Typography>
                  <Typography className="ongoing__cards__txt" level="body-md">
                    {commission.commissionLocation}
                  </Typography>
                  <Typography className="ongoing__cards__txt" level="title-sm">
                    Payment:
                    <Typography
                      color="success"
                      level="title-sm"
                      variant="outlined"
                    >
                      Php {commission.commissionPay}
                    </Typography>
                  </Typography>
                  <Typography
                    className="ongoing__cards__txt"
                    color="primary"
                    level="title-sm"
                  >
                    <Link
                      to={`/errand/view/${commission.commissionID}`}
                      className="Oncard__link"
                    >
                      View Errand
                    </Link>
                  </Typography>

                  {user.userType === "Employer" && (
                    <>
                      <Typography
                        color="neutral"
                        level="title-lg"
                        variant="plain"
                      >
                        CATCHER:
                      </Typography>
                      <Typography color="primary" level="h3" variant="soft">
                        {commission.userFirstname} {commission.userLastname}
                      </Typography>
                    </>
                  )}
                  {/* BUTTONS 
                    APPEAR ONLY IF CATCHER
                  */}
                  {user.userType === "Catcher" && (
                    <>
                      <div className="ongoing__cards__buttons">
                        <button
                          className="ongoing__cards__button__complete"
                          onClick={() => handleOpenMarkModal()}
                        >
                          Mark as Completed
                        </button>

                        <button
                          // onClick={() => cancel(commission.commissionID)}
                          onClick={handleOpenCancelModal}
                          className="ongoing__cards__button__cancel"
                        >
                          Cancel
                        </button>
                      </div>

                      {/* marked as completed model */}
                      <Modal open={openMark} onClose={() => setOpenMark(false)}>
                        <ModalDialog>
                          <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmation
                          </DialogTitle>
                          <Divider />
                          <DialogContent>
                            Are you sure you want to Mark as Completed this
                            errand?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="solid"
                              color="success"
                              onClick={() =>
                                // markAsCompleted(commission.commissionID)
                                handleComplete(
                                  commission.transactID,
                                  commission.employerID
                                )
                              }
                            >
                              Yes
                            </Button>
                            <Button
                              variant="plain"
                              color="neutral"
                              onClick={() => setOpenMark(false)}
                            >
                              No
                            </Button>
                          </DialogActions>
                        </ModalDialog>
                      </Modal>

                      {/* cancel modal */}
                      <Modal
                        open={openDelete}
                        onClose={() => setOpenDelete(false)}
                      >
                        <ModalDialog>
                          <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmation
                          </DialogTitle>
                          <Divider />
                          <DialogContent>
                            Are you sure you want to Cancel this errand?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="solid"
                              color="danger"
                              onClick={() =>
                                // cancel(commission.commissionID)
                                handleCancel(
                                  commission.transactID,
                                  commission.employerID
                                )
                              }
                            >
                              Yes
                            </Button>
                            <Button
                              variant="plain"
                              color="neutral"
                              onClick={() => setOpenDelete(false)}
                            >
                              No
                            </Button>
                          </DialogActions>
                        </ModalDialog>
                      </Modal>
                    </>
                  )}
                  {user.userType === "Employer" &&
                    commission.errandStatus === "Complete" && (
                      <>
                        <div className="ongoing__cards__buttons">
                          <button
                            onClick={handleOpenModal}
                            className="ongoing__cards__button__feedback"
                          >
                            Feedback
                          </button>
                          <button
                            className="ongoing__cards__button"
                            onClick={() => {
                              handlePayment(
                                commission.commissionPay,
                                commission.commissionType,
                                commission.userFirstname,
                                commission.userLastname,
                                commission.transactID,
                                commission.commissionTitle,
                                commission.commissionID,
                                commission.transCatcherID
                              );
                            }}
                          >
                            Payment
                          </button>
                        </div>

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
                          {commission.transCatcherID}
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
                            <button
                              style={styles.button}
                              onClick={(e) =>
                                handleSubmit(
                                  commission.commissionID,
                                  commission.transCatcherID
                                )
                              }
                            >
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
            gap: 32px; 
            justify-content: flex-start;
            width: 100%;
          }

          // .Oncard {
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   padding-top: 20px;
          //   // justify-content: flex-end;
          //   width: calc(25% - 20px); /* Adjust the width to fit 4 cards per row */
          //   height: 400px;
          //   margin-bottom: 20px;
          //   border-radius: 10px;
          //   box-shadow: none;
          //   transition: transform 0.3s ease;
          //   border: groove;
          // }

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
