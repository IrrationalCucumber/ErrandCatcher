const Apply = require("../Model/Application");

const applyController = {
  //retunr applicants of employer
  getApplicants: (req, res) => {
    const id = req.params.id;
    Apply.getApplicants(id, (err, applicants) => {
      if (err) {
        console.error("Error fetching Applicants:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(applicants);
    });
  },
  //get applications of catcher
  getApplication: (req, res) => {
    const id = req.params.id;
    Apply.getApplication(id, (err, application) => {
      if (err) {
        console.error("Error fetching Application:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(application);
    });
  },
  //return appID if exist
  getIfApplied: (req, res) => {
    const id = req.params.id;
    const comID = req.params.comID;
    Apply.getIfApplied(id, comID, (err, applied) => {
      if (err) {
        console.error("Error fetching Application:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(applied);
    });
  },
  // add an application
  postApply: (req, res) => {
    const applyData = req.body;
    Apply.postApply(applyData, (error) => {
      if (error) {
        console.error("Error adding application:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new application" });
        return;
      }
      res.status(200).json({ message: "Application added successfully" });
    });
  },
  //Deny applicant
  putDenyApply: (req, res) => {
    const status = "Denied";
    const comID = req.params.comID;
    const applyID = req.params.applyID;
    Apply.putChangeApply(comID, applyID, status, (error, result) => {
      if (error) {
        console.error("Error updating Application:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating application" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
      res.status(200).json({ message: "Application denied successfully" });
    });
  },
  //Accept applicant
  putAcceptApply: (req, res) => {
    const status = "Accepted";
    const comID = req.params.comID;
    const applyID = req.params.applyID;
    Apply.putChangeApply(comID, applyID, status, (error, result) => {
      if (error) {
        console.error("Error updating Application:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating application" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
      res.status(200).json({ message: "Application Accepted" });
    });
  },
  //cancel catcher application
  putCancelApply: (req, res) => {
    const id = req.params.id;
    const applyID = req.params.applyID;
    Apply.putCancelApply(id, applyID, (error, result) => {
      if (error) {
        console.error("Error updating Application:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating application" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
      res.status(200).json({ message: "Application Cancelled" });
    });
  },
  // deny other applicant if one is chosen
  //employer side
  putDenyOther: (req, res) => {
    const comID = req.params.comID;
    const id = req.params.id;
    Apply.putDenyOther(comID, id, (error, result) => {
      if (error) {
        console.error("Error updating Application:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating application" });
        return;
      }
      // If no rows are affected, send a response indicating no action was necessary
      if (result.affectedRows === 0) {
        return res
          .status(200)
          .json({ message: "No other applications to deny" });
      }
      res.status(200).json({ message: "Application updated successfully" });
    });
  },
  //delete application
  // cahtcher side
  deleteApply: (req, res) => {
    const id = req.params.id;
    Apply.deleteApply(id, (err, result) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Application not found" });
        return;
      }
      res.status(200).json({ message: "Application deleted successfully" });
    });
  },
  //count of applicants
  getApplicantCount: (req, res) => {
    const userID = req.params.id;
    Apply.getApplicantCount(userID, (err, count) => {
      if (err) {
        console.error("Error fetching Count:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(count);
    });
  },
  getApplicationCount: (req, res) => {
    const userID = req.params.id;
    Apply.getApplicationCount(userID, (err, count) => {
      if (err) {
        console.error("Error fetching Count:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(count);
    });
  },
};

module.exports = applyController;
