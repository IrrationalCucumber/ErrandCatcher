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
  //get all transaction
  getTransById: (id, callback) => {
    db.query(
      `SELECT  c.*, t.*,ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname
      FROM errandtransaction t
      JOIN commission c ON t.transErrandID = c.commissionID
      JOIN useraccount ua ON c.employerID = ua.userID
       WHERE t.transCatcherID = ? ORDER BY transactID DESC`,
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
         WHERE t.transCatcherID = ? AND t.errandStatus = ?
         ORDER BY t.transactID DESC`,
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
    WHERE c.employerID = ? ORDER BY t.transactID DESC
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
    WHERE c.employerID = ? AND t.transStatus = ? ORDER BY t.transactID DESC
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
      `UPDATE errandTransaction SET transStatus = ?, transDateComplete = NOW() WHERE transactID = ?`,
      [status, id],
      callback
    );
  },
  //update errand status of transaction table
  //for acatcher
  putUpdateErrandTrans: (id, status, transStatus, userID, callback) => {
    db.query(
      `UPDATE errandTransaction SET errandStatus = ?, transStatus = ? WHERE transactID = ? AND transCatcherID = ?`,
      [status, transStatus, id, userID],
      callback
    );
  },
  //show all invoice with user info
  getAllInvoice: (cb) => {
    db.query(
      `SELECT i.*, 
      ue.userFirstName AS employerFirstName,
      ue.userLastName AS employerLastName,
      uc.userFirstName AS catcherFirstName,
      uc.userLastName AS catcherLastName 
      FROM invoice i
      LEFT JOIN useraccount ue ON i.invoiceemployerID = ue.userID
      LEFT JOIN useraccount uc ON i.invoiceCatcherID = uc.userID;`,
      cb
    );
  },
  //get the sum/total of every transaction invoice
  getAmountSum: (cb) => {
    db.query(`SELECT SUM(total) as 't' FROM INVOICE`, cb);
  },
  // get catcher total earnings
  getAmountSumCat: (id, cb) => {
    db.query(
      `SELECT SUM(total) as 't' FROM INVOICE WHERE invoiceCatcherID = ?`,
      [id],
      cb
    );
  },
  //get catcher all invoice info
  getAllTransCat: (id, cb) => {
    db.query(
      `SELECT i.*, ua.userFirstname, ua.userLastname FROM  invoice i
      LEFT JOIN useraccount ua ON i.invoiceemployerID = ua.userID
      WHERE i.invoiceCatcherID = ?`,
      [id],
      cb
    );
  },
};

module.exports = Trans;
