const Rating = require("../Model/Rating");

const ratingController = {
  getAllRatings: (req, res) => {
    Rating.getAllFeedback((err, ratings) => {
      if (err) {
        console.error("Error fetching Feedbacks:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(ratings);
    });
  },
  //get catcher feedback
  getFeedbackById: (req, res) => {
    const userId = req.params.id;
    Rating.getFeedbackById(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching Feedbacks:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  //get posted feedback of EMployer
  getEmployerFeedback: (req, res) => {
    const userId = req.params.id;
    Rating.getEmployerFeedback(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching Feedbacks:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  //get catcher average rating
  getRatings: (req, res) => {
    const userId = req.params.id;
    Rating.getRatings(userId, (err, notifs) => {
      if (err) {
        console.error("Error fetching Ratings:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.json(notifs);
    });
  },
  //add new employer feedback
  postNewFeedback: (req, res) => {
    const feedData = req.body;
    Rating.postNewFeedback(feedData, (error) => {
      if (error) {
        console.error("Error adding feedback:", error);
        res
          .status(500)
          .json({ error: "An error occurred while adding new Feedback" });
        return;
      }
      res.status(200).json({ message: "Feedback added successfully" });
    });
  },
  //update feedback made by employer
  putUpdateFeedback: (req, res) => {
    const posterID = req.params.id;
    const feedData = req.body;
    Rating.putUpdateFeedback(posterID, feedData, (error) => {
      if (error) {
        console.error("Error updating feedback:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating new Feedback" });
        return;
      }
      res.status(200).json({ message: "Feedback updated successfully" });
    });
  },
  //delete feedback by employer
  deleteFeedback: (req, res) => {
    const id = req.params.id;
    const feedID = req.params.feedID;
    Rating.deleteFeedback(id, feedID, (err, result) => {
      if (err) {
        console.error("Error fetching Feedback:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Feedback not found" });
        return;
      }
      res.status(200).json({ message: "Feedback deleted successfully" });
    });
  },
  //display top rated catcher
  getTopRated: (req, res) => {
    Rating.getTopRated((err, catchers) => {
      if (err) {
        console.log("Error: ", err);
        res.status(500).send("Internal Server Error");
      }
      res.json(catchers);
    });
  },
};

module.exports = ratingController;
