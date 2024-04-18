// app.js
/**
 * IF YOU WANT TO USE THE OLD APIs
 * GO TO backend>package.json
 * CHANGE:
 *  "main": "app.js" --> "main": "index.js"
    "type": "commonjs" --> "type": "module" 
 */

const express = require("express");
const UserRoutes = require("./Route/UserRoutes");
const ErrandRoutes = require("./Route/ErrandRoutes.js");
const NotifRoutes = require("./Route/NotifRoutes.js");
const ApplyRoutes = require("./Route/ApplicationRoute.js");
const RatingRoutes = require("./Route/RatingRoute.js");
const TransRoutes = require("./Route/TransactionRoute.js");
const VerifyRoutes = require("./Route/VerifyRoutes.js");
const db = require("./dbConfig.js");
const cors = require("cors");

// //profile upload
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   // store the passed file in a destination folder
//   destination: (req, file, callback) => {
//     callback(null, "public/images");
//   },
//   filename: (req, file, callback) => {
//     //fieldname = name of file that is being pass frpm frontend
//     callback(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
//use routes for each modules
app.use("/", UserRoutes);
app.use("/", ErrandRoutes);
app.use("/", NotifRoutes);
app.use("/", ApplyRoutes);
app.use("/", RatingRoutes);
app.use("/", TransRoutes);
app.use("/", VerifyRoutes);

// //api endpoint for upload
// app.post("/upload/:id", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   const id = req.params.id;
//   const image = req.file.filename;
//   const sql = `UPDATE useraccount SET  profileImage = ? WHERE userID = ?`;
//   db.query(sql, [image, id], (err, results) => {
//     if (err) return res.json({ Message: "Error" });
//     return res.json({ Status: "Success" });
//   });
// });

// app.get("/", (req, res) => {
//   res.json("hello this is the backend");
// });

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to update records with expired deadlines
const updateExpiredRecords = () => {
  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const query = `
      UPDATE commission
      SET commissionStatus = 'Expired'
      WHERE commissionDeadline < '${currentTime}' AND commissionStatus = 'Available'
      
    `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error updating records:", error);
    } else {
      console.log(`${results.affectedRows} errand updated.`);
    }
  });
};

// Schedule the update function to run every minute
const scheduler = setInterval(updateExpiredRecords, 10000);

// Stop the scheduler after a certain duration (optional)
// setTimeout(() => {
//   clearInterval(scheduler);
//   console.log('Scheduler stopped.');
// }, 3600000); // Stop after 1 hour (3600 seconds * 1000 milliseconds)

//combiniation
app.get("/post-and-applicant-count/:userID", (req, res) => {
  const userID = req.params.userID;
  const q = `
    SELECT 
      (SELECT COUNT(*) FROM commission WHERE employerID = ?) AS postCount,
      (SELECT COUNT(*) FROM commission e JOIN application a ON a.applicationErrandID = e.commissionID WHERE e.employerID = ?) AS applicantCount,
      (SELECT COUNT(*) FROM errandtransaction t JOIN commission c ON t.transErrandID = c.commissionID WHERE c.employerID = ? AND errandStatus = 'Ongoing' ) AS pending
  `;

  db.query(q, [userID, userID, userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data); // Assuming you only expect one row of results
  });
});
module.exports;
