const express = require("express");
const errandController = require("../Controller/ErrandController");

const router = express.Router();

router.get("/errands", errandController.getErrands);
router.get("/errand/:id", errandController.getErrandById);

module.exports = router;
