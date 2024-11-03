const express = require("express");
const verifyController = require("../Controller/VerifyController");

const router = express.Router();
router.get("/requests", verifyController.getAllRequest);
router.get("/request/:id", verifyController.getRequestByID);
router.post("/upload/:id", verifyController.uploadRequest);
router.put("/done-request/:id", verifyController.putUpdateRequest);
router.get("/request-count", verifyController.getRequestCount);
router.put("/update-info/:id", verifyController.putUpdateUser);
router.get("/ver-details/:id", verifyController.getRequestOfUser);

module.exports = router;
