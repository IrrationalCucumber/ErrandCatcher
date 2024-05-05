import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { colors } from "@mui/material";

function Conversation() {
  const { user } = useAuth();
  const location = useLocation();
  const chatID = location.pathname.split("/")[3];
  const [convos, setConvo] = useState([]);

  useEffect(() => {
    const fetchConvo = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/c/${chatID}`);
        setConvo(res.data);
      } catch (error) {}
    };
    fetchConvo();
  }, [chatID, user.userID]);
  return (
    <div>
      {convos.map((convo) => (
        <div key={convo.convoID}>
          <p>
            {/* {convo.convoID} */}
            <p>
              {/* {convo.senderID}
              <p>{convo.reciever} </p> */}
              {convo.senderID === user.userID && (
                <p
                  style={{
                    backgroundColor: "skyblue",
                  }}
                >
                  {user.username}: {convo.message}
                </p>
              )}
              {convo.senderID !== user.userID && (
                <p
                  style={{
                    backgroundColor: "gray",
                  }}
                >
                  {convo.senderID}: {convo.message}
                </p>
              )}
            </p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Conversation;
