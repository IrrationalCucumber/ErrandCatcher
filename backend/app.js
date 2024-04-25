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

    if (results.affectedRows > 0) {
      const insertNotificationQuery = `
        INSERT INTO notification (notifUserID, notificationType, notifDesc, notifDate)
        SELECT employerID, 'Expiration', 'Your Errand has expired.', NOW()
        FROM commission
        WHERE commissionStatus = 'Expired';
      `;

      db.query(insertNotificationQuery, (insertError, insertResults) => {
        if (insertError) {
          console.error("Error inserting notifications:", insertError);
          return;
        }

        console.log(`${insertResults.affectedRows} notifications inserted.`);
      });
    }
  });
};
// update the transaction record if deadline has passed
//set satus to expired
const updateExpiredTrans = () => {
  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updateQuery = `
    UPDATE errandtransaction t
    JOIN commission c ON c.commissionID = t.transErrandID
    SET t.errandStatus = 'Expired'
    WHERE c.commissionDeadline < '${currentTime}' AND t.errandStatus = 'Ongoing';
  `;

  db.query(updateQuery, (updateError, updateResults) => {
    if (updateError) {
      console.error("Error updating transactions:", updateError);
      return;
    }

    console.log(
      `${updateResults.affectedRows} transactions updated to expired.`
    );

    if (updateResults.affectedRows > 0) {
      const insertNotificationQuery = `
        INSERT INTO notification (notifUserID, notificationType, notifDesc, notifDate)
        SELECT transCatcherID, 'Expiration', 'Your transaction has expired.', NOW()
        FROM errandtransaction
        WHERE errandStatus = 'Expired';
      `;

      db.query(insertNotificationQuery, (insertError, insertResults) => {
        if (insertError) {
          console.error("Error inserting notifications:", insertError);
          return;
        }

        console.log(`${insertResults.affectedRows} notifications inserted.`);
      });
    }
  });
};

// Schedule the update function to run every minute
const scheduler = setInterval(updateExpiredRecords, 60 * 1000);
const transScheduler = setInterval(updateExpiredTrans, 60 * 1000); //every min

// Stop the scheduler after a certain duration (optional)
// setTimeout(() => {
//   clearInterval(scheduler, transScheduler);
//   console.log("Scheduler stopped.");
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
app.get("/trans-count/:userID", (req, res) => {
  const userID = req.params.userID;
  const q = `
   SELECT
  (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Complete' AND transCatcherID = ?) AS done,
  (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Expired' AND transCatcherID = ?) AS expired,
  (SELECT  count(*) FROM errandtransaction WHERE errandStatus = 'Cancelled' AND transCatcherID = ?) AS cancel`;

  db.query(q, [userID, userID, userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data); // Assuming you only expect one row of results
  });
});

const processPayment = require("./ProcessPayment");

// Route when use succeeds in payment, update the necessary data in the database
app.get("/success-payment/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const q = `UPDATE errandtransaction 
            SET errandStatus = 'Complete', transDateComplete = ? 
            WHERE transactID = ?`;
  db.query(q, [currentTime, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data); // Assuming you only expect one row of results
  });
  return res.send("success");
});

// Route when user cancels payment
app.get("/cancel-payment", (req, res) => {
  console.log(req.body);
  return res.send("cancel");
});

// Route to process payment
app.post("/process-payment", async (req, res) => {
  // distance is in meters being converted to kilometers
  // const distance = req.body.distance / 1000;
  const amount = req.body.pay;
  const type = req.body.type;
  const name = req.body.name;
  const total = amount * 1000;
  const description = req.body.errand;
  const id = req.body.id;
  // const total = Math.round(distance) * 15 + baseAmount;
  // Paymongo api key in base64, convert api key to base64
  const authKey = "Basic c2tfdGVzdF9kcTh5b3BuZ1BoODNpb1F5b0V2MXZpc2E6";
  const checkout = await processPayment(
    authKey,
    total,
    // name,
    type,
    description,
    // `Total distance: ${distance.toFixed(2)}km`,
    ` http://localhost:8800/success-payment/${id}`,
    "http://localhost:8800/cancel-payment"
  );
  console.log(checkout.data);

  // Redirect user to paymongo's checkout page
  return res.send({ url: checkout.data.attributes.checkout_url });
});

module.exports;
