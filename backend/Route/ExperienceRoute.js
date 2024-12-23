const experienceController = require("../Controller/ExperienceController");
const express = require("express");
const router = express.Router();

router.get("/experiences", experienceController.getAllUserExperience); // get all user experience
router.get("/experience/:id", experienceController.getUserExperience); // get user experience by id
router.post("/experience", experienceController.postUserExperience); // add user experience
router.put("/update-experience/:id", experienceController.putUpdateExperience); // update user experience
router.delete(
  "/delete-experience/:id",
  experienceController.deleteUserExperience
); // delete user experience

module.exports = router;
