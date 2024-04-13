const express = require("express");
const notifController = require("../Controller/NotifController");

const router = express.Router();

router.get("/notifs", notifController.getNotifs);
router.get("/count/:userID", notifController.getNotCount);
router.get("/c-count/:userID", notifController.getCatchCount);
router.get("/my-notif/:userID", notifController.getNotifByID);
router.get("/emp-notif/:userID", notifController.getNotifEmp);
router.post("/notify", notifController.postNotif);
router.put("/read-notif/:notifID/:id", notifController.putReadNotif);
router.post("/notify-catcher", notifController.postNotifToCatcher);

module.exports = router;
