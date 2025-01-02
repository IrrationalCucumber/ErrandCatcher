// userController.js

const User = require("../Model/User");
//enryption
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendVerificationEmail = require("../sendEmail");
const { error } = require("console");
const saltRounds = 10;
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
    User.getSignIn(username, email, (err, user) => {
      if (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      // // Log the retrieved user for debugging
      // console.log("User fetched from DB:", user);
      //decrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        // console.log("Plain Text Password:", password);
        // console.log("Hashed Password from DB:", user.password);
        if (isMatch) {
          res.json(user);
        } else if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).send("Internal Server Error");
          return;
        } else if (!isMatch) {
          // console.log("Password mismatch.");
          res.status(401).json({ error: "Invalid username or password" });
          return;
        }
      });
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
  // Update user info
  putUpdateUser: (req, res) => {
    const userID = req.params.id;
    const updatedData = req.body;

    // Check if the password is provided in the updatedData
    if (updatedData.password) {
      // Encrypt the new password
      bcrypt.hash(updatedData.password, saltRounds, (err, hash) => {
        if (err) {
          console.error("Error hashing password", err);
          res.status(500).json({ error: "Error processing password" });
          return;
        }
        // Replace text password with hashed password
        updatedData.password = hash;

        // Proceed with the update
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
      });
    } else {
      // If password is not provided, update other user data only
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
        res
          .status(200)
          .json({ message: "User updated successfully (excluding password)" });
      });
    }
  },
  // Change password
  putResetPassword: (req, res) => {
    const userID = req.params.id;
    const { currentpass, password, conPassword } = req.body;

    // Retrieve the current hashed password from the database
    User.getPasswordById(userID, async (err, result) => {
      if (err) {
        console.error("Error fetching current password:", err);
        return res.status(500).json({
          error: "Error fetching current password",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const storedHashedPassword = result[0].password;

      // Compare the current password input with the stored hash
      const isMatch = await bcrypt.compare(currentpass, storedHashedPassword);

      // Validate current password
      if (!isMatch) {
        return res.status(400).json({
          error: "Current password is incorrect",
        });
      }

      // Validate new password and confirm password
      if (password !== conPassword) {
        return res.status(400).json({
          error: "New password and confirm password do not match",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          error: "Password must be at least 8 characters long.",
        });
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        return res.status(400).json({
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
        });
      }

      // Hash the new password
      bcrypt.hash(password, saltRounds, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Error hashing password:", hashErr);
          return res.status(500).json({ error: "Error processing password" });
        }

        // Update the password in the database
        const updatedData = { password: hashedPassword };
        User.putResetPasswordById(
          userID,
          updatedData,
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating password:", updateErr);
              return res.status(500).json({
                error: "An error occurred while updating the password",
              });
            }

            if (updateResult.affectedRows === 0) {
              return res.status(404).json({ error: "User not found" });
            }

            return res
              .status(200)
              .json({ message: "Password updated successfully" });
          }
        );
      });
    });
  },
  //Update user status
  putChangeStatusByUserID: (req, res) => {
    const userID = req.params.id;
    const status = req.params.status;
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
  // Sign up / add new user
  postSignUp: (req, res) => {
    const newUserData = req.body;

    // Hash/encrypt password
    bcrypt.hash(newUserData.regPassword, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error hashing password", err);
        res.status(500).json({ error: "Error processing password" });
        return;
      }
      // Replace text password with hashed password
      newUserData.regPassword = hash;

      User.postNewUser(newUserData, (error, result) => {
        if (error) {
          console.error("Error adding user:", error);
          res
            .status(500)
            .json({ error: "An error occurred while adding new user" });
          return;
        }

        // Generate a verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // Save the verification token to the database
        User.saveVerificationToken(
          result.insertId,
          verificationToken,
          (tokenError) => {
            if (tokenError) {
              console.error("Error saving verification token:", tokenError);
              res.status(500).json({
                error: "An error occurred while saving verification token",
              });
              return;
            }

            // Send verification email
            sendVerificationEmail(newUserData.email, verificationToken);

            // User added successfully
            res.status(200).json({
              message:
                "Sign up successful! Please check your email to verify your account.",
            });
          }
        );
      });
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
  // Verify email
  verifyEmail: (req, res) => {
    const { token } = req.query;

    User.verifyToken(token, (err, result) => {
      if (err) {
        console.error("Error verifying token:", err);
        res
          .status(500)
          .json({ error: "An error occurred while verifying token" });
        return;
      }

      if (result.length === 0) {
        res.status(400).json({ error: "Invalid or expired token" });
        return;
      }

      const userId = result[0].verUserID;

      // Update user status to verified
      User.updateUserStatus(userId, "Verified", (updateError) => {
        if (updateError) {
          console.error("Error updating user status:", updateError);
          res
            .status(500)
            .json({ error: "An error occurred while updating user status" });
          return;
        }

        // Delete the verification token
        User.deleteVerificationToken(token, (deleteError) => {
          if (deleteError) {
            console.error("Error deleting verification token:", deleteError);
            res.status(500).json({
              error: "An error occurred while deleting verification token",
            });
            return;
          }

          res.status(200).json({ message: "Email verified successfully!" });
        });
      });
    });
  },
  getCatcherHasErrand: (req, res) => {
    const id = req.params.id;
    User.getCatcherHasErrand(id, (err, user) => {
      if (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      res.json(user[0]);
    });
  },
  //catcher has caught an errand, no more apply
  putCatcherHasErrand: (req, res) => {
    const id = req.params.id;
    const state = "true";
    User.putCatcherHasDoneErrand(id, state, (err, result) => {
      if (err) {
        console.error("Error updating state:", err, result);
        res
          .status(500)
          .json({ error: "An error occurred while updating state" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "State updated successfully" });
    });
  },
  //catcher has finish an errand and can apply again
  putCatcherHasDoneErrand: (req, res) => {
    const id = req.params.id;
    const state = "false";
    User.putCatcherHasDoneErrand(id, state, (err, result) => {
      if (err) {
        console.error("Error updating state:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating state" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "State updated successfully" });
    });
  },
  // employer has cancelled an errand and catcher can apply again
  putEmployerHasCancelErrand: (req, res) => {
    const id = req.params.id;
    const state = "false";
    User.putEmployerHasCancelErrand(id, state, (err, result) => {
      if (err) {
        console.error("Error updating state:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating state" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "State updated successfully" });
    });
  },
  //catchers has finish an errand and can apply again
  putCatchersHasDoneErrand: (req, res) => {
    const id = req.params.id;
    User.putCatchersHasDoneErrand(id, (err) => {
      if (err) {
        console.error("Error updating state:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating state" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "State updated successfully" });
    });
  },
};

module.exports = userController;
