import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TopCatcher() {
  const [catchers, setCatchers] = useState([]);
  useEffect(() => {
    const fetchCatchers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/top-rated");
        setCatchers(res.data);
      } catch (error) {}
    };
    fetchCatchers();
  }, []);
  return (
    <>
      <div>TopCatcher</div>
      {catchers.map((catcher) => (
        <div key={catcher.feedbackID}>
          {catcher.username} : {catcher.averagRate}
        </div>
      ))}
    </>
  );
}
