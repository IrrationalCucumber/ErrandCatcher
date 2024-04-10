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
  //upload docus
  uploadRequest: (req, res) => {
    upload.array("images", 2),
      (req,
      res,
      (err) => {
        if (err) {
          console.error("Error uploading image:", err);
          return res.status(500).json({ message: "Internal server error" });
        }

        const userID = req.params.id;
        const images = req.files.map((file) => file.filename);
        // console.log(images);
        Verify.postNewRequest(userID, images, (error) => {
          if (error) return res.json({ Message: "Error" });
          return res.json({ Status: "Success" });
        });
      });
  },
  //update status of request
  putUpdateRequest: (req, res) => {
    const id = req.params.id;
    const status = "Approved";
    Verify.putUpdateRequest(id, status, date, (error) => {
      if (error) {
        console.error("Error updating Transaction:", error);
        res
          .status(500)
          .json({ error: "An error occurred while updating new Request" });
        return;
      }
      res.status(200).json({ message: "Request updated successfully" });
    });
  },
};

module.exports = verifyController;
