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
    User.getUserById(userID, (err, status) => {
      if (err) {
        console.error("Error fetching status", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(status[0].accountStatus);
    });
  },
  // retrun username of user
  getUsername: (req, res) => {
    const userID = req.params.id;
    User.getUserById(userID, (err, username) => {
      if (err) {
        console.error("Error fetching Username", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(username[0].username);
    });
  },
  getType: (req, res) => {
    const userID = req.params.id;
    User.getUserById(userID, (err, type) => {
      if (err) {
        console.error("Error fetching Username", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(type[0].accountType);
    });
  },
  //update user info
  putUpdateUser: (req, res) => {
    const userID = req.params.id;
    const fname = req.query.fname;
    const lname = req.query.lname;
    User.putUpdateUserById(userID, fname, lname, (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating user" });
        return;
      }

      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // User updated successfully
      res.status(200).json({ message: "User updated successfully" });
    });
  },

  // Add more controller functions as needed...
};

module.exports = userController;
