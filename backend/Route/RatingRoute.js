const express = require("express");
const ratingController = require("../Controller/RatingController");

const router = express.Router();

router.get("/user-feedbacks", ratingController.getAllFeedback);
router.get("/my-feedbacks/:id", ratingController.getFeedbackById); // for catcher
router.get("/posted-feedbacks/:id", ratingController.getEmployerFeedback); // for emp
router.get("/user-rating/:id", ratingController.getRatings); // for catch
router.post("/rate", ratingController.postNewFeedback); // for emp
router.put("/updating-feedback/:id", ratingController.putUpdateFeedback); //for emp
router.delete("/delete-feedback/:id", ratingController.deleteFeedback); //for emp

module.exports = router;
