import React from "react";
import Conversation from "../../components/Chat/Conversation";
import Chats from "../../components/Chat/Chats";

function ChatPage() {
  return (
    <div>
      <Chats />
      <Conversation />
    </div>
  );
}

export default ChatPage;
