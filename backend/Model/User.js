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
      cnum,
      age,
      bday,
      address,
      desc,
      pic,
    } = userData;
    db.query(
      `UPDATE useraccount
      SET username = ?, password = ?, userLastname = ?, userFirstname = ?, userGender =?, userEmail = ?,
      userContactNum =?, userAge =?, userBirthday = ?, userAddress = ?, userDesc = ?, profileImage = ?
    WHERE userID = ?`,
      [
        username,
        password,
        lname,
        fname,
        gender,
        email,
        cnum,
        age,
        bday,
        address,
        desc,
        pic,
        id,
      ],
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
      username,
      password,
      fname,
      lname,
      gender,
      email,
      cnum,
      age,
      bday,
      address,
      type,
      dateCreated,
    } = userData;
    values = [
      username,
      password,
      lname,
      fname,
      gender,
      email,
      cnum,
      age,
      bday,
      address,
      type,
      dateCreated,
    ];
    db.query(
      "INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`,`userContactNum`, `userAge`, `userBirthday`, `userAddress`, `accountType`, `dateCreated` ) VALUES (?)",
      [values],
      callback
    );
  },
};

module.exports = User;
