import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button, Chip, Input, Stack, TabPanel, Typography } from "@mui/joy";
//icons
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from "@mui/icons-material/Message";

function Conversation({ chatID }) {
  const { user } = useAuth();
  const [convos, setConvo] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [receiver, setReciever] = useState("");

  useEffect(() => {
    //get chat info
    const fetchChat = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/chat/${chatID}`);
        if (res.data[0].chat_EmpID === user.userID) {
          setReciever(res.data[0].chat_CatchID);
        } else {
          setReciever(res.data[0].chat_EmpID);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChat();
  }, [chatID]);
  //get username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${receiver}`);
        setUsername(res.data[0].username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsername();
  }, [receiver]);
  //get convo between user
  //refresh every 5 sec
  // display if new convo added
  useEffect(() => {
    const fetchConvo = async () => {
      if (!chatID) return; // If no chatID is set, do not fetch data
      try {
        const res = await axios.get(`http://localhost:8800/c/${chatID}`);
        setConvo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConvo();
    const interval = setInterval(fetchConvo, 5000);
    return () => clearInterval(interval);
  }, [chatID]);
  //send the message
  const handleSend = async () => {
    try {
      await axios.post(`http://localhost:8800/add-convo?id=${chatID}&recID=${receiver}
      &sendID=${user.userID}&message=${message}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TabPanel value={chatID} sx={{ overflow: "auto" }}>
      <nav style={{ backgroundColor: "skyblue" }}>
        <Typography level="h1">{username}</Typography>
      </nav>

      {convos.map((convo) => (
        <div key={convo.convoID}>
          {convo.senderID === user.userID && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              spacing={1}
              style={{
                margin: "10px",
                position: "flex",
              }}
            >
              <Typography
                level="body-md"
                style={{
                  backgroundColor: "skyblue",
                  padding: "15px",
                  margin: "10px",
                  borderRadius: "10px 10px 0px 10px",
                  width: "20%",
                }}
              >
                {convo.message}
              </Typography>
            </Stack>
          )}
          {convo.senderID !== user.userID && (
            <div
              style={{
                padding: "10px",
                margin: "10px",
                position: "flex",
              }}
            >
              <Chip color="neutral" size="lg" variant="soft">
                {username}
              </Chip>
              <Typography
                level="body-md"
                color="plain"
                variant="outlined"
                style={{
                  backgroundColor: "gray",
                  padding: "10px",
                  margin: "10px 20px",
                  borderRadius: "0px 10px 10px 10px",
                  width: "20%",
                }}
              >
                {convo.message}
              </Typography>
            </div>
          )}
          {/* <i>{new Date(convo.dateSent).toLocaleDateString()}</i> */}
        </div>
      ))}
      <Input
        color="primary"
        size="lg"
        variant="soft"
        type="text"
        startDecorator={<MessageIcon />}
        placeholder="Type message here..."
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        endDecorator={
          <Button startDecorator={<SendIcon />} onClick={handleSend}>
            Send
          </Button>
        }
      />
    </TabPanel>
  );
}

export default Conversation;
