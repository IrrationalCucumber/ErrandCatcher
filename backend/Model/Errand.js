const db = require("../dbConfig");

const Errand = {
  //get all errands
  getAllErrands: (callback) => {
    db.query("SELECT * FROM commission", callback);
  },
  //get specific errand by id
  getErrandById: (id, callback) => {
    db.query(`SELECT * FROM commission WHERE commissionID = ?`, [id], callback);
  },
  //
};

module.exports = Errand;
