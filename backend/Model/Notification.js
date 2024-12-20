const db = require("../dbConfig");

const Notif = {
  getAllNotifs: (callback) => {
    db.query("SELECT * FROM notification", callback);
  },
  //users notifs
  getNotifById: (id, callback) => {
    db.query(
      "SELECT * FROM notification WHERE notifUserID = ? ORDER BY notifDate DESC",
      [id],
      callback
    );
  },
  // notiff count of user
  getNotifCount: (id, callback) => {
    db.query(
      "select count(*) as 'c' from notification where notifUserID = ? AND isRead = 'no'",
      [id],
      callback
    );
  },

  //add new notif
  postNotif: (notifData, callback) => {
    const { userID, notificationType, notifDesc, notifDate } = notifData;
    values = [userID, notificationType, notifDesc];
    db.query(
      "INSERT INTO notification (`notifUserID`, `notificationType`, `notifDesc`, `notifDate`) VALUES (?, NOW())",
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
      `UPDATE notification SET isRead = 'yes' WHERE notificationID = (?) AND notifUserID = (?)`,
      [notifID, id],
      callback
    );
  },
  //update all notif of user to isRead
  putReadAllNotif: (id, callback) => {
    db.query(
      `UPDATE notification SET isRead = 'yes' WHERE notifUserID = ?`,
      [id],
      callback
    );
  },
  //users unread notifs
  getUnreadNotifByID: (id, callback) => {
    db.query(
      "SELECT * FROM notification WHERE notifUserID = ? AND isRead = 'no' ORDER BY notifDate DESC",
      [id],
      callback
    );
  },
  //post notif to all admin if new request
  postNotifToAdmin: (type, desc, callback) => {
    db.query(
      `
      INSERT INTO notification (notifUserID, notifDesc, notificationType, notifDate)
      SELECT userID, ?, ?, NOW() 
      FROM useraccount 
      WHERE accountType = 'admin';
      `,
      [desc, type],
      callback
    );
  },
};

module.exports = Notif;
