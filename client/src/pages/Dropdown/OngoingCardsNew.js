/**
 * WRITTEN BY: MONDE
 * 3/11/24
 * Component display preview OngoingCards v1.2
 */
import React from "react";
import { Link } from "react-router-dom";
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
} from "@mui/joy";
import "../../components/Cards/cardsNew.css";
import { useAuth } from "../../components/AuthContext";

function OngoingCardsNew(props) {

    const { user } = useAuth();
    const userID = user.userID;

    return (
        <>
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
                                <Chip color="success" size="lg" variant="outlined">
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

                    <p class="desc">
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
                                    {/* {commission.userFirstname} {commission.userLastname} */}
                                    {props.userFname} {props.userLname}
                                </Typography>
                            </>
                        )}
                    </p>

                    <Link to={props.path}>
                        <a class="action" href="#">
                            Find out more
                            <span aria-hidden="true">
                                →
                            </span>
                        </a>
                    </Link>
                </div >
            </div>
        </>
    );
}

export default OngoingCardsNew;
