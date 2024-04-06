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
  getErrandById: (id, callback) => {
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
      DatePosted,
      Contactno,
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
};

module.exports = Errand;
