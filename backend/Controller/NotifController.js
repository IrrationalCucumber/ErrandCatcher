const Notif = require("../Model/Notification");

const notifController = {
  getNotifs: (req, res) => {
    Notif.getAllNotifs((err, notifs) => {
      if (err) {
        console.error("Error fetching notifs:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(notifs);
    });
  },
  getNotifByID: (req, res) => {
    const userId = req.params.id;
    Notif.getNotifById(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching notif:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  getNotifEmp: (req, res) => {
    const userId = req.params.id;
    Notif.getNotifEmp(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching notif:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  getNotCount: (req, res) => {
    const userId = req.params.id;
    Notif.getNotifCount(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching notif:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  //catcher count
  getCatchCount: (req, res) => {
    const userId = req.params.id;
    Notif.getCatchCount(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching notif:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  //post new notif
  postNotif: (req, res) => {
    const notifData = req.body;
    Notif.postNotif(notifData, (error) => {
      if (error) {
        console.error("Error adding noitf:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new notif" });
        return;
      }
      // User added successfully
      res.status(200).json({ message: "Notif added successfully" });
    });
  },
};

module.exports = notifController;
