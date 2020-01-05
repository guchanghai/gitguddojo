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
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_rooms` (
  `id` varchar(50) NOT NULL,
  `userIDs` varchar(1000) DEFAULT NULL,
  `userNames` varchar(2000) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_rooms`
--

LOCK TABLES `chat_rooms` WRITE;
/*!40000 ALTER TABLE `chat_rooms` DISABLE KEYS */;
INSERT INTO `chat_rooms` VALUES ('15b96b56-29ac-a4d4-d04b-2f87f724bcf7','01de523c-97a4-ff46-8dfa-43e2a8ffecac,2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,101058958873840011849','jack,jill,Changhai G','2020-01-01 08:06:44',0),('1cb2ada1-1f5e-ccfd-69d4-95a3c05f060a','3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,01de523c-97a4-ff46-8dfa-43e2a8ffecac','Changhai F,changhai-us,jack','2019-12-30 23:07:14',0),('24ed623c-0fd1-10f6-ee94-d8f1e89df4d7','3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,01de523c-97a4-ff46-8dfa-43e2a8ffecac','Changhai F,changhai-us,jack','2020-01-01 22:52:21',0),('37800583-f7de-f187-3b80-1fe00d5a5138','01de523c-97a4-ff46-8dfa-43e2a8ffecac,2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,101058958873840011849','jack,jill,Changhai F,changhai-us,Changhai G','2020-01-01 10:56:59',0),('40c95fce-1a51-e4e7-f5ee-89bcecc9720b','01de523c-97a4-ff46-8dfa-43e2a8ffecac,2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,e9a7c5c1-e7a0-d9c4-2ff3-2ebd1c75d9c4,101058958873840011849','jack,jill,Changhai F,changhai-us,changhaiadobe,Changhai G','2020-01-01 11:30:41',0),('47b855fe-160f-0625-6c66-6fd8821053ba','2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,101058958873840011849','jill,Changhai F,Changhai G','2020-01-01 11:36:53',0),('4f494ea7-ff5d-af7e-d17c-31263b6bc55a','01de523c-97a4-ff46-8dfa-43e2a8ffecac','jack','2020-01-01 21:58:28',0),('6b1744e7-91de-c096-ade5-cbe7ecb18c8b','01de523c-97a4-ff46-8dfa-43e2a8ffecac,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32','jack,changhai-us','2019-12-30 23:07:34',0),('6f241db5-ae85-d6e7-f1bf-8611d470001e','101058958873840011849,2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,d5e42595-89bb-e929-2cb4-db165f783346,deb245a6-b7db-e89b-c1eb-09d7c7b2c8ce,01de523c-97a4-ff46-8dfa-43e2a8ffecac','Changhai G,jill,Changhai F,changhai-us,changhaide,chgude1,jack','2020-01-01 21:47:02',0),('7dac6e4d-a4bb-d37d-cd07-a1e7a5d4b625','101058958873840011849,2-01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,d5e42595-89bb-e929-2cb4-db165f783346,deb245a6-b7db-e89b-c1eb-09d7c7b2c8ce,01de523c-97a4-ff46-8dfa-43e2a8ffecac','Changhai G,jill,Changhai F,changhai-us,changhaide,chgude1,jack','2020-01-01 23:26:38',0),('9dbbff09-cd61-6548-606a-c67e0ffc22ca','01de523c-97a4-ff46-8dfa-43e2a8ffecac,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,101058958873840011849','jack,changhai-us,Changhai G','2019-12-30 23:04:29',0),('c835fecd-28b7-7fb7-cb45-33040d803591','01de523c-97a4-ff46-8dfa-43e2a8ffecac,3272550842818105,536af4f4-26c7-dc5d-7a57-5c1bec9e7f32,101058958873840011849','jack,Changhai F,changhai-us,Changhai G','2020-01-01 08:07:11',0);
/*!40000 ALTER TABLE `chat_rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-04 22:49:03
