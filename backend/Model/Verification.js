const db = require("../dbConfig");

const Verify = {
  getAllRequest: (callback) => {
    db.query(
      `SELECT v.*, ua.* FROM verification_request v
      JOIN useraccount ua ON v.requestUserID = ua.userID
      WHERE v.requestStatus = 'Pending'`,
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
  postNewRequest: (id, images, callback) => {
    const [id_picture_front, id_picture_back] = images;
    console.log(id);
    db.query(
      `INSERT INTO verification_request (requestUserID, id_picture_front, id_picture_back) VALUES (?, ?, ?)`,
      [id, id_picture_front, id_picture_back],
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
};

module.exports = Verify;
