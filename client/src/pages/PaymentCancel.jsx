import React from 'react';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';

const PaymentCancel = () => {
    const navigate = useNavigate();

    const homebutton = () => {
        navigate("/dashboard/home");
    }

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
                <CancelOutlinedIcon
                    color="error"
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
                ></h1>

                <h1 style={{
                    fontWeight: "500",
                    lineHeight: "44px",
                    margin: "20px 0px 10px",
                    // fontSize: "38px",
                    fontSize: "2.55rem",
                }}
                >
                    Payment has been Cancelled!

                </h1>
                <h3 style={{
                    lineHeight: "24px",
                    margin: "16px 0px 20px"
                }}
                >
                    Click here to go back
                </h3>

                <Button
                    onClick={homebutton}
                    variant="contained"
                    sx={{
                        width: "180px",
                        borderRadius: 8,
                        padding: "9px 15px",
                        fontSize: "1.05rem",
                        // fontSize: "14px",
                        background: "#0073aa",
                        // marginTop: "20px",
                        lineHeight: "20px",
                    }}
                >
                    <HomeIcon /> HOME
                </Button>

            </div>

        </div>
    );
};

export default PaymentCancel;
