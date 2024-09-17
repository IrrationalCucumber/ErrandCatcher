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
      <h2>Total number of Account Verification request:</h2>
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
