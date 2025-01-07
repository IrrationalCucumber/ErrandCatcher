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
const ExperienceRoutes = require("./Route/ExperienceRoute");
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
app.use("/", ExperienceRoutes);

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

const PORT = 8800;
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
// const updateExpiredTrans = () => {
//   const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
//   const updateQuery = `
//     UPDATE errandtransaction t
//     JOIN commission c ON c.commissionID = t.transErrandID
//     SET t.errandStatus = 'Expired'
//     WHERE c.commissionDeadline < '${currentTime}' AND t.errandStatus = 'Ongoing';
//   `;

//   db.query(updateQuery, (updateError, updateResults) => {
//     if (updateError) {
//       console.error("Error updating transactions:", updateError);
//       return;
//     }

//     console.log(
//       `${updateResults.affectedRows} transactions updated to expired.`
//     );

//     if (updateResults.affectedRows > 0) {
//       const insertNotificationQuery = `
//         INSERT INTO notification (notifUserID, notificationType, notifDesc, notifDate)
//         SELECT transCatcherID, 'Expiration', 'Your transaction has expired.', NOW()
//         FROM errandtransaction
//         WHERE errandStatus = 'Expired';
//       `;

//       db.query(insertNotificationQuery, (insertError, insertResults) => {
//         if (insertError) {
//           console.error("Error inserting notifications:", insertError);
//           return;
//         }

//         console.log(`${insertResults.affectedRows} notifications inserted.`);
//       });
//     }
//   });
// };

// Schedule the update function to run every minute
const scheduler = setInterval(updateExpiredRecords, 60 * 1000);
//const transScheduler = setInterval(updateExpiredTrans, 60 * 1000); //every min

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
      (SELECT COUNT(*) FROM commission e JOIN application a ON a.applicationErrandID = e.commissionID WHERE e.employerID = ? AND a.applicationStatus = 'Pending') AS applicantCount,
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
const getProcessPayment = require("./GetProcessPayment");

// Temporary storage
let paymentDataStorage = {};

// Route when use succeeds in payment, update the necessary data in the database
app.get("/success-payment/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;

  // Retrieve stored data using the transaction ID
  const paymentData = paymentDataStorage[id];

  if (!paymentData) {
    return res
      .status(400)
      .json({ error: "No payment data found for this transaction." });
  }

  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const q1 = `UPDATE errandtransaction 
            SET transStatus = 'Complete', transDateComplete = ? 
            WHERE transactID = ?`;

  const q2 = `INSERT INTO invoice (total, type, description, checkoutId, paymentId, paid, invoiceErrandID, invoiceemployerID, invoiceCatcherID) VALUES ( ?, ?, ?, ?, ?, FROM_UNIXTIME(?), ?, ?, ? )`;

  db.query(q1, [currentTime, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    db.query(
      q2,
      [
        paymentData.total,
        paymentData.type,
        paymentData.description,
        paymentData.checkoutId,
        paymentData.paymentId,
        paymentData.paid,
        paymentData.errandID,
        paymentData.employerid,
        paymentData.catcherid,
      ],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "An error occurred while saving the payment details.",
          });
        }

        // Clear the temporary data after saving to the database
        delete paymentDataStorage[id];

        // return res.send("Payment successful and details saved.");
        // path: "/paymentsuccess",
        return res.redirect("http://localhost:3000/paymentsuccess");
      }
    );
  });
});

// Route when user cancels payment
app.get("/cancel-payment", (req, res) => {
  console.log(req.body);

  // return res.send("cancel");
  // return res.json({ message: "Payment has been cancelled." });
  // path: "/paymentcancel",
  return res.redirect("http://localhost:3000/paymentcancel");
});

// Route to process payment
app.post("/process-payment/:employerID", async (req, res) => {
  // distance is in meters being converted to kilometers
  // const distance = req.body.distance / 1000;
  const amount = req.body.pay;
  const type = req.body.type;
  const name = req.body.name;
  // times 100 to proply display as default is centavo
  const total = amount * 100;
  const description = req.body.errand;
  const id = req.body.id; // transactionID
  // const employerID = req.params.employerID;
  const employerid = req.body.employerID;
  const errandID = req.body.errandID;
  const catcherid = req.body.catID;
  const email = req.body.email;
  const phone = req.body.cnum;

  // const total = Math.round(distance) * 15 + baseAmount;
  // Paymongo api key in base64, convert api key to base64
  const authKey = "Basic c2tfdGVzdF9kcTh5b3BuZ1BoODNpb1F5b0V2MXZpc2E6";
  const checkout = await processPayment(
    authKey,
    total,
    name,
    email,
    phone,
    type,
    description,
    // `Total distance: ${distance.toFixed(2)}km`,
    `http://localhost:8800/success-payment/${id}`,
    "http://localhost:8800/cancel-payment"
  );
  console.log(checkout.data);

  // extract or access data object from the Paymongo api response
  // const checkoutId = checkout.data.id;
  // const paymentId = checkout.data.attributes.payment_intent.id;
  // const currency = checkout.data.attributes.line_items.currency;
  // FROM_UNIXTIME(paid) AS paid_datetime coverter  sample date: 1717515231
  // const paid = checkout.data.attributes.created_at; // FROM_UNIXTIME(paid) AS paid_datetime coverter

  // Store the data temporarily using the transaction ID as the key
  paymentDataStorage[id] = {
    employerid,
    amount,
    errandID,
    type,
    total,
    description,
    catcherid,
    paymentId: checkout.data.attributes.payment_intent.id,
    checkoutId: checkout.data.id,
    paid: checkout.data.attributes.created_at,
  };
  console.log(paymentDataStorage);

  // Redirect user to PayMongo's checkout page
  return res.send({
    url: checkout.data.attributes.checkout_url,
    checkoutId: checkout.data.id,
  });
});

// get data ID from the PayMongo API
app.get("/payment-details/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const authKey = "Basic c2tfdGVzdF9kcTh5b3BuZ1BoODNpb1F5b0V2MXZpc2E6";

  try {
    const paymentDetails = await getProcessPayment(authKey, sessionId);

    // Extract data ID from PayMongo's response
    const dataId = paymentDetails.data.id;
    res.send({ dataId: dataId, details: paymentDetails });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Failed to retrieve payment details" });
  }
});

// fetch history transaction employer user
app.get("/transactionsEmp/:empID", (req, res) => {
  const empID = req.params.empID;
  const q = `SELECT i.*, u.*, f.feedbackRate , f.feedbackComment
              FROM invoice i 
              LEFT JOIN useraccount u ON i.invoiceCatcherID = u.userID 
              LEFT JOIN feedbackcommission f ON i.invoiceErrandID = f.feedbackErrandID
              WHERE i.invoiceemployerID = ?
              ORDER BY i.paid DESC `;

  // const q = "SELECT i.*, u.* FROM invoice i JOIN useraccount u ON i.invoiceCatcherID = u.userID WHERE i.invoiceemployerID = ?";

  db.query(q, [empID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

// fetch history transaction catcher user
app.get("/transactionsCat/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT i.*, u.*, f.feedbackRate , f.feedbackComment
    FROM invoice i 
    LEFT JOIN useraccount u ON i.invoiceemployerID = u.userID 
    LEFT JOIN feedbackcommission f ON i.invoiceErrandID = f.feedbackErrandID
    WHERE i.invoiceCatcherID = ?
    ORDER BY i.paid DESC`;

  // const q = "SELECT i.*, u.* FROM invoice i JOIN useraccount u ON i.invoiceemployerID = u.userID WHERE i.invoiceCatcherID = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

app.get("/get-username/", (req, res) => {
  const name = req.params.name;
  const q = `SELECT username FROM useraccount`;
  //console.log(name);

  db.query(q, [name], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.json(data);
  });
});

app.get("/get-email/", (req, res) => {
  const mail = req.params.mail;
  const q = `SELECT userEmail FROM useraccount `;
  //console.log(mail);

  db.query(q, [mail], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.json(data);
  });
});

// Check if there is a token for the given userID
app.get("/check-token/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT * FROM email_verification_tokens WHERE verUserID = ?`;

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    if (data.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
});

// const bcrypt = require("bcrypt");

// const plainPassword = "paul";
// const hashedPassword =
//   "$2y$04$ZB9ht9AaY1eSZL3.6H9oweFD.1LtixWhikEbkpPcbABS0iljLOhHG";

// bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
//   if (err) {
//     console.error("Error comparing passwords:", err);
//   } else if (isMatch) {
//     console.log("Passwords match!");
//   } else {
//     console.log("Passwords do not match!");
//   }
// });

// Get invoice by id and check if the user/employer has already paid
app.get("/invoice", (req, res) => {
  const { transCatID, comID, empID } = req.query;
  const q = `SELECT * FROM invoice WHERE invoiceCatcherID = ? AND invoiceErrandID = ? `;

  db.query(q, [transCatID, comID, empID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    if (data.length === 0) {
      return res.json({ paid: false, data: data });
    }

    return res.json({ paid: true, data: data });
  });
});

module.exports;
