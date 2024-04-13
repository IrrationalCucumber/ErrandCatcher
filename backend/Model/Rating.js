const db = require("../dbConfig");
const Rating = {
  //get all feedbacks
  getAllFeedback: (callback) => {
    db.query(
      `SELECT * FROM feedbackcommission ORDER BY feedbackDate DESC`,
      callback
    );
  },
  //get feedback based on catcher id
  getFeedbackById: (id, callback) => {
    db.query(
      `SELECT * FROM feedbackcommission WHERE feedbackCatcherID = (?) ORDER BY feedbackDate DESC`,
      [id],
      callback
    );
  },
  //get employer posted feedback
  getEmployerFeedback: (id, callback) => {
    db.query(
      `SELECT * FROM feedbackcommission WHERE feedbackPosterID = (?) ORDER BY feedbackDate DESC`,
      [id],
      callback
    );
  },
  //display average count of rating
  getRatings: (id, callback) => {
    db.query(
      `select avg(feedbackRate) as 'c' from feedbackcommission where feedbackCatcherID = (?)`,
      [id],
      callback
    );
  },
  //add new feeedback by employer
  postNewFeedback: (feedData, callback) => {
    const {
      commissionID,
      catcherID,
      feedbackComment,
      feedbackCount,
      feedbackDate,
      feedbackPosterID,
    } = feedData;
    values = [
      commissionID,
      catcherID,
      feedbackComment,
      feedbackCount,
      feedbackDate,
      feedbackPosterID,
    ];
    db.query(
      "INSERT INTO feedbackcommission (`feedbackCommissionID`, `feedbackCatcherID` , `feedbackComment`, `feedbackCount`, `feedbackDate`, `feedbackPosterID`) VALUES (?)",
      [values],
      callback
    );
  },
  //update posted emp feedback
  putUpdateFeedback: (id, feedData, callback) => {
    const { feedbackComment, feedbackCount } = feedData;
    values = [feedbackComment, feedbackCount];
    db.query(
      `UPDATE feedbackcommission
      SET feedbackComment = ?, feedbackCount = ?
      WHERE feedbackPosterID = ?`,
      [values, id],
      callback
    );
  },
  //delete feedback
  deleteFeedback: (id, feedID, callback) => {
    db.query(
      `DELETE FROM application WHERE feedbackPosterID = ? AND feedbackID = ?`,
      [id, feedID],
      callback
    );
  },
};

module.exports = Rating;
