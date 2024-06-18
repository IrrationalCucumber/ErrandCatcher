import { Tab } from "@mui/joy";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

function ChatItem(props) {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [id, setID] = useState("");
  useEffect(() => {
    //store userID of if not the user
    // This sets the id to the chat_CatchID of the first chat in the list
    if (props.id === user.userID) {
      setID(props.id2);
    } else if (props.id2 === user.userID) {
      setID(props.id);
    }
    //get username
    const fetchUsername = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${id}`);
        setUsername(res.data[0].username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsername();
  }, [props, id, user.userID]); // Depend on chats, so it updates whenever chats change
  //console.log(props.id);
  return (
    <>
      <Tab
        sx={{ width: "100%", height: "100px" }}
        value={props.chatID}
        variant="plain"
        color="primary"
      >
        {username}
      </Tab>
    </>
  );
}

export default ChatItem;
