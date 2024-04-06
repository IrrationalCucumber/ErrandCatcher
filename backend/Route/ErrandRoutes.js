const express = require("express");
const errandController = require("../Controller/ErrandController");

const router = express.Router();

router.get("/errands", errandController.getErrands);
router.get("/available", errandController.getAllAvailable);
router.get("/type/:type", errandController.getType);
router.get("/errand/:id", errandController.getErrandById);
router.get("/your-commission/:id", errandController.getErrandByUser);
router.post("/commission", errandController.postErrand);
router.put("/update-errand/:id", errandController.updateErrand);
router.put("/errand-taken/:id", errandController.updateErrandStatus);
router.delete("/delete-errand/:id", errandController.deleteErrand);

module.exports = router;
