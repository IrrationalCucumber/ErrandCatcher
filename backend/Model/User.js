// user.js

const db = require("../dbConfig");

const User = {
  //get all users from db
  //callback = retrun statment
  getAllUsers: (callback) => {
    db.query("SELECT * FROM useraccount", callback);
  },
  //get user data by id
  getUserById: (id, callback) => {
    db.query("SELECT * FROM  useraccount WHERE userID = ?", [id], callback);
  },
  //sign in
  getSignIn: (username, email, callback) => {
    db.query(
      "SELECT * FROM UserAccount WHERE username = ? OR userEmail = ?",
      [username, email],
      (error, results) => {
        if (error || results.length === 0) {
          callback(error, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  },
  // Add more CRUD operations as needed...
  //sign up new user
  //   postSignUp: (userData, callback) => {

  //     db.query("INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`,`userContactNum`, `userAge`, `userBirthday`, `userAddress`, `accountType`, `dateCreated` ) VALUES (?)")
  //   },
  //update user data
  putUpdateUserById: (id, userData, callback) => {
    const {
      username,
      password,
      fname,
      lname,
      gender,
      email,
      contact,
      age,
      bday,
      address,
      desc,
      //profileImage,
    } = userData;
    //, profileImage = ?
    db.query(
      `UPDATE useraccount
      SET username = ?, userLastname = ?, userFirstname = ?, userGender =?, userEmail = ?,
      userContactNum =?, userAge =?, userBirthday = ?, userAddress = ?, userDesc = ?
    WHERE userID = ?`,
      [
        username,
        // password,
        lname,
        fname,
        gender,
        email,
        contact,
        age,
        bday,
        address,
        desc,
        //profileImage,
        id,
      ],
      callback
    );
  },
  // Fetch the current password hash for validation
  getPasswordById: (id, callback) => {
    db.query(
      `SELECT password FROM useraccount WHERE userID = ?`,
      [id],
      callback
    );
  },
  // change and reset password user
  putResetPasswordById: (id, userData, callback) => {
    const { password } = userData;

    db.query(
      `UPDATE useraccount
      SET password = ?
    WHERE userID = ?`,
      [password, id],
      callback
    );
  },
  //update pic of user
  putUpdatePic: (id, profile, callback) => {
    db.query(
      `UPDATE useraccount SET  profileImage = ? WHERE userID = ?`,
      [profile, id],
      callback
    );
  },
  //Update user accountStatus
  putChangeStatusById: (id, status, callback) => {
    db.query(
      `UPDATE useraccount SET accountStatus = ? WHERE userID =?`,
      [status, id],
      callback
    );
  },
  // putDeactivateById: (id, callback) => {
  //   db.query(
  //     `UPDATE useraccount SET accountStatus = 'Deactivate' WHERE userID =?`,
  //     [id],
  //     callback
  //   );
  // },

  //sign-up/ add new user
  postNewUser: (userData, callback) => {
    const {
      regUsername,
      regPassword,
      lastName,
      firstName,
      gender,
      email,
      contact,
      //age,
      bday,
      address,
      type,
      dateCreated,
    } = userData;
    values = [
      regUsername,
      regPassword,
      lastName,
      firstName,
      gender,
      email,
      contact,
      //age,
      bday,
      address,
      type,
      dateCreated,
    ];
    db.query(
      "INSERT INTO useraccount (`username`, `password`, `userLastname`, `userFirstname`,`userGender`, `userEmail`,`userContactNum`, `userBirthday`, `userAddress`, `accountType`, `dateCreated` ) VALUES (?)",
      [values],
      callback
    );
  },

  //fetch if catcher has errand
  getCatcherHasErrand: (id, callback) => {
    db.query(
      "SELECT userHasErrand FROM useraccount WHERE accountType = 'Catcher' AND userID = ?",
      [id],
      callback
    );
  },
  // update hasErrand if Catcher have or finish errand
  putCatcherHasDoneErrand: (id, state, cb) => {
    db.query(
      `UPDATE useraccount SET userHasErrand = ? WHERE userID = ?`,
      [state, id],
      cb
    );
  },
  // update hasErrand if Employer cancel & catcher can apply again
  putEmployerHasCancelErrand: (id, state, cb) => {
    db.query(
      `UPDATE useraccount SET userHasErrand = ? WHERE userID = ?`,
      [state, id],
      cb
    );
  },
  //set catcher/s has finish errand
  putCatchersHasDoneErrand: (id, cb) => {
    db.query(
      `UPDATE useraccount
        SET userHasErrand = 'false'
        WHERE userID IN (
        SELECT DISTINCT et.transCatcherID
        FROM errandtransaction et
        WHERE et.transErrandID = ?)`,
      [id],
      cb
    );
  },
  // Save verification token
  saveVerificationToken: (userId, token, callback) => {
    db.query(
      "INSERT INTO email_verification_tokens (verUserID, token) VALUES (?, ?)",
      [userId, token],
      callback
    );
  },

  // Verify token
  verifyToken: (token, callback) => {
    db.query(
      "SELECT verUserID FROM email_verification_tokens WHERE token = ?",
      [token],
      callback
    );
  },

  // Update user status
  updateUserStatus: (userId, status, callback) => {
    db.query(
      "UPDATE useraccount SET accountStatus = ? WHERE userID = ?",
      [status, userId],
      callback
    );
  },

  // Delete verification token
  deleteVerificationToken: (token, callback) => {
    db.query(
      "DELETE FROM email_verification_tokens WHERE token = ?",
      [token],
      callback
    );
  },
};

module.exports = User;
