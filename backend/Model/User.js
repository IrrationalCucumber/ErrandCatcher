// user.js

const db = require("../dbConfig");

const User = {
  getAllUsers: (callback) => {
    db.query("SELECT * FROM useraccount", callback);
  },
  //get user data by id
  getUserById: (id, callback) => {
    db.query("SELECT * FROM  useraccount WHERE userID = ?", [id], callback);
  },
  //sign in
  getSignIn: (username, email, password, callback) => {
    db.query(
      "SELECT userID FROM UserAccount WHERE (username = ? OR userEmail = ?) AND password = ?",
      [username, email, password],
      callback
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
      SET username = ?, password = ?, userLastname = ?, userFirstname = ?, userGender =?, userEmail = ?,
      userContactNum =?, userAge =?, userBirthday = ?, userAddress = ?, userDesc = ?
    WHERE userID = ?`,
      [
        username,
        password,
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
      fname,
      lname,
      //gender,
      email,
      cnum,
      //age,
      //bday,
      //address,
      type,
      dateCreated,
    } = userData;
    values = [
      regUsername,
      regPassword,
      lname,
      fname,
      //gender,
      email,
      cnum,
      //age,
      // bday,
      //address,
      type,
      dateCreated,
    ];
    db.query(
      "INSERT INTO useraccount (`username`, `password`, `userLastname`, `userFirstname`, `userEmail`,`userContactNum`, `accountType`, `dateCreated` ) VALUES (?)",
      [values],
      callback
    );
  },
};

module.exports = User;
