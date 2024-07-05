const express = require("express");
const ratingController = require("../Controller/RatingController");

const router = express.Router();

router.get("/all-ratings", ratingController.getAllRatings);
router.get("/my-feedbacks/:id", ratingController.getFeedbackById); // for catcher
router.get("/posted-feedbacks/:id", ratingController.getEmployerFeedback); // for emp
router.get("/user-rating/:id", ratingController.getRatings); // for catch
router.post("/rate", ratingController.postNewFeedback); // for emp
router.put("/updating-feedback/:id", ratingController.putUpdateFeedback); //for emp
router.delete("/delete-feedback/:id", ratingController.deleteFeedback); //for emp
router.get("/top-rated", ratingController.getTopRated); /// top rated catcgers

module.exports = router;
