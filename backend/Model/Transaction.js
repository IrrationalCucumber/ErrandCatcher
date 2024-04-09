const db = require("../dbConfig");

const Trans = {
  //get all transaction
  getAllTrans: (callback) => {
    db.query(`SELECT * FROM errandtransaction`, callback);
  },
  // view tranactaction details
  getTransDetail: (id, callback) => {
    db.query(
      `SELECT * FROM errandtranscation WHERE transactID = ?`,
      [id],
      callback
    );
  },
  //for catcher
  //get all transaction
  getTransById: (id, callback) => {
    db.query(
      `SELECT * FROM errandtranscation WHERE transCatcherID = ?`,
      [id],
      callback
    );
  },
  //for catcher
  //get ongiong/cancelled/etc errand
  getTransWithStatus: (id, status, callback) => {
    db.query(
      `SELECT * FROM errandtranscation WHERE errandStatus = ? AND transCatcherID = ?`,
      [status, id],
      callback
    );
  },
  //for emp
  // display taken errand
  getTakenErrand: (id, callback) => {
    db.query(
      `SELECT t.*, c.*
    FROM erranctransaction t
    JOIN commission c ON t.transErrandID = c.commissionID
    WHERE c.employerID = ?
    `,
      [id],
      callback
    );
  },
  //for emp
  // display onging/Cancelled/etc errand
  getTakendWithStatus: (id, status, callback) => {
    db.query(
      `SELECT t.*, c.*
    FROM erranctransaction t
    JOIN commission c ON t.transErrandID = c.commissionID
    WHERE c.employerID = ? AND errandStatus = ?
    `,
      [id, status],
      callback
    );
  },
  //add new transaction
  postNewTrans: (transData, callback) => {
    const { comID, catcherID, dateAccepted } = transData;
    values = [comID, catcherID, dateAccepted];
    db.query(
      "INSERT INTO errandtransaction (`transErrandID`, `transCatcherID`, `transDateAccepted`) VALUES (?)",
      [values],
      callback
    );
  },
  //update transactionn if complete
  putUpdateTransaction: (id, transData, callback) => {
    const { errandStatus, dateComplete } = transData;
    values = [errandStatus, dateComplete];
    db.query(
      `UPDATE errandTransaction
      SET errandStatus = ?, transDateComplete = ?
      WHERE transactID = ?`,
      [values, id],
      callback
    );
  },
};

module.exports = Trans;
