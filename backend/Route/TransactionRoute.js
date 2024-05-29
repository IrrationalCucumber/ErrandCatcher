const express = require("express");
const transConstroller = require("../Controller/TransactionController");

const router = express.Router();

router.get("/transactions", transConstroller.getAllTrans);
router.get("/view-trans/:id", transConstroller.getTransDetail);
router.get("/accepted-errand/:id", transConstroller.getTransById);
//router.get("/trans-count/:id", transConstroller.getTransCount);
// router.get("/errand-cancel-count/:id", transConstroller.getCancelCount);
// router.get("/errand-expire-count/:id", transConstroller.getExpireCount);
router.get("/catcher/ongoing/:id", transConstroller.getOngoing);
router.get("/catcher/cancelled/:id", transConstroller.getCancelled);
router.get("/pending-errands/:id", transConstroller.getTakenErrand);
router.get("/employer/ongoing/:id", transConstroller.getOngoingErrand);
router.get("/employer/cancelled/:id", transConstroller.getCancelledErrand);
router.post("/add-trans/", transConstroller.postNewTrans);
router.put("/cancel-trans/:id", transConstroller.putCancelTrans);
router.put("/complete-trans/:id", transConstroller.putCompleteTrans);

module.exports = router;
