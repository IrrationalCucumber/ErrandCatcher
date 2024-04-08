const express = require("express");
const applicationController = require("../Controller/ApplicationController");

const router = express.Router();

router.get("/applicants/:id", applicationController.getApplicants);
router.get("/your-application/:id", applicationController.getApplication);
router.get("/get-apply/:id/:comID", applicationController.getIfApplied);
router.post("/apply", applicationController.postApply);
router.put("/deny-apply/:comID/:applyID", applicationController.putDenyApply);
router.put(
  "/accept-apply/:comID/:applyID",
  applicationController.putAcceptApply
);
router.put("/cancel-apply/:id/:applyID", applicationController.putCancelApply);
router.put("/deny-other-apply/:comID/:id", applicationController.putDenyOther);
router.delete("/delete-apply", applicationController.deleteApply);
router.get("/applicant-count/:id", applicationController.getApplicantCount);
module.exports = router;
