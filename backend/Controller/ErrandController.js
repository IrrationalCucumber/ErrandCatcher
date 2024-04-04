const Errand = require("../Model/Errand");

const ErrandController = {
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
    Errand.getErrandById(userID, (err, errand) => {
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
};

module.exports = ErrandController;
