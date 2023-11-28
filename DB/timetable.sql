-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 02:31 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timetable`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `email`, `phone`, `password`) VALUES
(1, 'Hassan Abba', 'admin@gmail.com', '08127494994', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_title` varchar(50) NOT NULL,
  `course_code` varchar(40) NOT NULL,
  `semester` text NOT NULL,
  `level` text NOT NULL,
  `credit_unit` text NOT NULL,
  `course_status` text NOT NULL,
  `days` varchar(30) NOT NULL,
  `lecture_times` varchar(20) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_title`, `course_code`, `semester`, `level`, `credit_unit`, `course_status`, `days`, `lecture_times`, `status`) VALUES
(1, 'Expert system', 'csc401', 'first', '100 level', '', '', '', '', ''),
(2, 'Expert systems', 'CSC421', 'Second semester', '200 Level', '', '', '', '', ''),
(3, 'cccc', 'CSC421', 'First semester', '100 Level', '3', 'Core', '', '', ''),
(4, 'cgdg', 'CSC421', 'First semester', '200 Level', '3', 'Elective', '[object Object]', '', ''),
(5, 'eee', 'CSC421', 'Second semester', '100 Level', '1', 'Elective', 'T', '', ''),
(6, 'ertyu', 'CSC321', 'First semester', '200 Level', '3', 'Elective', 'Friday', '', ''),
(7, 'shssh', 'CSC401', 'Second semester', '100 Level', '2', 'Core', 'Thursday', '', ''),
(8, 'eye', 'eeye', 'First semester', '200 Level', '3', 'Elective', 'Tuesday', '', ''),
(9, 'werty', 'CSC421', 'First semester', '200 Level', '1', 'Elective', 'Monday', '', ''),
(10, 'wedrtys', 'CSC421', 'First semester', '400 Level', '2', 'Core', 'Wednesday, Monday, Friday', '', ''),
(11, 'ewrteey', 'CSC421', 'First semester', '200 Level', '2', 'Elective', 'Monday, Wednesday, Thursday, T', '09:00am - 11:00am', ''),
(12, 'Communication Skills in English', '456yu', 'Second semester', '100 Level', '2', 'Elective', 'Monday, Tuesday, Wednesday, Th', '09:00am - 11:00am', ''),
(13, 'Trigonometric & Coordinate Geometry', 'CSC111', 'First semester', '200 Level', '2', 'Core', 'Monday, Tuesday, Wednesday, Th', '10:30am - 12:30pm', ''),
(14, 'Introduction to computer science', 'CSC101', 'First semester', '200 Level', '3', 'Elective', 'Monday, Wednesday, Thursday, F', '09:00am - 11:00am', ''),
(15, 'Differential and Integral Calculus', 'MATH101', 'First semester', '100 Level', '2', 'Core', 'Monday, Wednesday, Friday', '01:30pm - 03:30pm', ''),
(16, 'Nigerian People and Culture', 'GST 103', 'First semester', '100 Level', '3', 'General', 'Thursday, Tuesday', '02:00pm - 04:00pm', ''),
(17, 'Introduction to Inorganic Chemistry', 'CHM 103', 'First semester', '100 Level', '2', 'Elective', 'Friday, Tuesday', '09:00am - 11:00am', ''),
(18, 'Algorithm and Complexity Analysis', 'CSC301', 'First semester', '300 Level', '3', 'Core', 'Wednesday, Monday', '10:30am - 12:30pm', ''),
(19, 'Compiler Construction l', 'CSC 307', 'First semester', '300 Level', '4', 'Elective', 'Wednesday', '01:30pm - 03:30pm', ''),
(20, 'Object Orientated Programming', 'CSC313', 'Second semester', '200 Level', '2', 'Core', 'Wednesday', '10:30am - 12:30pm', ''),
(21, 'Introduction to Operation Research', 'MATH 311', 'First semester', '300 Level', '2', 'Elective', '', '09:00am - 11:00am', ''),
(22, 'Artificial Intelligent', 'CSC 421', 'Second semester', '400 Level', '4', 'Core', 'Wednesday, Thursday', '09:00am - 11:00am', ''),
(23, 'Human Computer Interface', 'CSC402', 'Second semester', '400 Level', '3', 'Core', 'Monday, Wednesday', '09:00am - 11:00am', '');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(40) NOT NULL,
  `rank` text NOT NULL,
  `qualification` text NOT NULL,
  `password` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `matric_no` varchar(40) NOT NULL,
  `gender` text NOT NULL,
  `level` varchar(20) NOT NULL,
  `department` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `name`, `matric_no`, `gender`, `level`, `department`, `email`, `password`, `date`) VALUES
(1, 'Maimai Dauda', 'KASU/CSC/1001', 'Male', '400 Level', 'Computer science', 'maimai@gmail.com', '1234', '2023-11-03 02:44:48'),
(2, 'Kamal yahaya', 'KASU/CSC/1002', 'Male', '300 Level', 'Computer Science', 'kamal@gmail.com', '1234', '2023-11-03 02:25:20'),
(3, 'Abdulsalam Abdullateef', 'KASU/CSC/1004', 'Male', '100 Level', 'COMPUTER SCIENCE', 'abdul@gmail.com', '12345', '2023-11-03 02:25:16'),
(4, 'Amina Motunrayo', 'KASU/CSC/0005', 'Female', '200 Level', 'COMPUTER SCIENCE', 'amina@gmail.com', '12345', '2023-11-03 02:25:25'),
(5, 'Hassan Shuaibu', 'KASU/CSC/20/001', 'Male', '200 Level', 'Computer Science', 'hassan@gmail.com', '12345', '2023-11-03 02:24:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
