const express = require("express");
const transConstroller = require("../Controller/TransactionController");

const router = express.Router();

router.get("/transactions/", transConstroller.getAllTrans);
router.get("/view-trans/:id", transConstroller.getTransDetail);
router.get("/catcher-transactions/:id", transConstroller.getTransById);
router.get("/catcher/ongoing/:id", transConstroller.getOngoing);
router.get("/catcher/cancelled/:id", transConstroller.getCancelled);
router.get("/employer/transactions/:id", transConstroller.getTakenErrand);
router.get("/employer/ongoing/:id", transConstroller.getOngoingErrand);
router.get("/employer/cancelled/:id", transConstroller.getCancelledErrand);
router.post("/add-trans/", transConstroller.postNewTrans);
router.put("/update-trans/:id", transConstroller.putUpdateTrans);

module.exports = router;
