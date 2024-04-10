const express = require("express");
const verifyController = require("../Controller/VerifyController");

const router = express.Router();
router.get("/requests", verifyController.getAllRequest);
router.get("/request/:id", verifyController.getRequestByID);
router.post("/upload/:id", verifyController.uploadRequest);

module.exports = router;
