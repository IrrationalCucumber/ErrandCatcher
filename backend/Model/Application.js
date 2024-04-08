const { useCallback } = require("react");
const db = require("../dbConfig");

const Apply = {
  // /applicants/:id
  //get applicants of employer
  getApplicants: (id, callback) => {
    db.query(
      `SELECT a.*, c.commissionTitle, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname 
        FROM Application a 
        JOIN commission c ON a.applicationErrandID = c.commissionID
        JOIN useraccount ua ON a.catcherID = ua.userID 
        WHERE a.applicationErrandID IN (SELECT commissionID FROM commission WHERE employerID = ?)
        AND a.applicationStatus = 'Pending'`,
      [id],
      callback
    );
  },
  // /your-application/;id
  //get catcher's applications
  getApplication: (id, callback) => {
    db.query(
      `SELECT a.*, c.commissionTitle, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname, c.employerID
     FROM Application a 
     JOIN commission c ON a.applicationErrandID = c.commissionID
     JOIN useraccount ua ON c.employerID = ua.userID
     WHERE a.catcherID IN (SELECT userID FROM useraccount WHERE userID = ?)`,
      [id],
      callback
    );
  },
  // check if catcher applied already
  getIfApplied: (id, comID, callback) => {
    db.query(
      `SELECT applicationID FROM application WHERE catcherID = ? AND applicationErrandID = ?`,
      [id, comID],
      callback
    );
  },
  // /apply
  //add an application
  postApply: (applyData, callback) => {
    const { catcherID, comID, applicationDate } = applyData;
    values = [catcherID, comID, applicationDate];
    db.query(
      "INSERT INTO application (`catcherID`,`applicationErrandID`, `applicationDate`) VALUES (?)",
      [values],
      callback
    );
  },
  // change status of application - Employer part
  // Accpet or Deny
  putChangeApply: (comID, applyID, status, callback) => {
    db.query(
      `UPDATE application SET applicationStatus = ? WHERE applicationErrandID = ? AND applicationID = ?`,
      [status, comID, applyID],
      callback
    );
  },
  // cancel appliccation of catcher
  // Catcher
  putCancelApply: (id, applyID, callback) => {
    db.query(
      `UPDATE application SET applicationStatus = 'Cancelled' WHERE catcherID = ? AND applicationID = ?`,
      [id, applyID],
      callback
    );
  },
  //deny other application with the same errand
  //Employer
  putDenyOther: (comID, id, callback) => {
    db.query(
      `UPDATE application SET applicationStatus = 'Denied' WHERE applicationErrandID = ? AND catcherID != ?`,
      [comID, id],
      callback
    );
  },
  //delete application
  deleteApply: (id, comID, callback) => {
    db.query(
      `DELETE FROM application WHERE catcherID = ? AND applicationID = ?`,
      [id, comID],
      callback
    );
  },
};

module.exports = Apply;
