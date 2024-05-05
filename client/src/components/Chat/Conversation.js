import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Conversation() {
  const { user } = useAuth();
  const location = useLocation();
  const chatID = location.pathname.split("/")[3];
  const [convos, setConvo] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    chatID: "",
    user: "",
  });
  const [username, setUsername] = useState("");

  //get chat info
  const fetchChat = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/chat/${chatID}/${user.userID}`
      );
      if (res.data[0].chat_EmpID === user.userID) {
        setChatInfo({
          chatID: res.data[0].chatID,
          // empID: res.data[0].chat_EmpID,
          user: res.data[0].chat_CatchID,
        });
      } else {
        setChatInfo({
          chatID: res.data[0].chatID,
          user: res.data[0].chat_EmpID,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get convo between user
  const fetchConvo = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/c/${chatID}`);
      setConvo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //assing object
  //refresh every 5 sec
  // display if new convo added
  useEffect(() => {
    fetchChat();
    fetchConvo();
    const interval = setInterval(fetchConvo, 5000);
    return () => clearInterval(interval);
  }, []);
  // get chat info
  // get username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/username/${chatInfo.user}`
        );
        setUsername(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsername();
  }, [chatInfo.user]);
  return (
    <div>
      <h1>
        {chatInfo.chatID} <b>{username}</b>
      </h1>
      {convos.map((convo) => (
        <div key={convo.convoID}>
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
              {username}: {convo.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Conversation;
