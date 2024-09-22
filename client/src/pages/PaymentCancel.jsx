import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CancelIcon from '@mui/icons-material/Cancel';

const PaymentCancel = () => {

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

                <h1>Payment has been Cancelled <CancelIcon color="error" /></h1>
                <h3>
                    Click here to go back <Link to={"/dashboard/home"}><HomeIcon /> HOME</Link>
                </h3>

            </div>

        </div>
    );
};

export default PaymentCancel;

// const [message, setMessage] = useState('');

// useEffect(() => {
//     const fetchCancelPayment = async () => {
//         try {
//             const response = await axios.get('/cancel-payment');
//             setMessage(response.data.message);
//         } catch (error) {
//             console.error("Error fetching cancel payment:", error);
//             setMessage("An error occurred while processing the cancellation.");
//         }
//     };

//     fetchCancelPayment();
// }, []);
