-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Host: 127.8.89.2:3306
-- Generation Time: Nov 30, 2014 at 12:14 AM
-- Server version: 5.5.40
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kimodrawer`
--
CREATE DATABASE IF NOT EXISTS `kimodrawer` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `kimodrawer`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `adminEmail` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `adminPass` char(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`adminEmail`, `adminPass`) VALUES
('aalexandrakis@hotmail.com', 'c7cbb272f3b502923a668fafc3408910122e5011');

-- --------------------------------------------------------

--
-- Table structure for table `draw_info`
--

DROP TABLE IF EXISTS `draw_info`;
CREATE TABLE IF NOT EXISTS `draw_info` (
  `drawDateTime` char(19) COLLATE utf8_unicode_ci NOT NULL,
  `bets` bigint(20) NOT NULL,
  `winningBets` bigint(20) NOT NULL,
  `betsIncome` double NOT NULL,
  `betsOutcome` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `draw_info`
--

INSERT INTO `draw_info` (`drawDateTime`, `bets`, `winningBets`, `betsIncome`, `betsOutcome`) VALUES
('2014-11-20 14:00:59', 15, 3, 158.5, 13400),
('2014-11-20 14:02:12', 12, 1, 25, 3125);

-- --------------------------------------------------------

--
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
CREATE TABLE IF NOT EXISTS `rates` (
  `gameType` int(11) NOT NULL,
  `matches` int(11) NOT NULL,
  `returnRate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `rates`
--

INSERT INTO `rates` (`gameType`, `matches`, `returnRate`) VALUES
(12, 12, 1000000),
(12, 11, 25000),
(12, 10, 2500),
(12, 9, 1000),
(12, 8, 150),
(12, 7, 25),
(12, 11, 5),
(12, 0, 4),
(11, 11, 500000),
(11, 10, 15000),
(11, 9, 1500),
(11, 8, 250),
(11, 7, 50),
(11, 6, 10),
(11, 5, 1),
(11, 0, 2),
(10, 10, 100000),
(10, 9, 10000),
(10, 8, 500),
(10, 7, 80),
(10, 6, 20),
(10, 5, 2),
(10, 0, 2),
(9, 9, 40000),
(9, 8, 4000),
(9, 7, 200),
(9, 6, 25),
(9, 5, 6),
(9, 4, 1),
(8, 8, 15000),
(8, 7, 1000),
(8, 6, 50),
(8, 5, 10),
(8, 4, 2),
(7, 7, 5000),
(7, 6, 100),
(7, 5, 20),
(7, 4, 3),
(7, 3, 1),
(6, 6, 1600),
(6, 5, 50),
(6, 4, 7),
(6, 3, 1),
(5, 5, 450),
(5, 4, 20),
(5, 3, 2),
(4, 4, 100),
(4, 3, 4),
(4, 2, 1),
(3, 3, 25),
(3, 2, 2.5),
(2, 2, 5),
(2, 1, 1),
(1, 1, 2.5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
