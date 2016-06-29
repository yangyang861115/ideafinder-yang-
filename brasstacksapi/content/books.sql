-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2015 at 08:17 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `book_price` varchar(255) NOT NULL,
  `book_author` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `book_name`, `book_price`, `book_author`) VALUES
(48, 'sdfasdf', 'sdafasdf', 'sadfsadf'),
(49, 'sdfasdf', 'sdafasdf', 'sadfsadf'),
(50, 'uhsdkjfsdf', 'dsfsdf', 'sdfdsfsdf'),
(51, 'book_name', 'book_price', 'book_author'),
(52, 'Mayank', '250', 'Hello'),
(53, 'Mayank', '250', 'Hello'),
(54, 'Mayank', '250', 'Hello'),
(55, 'Mayank', '250', 'Hello'),
(56, 'Mayank', '250', 'Hello'),
(57, 'Mayank', '250', 'Hello'),
(58, 'Mayank', '250', 'Hello'),
(59, 'Mayank', '250', 'Hello'),
(60, 'Mayank', '250', 'Hello'),
(61, 'Mayank', '250', 'Hello'),
(62, 'Mayank', '250', 'Hello'),
(63, 'Mayank', '250', 'Hello'),
(64, 'Mayank', '250', 'Hello'),
(65, 'Mayank', '250', 'Hello'),
(66, 'Mayank', '250', 'Hello'),
(67, 'Mayank', '250', 'Hello'),
(68, 'Mayank', '250', 'Hello'),
(69, 'Mayank', '250', 'Hello'),
(70, 'Mayank', '250', 'Hello'),
(71, 'Mayank', '250', 'Hello'),
(72, 'Mayank', '250', 'Hello'),
(73, 'Mayank', '250', 'Hello'),
(74, 'Mayank', '250', 'Hello'),
(75, 'Mayank', '250', 'Hello'),
(76, 'Mayank', '250', 'Hello'),
(77, 'Mayank', '250', 'Hello'),
(78, 'Mayank', '250', 'Hello'),
(79, 'Mayank', '250', 'Hello'),
(80, 'fdgdfg', 'dfgdfg', 'dfgdfg'),
(81, 'fdgdfg', 'dfgdfg', 'dfgdfg'),
(82, 'Mayank', '240', 'hello world'),
(83, 'Mayank', '240', 'hello world'),
(84, 'Mayank', '240', 'hello world'),
(85, 'Mayank', '240', 'hello world'),
(86, 'Mayank', '240', 'hello world'),
(87, 'Mayank', '240', 'hello world'),
(88, 'fdgdfg', 'dsfgdsfg', 'dfgdsfgdfsg'),
(89, 'Mayank', '240', 'google'),
(90, 'Mayank', '240', 'google'),
(91, 'Mayank', '240', 'google'),
(92, 'Mayank', '240', 'google'),
(93, 'Mayank', '250', 'google'),
(94, 'Mayank', '50', 'google'),
(95, 'Vinay', '3000', 'may'),
(96, 'amit', '2500', 'ride'),
(97, 'Shaleen', '250', 'Dubeyji '),
(98, 'Shaleen', '250', 'Dubeyji '),
(99, 'Shaleen', '250', 'Dubeyji '),
(100, 'Shaleen', '250', 'Dubeyji '),
(101, 'ravi', '250', 'ravi'),
(102, 'Harry', '350', 'potter'),
(103, 'Mahesh', '250', 'pawar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=104;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
