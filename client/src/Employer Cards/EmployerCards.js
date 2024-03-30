import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./employercard.css"

const EmployerCard = ({ employer }) => {
  const [counts, setCounts] = useState({
    numPosts: 0,
    numApplicants: 0,
    numErrands: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching counts from backend API, be removed
    setTimeout(() => {
      const simulatedCounts = {
        numPosts: Math.floor(Math.random() * 10), // Random number of posts
        numApplicants: Math.floor(Math.random() * 10), // Random number of applicants
        numErrands: Math.floor(Math.random() * 10) // Random number of errands
      };
      setCounts(simulatedCounts);
      setLoading(false);
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <div className="employer-card">
      <h2></h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="count-details">
          <Link to={`/commissions`} className="count-section posts" style={{color:"black"}}>
            <p>{counts.numPosts}</p>
            <h3>Posts</h3>
          </Link>   
          <Link to={`/applicants`} className="count-section applicants1" style={{color:"black"}}>
            <p>{counts.numApplicants}</p>
            <h3>Applicants</h3>
          </Link>
          <Link to={`/commissions`} className="count-section errands" style={{color:"black"}}>
            <p>{counts.numErrands}</p>
            <h3>Pending</h3>
          </Link>
        </div>
      )}
    </div>
  );
};
export default EmployerCard;
