-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: errandcatcher
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `applicationID` int NOT NULL AUTO_INCREMENT,
  `applicationErrandID` int DEFAULT NULL,
  `catcherID` int DEFAULT NULL,
  `applicationDate` date DEFAULT NULL,
  `applicationStatus` varchar(10) DEFAULT 'Pending',
  PRIMARY KEY (`applicationID`),
  KEY `userID_idx` (`catcherID`) /*!80000 INVISIBLE */,
  KEY `applicationErrandID_idx` (`applicationErrandID`),
  CONSTRAINT `applicationErrandID` FOREIGN KEY (`applicationErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catcherID` FOREIGN KEY (`catcherID`) REFERENCES `useraccount` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (33,29,29,'2024-03-18','Cancelled'),(42,31,37,'2024-03-19','Pending'),(43,30,29,'2024-03-22','Accepted'),(48,30,37,'2024-03-22','Denied'),(49,39,29,'2024-04-01','Accepted');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commission`
--

DROP TABLE IF EXISTS `commission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commission` (
  `commissionID` int NOT NULL AUTO_INCREMENT,
  `employerID` int DEFAULT NULL,
  `commissionTitle` varchar(20) DEFAULT NULL,
  `commissionStartDate` date DEFAULT NULL,
  `commissionDeadline` date DEFAULT NULL,
  `commissionLocation` text,
  `commissionTo` text COMMENT 'if delivery, end place',
  `commissionType` varchar(50) DEFAULT NULL,
  `commissionDesc` text,
  `commissionPay` double DEFAULT NULL,
  `commissionStatus` varchar(30) DEFAULT 'Available',
  `DatePosted` date DEFAULT NULL,
  `ContactNumber` varchar(30) DEFAULT NULL,
  `commissionLong` double DEFAULT NULL,
  `commissionLat` double DEFAULT NULL,
  PRIMARY KEY (`commissionID`),
  KEY `userID_idx` (`employerID`),
  CONSTRAINT `userID` FOREIGN KEY (`employerID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commission`
--

LOCK TABLES `commission` WRITE;
/*!40000 ALTER TABLE `commission` DISABLE KEYS */;
INSERT INTO `commission` VALUES (29,28,'to post',NULL,'2023-08-30','A. C. Cortes Ave, Mandaue City, 6014 Cebu',NULL,'Delivery','',123123,'Expired','2023-08-29','',NULL,NULL),(30,28,'Test map',NULL,'2023-08-31','ac. cortes, looc, mandaue city, cebu',NULL,'Delivery','add map',23123,'Unavailable','2023-08-30','911',123.95306723777395,10.325103584518331),(31,36,'Errand CAtcher',NULL,'2023-09-08','gun-ob, Lapu-Lapu city, cebu',NULL,'Delivery','help me create an app in React',10000,'Expired','2023-08-30','09499286777',123.9472383036163,10.302871744829247),(37,28,'House cleaning',NULL,'2024-04-01','looc, lapu0lapu city',NULL,'HomeService - Indoor','Clean our house for several days',23212,'Expired','2024-03-25','166',123.89442894708321,10.36996410078062),(38,28,'Cook',NULL,'2024-03-30','Mandaue',NULL,'HomeService - Indoor','I want home cook meals',200,'Expired','2024-03-25','09864752211',123.92213553467207,10.35420379680447),(39,28,'A Ride From Shopping',NULL,'2024-04-06','Giasano Island Mall, Pusok, Lapu-Lapu City',NULL,'Transport','I need a ride home from grocery shopping and I will be buying a lot of things.',500,'Expired','2024-03-30','09499286',123.94718275449793,10.302787590282549),(40,28,'Find my cat',NULL,'2024-05-11','ibabao, cordova, cebu',NULL,'HomeService - Outdoor','Help me find my cat around my neighborhood',500,'Available','2024-04-04','0942428198',123.948433843754,10.271167236269306),(41,NULL,'Test title','2024-04-06','2024-05-11','test loc','','HomeService - Outdoor','sample test',23,'Available','2024-04-06','3123',NULL,NULL);
/*!40000 ALTER TABLE `commission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `errandtransaction`
--

DROP TABLE IF EXISTS `errandtransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `errandtransaction` (
  `transactID` int NOT NULL AUTO_INCREMENT,
  `transErrandID` int DEFAULT NULL,
  `transCatcherID` int DEFAULT NULL,
  `errandStatus` varchar(45) DEFAULT 'Ongoing',
  `empApproval` varchar(45) DEFAULT NULL,
  `transDateAccepted` datetime DEFAULT NULL,
  `transDateComplete` datetime DEFAULT NULL,
  `transReciept` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`transactID`),
  KEY `transErrandID_idx` (`transErrandID`),
  KEY `transCatcherID_idx` (`transCatcherID`),
  CONSTRAINT `transCatcherID` FOREIGN KEY (`transCatcherID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transErrandID` FOREIGN KEY (`transErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `errandtransaction`
--

LOCK TABLES `errandtransaction` WRITE;
/*!40000 ALTER TABLE `errandtransaction` DISABLE KEYS */;
INSERT INTO `errandtransaction` VALUES (1,30,29,'Ongoing',NULL,'2024-04-01 15:01:46',NULL,NULL),(2,39,29,'Ongoing',NULL,'2024-04-01 15:27:50',NULL,NULL),(3,39,29,'Cancelled',NULL,'2024-04-01 15:27:59',NULL,NULL);
/*!40000 ALTER TABLE `errandtransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbackcommission`
--

DROP TABLE IF EXISTS `feedbackcommission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbackcommission` (
  `feedbackID` int NOT NULL AUTO_INCREMENT,
  `feedbackPosterID` int DEFAULT NULL,
  `feedbackCatcherID` int DEFAULT NULL,
  `feedbackRate` int DEFAULT '0',
  `feedbackDate` date DEFAULT NULL,
  `feedbackComment` text,
  `feedbackErrandID` int DEFAULT NULL,
  PRIMARY KEY (`feedbackID`),
  KEY `commissionID_idx` (`feedbackErrandID`),
  KEY `catcherID_idx` (`feedbackCatcherID`),
  KEY `employerID_idx` (`feedbackPosterID`),
  CONSTRAINT `feedbackCatcherID` FOREIGN KEY (`feedbackCatcherID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbackCommissionID` FOREIGN KEY (`feedbackErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbackPosterID` FOREIGN KEY (`feedbackPosterID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackcommission`
--

LOCK TABLES `feedbackcommission` WRITE;
/*!40000 ALTER TABLE `feedbackcommission` DISABLE KEYS */;
INSERT INTO `feedbackcommission` VALUES (4,28,29,3,NULL,NULL,29),(6,28,29,5,NULL,NULL,29);
/*!40000 ALTER TABLE `feedbackcommission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notificationID` int NOT NULL AUTO_INCREMENT,
  `notifUserID` int DEFAULT NULL,
  `notificationType` varchar(50) DEFAULT NULL,
  `catcherID` int DEFAULT NULL,
  `employerID` int DEFAULT NULL,
  `commissionID` int DEFAULT NULL,
  `notifDesc` text,
  `isRead` varchar(5) DEFAULT 'no',
  `notifDate` datetime DEFAULT NULL,
  PRIMARY KEY (`notificationID`),
  KEY `userID_idx` (`notifUserID`),
  CONSTRAINT `notifUserID` FOREIGN KEY (`notifUserID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (6,28,'errand application',29,NULL,32,'There is a Catcher that want to apply to your Errand commission','No',NULL),(35,29,'Application',NULL,NULL,NULL,'Your Errand application has been Accepted','no','2024-04-01 15:27:59'),(36,NULL,'Application Cancelled',NULL,NULL,NULL,'A Catcher has cancelled their application on of your errand','no','2024-04-01 15:29:47'),(37,NULL,'New Errand',NULL,NULL,NULL,'A new Errand has been posted','no','2024-04-04 22:00:07');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraccount` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `userLastname` varchar(30) DEFAULT NULL,
  `userFirstname` varchar(45) DEFAULT NULL,
  `userGender` varchar(10) DEFAULT NULL,
  `userEmail` varchar(40) DEFAULT NULL,
  `userContactNum` varchar(20) DEFAULT NULL,
  `userAge` int DEFAULT NULL,
  `userBirthday` date DEFAULT NULL,
  `userAddress` text,
  `userDesc` text,
  `accountStatus` varchar(20) DEFAULT 'Unverified',
  `accountType` varchar(20) DEFAULT NULL,
  `dateCreated` date DEFAULT NULL,
  `profileImage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'admin1','admin','last','first','male','adreanpaulsorono@gmail.com','',22,'1969-12-31',NULL,NULL,'verified','admin',NULL,NULL),(28,'ash1','123','Employer','ash','female','ash_emplyer@gmail.com','226',22,'1969-12-22','basak, lapu-lapu city','I am a web designer ','unverified','Employer','2023-08-10','image_1712733491773.jpg'),(29,'ash2','123','Catcher','ash','female','ash_catch@email.com','123',23,'1970-01-01','gun ob',NULL,'Verified','Catcher','2023-08-10','C:\\fakepath\\Warframe0000.jpg'),(33,'employer','employer','halina','lorry','female','test2@gmail.com','09887888788',22,'2024-02-21','mindanao',NULL,'Deactivate','Employer','2024-02-17',NULL),(36,'adrean','testing123','sorono','adrean','Male','adreanpaulsorono@gmail.com','09499286777',24,'1999-05-24','Gun-ob, Lapu-Lapu City',NULL,'Unverified','Employer','2024-03-01',NULL),(37,'raymund','testing123','raymund','valeroso','Male','ramund@gmail.com','094342',24,NULL,'Babag, Lapu-Lapu City',NULL,'Unverified','Catcher','2024-03-07',NULL),(39,'trish','trisha1234','sasing','trisha','Female','trisha@email.com','09876543210',23,'2000-04-04','liloan',NULL,'Verified','Catcher','2024-04-04',NULL);
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_request`
--

DROP TABLE IF EXISTS `verification_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_request` (
  `requestID` int NOT NULL AUTO_INCREMENT,
  `requestUserID` int DEFAULT NULL,
  `id_picture_front` varchar(100) DEFAULT NULL,
  `id_picture_back` varchar(100) DEFAULT NULL,
  `docu_1` varchar(45) DEFAULT NULL,
  `docu_2` varchar(45) DEFAULT NULL,
  `requestStatus` varchar(45) DEFAULT 'Pending',
  PRIMARY KEY (`requestID`),
  KEY `requestUserID_idx` (`requestUserID`),
  CONSTRAINT `requestUserID` FOREIGN KEY (`requestUserID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_request`
--

LOCK TABLES `verification_request` WRITE;
/*!40000 ALTER TABLE `verification_request` DISABLE KEYS */;
INSERT INTO `verification_request` VALUES (1,1,NULL,NULL,NULL,NULL,'Pending'),(2,1,NULL,NULL,NULL,NULL,'Pending'),(3,1,NULL,NULL,NULL,NULL,'Pending'),(4,1,NULL,NULL,NULL,NULL,'Pending'),(5,1,NULL,NULL,NULL,NULL,'Pending'),(6,1,NULL,NULL,NULL,NULL,'Pending'),(7,1,NULL,NULL,NULL,NULL,'Pending'),(8,1,NULL,NULL,NULL,NULL,'Pending'),(9,1,NULL,NULL,NULL,NULL,'Pending'),(10,1,'image_1712815735396.png','image_1712815735396.png',NULL,NULL,'Pending'),(11,1,'image_1712815963347.png','image_1712815963347.png',NULL,NULL,'Pending'),(12,1,'image1_1712816057913.png','image1_1712816057913.png',NULL,NULL,'Pending'),(13,1,'image1_1712816319064.png','image2_1712816319079.png',NULL,NULL,'Pending');
/*!40000 ALTER TABLE `verification_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-11 15:11:51
