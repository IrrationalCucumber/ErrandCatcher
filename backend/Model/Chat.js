const db = require("../dbConfig");

const Chat = {
  //get the convo of user
  // also the convo contents
  // need convo id and userID
  getChatById: (id, userID, callback) => {
    db.query(
      `SELECT ch.*, co.* 
      FROM chat_user ch
      JOIN chat_conversation co ON ch.chatID = co.convoID
      WHERE chatID = ? AND (chatEmpID = ? OR chatCatchID = ?)`,
      [id, userID, userID],
      callback
    );
  },
  //start a conversation
  // create a convo and add two user ids
  postNewChat: (chat, callback) => {
    const { empID, catchID } = chat;
    values = [empID, catchID];
    db.query(
      "INSERT INTO chat_user (`chatEmpID`, `chatCatchID`, `dateCreated`) VALUES (?, ?, NOW())",
      [values],
      callback
    );
  },
  //add chat conversation
  // require sender and recevier
  postConvo: (convoData, callback) => {
    const { chatID, recID, sendID, message, dateSent } = convoData;
    values = [chatID, recID, sendID, message, dateSent];
    db.query(
      "INSERT INTO chat_conversation (`chat_convoID`, `receiverID`, `senderID`, `message`, `dateSent`)",
      [values],
      callback
    );
  },
};

module.exports = Chat;
