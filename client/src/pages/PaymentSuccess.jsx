import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const PaymentSuccess = () => {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "120px",
            padding: "12px",
        }}>

            <div style={{
                display: "inline-block",
                margin: "0 auto",
                border: "0.666667px solid #d6d6d6",
                borderRadius: "15px",
                padding: "60px",
                // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                boxShadow: "#00000012 0px 9px 20px 0px",
            }}>
                <CheckCircleOutlineOutlinedIcon
                    color="success"
                    sx={{
                        fontSize: 80,
                    }} />
                <h1 style={{
                    fontWeight: "500",
                    lineHeight: "44px",
                    margin: "20px 0px 10px",
                    // fontSize: "38px",
                    fontSize: "2.55rem",
                }}
                >
                    Payment has been Succesful!
                </h1>

                <h3 style={{
                    lineHeight: "24px",
                    margin: "0px 0px 20px"
                }}
                >
                    Click here to go back

                    <div style={{
                        border: "solid",
                        borderRadius: "50px",
                        padding: "12px",
                        marginTop: "20px",
                        background: "#0073aa",
                        color: "white",
                    }}>
                        <Link to={"/dashboard/home"}><HomeIcon /> HOME</Link>
                    </div>
                </h3>

            </div>

        </div >
    );
};

export default PaymentSuccess;