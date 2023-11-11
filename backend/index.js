import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
//connect to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SethNL99*",
  database: "errandcatcher",
});
//auth problem
//ALTER USER 'your_username'@'your_host' IDENTIFIED WITH mysql_native_password BY 'your_password';
app.use(express.json());
app.use(cors());

//reach to backend serve
app.get("/", (req, res) => {
  res.json("hello this is the backend");
});
//return data from database
app.get("/user", (req, res) => {
  const q = "SELECT * from useraccount";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//return data from commission tbale
app.get("/commission", (req, res) => {
  const q = "Select * from commission";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//commission list based on user id
app.get("/your-commission/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q = "Select * from commission where employerID = ?";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//search account
app.get("/search-user", (req, res) => {
  const searchTerm = req.query.term; // Get the search term from the query parameter
  const q =
    "SELECT * FROM UserAccount WHERE username LIKE ? OR userFirstname LIKE ? OR userLastname LIKE ? OR userEmail LIKE ?";
  const values = [
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//search commission
//search account
app.get("/search-commission", (req, res) => {
  const searchTerm = req.query.term; // Get the search term from the query parameter
  const q =
    "SELECT * FROM commission WHERE commissionTitle LIKE ? OR commissionType LIKE ? OR commissionLocation LIKE ?";
  const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//employer search
app.get("/search-employer-commission/:userID", (req, res) => {
  const userID = req.params.userID; // Get the userID from the route parameter
  const searchTerm = req.query.term; // Get the search term from the query parameter

  const q =
    "SELECT * FROM commission WHERE employerID = ? AND (commissionTitle LIKE ? OR commissionType LIKE ? OR commissionLocation LIKE ?)";
  const values = [
    userID,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});
//============================================SIGNUP==================================//
//send data to userAccount
app.post("/user", (req, res) => {
  //const q = "INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`, `userContactNum`, `userAge`, `userBirthday`, `userAddress`, `userDesc`, `accountType`, `dateCreated`, `profileImage`) VALUES (?)"
  const q =
    "INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`,`userContactNum`, `userAge`, `userBirthday`, `userAddress`, `accountType`, `dateCreated` ) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.lname,
    req.body.fname,
    req.body.gender,
    req.body.email,
    req.body.contact,
    req.body.age,
    req.body.bday,
    req.body.address,
    req.body.type,
    req.body.dateCreated,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Account has been added");
  });
});
//send data to commission table
app.post("/commission", (req, res) => {
  const q =
    "INSERT INTO commission (`employerID`,`commissionTitle`, `commissionDeadline`, `commissionLocation`,`commissionType`, `commissionDesc`, `commissionPay`, `DatePosted`, `ContactNumber`, `commissionLong`, `commissionLat`) VALUES (?)";
  const values = [
    req.body.empID,
    req.body.comTitle,
    req.body.comDeadline,
    req.body.comLocation,
    req.body.comType,
    req.body.comDescription,
    req.body.comPay,
    // req.body.comStatus,
    // req.body.catcherID,
    req.body.DatePosted,
    // req.body.DateCompleted,
    req.body.Contactno,
    req.body.comLong,
    req.body.comLat,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Commission has been posted");
  });
});

//catcher application
//save to Application table
//send data to commission table
app.post("/apply", (req, res) => {
  const q =
    "INSERT INTO application (`catcherID`,`commissionID`, `applicationDate`) VALUES (?)";
  const values = [req.body.catcherID, req.body.comID, req.body.applicationDate];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Commission has been posted");
  });
});

//display applicant of empoyer's commissoin
app.get("/applicants/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q =
    "SELECT a.*, c.commissionTitle, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname FROM Application a JOIN commission c ON a.commissionID = c.commissionID JOIN useraccount ua ON a.catcherID = ua.userID WHERE a.commissionID IN (SELECT commissionID FROM commission WHERE employerID = ?);";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//================================================================================================//

//post commission
//employer
//send data to commission table
app.post("/post-commission", (req, res) => {
  const q =
    "INSERT INTO commission (`employerID`,`commissionTitle`, `commissionDeadline`, `commissionLocation`,`commissionType`, `commissionDesc`, `commissionPay`, `DatePosted`, `ContactNumber`) VALUES (?)";
  const values = [
    req.body.comEmployer,
    req.body.comTitle,
    req.body.comDeadline,
    req.body.comLocation,
    req.body.comType,
    req.body.comDescription,
    req.body.comPay,
    // req.body.comStatus,
    // req.body.catcherID,
    req.body.DatePosted,
    // req.body.DateCompleted,
    req.body.Contactno,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Commission has been posted");
  });
});

//retrieve commission
//info based on ID
app.get("/commission/:commissionID", (req, res) => {
  const commissionID = req.params.commissionID; // Get the search term from the query parameter
  const q = "SELECT * FROM commission WHERE commissionID = ?";

  db.query(q, [commissionID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});
//update commission
app.put("/update-commission/:commissionID", (req, res) => {
  const commissionID = req.params.commissionID;
  const q =
    "UPDATE commission SET `commissionTitle` = ?, `commissionDeadline` = ?, `commissionLocation` = ?,`commissionType` = ?, `commissionDesc` = ?, `commissionPay` = ?, `ContactNumber` = ? WHERE commissionID = ?";
  //const q = "UPDATE commission SET `commissionTitle` = ? WHERE `commissionID` = ?"
  const values = [
    //req.body.comEmployer,
    req.body.comTitle,
    req.body.comDeadline,
    req.body.comLocation,
    req.body.comType,
    req.body.comDescription,
    req.body.comPay,
    //req.body.comStatus,
    //req.body.catcherID,
    req.body.ContactNo,
  ];

  db.query(q, [...values, commissionID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Commission updated");
  });
});

//delete commission
app.delete("/commission/:commissionID", (req, res) => {
  const commissionID = req.params.commissionID;
  const q = "DELETE FROM commission WHERE commissionID = ?";

  db.query(q, [commissionID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Commission has been deleted");
  });
});
/**========================UPDATE ACCOUNT=============================== */
//retrieve account
//info based on ID
app.get("/user/:userID", (req, res) => {
  const userID = req.params.userID; // Get the search term from the query parameter
  const q = "SELECT * FROM UserAccount WHERE userID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//upadate account
app.put("/update-account/:userID", (req, res) => {
  const userID = req.params.userID;
  //const q = "UPDATE UserAccount SET `username` = ?, `password` = ?, `userLastname` = ?, `userFirstname` = ?, `userGender` =?, `userEmail` = ?,`userContactNum` =?, `userAge` =?, `userAddress` = ? WHERE userID = ?"
  const q =
    "UPDATE useraccount set `username` = ?, `password` = ?, `userLastname` = ?, `userFirstname` = ?, `userGender` =?, `userEmail` = ?,`userContactNum` =?, `userAge` =?, `userBirthday` = ?, `userAddress` = ?, `userDesc` = ?, `profileImage` = ? WHERE userID = ?";
  const values = [
    req.body.username,
    req.body.password,
    req.body.lname,
    req.body.fname,
    req.body.gender,
    req.body.email,
    req.body.contact,
    req.body.age,
    req.body.bday,
    req.body.address,
    req.body.desc,
    //req.body.type,
    //req.body.dateCreated,
    req.body.profileImage,
  ];

  db.query(q, [...values, userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Account updated");
  });
});
//=====================================================

/**===========================VERIFICATION====================================== */
//verify-account
app.put("/verify-account/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "UPDATE UserAccount SET accountStatus = 'Verified' WHERE userID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Account Verified");
  });
});

//Deactivate Account
app.put("/deactivate-account/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "UPDATE UserAccount SET accountStatus = 'Deactivate' WHERE userID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Account deactivated");
  });
});

/**==========================SIGN IN MODULE==================================== */

//sign-in
app.get("/sign-in", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const q =
    "SELECT * FROM UserAccount WHERE (username = ? OR userEmail = ?) AND password = ?";

  db.query(q, [username, username, password], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//home based on id
app.get("/home/:userID", (req, res) => {
  const userID = req.params.userID; // Get the search term from the query parameter
  const q = "SELECT * FROM commission WHERE userID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//=============================END MODULE=====================================

/**============================NOTIF MODULE================================== */
//display all notification
app.get("/notifs", (req, res) => {
  const userID = req.params.userID;
  const q = "SELECT * FROM notification";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//display notification of user
//TESTED AND WORKING
app.get("/notification", (req, res) => {
  const userID = req.params.userID;
  const q = "SELECT * FROM notification";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//retrieve  info of for the notification
//TESTED AND WORKING
app.get("/show-notif/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "SELECT * FROM notification WHERE `isRead` = 'no' AND `notifUserID` = (?) ORDER BY notifDate DESC";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//add notification to userID
//TESTED AND WORKING
app.post("/notify", (req, res) => {
  const q =
    "INSERT INTO notification (`notifUserID`, `notificationType`, `notifDesc`, `notifDate`) VALUES (?)";
  const values = [
    req.body.userID,
    req.body.notificationType,
    req.body.notifDesc,
    req.body.notifDate,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Notification added");
  });
});

//notif have been read
// update the `isRead` tp "YES"
//TESTED AND WORKING
app.put("/notif-read/:notificationID/:userID/", (req, res) => {
  const notificationID = req.params.notificationID;
  const userID = req.params.userID;
  const q =
    "UPDATE notification SET isRead = 'yes' WHERE notificationID = ? AND notifUserID = ?";

  db.query(q, [notificationID, userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("I HAVE REDDIT");
  });
});
//Read all is triggered
// all isRead with 'No' values
// update all `isRead` with above condition to "YES"
//TESTED AND WORKING
app.put("/notif-readall/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "UPDATE notification set isRead = 'yes' WHERE isRead = 'No' and notifUserID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("I HAVE REDDIT ALL");
  });
});

//notif counter
//show the user how much unread notif he/she have
app.get("/notif-count/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "SELECT COUNT(*) as 'Notifs' FROM notification WHERE isRead = 'No' AND notifUserID = ?";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

//=========================END MODULE==============================//

app.listen(8800, () => {
  console.log("connected to backend!");
});
