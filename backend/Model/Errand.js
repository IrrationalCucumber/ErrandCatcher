const db = require("../dbConfig");

const Errands = {
  //get all errands
  getAllErrands: (callback) => {
    db.query("SELECT * FROM commissions");
  },
  //get specific errand by id
  getErrandById: (id, callback) => {
    db.query(
      `SELECT * FROM commissions WHERE commissionID = ?`,
      [id],
      callback
    );
  },
  //
};

module.exports = Errand;
