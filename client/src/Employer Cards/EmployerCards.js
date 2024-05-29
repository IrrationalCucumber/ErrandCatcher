import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./employercard.css";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

const EmployerCard = ({ employer }) => {
  const [counts, setCounts] = useState({
    numPosts: 0,
    numApplicants: 0,
    numErrands: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userID = user.userID;
  useEffect(() => {
    // Simulate fetching counts from backend API, be removed
    setTimeout(() => {
      const fetchCount = async () => {
        try {
          const res2 = await axios.get(
            `http://localhost:8800/post-and-applicant-count/${userID}`
          );
          setCounts({
            numPosts: res2.data[0].postCount,
            numApplicants: res2.data[0].applicantCount,
            numErrands: res2.data[0].pending,
          });
        } catch (err) {
          console.log(err);
        }
      };
      fetchCount();

      //   const simulatedCounts = {
      //     //numPosts: Math.floor(Math.random() * 10), // Random number of posts
      //     numApplicants: Math.floor(Math.random() * 10), // Random number of applicants
      //     //numErrands: Math.floor(Math.random() * 10), // Random number of errands
      //   };
      //   setCounts(simulatedCounts);
      setLoading(false);
    }, 100); // Simulate 1 second delay
  }, [counts, userID]);

  return (
    <div className="employer-card">
      <h2></h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="count-details">
          <Link
            to={`/dashboard/commissions`}
            className="count-section posts"
            style={{ color: "black" }}
          >
            <p>{counts.numPosts}</p>
            <h3>Posts</h3>
          </Link>
          <Link
            to={`/dashboard/applicants`}
            className="count-section applicants1"
            style={{ color: "black" }}
          >
            <h3>Applicants</h3>
            <p>{counts.numApplicants}</p>
          </Link>
          <Link
            to={`/dashboard/commissions/${userID}`}
            className="count-section errands"
            style={{ color: "black" }}
          >
            <h3>Pending</h3>
            <p>{counts.numErrands}</p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default EmployerCard;
