-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: errandcatcher
-- ------------------------------------------------------
-- Server version	8.0.39

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
  `applicationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `applicationStatus` varchar(10) DEFAULT 'Pending',
  `applicationQualification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`applicationID`),
  KEY `userID_idx` (`catcherID`) /*!80000 INVISIBLE */,
  KEY `applicationErrandID_idx` (`applicationErrandID`),
  CONSTRAINT `applicationErrandID` FOREIGN KEY (`applicationErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `catcherID` FOREIGN KEY (`catcherID`) REFERENCES `useraccount` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES (1,53,29,'2024-12-21 19:31:26','Denied',NULL),(2,53,37,'2024-12-28 10:33:07','Accepted',NULL),(3,53,39,'2024-12-28 10:33:07','Accepted',NULL),(4,45,74,'2024-12-28 10:54:05','Pending',NULL);
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
  `commissionTitle` varchar(100) DEFAULT NULL,
  `commissionStartDate` date DEFAULT NULL,
  `commissionDeadline` date DEFAULT NULL,
  `commissionLocation` text,
  `commissionTo` text COMMENT 'if delivery, end place',
  `commissionType` varchar(50) DEFAULT NULL,
  `commissionDesc` text,
  `commissionPay` double DEFAULT NULL,
  `commissionStatus` varchar(30) DEFAULT 'Available',
  `DatePosted` date DEFAULT NULL,
  `ContactNumber` varchar(30) DEFAULT NULL COMMENT 'Additional contact number',
  `commissionLong` double DEFAULT NULL,
  `commissionLat` double DEFAULT NULL,
  `commissionDestLong` double DEFAULT NULL,
  `commissionDestLat` double DEFAULT NULL,
  `commissionTags` text,
  PRIMARY KEY (`commissionID`),
  KEY `userID_idx` (`employerID`),
  CONSTRAINT `userID` FOREIGN KEY (`employerID`) REFERENCES `useraccount` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commission`
--

LOCK TABLES `commission` WRITE;
/*!40000 ALTER TABLE `commission` DISABLE KEYS */;
INSERT INTO `commission` VALUES (45,28,'Sample Title','2024-11-13','2024-11-25','Poblacion, Cordova, Cebu',NULL,'HomeService - Indoor','Sample description for testing only',19999,'Expired',NULL,'09499286777',123.94968547515049,10.252161673303604,NULL,NULL,NULL),(46,28,'Create a Website','2034-09-27','2031-10-05','Poblacion, Cordova, Cebu','','HomeService - Indoor','Create me a website for my profolio',50,'Caught','2024-09-27','09876543210',123.94980018185595,10.253005429680513,0,0,NULL),(47,36,'Deliver a washing machine','2024-10-12','2024-10-13','Near Tapang Clinic, Tiangue Rd., Gun-on, Lapu-Lapu City','7-11, Poblacion, Cordova, Cebu','Delivery','Deliver my washing machine from Lapu-Lapu to 7-11 Cordova\nSomeone will pick it up there',200,'Expired','2024-10-08','0992323435',123.947168,10.302859,123.949508,10.252773,NULL),(52,28,'Deliver a baby...','2024-11-07','2024-11-09','Gun-Ob, Lapu-Lapu, Philippines','Ucla Street Fatima III, Dasmariñas, Cavite, Philippines','Delivery','Deliver my baby',160,'Expired','2024-11-06','09499286777',123.947145,10.302707,123.953989,10.326286,NULL),(53,28,'plant a bomb','2024-11-07','2024-11-21','Looc, Lapu-Lapu, Philippines','A.C. Cortes Avenue Maguikay, Mandaue, Philippines','Transportation','trasnport a bomb',145,'Caught','2024-11-06','09499286777',123.945068,10.305826,123.943878,10.332845,NULL),(55,28,'Road trip','2024-11-22','2024-11-23','Opon Mercado, Lapu-Lapu City','Opon Mercado, Lapu-Lapu City','Transportation','Tour me around Lapu-Lapu CIty main road \nfor 2 days and one night \nno rest',100,'Expired','2024-11-18','09499286777',123.949232,10.310638,NULL,NULL,NULL),(56,28,'Alsaha mi','2024-11-20','2024-11-28','Gun-ob, Lapu-Lapu CIty','UCLM, Looc, Mandaue','Transportation','Alsaha mi tana',160,'Expired','2024-11-21','09499286777',123.946907,10.30128,123.952796,10.325019,NULL),(63,28,'Test','2024-12-17','2024-12-17','ssssssssssssssssssssssssssss','','HomeService - Indoor','asdasd',522,'Expired','2024-12-09','09499286777',123.94815423484097,10.302627424692306,0,0,NULL),(64,28,'Devour them all....','2024-12-09','2024-12-28','Gun-ob, Lapu-Lapu City','','HomeService - Outdoor','eat all you can ta na',543,'Expired','2024-12-14','09499286777',123.95154249846917,10.299423480390416,0,0,NULL),(65,28,'Cat food','2024-12-22','2024-12-28','Lapu-lapu','mandaue','Delivery','buy cat food fast',100,'Expired','2024-12-17','9142324234',123.983781,10.362404,123.952089,10.3468,NULL),(66,NULL,'cat litter','2024-12-22','2024-12-30','mandaue','lapu-lapu','Delivery','buy cat litter',175,'Expired','2024-12-19','09157259247',123.943031,10.325176,123.950988,10.308763,NULL),(67,28,'Sample','2024-12-22','2024-12-29','amoa','','HomeService - Indoor','sample text delete later',3000,'Expired','2024-12-22','09499286777',123.96047531861257,10.295930300618124,0,0,'Babysitting,Laundry Services,House Cleaning');
/*!40000 ALTER TABLE `commission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_verification_tokens`
--

DROP TABLE IF EXISTS `email_verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_verification_tokens` (
  `verID` int NOT NULL AUTO_INCREMENT,
  `verUserID` int DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`verID`),
  KEY `verUserID_idx` (`verUserID`),
  CONSTRAINT `verUserID` FOREIGN KEY (`verUserID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_verification_tokens`
--

LOCK TABLES `email_verification_tokens` WRITE;
/*!40000 ALTER TABLE `email_verification_tokens` DISABLE KEYS */;
INSERT INTO `email_verification_tokens` VALUES (1,28,'123asd','2024-12-25 15:27:43');
/*!40000 ALTER TABLE `email_verification_tokens` ENABLE KEYS */;
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
  `transDateAccepted` datetime DEFAULT CURRENT_TIMESTAMP,
  `transDateComplete` datetime DEFAULT NULL,
  `transReciept` varchar(100) DEFAULT NULL,
  `transStatus` varchar(45) DEFAULT 'Ongoing',
  PRIMARY KEY (`transactID`),
  KEY `transErrandID_idx` (`transErrandID`),
  KEY `transCatcherID_idx` (`transCatcherID`),
  CONSTRAINT `transCatcherID` FOREIGN KEY (`transCatcherID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transErrandID` FOREIGN KEY (`transErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `errandtransaction`
--

LOCK TABLES `errandtransaction` WRITE;
/*!40000 ALTER TABLE `errandtransaction` DISABLE KEYS */;
INSERT INTO `errandtransaction` VALUES (2,45,29,'Ongoing','2024-12-21 10:32:19','2024-12-27 01:22:48',NULL,'Task Done'),(3,45,37,'Ongoing','2024-12-21 10:32:39','2024-12-27 10:05:23',NULL,'Complete'),(4,46,39,'Ongoing','2024-12-21 10:32:39','2024-12-27 10:05:35',NULL,'Complete'),(7,53,29,'Ongoing','2024-12-26 18:31:10','2024-12-27 10:16:25',NULL,'Complete');
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
  `feedbackDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `feedbackComment` text,
  `feedbackErrandID` int DEFAULT NULL,
  PRIMARY KEY (`feedbackID`),
  KEY `commissionID_idx` (`feedbackErrandID`),
  KEY `catcherID_idx` (`feedbackCatcherID`),
  KEY `employerID_idx` (`feedbackPosterID`),
  CONSTRAINT `feedbackCatcherID` FOREIGN KEY (`feedbackCatcherID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbackCommissionID` FOREIGN KEY (`feedbackErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbackPosterID` FOREIGN KEY (`feedbackPosterID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackcommission`
--

LOCK TABLES `feedbackcommission` WRITE;
/*!40000 ALTER TABLE `feedbackcommission` DISABLE KEYS */;
INSERT INTO `feedbackcommission` VALUES (124,28,29,3,'2024-10-07 00:00:00','good',45),(125,28,29,5,'2024-12-17 00:00:00','good catcher',65),(126,28,39,3,'2024-12-21 00:00:00','goods ra',46),(127,28,29,4,'2024-12-26 00:00:00','good',45),(128,28,39,4,'2024-12-27 00:00:00','asd',46),(129,28,29,3,'2024-12-27 00:00:00','asd',45),(130,28,39,3,'2024-12-27 00:00:00','asd',46);
/*!40000 ALTER TABLE `feedbackcommission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoiceID` int NOT NULL AUTO_INCREMENT,
  `invoiceErrandID` int DEFAULT NULL,
  `invoiceCatcherID` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL COMMENT 'Total amount in centavos',
  `type` varchar(255) DEFAULT NULL,
  `description` text,
  `checkoutId` varchar(255) DEFAULT NULL,
  `invoiceemployerID` int DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `paid` datetime DEFAULT NULL,
  PRIMARY KEY (`invoiceID`),
  KEY `invoiceErrandID_idx` (`invoiceErrandID`),
  KEY `invoiceCatcherID_idx` (`invoiceCatcherID`),
  KEY `invoiceemployerID_idx` (`invoiceemployerID`),
  CONSTRAINT `invoiceCatcherID` FOREIGN KEY (`invoiceCatcherID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoiceemployerID` FOREIGN KEY (`invoiceemployerID`) REFERENCES `useraccount` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoiceErrandID` FOREIGN KEY (`invoiceErrandID`) REFERENCES `commission` (`commissionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,45,29,1999900.00,'HomeService - Indoor','Sample Title','cs_5VK4dkrrjLLGtEseoo81Lqke',28,'pi_vDBP3RFHQReBcsKVKy1Hj7Uw','2024-12-27 09:21:58');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
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
  `notifDesc` text,
  `isRead` varchar(5) DEFAULT 'no',
  `notifDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notificationID`),
  KEY `userID_idx` (`notifUserID`),
  CONSTRAINT `notifUserID` FOREIGN KEY (`notifUserID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,36,'Expiration','Your Errand has expired.','no','2024-05-11 11:52:24'),(2,28,'Expiration','Your Errand has expired.','yes','2024-05-11 11:52:24'),(3,28,'Expiration','Your Errand has expired.','yes','2024-05-11 11:52:24'),(4,28,'Expiration','Your Errand has expired.','yes','2024-05-11 11:52:24'),(5,28,'Expiration','Your Errand has expired.','yes','2024-05-11 11:52:24'),(6,28,'Expiration','Your Errand has expired.','yes','2024-05-11 11:52:24'),(7,29,'Expiration','Your transaction has expired.','yes','2024-05-30 14:29:43'),(8,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-09-22 22:41:00'),(9,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-09-22 22:43:02'),(10,28,'Errand Completed','A Catcher has completed your errand','yes','2024-09-22 23:18:35'),(11,29,'New Errand','A new errand has been posted','yes','2024-09-27 10:32:53'),(12,37,'New Errand','A new errand has been posted','yes','2024-09-27 10:32:53'),(13,39,'New Errand','A new errand has been posted','no','2024-09-27 10:32:53'),(14,28,'Errand Application','A Catcher has applied to on of your errand','yes','2024-09-27 12:36:58'),(15,29,'New Errand','New notification message for all users','yes','2024-10-03 11:17:31'),(16,37,'New Errand','New notification message for all users','yes','2024-10-03 11:17:31'),(17,39,'New Errand','New notification message for all users','no','2024-10-03 11:17:31'),(18,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 14:08:28'),(19,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(20,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 15:32:55'),(21,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(22,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 15:50:24'),(23,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(24,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 15:56:04'),(25,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(26,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 15:58:46'),(27,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(28,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 16:08:33'),(29,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(30,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 16:12:29'),(31,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(32,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(33,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(34,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 16:26:33'),(35,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-04 16:26:36'),(36,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(37,29,'New Errand','A new errand has been posted','yes','2024-10-08 19:36:16'),(38,37,'New Errand','A new errand has been posted','no','2024-10-08 19:36:16'),(39,39,'New Errand','A new errand has been posted','no','2024-10-08 19:36:16'),(40,52,'New Errand','A new errand has been posted','yes','2024-10-08 19:36:16'),(41,29,'New Errand','A new errand has been posted','yes','2024-10-10 15:15:51'),(42,37,'New Errand','A new errand has been posted','no','2024-10-10 15:15:51'),(43,39,'New Errand','A new errand has been posted','no','2024-10-10 15:15:51'),(44,52,'New Errand','A new errand has been posted','yes','2024-10-10 15:15:51'),(45,29,'New Errand','A new errand has been posted','yes','2024-10-11 09:45:30'),(46,37,'New Errand','A new errand has been posted','no','2024-10-11 09:45:30'),(47,39,'New Errand','A new errand has been posted','no','2024-10-11 09:45:30'),(48,52,'New Errand','A new errand has been posted','yes','2024-10-11 09:45:30'),(52,29,'New Errand','A new errand has been posted','yes','2024-10-11 10:53:32'),(53,37,'New Errand','A new errand has been posted','no','2024-10-11 10:53:32'),(54,39,'New Errand','A new errand has been posted','no','2024-10-11 10:53:32'),(55,52,'New Errand','A new errand has been posted','yes','2024-10-11 10:53:32'),(59,29,'New Errand','A new errand has been posted','yes','2024-10-11 10:57:06'),(60,37,'New Errand','A new errand has been posted','no','2024-10-11 10:57:06'),(61,39,'New Errand','A new errand has been posted','no','2024-10-11 10:57:06'),(62,52,'New Errand','A new errand has been posted','yes','2024-10-11 10:57:06'),(63,36,'Expiration','Your Errand has expired.','no','2024-10-14 11:20:04'),(64,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-10-21 14:15:54'),(67,29,'New Errand','A new errand has been posted','yes','2024-11-06 14:21:57'),(68,37,'New Errand','A new errand has been posted','no','2024-11-06 14:21:57'),(69,39,'New Errand','A new errand has been posted','no','2024-11-06 14:21:57'),(70,52,'New Errand','A new errand has been posted','yes','2024-11-06 14:21:57'),(74,29,'New Errand','A new errand has been posted','yes','2024-11-06 14:50:05'),(75,37,'New Errand','A new errand has been posted','no','2024-11-06 14:50:05'),(76,39,'New Errand','A new errand has been posted','no','2024-11-06 14:50:05'),(77,52,'New Errand','A new errand has been posted','yes','2024-11-06 14:50:05'),(81,29,'Application','Your Errand application has been Accepted','yes','2024-11-06 14:55:23'),(82,29,'Application','Your Errand application has been Accepted','yes','2024-11-06 14:55:25'),(83,29,'Application','Your Errand application has been Accepted','yes','2024-11-06 14:55:26'),(84,29,'Application','Your Errand application has been Accepted','yes','2024-11-06 14:55:26'),(85,29,'Application','Your Errand application has been Accepted','yes','2024-11-06 14:55:26'),(86,28,'Errand completed','A Catcher has mark completed an errand','yes','2024-11-06 14:56:07'),(87,28,'Errand completed','A Catcher has mark completed an errand','yes','2024-11-06 14:56:27'),(88,28,'Errand completed','A Catcher has mark completed an errand','yes','2024-11-06 15:01:46'),(89,29,'New Errand','A new errand has been posted','yes','2024-11-06 16:25:32'),(90,37,'New Errand','A new errand has been posted','no','2024-11-06 16:25:32'),(91,39,'New Errand','A new errand has been posted','no','2024-11-06 16:25:32'),(92,52,'New Errand','A new errand has been posted','yes','2024-11-06 16:25:32'),(94,1,'Verification Request','Ash Employer has submitted a Verification request','no',NULL),(95,36,'Expiration','Your Errand has expired.','no','2024-11-09 11:29:44'),(96,28,'Expiration','Your Errand has expired.','yes','2024-11-09 11:29:44'),(97,29,'New Errand','A new errand has been posted','yes','2024-11-18 10:51:37'),(98,37,'New Errand','A new errand has been posted','no','2024-11-18 10:51:37'),(99,39,'New Errand','A new errand has been posted','no','2024-11-18 10:51:37'),(100,52,'New Errand','A new errand has been posted','yes','2024-11-18 10:51:37'),(101,36,'Expiration','Your Errand has expired.','no','2024-11-21 12:43:42'),(102,28,'Expiration','Your Errand has expired.','yes','2024-11-21 12:43:42'),(103,28,'Expiration','Your Errand has expired.','yes','2024-11-21 12:43:42'),(104,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(105,29,'Application','Your Errand application has been Accepted','yes','2024-11-21 22:26:41'),(106,29,'New Errand','A new errand has been posted','yes','2024-11-21 22:39:45'),(107,37,'New Errand','A new errand has been posted','no','2024-11-21 22:39:45'),(108,39,'New Errand','A new errand has been posted','no','2024-11-21 22:39:45'),(109,52,'New Errand','A new errand has been posted','yes','2024-11-21 22:39:45'),(113,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(114,29,'Application','Your Errand application has been Accepted','yes','2024-11-21 22:43:27'),(115,29,'New Errand','A new errand has been posted','yes','2024-11-21 22:57:09'),(116,37,'New Errand','A new errand has been posted','no','2024-11-21 22:57:09'),(117,39,'New Errand','A new errand has been posted','no','2024-11-21 22:57:09'),(118,52,'New Errand','A new errand has been posted','yes','2024-11-21 22:57:09'),(119,29,'New Errand','A new errand has been posted','yes','2024-11-22 07:32:36'),(120,37,'New Errand','A new errand has been posted','no','2024-11-22 07:32:36'),(121,39,'New Errand','A new errand has been posted','no','2024-11-22 07:32:36'),(122,52,'New Errand','A new errand has been posted','yes','2024-11-22 07:32:36'),(126,29,'New Errand','A new errand has been posted','yes','2024-11-22 07:36:04'),(127,37,'New Errand','A new errand has been posted','no','2024-11-22 07:36:04'),(128,39,'New Errand','A new errand has been posted','no','2024-11-22 07:36:04'),(129,52,'New Errand','A new errand has been posted','yes','2024-11-22 07:36:04'),(133,29,'New Errand','A new errand has been posted','yes','2024-11-22 09:10:06'),(134,37,'New Errand','A new errand has been posted','no','2024-11-22 09:10:06'),(135,39,'New Errand','A new errand has been posted','no','2024-11-22 09:10:06'),(136,52,'New Errand','A new errand has been posted','yes','2024-11-22 09:10:06'),(140,29,'New Errand','A new errand has been posted','yes','2024-11-22 11:42:58'),(141,37,'New Errand','A new errand has been posted','no','2024-11-22 11:42:58'),(142,39,'New Errand','A new errand has been posted','no','2024-11-22 11:42:58'),(143,52,'New Errand','A new errand has been posted','yes','2024-11-22 11:42:58'),(147,29,'New Errand','A new errand has been posted','yes','2024-11-22 11:44:11'),(148,37,'New Errand','A new errand has been posted','no','2024-11-22 11:44:11'),(149,39,'New Errand','A new errand has been posted','no','2024-11-22 11:44:11'),(150,52,'New Errand','A new errand has been posted','yes','2024-11-22 11:44:11'),(151,36,'Expiration','Your Errand has expired.','no','2024-11-23 10:48:19'),(152,28,'Expiration','Your Errand has expired.','yes','2024-11-23 10:48:19'),(153,28,'Expiration','Your Errand has expired.','yes','2024-11-23 10:48:19'),(154,28,'Expiration','Your Errand has expired.','yes','2024-11-23 10:48:19'),(158,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-11-23 13:19:35'),(159,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(160,28,'Expiration','Your Errand has expired.','yes','2024-12-01 11:02:28'),(161,36,'Expiration','Your Errand has expired.','no','2024-12-01 11:02:28'),(162,28,'Expiration','Your Errand has expired.','yes','2024-12-01 11:02:28'),(163,28,'Expiration','Your Errand has expired.','yes','2024-12-01 11:02:28'),(164,28,'Expiration','Your Errand has expired.','yes','2024-12-01 11:02:28'),(165,28,'Expiration','Your Errand has expired.','yes','2024-12-01 11:02:28'),(166,1,'Verification Request','37\n        has submitted a Verification request','no',NULL),(167,29,'New Errand','A new errand has been posted','yes','2024-12-09 14:10:37'),(168,37,'New Errand','A new errand has been posted','no','2024-12-09 14:10:37'),(169,39,'New Errand','A new errand has been posted','no','2024-12-09 14:10:37'),(170,52,'New Errand','A new errand has been posted','yes','2024-12-09 14:10:37'),(171,29,'New Errand','A new errand has been posted','yes','2024-12-14 14:17:26'),(172,37,'New Errand','A new errand has been posted','no','2024-12-14 14:17:26'),(173,39,'New Errand','A new errand has been posted','no','2024-12-14 14:17:26'),(174,52,'New Errand','A new errand has been posted','yes','2024-12-14 14:17:26'),(175,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(176,36,'Expiration','Your Errand has expired.','no','2024-12-15 15:13:37'),(177,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(178,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(179,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(180,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(181,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:13:37'),(182,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(183,36,'Expiration','Your Errand has expired.','no','2024-12-15 15:15:37'),(184,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(185,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(186,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(187,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(188,28,'Expiration','Your Errand has expired.','yes','2024-12-15 15:15:37'),(189,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 15:24:39'),(190,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 15:28:43'),(191,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 15:32:37'),(192,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(193,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 15:49:34'),(194,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(195,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 15:51:26'),(196,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(197,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 15:58:28'),(198,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(199,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-15 16:04:23'),(200,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(201,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 16:23:07'),(202,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 16:26:32'),(203,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 16:27:01'),(204,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 16:28:18'),(205,28,'Errand Cancelled','A Catcher has cancelled in doing an errand','yes','2024-12-15 16:34:19'),(206,28,'Errand Application','A Catcher has applied to on of your errand','yes',NULL),(207,NULL,'Application Cancelled','A Catcher has cancelled their application on of your errand','no','2024-12-16 21:26:48'),(208,28,'Errand Application','A Catcher has applied to on of your errand','no',NULL),(209,29,'Application','Your Errand application has been Denied','no','2024-12-16 21:31:53'),(210,28,'Errand Application','A Catcher has applied to on of your errand','no','2024-12-16 21:32:31'),(211,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(212,36,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(213,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(214,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(215,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(216,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(217,28,'Expiration','Your Errand has expired.','no','2024-12-17 09:10:46'),(218,1,'Verification Request','A user has submitted a Verification request','no','2024-12-17 09:12:29'),(219,57,'Verification Request','A user has submitted a Verification request','no','2024-12-17 09:12:29'),(221,29,'New Errand','A new errand has been posted','no','2024-12-17 18:02:55'),(222,37,'New Errand','A new errand has been posted','no','2024-12-17 18:02:55'),(223,39,'New Errand','A new errand has been posted','no','2024-12-17 18:02:55'),(224,52,'New Errand','A new errand has been posted','yes','2024-12-17 18:02:55'),(228,28,'Errand Application','A Catcher has applied to on of your errand','no','2024-12-17 18:03:40'),(229,29,'Application','Your Errand application has been Accepted','no','2024-12-17 18:05:44'),(230,28,'Errand completed','A Catcher has mark completed an errand','no','2024-12-17 18:06:06'),(231,29,'New Errand','A new errand has been posted','no','2024-12-19 14:33:33'),(232,37,'New Errand','A new errand has been posted','no','2024-12-19 14:33:33'),(233,39,'New Errand','A new errand has been posted','no','2024-12-19 14:33:33'),(234,52,'New Errand','A new errand has been posted','no','2024-12-19 14:33:33'),(235,28,'Errand completed','A Catcher has mark completed an errand','no','2024-12-21 12:19:11'),(236,28,'Account Reactivation','Your account has been reactivated','no','2024-12-21 13:34:56'),(237,33,'Account Reactivation','Your account has been reactivated','no','2024-12-21 13:38:13'),(238,33,'Account Deactivated','Your account has been deactivated','no','2024-12-21 13:38:21'),(239,29,'Errand completed','A Catcher has mark completed an errand','no','2024-12-21 15:48:12'),(240,29,'New Errand','A new errand has been posted','no','2024-12-22 17:50:09'),(241,37,'New Errand','A new errand has been posted','no','2024-12-22 17:50:09'),(242,39,'New Errand','A new errand has been posted','no','2024-12-22 17:50:09'),(243,52,'New Errand','A new errand has been posted','no','2024-12-22 17:50:09'),(244,74,'New Errand','A new errand has been posted','no','2024-12-22 17:50:09'),(245,1,'Verification Request','A user has submitted a Verification request','no','2024-12-25 19:01:14'),(246,57,'Verification Request','A user has submitted a Verification request','no','2024-12-25 19:01:14'),(247,29,'Application','Your Errand application has been Accepted','no','2024-12-26 18:09:17'),(248,29,'Application','Your Errand application has been Accepted','no','2024-12-26 18:20:06'),(249,29,'Application','Your Errand application has been Accepted','no','2024-12-26 18:31:10'),(250,37,'Errand completed','A Catcher has mark completed an errand','no','2024-12-27 10:05:23'),(251,39,'Errand completed','A Catcher has mark completed an errand','no','2024-12-27 10:05:35'),(252,29,'Errand completed','A Catcher has mark completed an errand','no','2024-12-27 10:16:25'),(253,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(254,36,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(255,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(256,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(257,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(258,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(259,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(260,28,'Expiration','Your Errand has expired.','no','2024-12-28 10:00:28'),(268,39,'Application','Your Errand application has been Accepted','no','2024-12-28 10:34:05'),(269,37,'Application','Your Errand application has been Accepted','no','2024-12-28 10:34:31'),(270,29,'Application','Your Errand application has been Accepted','no','2024-12-28 10:40:05'),(271,74,'Application','Your Errand application has been Accepted','no','2024-12-28 10:54:30'),(272,39,'Application','Your Errand application has been Accepted','no','2024-12-28 10:54:38'),(273,74,'Application','Your Errand application has been Accepted','no','2024-12-28 10:57:20'),(274,39,'Application','Your Errand application has been Accepted','no','2024-12-28 10:57:48'),(275,39,'Application','Your Errand application has been Denied','no','2024-12-28 13:10:18'),(276,39,'Application','Your Errand application has been Denied','no','2024-12-28 13:11:40'),(277,37,'Application','Your Errand application has been Denied','no','2024-12-28 13:18:43'),(278,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(279,36,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(280,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(281,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(282,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(283,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(284,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(285,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(286,NULL,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44'),(287,28,'Expiration','Your Errand has expired.','no','2024-12-31 13:23:44');
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
  `dateCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `profileImage` varchar(100) DEFAULT NULL,
  `userQualification` text,
  `userHasErrand` varchar(10) DEFAULT 'false',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'admin1','$2b$10$pOrM558NBIeyD8xzJNorXeVYm6ceTieVxYfhsXW9EJmm0aUb/SQ.i','last','first','male','adreanpaulsorono@gmail.com','',22,'1969-12-31',NULL,NULL,'Verified','admin',NULL,NULL,NULL,NULL),(28,'ash1','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','Employer','ash','Female','ash_emplyer@gmail.com','226',22,'1969-12-16','basak, lapu-lapu city','I am a web designer hell yeah','Verified','Employer','2023-08-10 00:00:00','image_1713156589050.png','Government Agency',NULL),(29,'ash2','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','Catcher','ash','female','ash_catch@email.com','123',23,'1969-12-31','gun ob, Lapu-Lapu City',NULL,'Verified','Catcher','2023-08-10 00:00:00',NULL,'Programming,Communication,IT Support,Pet Sitting,Content Writing,C#,Landscaping,Automobile Repair,Driver Services,Restoration Services,Babysitting','false'),(33,'employer','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','halina','lorry','female','test2@gmail.com','09887888788',22,'2024-02-21','mindanao',NULL,'Deactivated','Employer','2024-02-17 00:00:00',NULL,NULL,NULL),(36,'adrean','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','sorono','adrean','Male','adreanpaulsorono@gmail.com','09299286777',24,'1995-12-28','Gun-ob, Lapu-Lapu City','sample','Unverified','Employer','2024-03-01 00:00:00',NULL,'Human Resources,Self-Employed',NULL),(37,'raymund','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','raymund','valeroso','Male','ramund@gmail.com','094342',24,NULL,'Babag, Lapu-Lapu City',NULL,'Unverified','Catcher','2024-03-07 00:00:00',NULL,'Communication,Hardworking,Leadership','false'),(39,'trish','$2b$10$HyE2gBbAmk0Bo8Pq99BN4ePxiHUI3yae9/UivIKNeozh0FUZuWvd.','sasing','trisha','Female','trisha@email.com','09876543210',23,'2000-04-04','liloan',NULL,'Verified','Catcher','2024-04-04 00:00:00',NULL,NULL,'false'),(52,'paul123','$2b$10$kEXOh4PjF21rUJWWT4OzpOkTzSN25wHqdL6asaEfHmF5awD1Arr8C','Potot','paul','Male','paul@email.com',NULL,NULL,'2006-10-01',NULL,NULL,'Verified','Catcher','2024-10-06 00:00:00',NULL,NULL,NULL),(53,'janette','$2b$10$pyW6PCAIauo2Xy7oVzAmGe3ZikvdZzcMUooER7WyQ0dtu6AszmOjm','tanquis','janette','Female','janette@gmail.com',NULL,NULL,'2006-10-02',NULL,NULL,'Unverified','Employer','2024-10-11 00:00:00',NULL,NULL,NULL),(57,'admin','$2b$10$EY8128HSAlm.S7WEd7zFFeND1bfcymk8YsT/5ZuKgBTOcTukC6KHW','adrean','','male','adreansorono123@gmail.com','09499286777',NULL,'1999-05-24',NULL,NULL,'Unverified','admin','2024-11-16 00:00:00',NULL,NULL,NULL),(58,'monde','$2b$10$f7OxBhxDkM/DN6shZzrKPu/aAb4KUgvNwDtLwBT326V2DY03GmT8m','monlast','mon','Male','monde@gmail.com',NULL,NULL,'2006-12-05',NULL,NULL,'Unverified','Employer','2024-12-05 00:00:00',NULL,NULL,NULL),(74,'raphy222','$2b$10$X2F6/5gGeYk0Y4JJ5J.dd.rolQrkhCnlHLn6kuK.xu6yoytqX14Hq','semblante','raphs','Male','semblanteraphy@gmail.com',NULL,NULL,'1997-03-19',NULL,NULL,'Unverified','Catcher','2024-12-19 00:00:00',NULL,NULL,'false'),(94,'seth123','$2b$10$ugc8IylT8jHxRtnJNzdmbevM7pNm13SVz/362NHXS/Ax53gdrO4ou','asda','asd','Male','adreansorono@gmail.com','123',NULL,'2006-12-07','ads',NULL,'Verified','Employer','2024-12-24 00:00:00',NULL,NULL,'false');
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userexperience`
--

DROP TABLE IF EXISTS `userexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userexperience` (
  `expID` int NOT NULL AUTO_INCREMENT,
  `expUserID` int DEFAULT NULL,
  `expJobTitle` varchar(45) DEFAULT NULL,
  `expEmployer` varchar(45) DEFAULT NULL,
  `expStartDate` varchar(45) DEFAULT NULL,
  `expEndDate` varchar(45) DEFAULT NULL,
  `expDesc` text,
  `expLocation` text,
  PRIMARY KEY (`expID`),
  KEY `userID_idx` (`expUserID`),
  CONSTRAINT `expUserID` FOREIGN KEY (`expUserID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userexperience`
--

LOCK TABLES `userexperience` WRITE;
/*!40000 ALTER TABLE `userexperience` DISABLE KEYS */;
INSERT INTO `userexperience` VALUES (2,29,'GIP Intern','DOLE','August 2019','December 2019','I work as an admin aide','Basak, Lapu-Lapu City');
/*!40000 ALTER TABLE `userexperience` ENABLE KEYS */;
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
  `driversLicense1` varchar(45) DEFAULT NULL,
  `driversLicense2` varchar(45) DEFAULT NULL,
  `requestStatus` varchar(45) DEFAULT 'Pending',
  PRIMARY KEY (`requestID`),
  KEY `requestUserID_idx` (`requestUserID`),
  CONSTRAINT `requestUserID` FOREIGN KEY (`requestUserID`) REFERENCES `useraccount` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_request`
--

LOCK TABLES `verification_request` WRITE;
/*!40000 ALTER TABLE `verification_request` DISABLE KEYS */;
INSERT INTO `verification_request` VALUES (1,28,'image1_1730963355397.jpg','image2_1730963355400.jpg',NULL,NULL,NULL,NULL,'Pending'),(2,37,'image1_1733416398743.jpg','image2_1733416398752.jpg',NULL,NULL,NULL,NULL,'Pending'),(3,36,'image1_1734397949479.jpg','image2_1734397949480.jpg',NULL,NULL,NULL,NULL,'Pending'),(4,29,'image1_1735124473903.jpg','image2_1735124473927.jpg','doc1_1735124473945.jpg','doc2_1735124473981.jpg','dr1_1735124473930.jpg','dr2_1735124473942.jpg','Pending');
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

-- Dump completed on 2024-12-31 16:48:41
