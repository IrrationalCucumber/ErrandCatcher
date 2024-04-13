const Trans = require("../Model/Transaction");

const transConstroller = {
  /**
   * DISPLAY STATMENTS
   */
  //display all transactin
  getAllTrans: (res, req) => {
    Trans.getAllTrans((err, trans) => {
      if (err) {
        console.error("Error fetching Transactions:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //view detail of a transaction
  getTransDetail: (req, res) => {
    const id = req.params.id;
    Trans.getTransDetail(id, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //display all tranaction of catcher
  getTransById: (req, res) => {
    const userId = req.params.id;
    Trans.getTransById(userId, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //display ongioing transaction of catcher
  getOngoing: (req, res) => {
    const userId = req.params.id;
    const status = "Ongoing";
    Trans.getTransWithStatus(userId, status, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //display cancelled transaction of catcher
  getCancelled: (req, res) => {
    const userId = req.params.id;
    const status = "Cancelled";
    Trans.getTransWithStatus(userId, status, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //get trans of EMployer
  getTakenErrand: (req, res) => {
    const userId = req.params.id;
    Trans.getTakenErrand(userId, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //get ongiong errand of employer
  getOngoingErrand: (req, res) => {
    const userId = req.params.id;
    const status = "Ongoing";
    Trans.getTakendWithStatus(userId, status, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  //get cancelled transaction of employer
  getCancelledErrand: (req, res) => {
    const userId = req.params.id;
    const status = "Cancelled";
    Trans.getTakendWithStatus(userId, status, (err, trans) => {
      if (err) {
        console.error("Error fetching Transaction:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(trans);
    });
  },
  /**
   * POST NEW TRANSACTION
   */
  postNewTrans: (req, res) => {
    const transData = req.body;
    Trans.postNewTrans(transData, (error) => {
      if (error) {
        console.error("Error adding feedback:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new transaction" });
        return;
      }
      res.status(200).json({ message: "Transaction added successfully" });
    });
  },
  /**
   * UPDATE Transaction
   */
  //update if tranaction is complete/cancelled
  //pair up with updaet status for erand
  putCancelTrans: (req, res) => {
    const id = req.params.id;
    const status = "Cancelled";
    const date = req.query;
    Trans.putUpdateTransaction(id, status, date, (error) => {
      if (error) {
        console.error("Error updating Transaction:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating new Transaction" });
        return;
      }
      res.status(200).json({ message: "Transaction updated successfully" });
    });
  },
  putCompleteTrans: (req, res) => {
    const id = req.params.id;
    const status = "Complete";
    const date = req.body;
    Trans.putUpdateTransaction(id, status, date, (error) => {
      if (error) {
        console.error("Error updating Transaction:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating new Transaction" });
        return;
      }
      res.status(200).json({ message: "Transaction updated successfully" });
    });
  },
};

module.exports = transConstroller;
