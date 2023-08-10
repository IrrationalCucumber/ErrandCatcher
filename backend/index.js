import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
//connect to database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"SethNL99*",
    database:"errandcatcher"
})
//auth problem
//ALTER USER 'your_username'@'your_host' IDENTIFIED WITH mysql_native_password BY 'your_password';
app.use(express.json())
app.use(cors())

//reach to backend serve
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})
//return data from database
app.get("/user", (req,res)=>{
    const q = "SELECT * from useraccount"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//return data from commission tbale
app.get("/commission", (req,res)=>{
    const q = "Select * from commission"
    db.query(q,(err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



//send data to userAccount
app.post("/user", (req,res)=>{
    //const q = "INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`, `userContactNum`, `userAge`, `userBirthday`, `userAddress`, `userDesc`, `accountType`, `dateCreated`, `profileImage`) VALUES (?)"
    const q = "INSERT INTO UserAccount (`username`, `password`, `userLastname`, `userFirstname`, `userGender`, `userEmail`,`userContactNum`, `userAge`, `userAddress`, `accountType`, `dateCreated` ) VALUES (?)"
    const values = [
        req.body.username,
        req.body.password,
        req.body.lname,
        req.body.fname,
        req.body.gender,
        req.body.email,
        req.body.contact,
        req.body.age,
        // req.body.bday,
        req.body.address,
        // req.body.desc,
        req.body.type,
        req.body.dateCreated,
        //req.body.profileImage,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Account has been added")
    })
})
//send data to commission table
app.post("/commission", (req,res) =>{
    const q = "INSERT INTO commission (`commissionTitle`, `commissionDeadline`, `commissionLocation`,`commissionType`, `commissionDesc`, `commissionPay`) VALUES (?)"
    const values = [
        req.body.comTitle,
        req.body.comDeadline,
        req.body.comLocation,
        req.body.comType,
        req.body.comDescription,
        req.body.comPay,
        // req.body.comStatus,
        // req.body.catcherID,
        // req.body.DatePosted,
        // req.body.DateCompleted,
        //req.body.Contactno,
       
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Commission has been posted")
    })
})

app.listen(8800, ()=>{
    console.log("connected to backend!")
})