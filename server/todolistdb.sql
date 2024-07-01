-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2024 at 02:23 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolistdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `todolisttb`
--

CREATE TABLE `todolisttb` (
  `ID` int(11) NOT NULL,
  `text` varchar(225) NOT NULL,
  `status` text NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todolisttb`
--

INSERT INTO `todolisttb` (`ID`, `text`, `status`, `date`) VALUES
(27, 'warren', 'not started', 'Sun Mar 31 2024'),
(28, 'gffgdf', 'not started', 'Sun Mar 31 2024'),
(29, 'fgdfggdfg', 'not started', 'Sun Mar 31 2024/14:3:2'),
(30, 'dfsfd', 'not started', 'Sun Mar 31 2024 / 14:3:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todolisttb`
--
ALTER TABLE `todolisttb`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todolisttb`
--
ALTER TABLE `todolisttb`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
