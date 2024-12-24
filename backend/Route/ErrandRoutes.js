const express = require("express");
const errandController = require("../Controller/ErrandController");

const router = express.Router();

router.get("/errands", errandController.getErrands); // get all errands
router.get("/available", errandController.getAllAvailable); // get all available errands
router.get("/recent", errandController.getRecent); // get recent postedn errand
router.get("/type/:type", errandController.getType); // get all errand with type/category as condiiton
router.get("/errand/:id", errandController.getErrandById); // get errand's details based on id
router.get("/your-commission/:id", errandController.getErrandByUser); // get all errands of user || requeired : userID
router.post("/commission", errandController.postErrand); // post new errand
router.put("/update-errand/:id", errandController.updateErrand); // update the existing errand || required: commissionID
router.put("/errand-taken/:id", errandController.updateErrandStatusToCaught); // updaete the errand status|| required: commissionID
router.put("/errand-cancel/:id", errandController.updateStatusToCancelled); // updaete the errand status|| required: commissionID
router.put("/errand-done/:id", errandController.updateStatusToComplete); // updaete the errand status|| required: commissionID
router.delete("/delete-errand/:id", errandController.deleteErrand); // delete the errand || required: commissionID
router.get("/complete-count/:id", errandController.getCompletedErrand); // get count of already done errand based on transaction|| req: userID
router.get("/post-count/:id", errandController.getPostCount); // get count of posted errand|| req: userID
router.get("/search-available", errandController.getSearchAllAvailable); // get search and display available errand based on search term
router.get("/search-commission", errandController.getSearchAll); // search and display all errands based on serrch term
router.get("/search/:type/", errandController.getSearchWithType); // search and display all errands based on serrch term
router.get("/filter-myerrand/", errandController.getMyErrandStatus); // filter epmloyer errands based on status
router.get("disable-errand/:id", errandController.updateStatusToDisabled); // disable the errand based on commissionID
module.exports = router;
