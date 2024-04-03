// userController.js

const User = require("../Model/User");

const userController = {
  getUsers: (req, res) => {
    User.getAllUsers((err, users) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(users);
    });
  },
  //get account details
  getUserById: (req, res) => {
    const userId = req.params.id;
    User.getUserById(userId, (err, user) => {
      if (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      res.json(user);
    });
  },
  //return userID if exist or correct creds
  getSignIn: (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    User.getSignIn(username, email, password, (err, userID) => {
      if (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!userID) {
        res.status(404).send("User not found");
        return;
      }
      res.json(userID);
    });
  },
  //get account status of the user
  getStatus: (req, res) => {
    const userID = req.params.id;
    User.getStatus(userID, (err, status) => {
      if (err) {
        console.error("Error fetching status", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(status[0].accountStatus);
    });
  },
  // Add more controller functions as needed...
};

module.exports = userController;
