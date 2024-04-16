const express = require("express");
const notifController = require("../Controller/NotifController");

const router = express.Router();

router.get("/notifs", notifController.getNotifs); // all notifs
router.get("/count/:userID", notifController.getNotCount); // count of notif of employer || require userID
router.get("/my-notif/:userID", notifController.getNotifByID); // all notif of user
router.post("/notify", notifController.postNotif); // add new notif
router.put("/read-notif/:notifID/:id", notifController.putReadNotif); // update notif isRead
router.post("/notify-catcher", notifController.postNotifToCatcher); // notify all catchers of new post

module.exports = router;
