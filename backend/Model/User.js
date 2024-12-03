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
  // change and reset password user
  putResetPasswordById: (id, userData, callback) => {
    const { password } = userData;

    db.query(
      `UPDATE useraccount
      SET password = ?
    WHERE userID = ?`,
      [
        password,
        id,
      ],
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
      //address,
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
      //address,
      type,
      dateCreated,
    ];
    db.query(
      "INSERT INTO useraccount (`username`, `password`, `userLastname`, `userFirstname`,`userGender`, `userEmail`,`userContactNum`, `userBirthday`, `accountType`, `dateCreated` ) VALUES (?)",
      [values],
      callback
    );
  },
  /**
   * SEARCH QUERY
   */
  //search by Name/email/
  getSeatchByTerm: (searchTerms, type, status, callback) => {
    if (searchTerms != "") {
      //term only
      if (status == "" && type == "") {
        db.query(
          `SELECT * FROM useraccount WHERE username LIKE ? OR userEmail LIKE ? OR userFirstname LIKE ? OR userLastname LIKE ?`,
          [
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
          ],
          callback
        );
      } else if (status == "" && type != "") {
        // if term and type only
        db.query(
          `SELECT * FROM useraccount WHERE (username LIKE ? OR userEmail LIKE ? OR userFirstname LIKE ? OR userLastname LIKE ?) AND accountType = ?`,
          [
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            type,
          ],
          callback
        );
      } else if (type == "" && status != "") {
        //if term and status
        db.query(
          `SELECT * FROM useraccount WHERE (username LIKE ? OR userEmail LIKE ? OR userFirstname LIKE ? OR userLastname LIKE ?) AND accountStatus = ?`,
          [
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            `%${searchTerms}%`,
            status,
          ],
          callback
        );
      }
    } else if (type != "") {
      if (searchTerms == "" && status == "") {
        //if type only
        db.query(
          `SELECT * FROM useraccount WHERE accountType = ?`,
          [type],
          callback
        );
      }
      //type + status only
      else if (type != "" && status != "") {
        //if type only
        db.query(
          `SELECT * FROM useraccount WHERE accountType = ? and accountStatus = ?`,
          [type, status],
          callback
        );
      }
    } else if (status != "") {
      if (searchTerms == "" && type == "") {
        //if type only
        db.query(
          `SELECT * FROM useraccount WHERE accountStatus = ?`,
          [status],
          callback
        );
      }
    } else if (searchTerms != "" && type != "" && status != "") {
      //all three
      db.query(
        `SELECT * FROM useraccount WHERE (username LIKE ? OR userEmail LIKE ? OR userFirstname LIKE ? OR userLastname LIKE ?) AND accountStatus = ? AND accountType = ?`,
        [
          `%${searchTerms}%`,
          `%${searchTerms}%`,
          `%${searchTerms}%`,
          `%${searchTerms}%`,
          status,
          type,
        ],
        callback
      );
    } else {
      db.query(`SELECT * FROM useraccount`, callback);
    }
  },
};

module.exports = User;
