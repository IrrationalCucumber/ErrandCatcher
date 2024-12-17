import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./employercard.css";
import axios from "axios";
import { useAuth } from "../AuthContext";
import PostAddIcon from "@mui/icons-material/PostAdd";
import GroupIcon from "@mui/icons-material/Group";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

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
    <>
      <div style={{ marginTop: "32px", marginBottom: "16px" }}>
        <div class="container">
          <div class="row d-flex justify-content-center align-items-center gap-4">
            <div class="col-md-4 col-xl-3 mb-3">
              <div class="card bg-c-blue order-card text-center">
                <div class="card-block">
                  <Link
                    className="linkempcards"
                    style={{ textDecoration: "none" }}
                    to={`/dashboard/errands`}
                  >
                    <h3 class="m-b-20 fw-semibold">
                      <PostAddIcon sx={{ color: "white", fontSize: 24 }} /> Posted
                    </h3>
                    <h2 class="text-center">
                      <i class="fa fa-cart-plus f-left"></i>
                      <span>{counts.numPosts}</span>
                    </h2>
                    <p class="m-b-0">See what you have post</p>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-xl-3 mb-3">
              <div class="card bg-c-green order-card text-center">
                <div class="card-block">
                  <Link
                    className="linkempcards"
                    style={{ textDecoration: "none" }}
                    to={`/dashboard/applicants`}
                  >
                    <h3 class="m-b-20 fw-semibold">
                      <GroupIcon sx={{ color: "white", fontSize: 24 }} /> Applicants
                    </h3>
                    <h2 class="text-center">
                      <i class="fa fa-rocket f-left"></i>
                      <span>{counts.numApplicants}</span>
                    </h2>
                    <p class="m-b-0">View your applicants here</p>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-xl-3 mb-3">
              <div class="card bg-c-yellow order-card text-center">
                <div class="card-block">
                  <Link
                    className="linkempcards"
                    style={{ textDecoration: "none" }}
                    to={`/dashboard/ongoing`}
                  >
                    <h3 class="m-b-20 fw-semibold">
                      <PendingActionsIcon sx={{ color: "white", fontSize: 24 }} /> Ongoing
                    </h3>
                    <h2 class="text-center">
                      <i class="fa fa-refresh f-left"></i>
                      <span>{counts.numErrands}</span>
                    </h2>
                    <p class="m-b-0">See who's still ongoing</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployerCard;




// old version employer cards
// {/* <div className="employer-card">
//   <h2></h2>
//   {loading ? (
//     <p>Loading...</p>
//   ) : (
//     // bootstrap classes used
//     <div class="container">
//       <div className="count-details">
//         <div className="row d-flex ">
//           {/* <div class="row"> */}
//           <div class="col  d-flex justify-content-center">
//             {/* <div class="col"> */}

//             <Link
//               to={`/dashboard/errands`}
//               className="count-section posts"
//               style={{ color: "black" }}
//             >
//               <h3 style={{ position: "relative" }}>
//                 <PostAddIcon
//                   sx={{
//                     color: "black",
//                     position: "absolute",
//                     right: "150px",
//                     fontSize: 28,
//                   }}
//                 />
//                 Posts
//               </h3>
//               <p>{counts.numPosts}</p>
//             </Link>
//           </div>
//           <div class="col d-flex justify-content-center">
//             <Link
//               to={`/dashboard/applicants`}
//               className="count-section applicants1"
//               style={{ color: "black" }}
//             >
//               <h3 style={{ position: "relative" }}>
//                 <GroupIcon
//                   sx={{
//                     color: "black",
//                     position: "absolute",
//                     right: "182px",
//                     fontSize: 28,
//                   }}
//                 />
//                 Applicants
//               </h3>
//               <p>{counts.numApplicants}</p>
//             </Link>
//           </div>
//           <div class="col d-flex justify-content-center">
//             <Link
//               to={`/dashboard/errands/${userID}`}
//               className="count-section errands"
//               style={{ color: "black" }}
//             >
//               <h3 style={{ position: "relative" }}>
//                 <PendingActionsIcon
//                   sx={{
//                     color: "black",
//                     position: "absolute",
//                     right: "168px",
//                     fontSize: 28,
//                   }}
//                 />
//                 Pending
//               </h3>
//               <p>{counts.numErrands}</p>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </div> */}
