const Errand = require("../Model/Errand");

const ErrandController = {
  //get all errands
  getErrands: (req, res) => {
    Errand.getAllErrands((err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(errands);
    });
  },
  //display all available
  getAllAvailable: (req, res) => {
    Errand.getAllAvailable((err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(errands);
    });
  },
  // show recent posted errands
  getRecent: (req, res) => {
    Errand.getRecent((err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(errands);
    });
  },
  //get errand accourding to type beiing passed
  getType: (req, res) => {
    const type = req.params.type;
    Errand.getType(type, (err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(errands);
    });
  },
  //get errand by id
  getErrandById: (req, res) => {
    const errandID = req.params.id;
    Errand.getErrandById(errandID, (err, errand) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errand) {
        res.status(404).send("Errand not found");
        return;
      }
      res.json(errand);
    });
  },
  //display data by user id
  getErrandByUser: (req, res) => {
    const userID = req.params.id;
    Errand.getErrandByUserID(userID, (err, errand) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errand) {
        res.status(404).send("Errand not found");
        return;
      }
      res.json(errand);
    });
  },
  //post new errand
  postErrand: (req, res) => {
    const errnadData = req.body;
    Errand.postErrand(errnadData, (error) => {
      if (error) {
        console.error("Error adding erand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new errand" });
        return;
      }
      // User added successfully
      res.status(200).json({ message: "errand added successfully" });
    });
  },
  //update errnad data by comID
  updateErrand: (req, res) => {
    const comID = req.params.id;
    const updatedData = req.body;
    Errand.updateErrandByID(comID, updatedData, (error, result) => {
      if (error) {
        console.error("Error updating errand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating errand" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Errand not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "Errand updated successfully" });
    });
  },
  //update errand status
  //set what value will be passed
  updateErrandStatusToCaught: (req, res) => {
    const comID = req.params.id;
    const status = "Caught";
    Errand.updateErrandStatus(comID, status, (error, result) => {
      if (error) {
        console.error("Error updating errand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating errand" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Errand not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "Errand updated successfully" });
    });
  },
  //update errand to cancelled
  updateStatusToCancelled: (req, res) => {
    const comID = req.params.id;
    const status = "Cancelled";
    Errand.updateErrandStatus(comID, status, (error, result) => {
      if (error) {
        console.error("Error updating errand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating errand" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Errand not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "Errand updated successfully" });
    });
  },
  updateStatusToComplete: (req, res) => {
    const comID = req.params.id;
    const status = "Completed";
    Errand.updateErrandStatus(comID, status, (error, result) => {
      if (error) {
        console.error("Error updating errand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating errand" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Errand not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "Errand updated successfully" });
    });
  },
  //delete errand by id
  deleteErrand: (req, res) => {
    const errandID = req.params.id;
    Errand.deleteErrandById(errandID, (err, errand) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(errand);
    });
  },
  /**
   * Return completed errand
   */
  getCompletedErrand: (req, res) => {
    const userID = req.params.id;
    Errand.getCompletedErrand(userID, (err, errand) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errand) {
        res.status(404).send("Errand not found");
        return;
      }
      res.json(errand);
    });
  },
  //count of errand posted by employer
  getPostCount: (req, res) => {
    const userID = req.params.id;
    Errand.getPostCount(userID, (err, errand) => {
      if (err) {
        console.error("Error fetching Errand:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errand) {
        res.status(404).send("Errand not found");
        return;
      }
      res.json(errand);
    });
  },
  /**
   * SEARCH FUNCTIONS
   */
  getSearchAllAvailable: (req, res) => {
    const term = req.query.term;
    const status = "Available";
    Errand.getSearchAll(term, status, (err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errands) {
        res.status(404).send("errands not found");
        return;
      }
      res.json(errands);
    });
  },
  //search all regardless of status
  getSearchAll: (req, res) => {
    const term = req.query.term;
    Errand.getSearchAll(term, (err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errands) {
        res.status(404).send("errands not found");
        return;
      }
      res.json(errands);
    });
  },
  //search errand on a category
  getSearchWithType: (req, res) => {
    const term = req.query.term;
    const type = req.params.type;
    Errand.getSearchWithType(term, type, (err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errands) {
        res.status(404).send("errands not found");
        return;
      }
      res.json(errands);
    });
  },
  //filter employer's errands based on status
  getMyErrandStatus: (req, res) => {
    const id = req.query.id;
    const status = req.query.status;
    Errand.getMyErrandStatus(id, status, (err, errands) => {
      if (err) {
        console.error("Error fetching errands:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!errands) {
        res.status(404).send("errands not found");
        return;
      }
      res.json(errands);
    });
  },
  //update errand statis to disabled
  updateStatusToDisabled: (req, res) => {
    const comID = req.params.id;
    const status = "Disabled";
    Errand.updateErrandStatus(comID, status, (error, result) => {
      if (error) {
        console.error("Error updating errand:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating errand" });
        return;
      }
      // Check if any rows were affected by the update operation
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Errand not found" });
        return;
      }
      // User updated successfully
      res.status(200).json({ message: "Errand updated successfully" });
    });
  },
};

module.exports = ErrandController;
