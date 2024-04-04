const express = require("express");
const errandController = require("../Controller/ErrandController");

const router = express.Router();

router.get("/errands", errandController.getErrands);
router.get("/available", errandController.getAllAvailable);
router.get("/type/:type", errandController.getType);
router.get("/errand/:id", errandController.getErrandById);
router.get("/your-errand/:id", errandController.getErrandByUser);

module.exports = router;
