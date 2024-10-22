const db = require("../dbConfig");
const Rating = {
  //get all feedbacks
  getAllFeedback: (callback) => {
    db.query(
      `SELECT f.*, u.username, u.userFirstname, u.userLastname
       FROM feedbackcommission f
        JOIN useraccount u ON f.feedbackCatcherID = u.userID`,
      callback
    );
  },
  //get feedback based on catcher id
  getFeedbackById: (id, callback) => {
    db.query(
      `SELECT f.*, u.username, u.userLastname, u.userFirstname
       FROM feedbackcommission f 
       JOIN useraccount u on f.feedbackPosterID = u.userID
       WHERE feedbackCatcherID = (?) ORDER BY feedbackDate DESC`,
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
  //display top rated catchers
  // limited to top 10
  // from high to low
  getTopRated: (callback) => {
    db.query(
      `SELECT avg(f.feedbackRate) as 'averageRate', u.username, u.accountType, u.profileImage
       FROM useraccount u
       JOIN feedbackcommission f ON u.userID = f.feedbackCatcherID
       WHERE u.accountType = 'Catcher'
       GROUP BY u.userID
       ORDER BY averageRate DESC 
       LIMIT 10`,
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
      "INSERT INTO feedbackcommission (`feedbackErrandID`, `feedbackCatcherID` , `feedbackComment`, `feedbackRate`, `feedbackDate`, `feedbackPosterID`) VALUES (?)",
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
