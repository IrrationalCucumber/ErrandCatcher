import React, { useEffect, useState } from "react";
import Conversation from "../../components/Chat/Conversation";
import Chats from "../../components/Chat/Chats";
import { TabPanel, Tabs } from "@mui/joy";
import axios from "axios";
import { useAuth } from "../../components/AuthContext";

function ChatPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null); // state to keep track of active chat

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/your-chat/${user.userID}`
        );
        setChats(res.data);
        if (res.data.length > 0) {
          setActiveChatId(res.data[0].chatID); // Set the first chat as active initially
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChat();
  }, [user.userID]);

  return (
    <div>
      <Tabs
        orientation="vertical"
        size="lg"
        value={activeChatId}
        aria-label="Meaningful label"
        sx={{
          "--Tabs-spacing": "20px",
          "--Tab-indicatorThickness": "4px",
          "--Tab-indicatorRadius": "11px",
        }}
      >
        <Chats
          chats={chats}
          setActiveChatId={setActiveChatId}
          value={activeChatId}
        />
        <Conversation chatID={activeChatId} />
      </Tabs>
    </div>
  );
}

export default ChatPage;
