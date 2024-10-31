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
                        {props.items}
                    </Box>
                </div>
                <div class="contentcard">
                    <a href="#">
                        <span class="title">
                            {props.title}
                        </span>
                    </a>

                    <p class="desc">
                        {/* props.desc */}
                        {props.type}

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
