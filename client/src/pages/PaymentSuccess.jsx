import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = () => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "200px",
            padding: "12px",
        }}>
            <div style={{ display: "inline-block", margin: "0 auto" }}>

                <h1>Payment has been Succesful! <CheckCircleIcon color="success" /> </h1>
                <h3>
                    Click here to go back <Link to={"/dashboard/home"}><HomeIcon /> HOME</Link>
                </h3>

            </div>

        </div>
    );
};

export default PaymentSuccess;