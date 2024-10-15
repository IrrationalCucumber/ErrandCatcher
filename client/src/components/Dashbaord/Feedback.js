/**
 * WRITTEN BY: ADREAN
 * 10/15/24
 * Component for dipslaying comments and feedbacks by/of users
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function Feedback() {
  return <div></div>;
}

export default Feedback;

/**
 * Component to Display feedback of Catcher
 */
export function MyFeedback() {
  const [myFeedback, setMyFeedback] = useState([]);
  const { user } = useAuth();
  //get all the feedback of user
  useEffect(() => {
    //fetch data in backend
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/${user.userID}`);
        setMyFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    //refresh feedback every 5 seconds
    const refresh = setInterval(fetchFeedback, 5000);
    return () => clearInterval(refresh);
  }, []);
  return <></>;
}
