const db = require("../dbConfig");

const UserExperience = {
  //get all user experience
  getAllUserExperience: (callback) => {
    db.query("SELECT * FROM userexperience", callback);
  },
  //get user experience by id
  getUserExperience: (id, callback) => {
    db.query(
      "SELECT * FROM userexperience WHERE expUserID = ?",
      [id],
      callback
    );
  },
  //add user experience
  postUserExperience: (userExperience, callback) => {
    db.query(
      `INSERT INTO userexperience (expUserID, expJobTitle, expEmployer, expLocation, expStartDate, expEndDate, expDesc) VALUES (?,?,?,?,?,?,?)`,
      [
        userExperience.userID,
        userExperience.jobTitle,
        userExperience.employer,
        userExperience.location,
        userExperience.startDate,
        userExperience.endDate,
        userExperience.desc,
      ],
      callback
    );
  },
  //update user experience
  putUpdateExperience: (id, userExperience, callback) => {
    const { jobTitle, employer, location, startDate, endDate, desc } =
      userExperience;
    db.query(
      `UPDATE userexperience
      SET expJobTitle = ?, expEmployer = ?, expLocation = ?, expStartDate = ?, expEndDate = ?, expDesc = ?
      WHERE experienceID = ?`,
      [jobTitle, employer, location, startDate, endDate, desc, id],
      callback
    );
  },
  //delete user experience
  deleteUserExperience: (id, callback) => {
    db.query(
      "DELETE FROM userexperience WHERE experienceID = ?",
      [id],
      callback
    );
  },
};

module.exports = UserExperience;
