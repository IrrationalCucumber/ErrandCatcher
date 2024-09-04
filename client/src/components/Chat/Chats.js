import React from "react";
import { Tab, TabList } from "@mui/joy";
import ChatItem from "./ChatItem";

function Chats({ chats, setActiveChatId }) {
  return (
    <div>
      {chats.map((chat) => (
        <TabList
          key={chat.chatID}
          sx={{ overflow: "auto", width: "250px" }}
          onClick={() => setActiveChatId(chat.chatID)}
        >
          <ChatItem
            chatID={chat.chatID}
            id={chat.chat_EmpID}
            id2={chat.chat_CatchID}
          />
        </TabList>
      ))}
    </div>
  );
}

export default Chats;
