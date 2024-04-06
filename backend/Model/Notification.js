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
};

module.exports = Notif;
