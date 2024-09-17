import React, { useEffect, useState } from "react";

function RequestHeroSection() {
  const [request, setRequest] = useState();
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
      <h1>Request: {request}</h1>
    </div>
  );
}

export default RequestHeroSection;
