const Notif = require("../Model/Notification");

const notifController = {
  //get all notifs
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
  //get notifs of user
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
  //get total count of notif of user
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
  //Read all notif of user
  putReadAllNotif: (req, res) => {
    const id = req.params.id;
    Notif.putReadAllNotif(id, (err, result) => {
      if (err) {
        console.error("Error updating Notification:", err);
        res
          .status(500)
          .json({ err: "An error occurred while updating notification" });
        return;
      }
      res.status(200).json({ message: "Success" });
    });
  },
  getUnreadNotif: (req, res) => {
    const id = req.params.id;
    Notif.getUnreadNotifByID(id, (err, notifs) => {
      if (err) {
        console.error("Error fetching notifs:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(notifs);
    });
  },
  //post notif to all admin
  postNotifToAdmin: (req, res) => {
    const type = "Verification Request";
    const desc = "A user has submitted a Verification request";
    Notif.postNotifToAdmin(type, desc, (error) => {
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
