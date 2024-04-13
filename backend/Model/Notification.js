const db = require("../dbConfig");

const Notif = {
  getAllNotifs: (callback) => {
    db.query("SELECT * FROM notification", callback);
  },
  //users notifs
  getNotifById: (id, callback) => {
    db.query(
      "SELECT * FROM notification WHERE isRead = 'no' AND notifUserID = ? ORDER BY notifDate DESC",
      [id],
      callback
    );
  },
  // notiff count of user
  getNotifCount: (id, callback) => {
    db.query(
      "select count(*) as 'c' from notification where notifUserID = ? ",
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
  //post notif to all catcher if new errand is posted
  postNotifToCatcher: (type, desc, callback) => {
    db.query(
      `
      INSERT INTO notification (notifUserID, notifDesc, notificationType, notifDate)
      SELECT userID, ?, ?, NOW() 
      FROM useraccount 
      WHERE accountType = 'Catcher';
      `,
      [desc, type],
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
