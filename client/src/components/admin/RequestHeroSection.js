import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/style.css";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function RequestHeroSection() {
  const [request, setRequest] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRequestCount = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/request-count/`);
        setRequest(res.data[0].c);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestCount();
  }, [request]);
  return (
    <div className="request__hero__section">
      <h2
        style={{
          color: "white",
          fontFamily: "system-ui",
          fontWeight: "700",
          letterSpacing: "1px",
        }}>
        Total number of Account Verification request:</h2>
      <h1>{request}</h1>
      <div className="hero-btns">
        <Button onClick={(e) => navigate(`/dashboard/admin/request`)}>
          VIEW REQUEST
        </Button>
      </div>
    </div>
  );
}

export default RequestHeroSection;

export function AdminHeroSection() {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin__hero__section">
        SAMPLE TEXT
        <div className="adminHS__box__wrapper">
          <div
            className="adminHS__left__box"
            onClick={(e) => navigate("/dashboard/admin/accounts")}
          >
            <h1 className="adminHS__txt">ACCOUNT</h1>
          </div>
          <div
            className="adminHS__right__box"
            onClick={(e) => navigate("/dashboard/admin/errand-list")}
          >
            <h1 className="adminHS__txt">ERRAND</h1>
          </div>
        </div>
      </div>
    </>
  );
}
