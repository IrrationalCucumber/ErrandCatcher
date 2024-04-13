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
  postNotifToCatcher: (req, res) => {
    const type = "New Errand";
    const desc = "A new errand has been posted";
    Notif.postNotifToCatcher(type, desc, (error) => {
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
  /**
   * ADD READ NOTIF
   */
  putReadNotif: (req, res) => {
    const notifID = req.params.notifID;
    const id = req.params.id;
    Notif.putReadNotif(notifID, id, (error, result) => {
      if (error) {
        console.error("Error updating Notification:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating notification" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }
      res.status(200).json({ message: "Notification updated successfully" });
    });
  },
};

module.exports = notifController;
