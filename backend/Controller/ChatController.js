const Chat = require("../Model/Chat");

const ChatController = {
  //get chat of user
  //   getChat: (req, res) => {
  //     const id = req.params.id;
  //     const userID = req.params.userid;
  //     Chat.getChatById(id, userID, (err, chat) => {
  //       if (err) {
  //         console.error("Error fetching Chat:", err);
  //         res.status(500).send("Internal Server Error");
  //         return;
  //       }
  //       res.json(chat);
  //     });
  //   },
  fetchChatById: async (req, res) => {
    const id = req.params.id;
    const userID = req.params.userid; // Assuming userID is stored on request object
    try {
      const chat = await Chat.getChatById(id, userID);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // get convo of chat
  fetchChatConvo: async (req, res) => {
    const id = req.params.id;
    try {
      const chat = await Chat.getChatConvo(id);
      if (!chat) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.json(chat);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // add new chat
  postNewChat: async (req, res) => {
    const empID = req.query.empID;
    const catchID = req.query.catchID;
    try {
      const chat = await Chat.postNewChat(empID, catchID);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  //add convo to the chat
  postConvo: async (req, res) => {
    const chatID = req.query.id;
    const recID = req.query.recID;
    const sendID = req.query.sendID;
    const message = req.query.message;
    try {
      const chat = await Chat.postConvo(chatID, recID, sendID, message);
      //return json("Sent");
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ChatController;
