import React from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useNavigate } from "react-router-dom";

function AddChatButton({ currentUserId, otherUserId }) {
  const navigate = useNavigate();
  const handleAddChat = async () => {
    try {
      const payload = {
        user1: currentUserId,
        user2: otherUserId,
      };
      const response = await axios.post(
        "http://localhost:8800/new-chat",
        payload
      );
      if (response.status === 200) {
        alert("Chat session created successfully!");
        // You might want to navigate to the chat page or update the UI to reflect the new chat
        navigate("/chat/c");
      } else {
        alert("Failed to create chat session.");
      }
    } catch (error) {
      console.error("Error creating chat session:", error);
      alert("Error while creating chat session.");
    }
  };

  return (
    <Button
      onClick={handleAddChat}
      color="primary"
      loading={false}
      size="lg"
      variant="plain"
    >
      {<ChatBubbleIcon />}
    </Button>
  );
}

export default AddChatButton;
