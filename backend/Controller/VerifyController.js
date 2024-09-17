const Verify = require("../Model/Verification");
//file upload
const multer = require("multer");
const path = require("path");
// set destination for image storage
const storage = multer.diskStorage({
  // store the passed file in a destination folder
  destination: (req, file, callback) => {
    callback(null, "public/images/docu");
  },
  filename: (req, file, callback) => {
    //fieldname = name of file that is being pass frpm frontend
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

const verifyController = {
  getAllRequest: (req, res) => {
    Verify.getAllRequest((err, users) => {
      if (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(users);
    });
  },
  //view details of request
  getRequestByID: (req, res) => {
    const userId = req.params.id;
    Verify.getRequestByID(userId, (err, result) => {
      if (err) {
        console.error("Error fetching Request:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (!result) {
        res.status(404).send("Request not found");
        return;
      }
      res.json(user);
    });
  },
  uploadRequest: (req, res) => {
    // state what files are sent
    // store them in an array
    upload.fields([
      { name: "image1", maxCount: 1 }, // inique name of what is being append
      { name: "image2", maxCount: 1 }, //
    ])(req, res, (err) => {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      const userID = req.params.id;
      //This accesses the filename of the first uploaded file for the image1 field
      const image1 = req.files["image1"][0].filename;
      const image2 = req.files["image2"][0].filename;
      Verify.postNewRequest(userID, image1, image2, (error) => {
        if (error) {
          console.error("Error posting new request:", error);
          return res.status(500).json({ message: "Error posting new request" });
        }
        return res.json({ status: "Success" });
      });
    });
  },

  //update status of request
  putUpdateRequest: (req, res) => {
    const id = req.params.id;
    const status = "Complete";
    Verify.putUpdateRequest(id, status, (error) => {
      if (error) {
        console.error("Error updating Request:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating new Request" });
        return;
      }
      res.status(200).json({ message: "Request updated successfully" });
    });
  },
  //get count of pending request
  getRequestCount: (req, res) => {
    Verify.getRequestCount((err, data) => {
      if (err) {
        console.error("Error fetching request:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(data);
    });
  },
};

module.exports = verifyController;
