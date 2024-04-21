//copied but for admin side only
import React from 'react'
import "./admincards.css"
import axios from "axios";

const AdminCards = ({ admin }) => {
    const [counts, setCounts] = useState({
        numPosts: 0,
        numApplicants: 0,
        numErrands: 0,
      });
    const [loading, setLoading] = useState(true);
    const userID = user.userID;

    useEffect(() => {
        // Fetching of counts is not made
        setTimeout(() => {
          const fetchCount = async () => {
            try {
              const res2 = await axios.get( 
              );
              setCounts({
                numErrand: res2.data[0].ErrandCount,
                numUsers: res2.data[0].UsersCount,
                numRequest: res2.data[0].Request,
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
    <div className='admin-card'>
          {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="count-details">
            {/* all the errands */}
          <Link
            to={``}
            className="count-section errands"
            style={{ color: "black" }}
          >
            <h3>Errands</h3>
            <p>{counts.numErrand}</p>
          </Link>
            {/* all the users */}
          <Link
            to={``}
            className="count-section users"
            style={{ color: "black" }}
          >
            <h3>Users</h3>
            <p>{counts.numUsers}</p>
          </Link>
            {/* count the request */}
          <Link
            to={``}
            className="count-section admin1"
            style={{ color: "black" }}
          >
            <h3>Request</h3>
            <p>{counts.numRequest}</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default AdminCards