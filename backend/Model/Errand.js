const db = require("../dbConfig");

const Errand = {
  //get all errands
  getAllErrands: (callback) => {
    db.query("SELECT * FROM commission", callback);
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
    db.query(`SELECT * FROM commission WHERE commissionID = ?`, [id], callback);
  },
  //get specific errand by userid
  getErrandByUserID: (id, callback) => {
    db.query(`SELECT * FROM commission WHERE employerID = ?`, [id], callback);
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
    ];
    db.query(
      "INSERT INTO commission (`employerID`,`commissionTitle`, `commissionStartDate`," +
        " `commissionDeadline`, `commissionLocation`, `commissionTo`,`commissionType`," +
        " `commissionDesc`, `commissionPay`, `DatePosted`, `ContactNumber`,`commissionLong`, `commissionLat`) VALUES (?)",
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
      Contactno,
      comLong,
      comLat,
    } = errandData;
    const values = [];
    db.query(
      `UPDATE commission SET commissionTitle = ?, commissionStartDate = ?, 
      commissionDeadline = ?, commissionLocation = ?, commissionTo = ?,commissionType = ?,
       commissionDesc = ?, commissionPay = ?, ContactNumber = ?, commissionLong = ?, commissionLat
        = ? WHERE commissionID = ?`,
      [
        comTitle,
        comStart,
        comDeadline,
        comLocation,
        comTo,
        comType,
        comDescription,
        comPay,
        Contactno,
        comLong,
        comLat,
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
  //get completed errand of emplyer
  getCompletedErrand: (id, callback) => {
    db.query(
      `select count(*) as 'c' from commission where employerID = (?) AND commissionStatus = 'Complete`,
      [id],
      callback
    );
  },
};

module.exports = Errand;
