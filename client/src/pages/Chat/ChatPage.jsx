import React, { useEffect, useState } from "react";
import Conversation from "../../components/Chat/Conversation";
import Chats from "../../components/Chat/Chats";
import { TabPanel, Tabs } from "@mui/joy";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

function ChatPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  //get chat info
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/your-chat/${user.userID}`
        );
        setChats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChat();
  }, [user.userID]);

  return (
    <div>
      <Tabs orientation="vertical" size="lg">
        <Chats chats={chats} />
        <TabPanel sx={{ overflow: "auto" }}>
          <Conversation />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default ChatPage;
