-- MySQL dump 10.13  Distrib 5.6.39, for macos10.13 (x86_64)
--
-- Host: localhost    Database: gitguddojo
-- ------------------------------------------------------
-- Server version	5.6.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_logs`
--

DROP TABLE IF EXISTS `chat_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_logs` (
  `id` varchar(45) NOT NULL,
  `roomId` varchar(45) NOT NULL DEFAULT '',
  `userId` varchar(45) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `message` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_logs`
--

LOCK TABLES `chat_logs` WRITE;
/*!40000 ALTER TABLE `chat_logs` DISABLE KEYS */;
INSERT INTO `chat_logs` VALUES ('0f0e0a47-4ef8-6b07-1bd2-a4f8884bd557','c835fecd-28b7-7fb7-cb45-33040d803591','101058958873840011849','Changhai G','2020-01-01 08:07:23','how are you\n'),('5a7bda7b-9237-77e8-a1da-ae26bb749852','9dbbff09-cd61-6548-606a-c67e0ffc22ca','01de523c-97a4-ff46-8dfa-43e2a8ffecac','jack','2019-12-30 23:04:43','hello\n'),('737a9c57-5b74-72cc-012e-8a64212ef45a','9dbbff09-cd61-6548-606a-c67e0ffc22ca','536af4f4-26c7-dc5d-7a57-5c1bec9e7f32','changhai-us','2019-12-30 23:05:17','hello, everyone\n'),('9f0e7967-fd4f-9bbc-4f66-97be57762a7f','c835fecd-28b7-7fb7-cb45-33040d803591','101058958873840011849','Changhai G','2020-01-01 08:07:20','hello\n');
/*!40000 ALTER TABLE `chat_logs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-04 22:50:57
