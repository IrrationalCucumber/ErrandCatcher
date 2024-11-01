/**
 * WRITTEN BY: META AI FT MONDE
 * 1/11/24
 * Component display preview Cards items
 */
import React from "react";
import { Link } from "react-router-dom";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box } from '@mui/joy';

function CardItemNew(props) {

    return (
        <>
            {/* <Link to={props.path} /> */}
            <div class="card">
                <div class="iconcard">
                    <Box class="boxer">
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
                        {props.title}
                    </span>

                    <p class="desc">
                        {/* props.desc */}
                        {props.type}

                    </p>

                    <p class="desc">
                        {/* props.desc */}
                        <h7>Description: </h7>
                        <ul>
                            <li>{props.desc}</li>
                            <li>₱{props.price}</li>
                        </ul>
                    </p>

                    <p class="desc">
                        {/* props.desc */}
                        {props.location}

                    </p>

                    <Link to={props.path}>
                        <a class="action" href="#">
                            Find out more
                            <span aria-hidden="true">
                                →
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CardItemNew;
