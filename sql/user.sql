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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(45) NOT NULL COMMENT 'User id',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `displayName` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `streamId` varchar(45) DEFAULT NULL,
  `source` varchar(45) DEFAULT 'own',
  `bio` varchar(225) DEFAULT NULL,
  `photo` blob,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('01de523c-97a4-ff46-8dfa-43e2a8ffecac','jack','12345','Jack','jack@example.com','12345','own','jack bio',NULL),('101058958873840011849','Changhai G',NULL,'Changhai Gu','changhaigu@gmail.com',NULL,'google','changhai google bio original',NULL),('2-01de523c-97a4-ff46-8dfa-43e2a8ffecac','jill','birthday','Jill','jill@example.com','stream ID 2','own','Jill bio',NULL),('3272550842818105','Changhai F',NULL,'Changhai','changhaigu@gmail.com',NULL,'facebook','Changhai Facebook bio',NULL),('536af4f4-26c7-dc5d-7a57-5c1bec9e7f32','changhai-us','1234','changhai-us','chgu+us@adobetest.com','12345','own',NULL,NULL),('d5e42595-89bb-e929-2cb4-db165f783346','changhaide','1234','changhaide','chgu+de@adobetest.com','123','own',NULL,NULL),('deb245a6-b7db-e89b-c1eb-09d7c7b2c8ce','chgude1','12312312312','chgude1','chgu+de+1@adobetest.com','12345234','own',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-04 14:16:13
