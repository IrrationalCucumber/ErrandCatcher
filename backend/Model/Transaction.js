const db = require("../dbConfig");

const Trans = {
  //get all transaction
  getAllTrans: (callback) => {
    db.query(`SELECT * FROM errandtransaction`, callback);
  },
  // view tranactaction details
  getTransDetail: (id, callback) => {
    db.query(
      `SELECT * FROM errandtransaction WHERE transactID = ?`,
      [id],
      callback
    );
  },
  //for catcher
  //get all transaction done
  // getTransCount: (id, status, callback) => {
  //   db.query(
  //     ` SELECT
  //     (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Complete' AND transCatcherID = ?) AS done,
  //     (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Expired' AND transCatcherID = ?) AS expired,
  //     (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Cancelled' AND transCatcherID = ?) AS cancel`,
  //     [id, id, id],
  //     callback
  //   );
  // },
  //for catcher
  //get all transaction
  getTransById: (id, callback) => {
    db.query(
      `SELECT  c.*, t.*,ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname
      FROM errandtransaction t
      JOIN commission c ON t.transErrandID = c.commissionID
      JOIN useraccount ua ON c.employerID = ua.userID
       WHERE t.transCatcherID = ?`,
      [id],
      callback
    );
  },
  //for catcher
  //get ongiong/cancelled/etc errand
  getTransWithStatus: (id, status, callback) => {
    db.query(
      `SELECT  c.*, t.*,ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname
        FROM errandtransaction t
        JOIN commission c ON t.transErrandID = c.commissionID
        JOIN useraccount ua ON c.employerID = ua.userID
         WHERE t.transCatcherID = ? AND t.errandStatus = ?`,
      [id, status],
      callback
    );
  },
  //for emp
  // display taken errand
  getTakenErrand: (id, callback) => {
    db.query(
      `SELECT t.*, c.*, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname
    FROM errandtransaction t
    JOIN commission c ON t.transErrandID = c.commissionID
    JOIN useraccount ua ON t.transCatcherID = ua.userID
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
      `SELECT t.*, c.*, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname
        FROM errandtransaction t
        JOIN commission c ON t.transErrandID = c.commissionID
        JOIN useraccount ua ON t.transCatcherID = ua.userID
    WHERE c.employerID = ? AND t.transStatus = ?
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
  //emp
  putUpdateTransaction: (id, status, date, callback) => {
    const { dateComplete } = date;
    db.query(
      `UPDATE errandTransaction SET transStatus = ?, transDateComplete = ? WHERE transactID = ?`,
      [status, dateComplete, id],
      callback
    );
  },
  //update errand status of transaction table
  //for acatcher
  putUpdateErrandTrans: (id, status, userID, callback) => {
    db.query(
      `UPDATE errandTransaction SET errandStatus = ? WHERE transactID = ? AND transCatcherID = ?`,
      [status, id, userID],
      callback
    );
  },
};

module.exports = Trans;
