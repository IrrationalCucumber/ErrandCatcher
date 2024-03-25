import express from "express";
import mysql from "mysql";
import cors from "cors";
import createDBConnection from "./dbConfig.js";

const app = express();
//connect to database

// Create the database connection
const db = createDBConnection();

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
//========================DIPSLAY ENPOIN=============================
//commission list based on user id
app.get("/your-commission/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q = "Select * from commission where employerID = ?";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//display 10 recent posted commissino
app.get("/recent-commission", (req, res) => {
  const q = "Select * from commission order by DatePosted DESC LIMIT 3";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//APS - 14/03/24
//retrieve username
app.get("/username/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q = "Select username from useraccount where userID = ?";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//APS - 19/03/24
//Retrieve the accountType of User
app.get("/get-type/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q = "Select accountType from useraccount where userID = ?";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0].accountType);
  });
});
//==========================================CATEGORY=================================================================//
//select type
app.get("/type", (req, res) => {
  const type = req.query.type; // Get the type from the query parameter
  const q = "SELECT * FROM commission WHERE commissionType LIKE ?";
  const values = [`%${type}%`];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});
//static query for type
//select type
//UNTESTED
app.get("/type", (req, res) => {
  //const type = req.query.type; // Get the type from the query parameter
  const q = "SELECT * FROM commission WHERE commissionType LIKE 'Household'";
  //const values = [`%${type}%`];

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});
//===================================================================================================================//
//==========================================SEARCH FUNCTION==========================================================//
//search account
app.get("/search-user", (req, res) => {
  const searchTerm = req.query.term || ""; // Get the search term from the query parameter
  const type = req.query.type || "";
  const status = req.query.status || "";

  const q =
    "SELECT * FROM UserAccount WHERE username LIKE ?  AND accountType = ? AND accountStatus = ?";
  const values = [
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    `%${searchTerm}%`,
    type,
    status,
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

// filter status and types Commission List //
app.get("/type-commilist", (req, res) => {
  // Get the search term from the query parameter
  const type = req.query.type || "";
  const status = req.query.status || "";
  // commissionStatus AND commissionType
  const q =
    "SELECT * FROM commission WHERE commissionStatus = ? OR commissionType = ?";
  const values = [status, type];

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

// fiter user-type  //
app.get("/filter-type", (req, res) => {
  const type = req.query.type || "";
  const status = req.query.status || "";

  // const searchTerm = req.query.term;
  const q =
    "SELECT * FROM UserAccount WHERE accountType = ? AND accountStatus = ?";
  const values = [type, status];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//========================================================================================//

//============================================SIGNUP==================================//
//regester account
app.post("/signup", (req, res) => {
  const q =
    "INSERT INTO UserAccount (`username`, `password`, `userEmail`, `accountType`, `dateCreated` ) VALUES (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.type,
    req.body.dateCreated,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Account has been added");
  });
});
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
//=============================================APPLICATION=====================================//
//catcher application
//save to Application table
//send data to commission table
app.post("/apply", (req, res) => {
  const q =
    "INSERT INTO application (`catcherID`,`applicationErrandID`, `applicationDate`) VALUES (?)";
  const values = [req.body.catcherID, req.body.comID, req.body.applicationDate];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Application Saved");
  });
});

//display applicant of empoyer's commissoin
app.get("/applicants/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q =
    "SELECT a.*, c.commissionTitle, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname FROM Application a JOIN commission c ON a.applicationErrandID = c.commissionID JOIN useraccount ua ON a.catcherID = ua.userID WHERE a.applicationErrandID IN (SELECT commissionID FROM commission WHERE employerID = ?)";
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//APS - 13/03/24
//retrieve catcher errand application
app.get("/your-application/:userID", (req, res) => {
  const userID = req.params.userID; // Use req.params.userID to get the route parameter
  const q =
    "SELECT a.*, c.commissionTitle, ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname, c.employerID" +
    " FROM Application a " +
    " JOIN commission c ON a.applicationErrandID = c.commissionID" +
    " JOIN useraccount ua ON c.employerID = ua.userID" +
    " WHERE a.catcherID IN (SELECT userID FROM useraccount WHERE userID = ?)";
  //Add condition to retrieve Pending only
  // AND applicationStatus = 'Pending'
  db.query(q, [userID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// APS - 13/03/2024
//Cancel Application
//needs catcherID and application ID
app.put("/cancel-apply/:userID/:applyID", (req, res) => {
  const userID = req.params.userID;
  const applicationID = req.params.applyID;
  const q =
    "UPDATE application SET `applicationStatus` = 'Cancelled' WHERE catcherID = ? AND applicationID = ?";

  db.query(q, [userID, applicationID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Application Cancelled");
  });
});

// APS - 13/03/2024
//Deny Applicant
//needs commission and application ID
app.put("/deny-apply/:comID/:applyID", (req, res) => {
  const comId = req.params.comID;
  const applicationID = req.params.applyID;
  const q =
    "UPDATE application SET `applicationStatus` = 'Denied' WHERE applicationErrandID = ? AND applicationID = ?";

  db.query(q, [comId, applicationID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Application Denied");
  });
});
app.put("/accept-apply/:comID/:applyID", (req, res) => {
  const comId = req.params.comID;
  const applicationID = req.params.applyID;
  const q =
    "UPDATE application SET `applicationStatus` = 'Approved' WHERE applicationErrandID = ? AND applicationID = ?";

  db.query(q, [comId, applicationID], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Application Approved");
  });
});
//APS - 03/03/24
//delete application
//requires catcherID and applicationID
app.delete("/delete-apply/:userID/:applyID", (req, res) => {
  const userID = req.params.userID;
  const applicationID = req.params.applyID;
  const q = "DELETE FROM application WHERE catcherID = ? AND applicationID = ?";

  db.query(q, [userID, applicationID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("Application Deleted");
  });
});
//APS - 13/03/24
//retrieve catcher errand application
//returns boolean
// app.get("/check-apply/:userID/:applyID", (req, res) => {
//   const userID = req.params.userID;
//   const applicationID = req.params.applyID;
//   const q =
//     "SELECT CASE " +
//     "WHEN catcherID = ? AND applicationErrandID = ? THEN 'true' " +
//     "ELSE 'false' " +
//     "END AS result " +
//     "FROM application WHERE catcherID = ?";
//   db.query(q, [userID, applicationID, userID], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data[0].result);
//   });
// });
//APS - 19/03/24
// return the application id of the Catcher
//pair with check apply
app.get("/get-apply/:userID/:comID", (req, res) => {
  const userID = req.params.userID;
  const comID = req.params.comID;
  const q =
    "SELECT applicationID FROM application WHERE catcherID = ? AND applicationErrandID = ?";
  db.query(q, [userID, comID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
});

//================================================================================================//

//post commission
//employer
//send data to commission table
//NOTE: UNUSED ENDPOINT?
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

//retrieve commission FOR Catcher
//info based on ID
app.get("/accepted-errands/:userID", (req, res) => {
  const userID = req.params.userID; // Get the search term from the query parameter
  const q =
    "SELECT c.*, t.errandStatus, t.transDateAccepted,ua.userEmail, ua.userContactNum, ua.userLastname, ua.userFirstname" +
    " FROM errandtransaction t" +
    " JOIN commission c ON t.transErrandID = c.commissionID" +
    " JOIN useraccount ua ON c.employerID = ua.userID" +
    " WHERE t.transCatcherID IN (SELECT userID FROM useraccount WHERE userID = ?)";

  db.query(q, [userID], (err, data) => {
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
    "UPDATE commission SET `commissionTitle` = ?, `commissionDeadline` = ?, `commissionLocation` = ?,`commissionType` = ?, `commissionDesc` = ?, `commissionPay` = ?, `ContactNumber` = ?, `commissionLong` = ?, `commissionLat` = ? WHERE commissionID = ?";
  //const q = "UPDATE commission SET `commissionTitle` = ? WHERE `commissionID` = ?"
  const values = [
    //req.body.comEmployer,
    req.body.comTitle,
    req.body.comDeadline,
    req.body.comLocation,
    req.body.comType,
    req.body.comDescription,
    req.body.comPay,
    req.body.ContactNo,
    req.body.comLong,
    req.body.comLat,
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

//delete commission
//with user id
//check if user id is poster
//UNTESTED
app.delete("/commission/:userID/:commissionID", (req, res) => {
  const commissionID = req.params.commissionID;
  const userID = req.params.userID;
  const q = "DELETE FROM commission WHERE commissionID = ? AND userID = (?)";

  db.query(q, [userID, commissionID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("I HAVE REDDIT");
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
// ADS 24/02/24
//retrieve number of unread notif of user
app.get("/notif-count/:userID", (req, res) => {
  const notifUserID = req.params.userID;
  const q =
    "select count(*) as 'c' from notification where notifUserID = (?) AND isRead = 'No' ORDER BY notifDate ASC";

  db.query(q, [notifUserID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//add notification to userID
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
app.put("/notif-read/:notificationID/:userID/", (req, res) => {
  const notificationID = req.params.notificationID;
  const userID = req.params.userID;
  const q =
    "UPDATE notification SET isRead = 'yes' WHERE notificationID = (?) AND userID = (?)";

  db.query(q, [notificationID, userID], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.json("I HAVE REDDIT");
  });
});

//=========================END MODULE==============================//
//===========================RATING================================//
//ADS - 22/02/24

//Retrieve all saved Feedback
//ALTER FOR ADMIN USE
// NEED TESTING
app.get("/user-feedbacks/", (req, res) => {
  const q = "SELECT * FROM feedbackcommission ORDER BY feedbackDate DESC";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//Retrieve feedback data of Catcher
app.get("/user-feedbacks/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "SELECT * FROM feedbackcommission WHERE `feedbackCatcherID` = (?) ORDER BY feedbackDate DESC";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//Display the average rating of feedbackCount of the Catcher
app.get("/user-rating/:userID", (req, res) => {
  const userID = req.params.userID;
  const q =
    "select avg(feedbackRate) as 'c' from feedbackcommission where feedbackCatcherID = (?)";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//Save feedback of the Epmloyer
//VARIABLES SUBJECT TO CHANGE BASED ON ERD AND DB
app.post("/rate", (req, res) => {
  const q =
    "INSERT INTO feedbackcommission (`feedbackCatcherID`, `feedbackCommissionID`, `feedbackComment`, `feedbackCount`, `feedbackDate`, `feedbackPosterID`) VALUES (?)";
  const values = [
    req.body.catcherID,
    req.body.commissionID,
    req.body.feedbackComment,
    req.body.feedbackCount,
    req.body.feedbackDate,
    req.body.employerID,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Feedback added");
  });
});

//=========================END MODULE==============================//
//=========================VERIFICATION============================//
//APS - 25/02/24
//to save verification requset of user
app.post("/verify-request", (req, res) => {
  const q =
    "INSERT INTO verification_request (`requestUserID`, `id_pic_front`, `id_pic_back`, `docu_1`, `docu_2`) VALUES (?)";
  const values = [
    req.body.userID,
    req.body.front_pic,
    req.body.back_pic,
    req.body.docu1,
    req.body.docu2,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Feedback added");
  });
});

//Display all verification request
app.get("/user-rating", (req, res) => {
  const q = "SELECT * FROM verification_request";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//APS - 02/03/24
//Return the accountStatus of user based on UserID
app.get("/user-verify/:userID", (req, res) => {
  const userID = req.params.userID;
  const q = "Select accountStatus FROM useraccount WHERE userID = (?)";

  db.query(q, [userID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }
    return res.json(data);
  });
});

//=================================================================//
/**
 * TRANSACTION
 * APS - 24/03/24
 */
//Add transaction
app.post("/add-trans", (req, res) => {
  const q =
    "INSERT INTO errandtransaction (`transErrandID`, `transCatcherID`, `transDateAccepted`) VALUES (?)";
  const values = [
    req.body.comID,
    req.body.catcherID,
    req.body.dateAccepted,
    // req.body.dateCompleted,
    //  req.body.reciept,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Transaction added");
  });
});

app.listen(8800, () => {
  console.log("connected to backend!");
});
