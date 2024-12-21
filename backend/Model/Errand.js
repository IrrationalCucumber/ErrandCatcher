const db = require("../dbConfig");

const Errand = {
  //get all errands
  getAllErrands: (callback) => {
    db.query(
      `SELECT c.*, ua.username, ua.userFirstname, ua.userLastname
      FROM commission c
      JOIN useraccount ua ON c.employerID = ua.userID
      ORDER BY c.DatePosted DESC`,
      callback
    );
  },
  //get all available errands
  getAllAvailable: (callback) => {
    db.query(
      "SELECT * FROM commission WHERE commissionStatus = 'Available'",
      callback
    );
  },
  getRecent: (callback) => {
    db.query(
      "Select * from commission WHERE commissionStatus = 'Available' order by DatePosted DESC LIMIT 10",
      callback
    );
  },
  //getType
  getType: (type, callback) => {
    db.query(
      "SELECT * FROM commission WHERE commissionType LIKE ? AND commissionStatus = 'Available'",
      [`%${type}%`],
      callback
    );
  },
  //get specific errand by id
  getErrandById: (id, callback) => {
    db.query(
      `SELECT c.*, ua.username, ua.userFirstname, ua.userLastname 
    FROM commission c JOIN useraccount ua ON c.employerID = ua.userID 
    WHERE c.commissionID = ?`,
      [id],
      callback
    );
  },
  //get specific errand by userid
  getErrandByUserID: (id, callback) => {
    db.query(
      `SELECT * FROM commission WHERE employerID = ? ORDER BY DatePosted DESC`,
      [id],
      callback
    );
  },
  //post new errand
  postErrand: (errandData, callback) => {
    const {
      empID,
      comTitle,
      comStart,
      comDeadline,
      comLocation,
      comTo,
      comType,
      comDescription,
      comPay,
      Contactno,
      DatePosted,
      comLong,
      comLat,
      comDestLong,
      comDestLat,
      comTags,
    } = errandData;
    const values = [
      empID,
      comTitle,
      comStart,
      comDeadline,
      comLocation,
      comTo,
      comType,
      comDescription,
      comPay,
      DatePosted,
      Contactno,
      comLong,
      comLat,
      comDestLong,
      comDestLat,
      comTags,
    ];
    db.query(
      "INSERT INTO commission (`employerID`,`commissionTitle`, `commissionStartDate`," +
        " `commissionDeadline`, `commissionLocation`, `commissionTo`,`commissionType`," +
        " `commissionDesc`, `commissionPay`, `DatePosted`, `ContactNumber`, " +
        "`commissionLong`, `commissionLat`, `commissionDestLong`, `commissionDestLat`, `commissionTags`) VALUES (?)",
      [values],
      callback
    );
  },
  //update errand
  updateErrandByID: (id, errandData, callback) => {
    const {
      comTitle,
      comStart,
      comDeadline,
      comLocation,
      comTo,
      comType,
      comDescription,
      comPay,
      comStatus,
      Contactno,
      comLong,
      comLat,
      comDestLong,
      comDestLat,
      comTags,
    } = errandData;
    db.query(
      `UPDATE commission SET commissionTitle = ?, commissionStartDate = ?, 
      commissionDeadline = ?, commissionLocation = ?, commissionTo = ?,commissionType = ?,
       commissionDesc = ?, commissionPay = ?, commissionStatus = ?, ContactNumber = ?, commissionLong = ?, commissionLat
        = ?,commissionDestLong = ?, commissionDestLat =?, commissionTags = ? WHERE commissionID = ?`,
      [
        comTitle,
        comStart,
        comDeadline,
        comLocation,
        comTo,
        comType,
        comDescription,
        comPay,
        comStatus,
        Contactno,
        comLong,
        comLat,
        comDestLong,
        comDestLat,
        comTags,
        id,
      ],
      callback
    );
  },
  //pass status to update the commission status
  //can be reused
  updateErrandStatus: (id, status, callback) => {
    db.query(
      `UPDATE commission SET commissionStatus = ? WHERE commissionID = ?`,
      [status, id],
      callback
    );
  },
  //delete errand based on id
  deleteErrandById: (id, callback) => {
    db.query(`DELETE FROM commission WHERE commissionID = ?`, [id], callback);
  },
  //get count completed errand of emplyer
  getCompletedErrand: (id, callback) => {
    db.query(
      `select count(*) as 'c' from commission where employerID = (?) AND commissionStatus = 'Complete`,
      [id],
      callback
    );
  },
  // count of posted errand
  getPostCount: (id, callback) => {
    db.query(
      `select count(*) as 'c' from commission where employerID = (?) `,
      [id],
      callback
    );
  },
  /**
   * SEARCH/FILTERING QUERIES
   */
  //search based on one term only
  // similar wording
  getSearchAll: (term, status, callback) => {
    if (!status) {
      // search all regardless of status
      db.query(
        `SELECT * FROM commission WHERE (commissionTitle LIKE ? OR commissionType LIKE ? OR commissionLocation LIKE ?) `,
        [`%${term}%`, `%${term}%`, `%${term}%`],
        callback
      );
    } else {
      // search all available
      db.query(
        `SELECT * FROM commission WHERE (commissionTitle LIKE ? OR commissionType LIKE ? OR commissionLocation LIKE ?) AND commissionStatus = 'Available'`,
        [`%${term}%`, `%${term}%`, `%${term}%`],
        callback
      );
    }
  },
  //search by term
  //only search in specific category/type
  //available only
  getSearchWithType: (term, type, callback) => {
    if (term != "") {
      db.query(
        `SELECT * FROM commission WHERE (commissionTitle LIKE ? OR commissionLocation LIKE ?) AND commissionType LIKE ? AND commissionStatus = 'Available'`,
        [`%${term}%`, `%${term}%`, `%${type}%`],
        callback
      );
    }
  },
  //get employer errands by status
  getMyErrandStatus: (id, status, callback) => {
    db.query(
      `SELECT * FROM commission WHERE commissionStatus = ? AND employerID = ?`,
      [status, id],
      callback
    );
  },
};

module.exports = Errand;
