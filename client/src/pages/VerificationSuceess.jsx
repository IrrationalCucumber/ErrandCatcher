import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Button from "@mui/material/Button";
import axios from "axios";

function VerificationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      try {
        const response = await axios.get(
          `http://localhost:8800/verify-email?token=${token}`
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [location.search]);

  const homebutton = () => {
    navigate("/dashboard/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "120px",
        padding: "12px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          margin: "0 auto",
          border: "0.666667px solid #d6d6d6",
          borderRadius: "15px",
          padding: "60px",
          boxShadow: "#00000012 0px 9px 20px 0px",
        }}
      >
        <CheckCircleOutlineOutlinedIcon
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <h1
          style={{
            fontWeight: "500",
            lineHeight: "44px",
            margin: "20px 0px 10px",
            fontSize: "2.55rem",
          }}
        >
          {message || "Verifying..."}
        </h1>

        <h3
          style={{
            lineHeight: "24px",
            margin: "16px 0px 20px",
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
            background: "#0073aa",
            lineHeight: "20px",
          }}
        >
          <HomeIcon /> HOME
        </Button>
      </div>
    </div>
  );
}

export default VerificationSuccess;
