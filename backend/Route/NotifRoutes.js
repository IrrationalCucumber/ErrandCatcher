const express = require("express");
const notifController = require("../Controller/NotifController");

const router = express.Router();

router.get("/notifs", notifController.getNotifs); // all notifs
router.get("/count/:id", notifController.getNotCount); // count of notif of employer || require userID
router.get("/my-notif/:id", notifController.getNotifByID); // all notif of user
router.post("/notify", notifController.postNotif); // add new notif
router.put("/read-notif/:notifID/:id", notifController.putReadNotif); // update notif isRead
router.post("/notify-catcher", notifController.postNotifToCatcher); // notify all catchers of new post
router.put("/read-all/:id", notifController.putReadAllNotif); //read all notif of user
router.get("/unread-notifs/:id", notifController.getUnreadNotif); //unread notif of user
router.post("/notify-admin", notifController.postNotifToAdmin); // notify all admin of new request

module.exports = router;
