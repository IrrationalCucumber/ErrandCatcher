import React, { useEffect, useState } from "react";

import { Tab, TabList } from "@mui/joy";
import axios from "axios";
import { useAuth } from "../AuthContext";
import ChatItem from "./ChatItem";

function Chats({ chats }) {
  return (
    <div>
      {chats.map((chat) => (
        <TabList key={chat.chatID} sx={{ overflow: "auto" }}>
          <ChatItem id={chat.chat_EmpID} id2={chat.chat_CatchID} />
        </TabList>
      ))}
    </div>
  );
}

export default Chats;
