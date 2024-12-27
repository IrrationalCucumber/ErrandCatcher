const db = require("../dbConfig");

const Verify = {
  getAllRequest: (callback) => {
    db.query(
      `SELECT v.*, ua.* FROM verification_request v
      JOIN useraccount ua ON v.requestUserID = ua.userID
      WHERE v.requestStatus = 'Pending'
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
  postNewRequest: (id, image1, image2, doc1, doc2, dr1, dr2, callback) => {
    //const [id_picture_front, id_picture_back] = images;
    //console.log(id);
    db.query(
      `INSERT INTO verification_request (requestUserID, id_picture_front, id_picture_back, docu_1, docu_2, driversLicense1, driversLicense2) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
      [id, image1, image2, doc1, doc2, dr1, dr2],
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
    const { skills } = userData;
    db.query(
      `UPDATE useraccount
      SET  userQualification = ? 
    WHERE userID = ?`,
      [skills, id],
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
