/**
 * WRITTEN BY: MONDE
 * 3/11/24
 * Component display preview OngoingCards v1.2
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Modals from "../../components/Modals";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box } from '@mui/joy';
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
    Alert,
} from "@mui/joy";
import "../../components/Cards/cardsNew.css";
import { useAuth } from "../../components/AuthContext";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from '@mui/icons-material/Error';
import ModalFeedback from "../../components/ModalFeedback";

function OngoingCardsNew(props) {

    const { status } = props;

    // Determine chip colour props based on status
    const chipColor =
        status === "Complete" ? "success" :
            status === "Ongoing" ? "warning" :
                status === "Cancel" ? "error" : "default";

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

    //Alert feedback
    const [message, setMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");
    const [iconlert, setIconLert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    // modal message pop-up
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

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
            if (feedback.feedbackCount === 0 || feedback.feedbackComment === "") {
                setMessage("Please input all the feedback fields.");
                setAlertColor("danger");
                setIconLert(<WarningRoundedIcon />);
                setShowAlert(true);
                return;

            } else {
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
                feedback.feedbackDate = getCurrentDate();
                feedback.catcherID = catcherID;
                feedback.feedbackPosterID = user.userID;
                feedback.commissionID = commissionID;
                //feedback.employerID = commission.

                // feedback modal open
                handleOpen();

                //feedback.commissionID = fetchLoc().commissionID;
                // const response = await axios.post("http://localhost:8800/rate", feedback);
                // setSuccessMsg(response.data);
            }
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
            await axios.put(`http://localhost:8800/complete-trans/${transactID}`, {
                params: { date: getTimeAndDate() },
            });
            console.log("status: completed");

            setOpenMark(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePayment = (pay, type, fname, lname, id, comTitle, erID, catID) => {
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
                catID: cateID
            })
            .then((response) => {
                window.open(response.data.url);
            })
            .catch((error) => {
                console.error("There was an error processing the payment!", error);
            });
    };


    return (
        <>
            {showAlert && (
                <Alert
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        zIndex: 9999,
                        transform: showAlert ? "translateX(0)" : "translateX(100%)",
                        transition: "transform 0.5s ease-in-out",
                    }}
                    color={alertColor}
                    size="lg"
                    variant="solid"
                    // icon={iconlert}
                    startDecorator={iconlert}
                    endDecorator={
                        <Button
                            size="sm"
                            variant="solid"
                            color={alertColor}
                            onClick={(e) => setShowAlert(false)}
                        >
                            <CloseIcon />
                        </Button>
                    }
                >
                    {message}
                </Alert>
            )}

            <ModalFeedback
                open={open}
                handleClose={handleClose}
                headerMes="Success!"
                contentMes="You have successfully feedbacked a catcher."
                color="success"
                colorText="green"
            // icon={ErrorIcon}
            />

            <div class="card">
                <div class="iconcard" >
                    <Box class="boxer">
                        {/* commissionType props */}
                        {props.icon === "HomeService - Indoor" ||
                            props.icon === "HomeService - Outdoor" ?
                            (
                                <OtherHousesIcon
                                    sx={{ color: '#fff', fontSize: 100 }}
                                />
                            ) : props.icon === "Transportation" ? (
                                <LocalShippingIcon
                                    sx={{ color: '#fff', fontSize: 100 }}
                                />
                            ) : props.icon === "Delivery" ? (
                                <DirectionsCarIcon
                                    sx={{ color: '#fff', fontSize: 100 }}
                                />
                            ) : null}
                    </Box>
                </div>
                <div class="contentcard">


                    <span class="title">
                        {/* {props.title} */}
                        <Typography level="h4" color="neutral" variant="plain">
                            {/* {commission.commissionTitle} */}
                            {props.title}
                        </Typography>
                    </span>

                    <p class="desc">
                        {/* props.desc */}
                        {/* {props.type} */}
                        <Typography className="ongoing__cards__txt" level="body-sm">
                            {/* {commission.commissionType} */}
                            {props.type}
                        </Typography>

                    </p>

                    <p class="desc">
                        {/* props.desc */}
                        <h7>Details: </h7>
                        <ul>
                            <li>
                                <Chip
                                    sx={{
                                        fontSize: '1.1rem',
                                        height: '30px',
                                        padding: '0 10px',
                                    }}
                                    color={chipColor}
                                    size="lg"
                                    variant="solid">
                                    {/* {commission.errandStatus} */}
                                    {props.status}
                                </Chip>
                            </li>
                            <li>
                                <Typography className="ongoing__cards__txt" level="title-sm">
                                    Payment:
                                    <Typography
                                        color="success"
                                        level="title-sm"
                                        variant="outlined"
                                    >
                                        {/* Php {commission.commissionPay} */}
                                        ₱{props.pay}
                                    </Typography>
                                </Typography>
                            </li>
                        </ul>
                    </p>

                    {/* View Errand */}
                    <Link to={props.path}>
                        <a class="action" href="#">
                            Find out more
                            <span aria-hidden="true">
                                →
                            </span>
                        </a>
                    </Link>

                    <p class="desc" style={{ marginTop: "12px" }}>
                        {user.userType === "Employer" && (
                            <>
                                <Typography
                                    color="neutral"
                                    level="title-lg"
                                    variant="plain"
                                    style={{ marginBottom: "4px" }}
                                >
                                    CATCHER:
                                </Typography>
                                <Typography color="primary" level="h3" variant="soft">
                                    {/* {commission.userFirstname} {commission.userLastname} */}
                                    {props.userFname} {props.userLname}
                                </Typography>
                            </>
                        )}
                    </p>

                    {user.userType === "Employer" &&
                        props.status === "Complete" && (
                            <>
                                <div className="ongoing__cardsNew__buttons">
                                    <button
                                        onClick={handleOpenModal} // props 
                                        className="ongoing__cards__button__feedback"
                                    >
                                        Feedback
                                    </button>
                                    <button
                                        className="ongoing__cards__button"
                                        onClick={() => {
                                            // props
                                            handlePayment(
                                                props.pay,
                                                props.type,
                                                props.userFname,
                                                props.userLname,
                                                props.transID,
                                                props.title,
                                                props.comID,
                                                props.transCatID,
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
                                    {/* props */}
                                    {/* {commission.transCatcherID} */}
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
                                                // props
                                                handleSubmit(
                                                    props.comID,
                                                    props.transCatID
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


                    {user.userType === "Catcher" && (
                        <>
                            <div className="ongoing__cardsNewCat__buttons">
                                <button
                                    className="ongoing__cardsNewCat__button__complete"
                                    onClick={() => handleOpenMarkModal()}
                                >
                                    Mark as Completed
                                </button>

                                <button
                                    // onClick={() => cancel(commission.commissionID)}
                                    onClick={handleOpenCancelModal}
                                    className="ongoing__cardsNewCat__button__cancel"
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
                                                    // props
                                                    props.transID,
                                                    props.empID

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
                                                    // props
                                                    props.transID,
                                                    props.empID
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

                    {/* <Link to={props.path}>
                        <a class="action" href="#">
                            Find out more
                            <span aria-hidden="true">
                                →
                            </span>
                        </a>
                    </Link> */}
                </div >
            </div>
        </>
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


export default OngoingCardsNew;
