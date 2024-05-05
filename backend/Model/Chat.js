//const db = require("../db.js");
const { createClient } = require("@supabase/supabase-js");
// Initialize Supabase client

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey);

const Chat = {
  //get the convo of user
  // also the convo contents
  // need convo id and userID
  getChatById: async (id, userid) => {
    try {
      const { data, error } = await supabase
        .from("errand_chat")
        .select("*")
        .eq("chatID", id)
        .or(`chat_EmpID.eq.${userid},chat_CatchID.eq.${userid}`);

      if (error) throw error;

      return data;
    } catch (error) {
      console.error("Error fetching chat:", error);
      return null;
    }
  },
  //   getChatById: (id, userID, callback) => {
  //     db.query(
  //       `SELECT * FROM errand_chat WHERE chatID = ? AND (chatEmpID = ? OR chatCatchID = ?)`,
  //       [id, userID, userID],
  //       callback
  //     );
  //   },
  //start a conversation
  // create a convo and add two user ids
  postNewChat: async (empID, catchID) => {
    try {
      const { data, error } = await supabase
        .from("errand_chat")
        .insert([{ chat_EmpID: empID }, { chat_CatchID: catchID }])
        .select();

      if (error) throw error;
      return data;
    } catch (err) {
      console.log("ERROR: ", err);
      return null;
    }
    // const { empID, catchID } = chat;
    // values = [empID, catchID];
    // db.query(
    //   "INSERT INTO chat_user (`chat_EmpID`, `chat_CatchID`, `dateCreated`) VALUES (?, ?, NOW())",
    //   [values],
    //   callback
    // );
  },
  //add chat conversation
  // require sender and recevier
  postConvo: async (chatID, recID, sendID, message) => {
    try {
      const { data, error } = await supabase
        .from("chat_conversation")
        .insert([
          { senderID: sendID },
          { receiverID: recID },
          { message: message },
          { chat_convoID: chatID },
        ]);
      if (error) throw error;
      return data;
    } catch (err) {
      console.log("ERROR: ", err);
      return null;
    }
  },
  // postConvo: (convoData, callback) => {
  //   const { chatID, recID, sendID, message, dateSent } = convoData;
  //   values = [chatID, recID, sendID, message, dateSent];
  //   db.query(
  //     "INSERT INTO chat_conversation (`chat_convoID`, `receiverID`, `senderID`, `message`, `dateSent`)",
  //     [values],
  //     callback
  //   );
  // },
};

module.exports = Chat;
