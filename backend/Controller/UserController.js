// userController.js

const User = require("../Model/User");
//profile upload
const multer = require("multer");
const path = require("path");
// set destination for image storage
const storage = multer.diskStorage({
  // store the passed file in a destination folder
  destination: (req, file, callback) => {
    callback(null, "public/images/profile");
  },
  filename: (req, file, callback) => {
    //fieldname = name of file that is being pass frpm frontend
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

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
    const updatedData = req.body;
    User.putUpdateUserById(userID, updatedData, (error, result) => {
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
  //Update user status
  putChangeStatusByUserID: (req, res) => {
    const userID = req.params.id;
    const status = req.query.status;
    User.putChangeStatusById(userID, status, (error, result) => {
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
      res.status(200).json({ message: "Status updated successfully" });
    });
  },
  //sign in/ add new user
  postSignUp: (req, res) => {
    const newUserData = req.body;
    User.postNewUser(newUserData, (error) => {
      if (error) {
        console.error("Error adding user:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new user" });
        return;
      }
      // User added successfully
      res.status(200).json({ message: "sign up successfully" });
    });
  },

  // Add more controller functions as needed...
  /**
   * UPLOAD IMAGE
   */

  //api endpoint for upload
  // app.post("/upload", upload.single("image"), (req, res) => {
  //   console.log(req.file);
  //   const sql =
  // });
  //update profile image of user
  uploadProfileImage: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const userID = req.params.id;
      const pic = req.file.filename;

      User.putUpdatePic(userID, pic, (error, result) => {
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
    });
  },
  /**
   * SEARCH
   */
  getSearchByTerm: (req, res) => {
    const term = req.query.term;
    const type = req.query.type;
    const status = req.query.status;
    User.getSeatchByTerm(term, type, status, (err, users) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!users) {
        res.status(404).send("Users not found");
        return;
      }
      res.json(users);
    });
  },
};

module.exports = userController;
