const express = require("express");
const notifController = require("../Controller/NotifController");

const router = express.Router();

router.get("/notifs", notifController.getNotifs);
router.get("/count/:userID", notifController.getNotCount);
router.get("/c-count/:userID", notifController.getCatchCount);
router.get("/my-notif/:userID", notifController.getNotifByID);
router.get("/emp-notif/:userID", notifController.getNotifEmp);

module.exports = router;
