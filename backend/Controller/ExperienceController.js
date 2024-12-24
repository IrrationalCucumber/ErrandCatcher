const experience = require("../Model/UserExperience");

const ExperienceController = {
  //get all user experience
  getAllUserExperience: (req, res) => {
    experience.getAllUserExperience((err, experience) => {
      if (err) {
        console.error("Error fetching experience:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(experience);
    });
  },
  //get user experience by id
  getUserExperience: (req, res) => {
    const id = req.params.id;
    experience.getUserExperience(id, (err, experience) => {
      if (err) {
        console.error("Error fetching experience:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(experience);
    });
  },
  //add user experience
  postUserExperience: (req, res) => {
    const userExperience = req.body;
    experience.postUserExperience(userExperience, (err, experience) => {
      if (err) {
        console.error("Error posting experience:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(experience);
    });
  },
  //update user experience
  putUpdateExperience: (req, res) => {
    const id = req.params.id;
    const userExperience = req.body;
    experience.putUpdateExperience(id, userExperience, (err, experience) => {
      if (err) {
        console.error("Error updating experience:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(experience);
    });
  },
  //delete user experience
  deleteUserExperience: (req, res) => {
    const id = req.params.id;
    experience.deleteUserExperience(id, (err, experience) => {
      if (err) {
        console.error("Error deleting experience:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(experience);
    });
  },
};

module.exports = ExperienceController;
