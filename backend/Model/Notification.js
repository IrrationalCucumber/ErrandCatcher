const db = require("../dbConfig");

const Notif = {
  getAllNotifs: (callback) => {
    db.query("SELECT * FROM notification", callback);
  },
  //catcher notifs
  getNotifById: (id, callback) => {
    db.query(
      "SELECT * FROM notification WHERE (isRead = 'no' AND notifUserID = ?) OR notificationType = 'New Errand'  ORDER BY notifDate DESC",
      [id],
      callback
    );
  },
  //employer notif
  getNotifEmp: (id, callback) => {
    db.query(
      "SELECT * FROM notification WHERE isRead = 'no' AND notifUserID = ? ORDER BY notifDate DESC",
      [id],
      callback
    );
  },
  getNotifCount: (id, callback) => {
    db.query(
      "select count(*) as 'c' from notification where notifUserID = ? ",
      [id],
      callback
    );
  },
  //catcher count
  getCatchCount: (id, callback) => {
    db.query(
      "select count(*) as 'c' from notification where (notifUserID = ? ) OR notificationType = 'New Errand'",
      [id],
      callback
    );
  },
  //add new notif
  postNotif: (notifData, callback) => {
    const { userID, notificationType, notifDesc, notifDate } = notifData;
    values = [userID, notificationType, notifDesc, notifDate];
    db.query(
      "INSERT INTO notification (`notifUserID`, `notificationType`, `notifDesc`, `notifDate`) VALUES (?)",
      [values],
      callback
    );
  },
  // update the notif to read
  putReadNotif: (notifID, id, callback) => {
    db.query(
      `UPDATE notification SET isRead = 'yes' WHERE notificationID = (?) AND userID = (?)`,
      [notifID, id],
      callback
    );
  },
};

module.exports = Notif;
