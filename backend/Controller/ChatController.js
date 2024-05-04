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
};

module.exports = ChatController;
