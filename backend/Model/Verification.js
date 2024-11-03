const db = require("../dbConfig");

const Verify = {
  getAllRequest: (callback) => {
    db.query(
      `SELECT v.*, ua.* FROM verification_request v
      JOIN useraccount ua ON v.requestUserID = ua.userID
      WEHRE v.requestStatus = 'Pending'
      ORDER BY v.requestID ASC
     `,
      callback
    );
  },
  //get detatils by requestID
  getRequestByID: (id, callback) => {
    db.query(
      `SELECT * FROM verifcation_request WHERE requestID =?`,
      [id],
      callback
    );
  },
  //add new request
  postNewRequest: (id, image1, image2, doc1, callback) => {
    //const [id_picture_front, id_picture_back] = images;
    //console.log(id);
    db.query(
      `INSERT INTO verification_request (requestUserID, id_picture_front, id_picture_back, docu_1) VALUES ( ?, ?, ?, ?)`,
      [id, image1, image2, doc1],
      callback
    );
  },

  //update the status of verification to denied/Granted/etc
  putUpdateRequest: (id, status, callback) => {
    db.query(
      `UPDATE verification_request SET requestStatus = ? WHERE requestID =?`,
      [status, id],
      callback
    );
  },
  //get rqest count
  getRequestCount: (callback) => {
    db.query(
      `SELECT count(*) as c FROM verification_request
        WHERE requestStatus = 'Pending'`,
      callback
    );
  },
  //update user data during verification
  putUpdateUserById: (id, userData, callback) => {
    const { fname, lname, gender, email, contact, bday, address } = userData;
    db.query(
      `UPDATE useraccount
      SET  userLastname = ?, userFirstname = ?, userGender =?, userEmail = ?,
      userContactNum =?, userBirthday = ?, userAddress = ?
    WHERE userID = ?`,
      [lname, fname, gender, email, contact, bday, address, id],
      callback
    );
  },
  //get data of requestUser
  getRequestByUserID: (userID, callback) => {
    db.query(
      `SELECT * from verification_request
        WHERE requestUserID = ?`,
      [userID],
      callback
    );
  },
};

module.exports = Verify;
