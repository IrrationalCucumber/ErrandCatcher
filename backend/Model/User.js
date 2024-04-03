// user.js

const db = require("../dbConfig");

const User = {
  getAllUsers: (callback) => {
    db.query("SELECT * FROM useraccount", callback);
  },
  getUserById: (id, callback) => {
    db.query("SELECT * FROM  useraccount WHERE userID = ?", [id], callback);
  },
  getSignIn: (username, email, password, callback) => {
    db.query(
      "SELECT userID FROM UserAccount WHERE (username = ? OR userEmail = ?) AND password = ?",
      [username, email, password],
      callback
    );
  },
  getStatus: (id, callback) => {
    db.query(
      "SELECT accountStatus FROM useraccount WHERE userID = ?",
      [id],
      callback
    );
  },
  // Add more CRUD operations as needed...
};

module.exports = User;
