const express = require("express");
const applicationController = require("../Controller/ApplicationController");

const router = express.Router();

router.get("/applicants/:id", applicationController.getApplicants); // get all applicatnt of employer
router.get("/your-application/:id", applicationController.getApplication); // get all applications of catchers
router.get("/get-apply/:id/:comID", applicationController.getIfApplied); // get applicationiD of catcher alredy applied
router.post("/apply", applicationController.postApply); // add new application
router.put("/deny-apply/:comID/:applyID", applicationController.putDenyApply); // use when employer will deny an application
router.put(
  "/accept-apply/:comID/:applyID",
  applicationController.putAcceptApply
); // use when empl will accept apply
router.put("/cancel-apply/:id/:applyID", applicationController.putCancelApply); // get when catcher cancels application
router.put("/deny-other-apply/:comID/:id", applicationController.putDenyOther); // deny other application when accepting a catcher
router.delete("/delete-apply/:id", applicationController.deleteApply); // catcher will delete application
router.get("/applicant-count/:id", applicationController.getApplicantCount); // return employer's applicant numbers
router.get("/application-count/:id", applicationController.getApplicationCount);

module.exports = router;
