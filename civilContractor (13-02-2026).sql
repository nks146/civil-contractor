-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2026 at 10:10 AM
-- Server version: 8.0.45-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `civilContractor`
--

-- --------------------------------------------------------

--
-- Table structure for table `material_orders`
--

CREATE TABLE `material_orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `material_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `supplier_name` varchar(255) NOT NULL,
  `supplier_contact` varchar(13) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `project_id` int NOT NULL,
  `comment` text NOT NULL,
  `remaining_stock` int NOT NULL,
  `transportation_cost` decimal(10,2) NOT NULL,
  `invoice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `used_in_projects` varchar(255) DEFAULT NULL COMMENT 'comma seprated',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `material_orders`
--

INSERT INTO `material_orders` (`id`, `user_id`, `material_type`, `supplier_name`, `supplier_contact`, `address`, `quantity`, `unit_type`, `unit_price`, `delivery_date`, `project_id`, `comment`, `remaining_stock`, `transportation_cost`, `invoice`, `used_in_projects`, `created_on`, `updated_on`) VALUES
(4, 1, 'Sand', 'Ajay Singh', '1212343423', 'Chunar', 10, 'Bag', 200.00, '2026-01-01', 4, 'test test', 10, 1000.00, NULL, '', '2026-02-16 15:05:16', '2026-02-16 15:05:46');

-- --------------------------------------------------------

--
-- Table structure for table `material_used`
--

CREATE TABLE `material_used` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `project_id` int NOT NULL,
  `material_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantity_used` int NOT NULL,
  `unite_type` varchar(255) NOT NULL,
  `used_date` date DEFAULT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `other_expenses`
--

CREATE TABLE `other_expenses` (
  `id` int NOT NULL,
  `project_d` int NOT NULL,
  `expense_type` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `notes` text NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_on_project`
--

CREATE TABLE `post_on_project` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `post_comment` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post_on_project`
--

INSERT INTO `post_on_project` (`id`, `project_id`, `post_comment`, `created_on`, `updated_on`) VALUES
(2, 2, 'bxcbxcbx eqwqweqw', '2025-10-07 09:32:42', '2025-10-07 09:32:42'),
(3, 2, 'Your new comment here', '2025-10-07 10:54:14', '2025-10-08 09:56:35'),
(4, 2, 'aaaaaaaaaaaaaaaaaa', '2025-10-07 11:21:09', '2025-10-07 11:21:09'),
(12, 11, 'zzzzzzzz', '2025-10-10 12:36:03', '2025-10-10 12:45:22'),
(13, 11, 'testtesttses', '2026-01-22 08:54:41', '2026-01-22 08:54:41');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `parent_project` int NOT NULL DEFAULT '0',
  `location` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('Pending','Ongoing','Hold','Completed','Deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Pending',
  `hold_reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_on` timestamp NOT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `user_id`, `project_name`, `parent_project`, `location`, `start_date`, `end_date`, `status`, `hold_reason`, `created_on`, `updated_on`) VALUES
(2, 3, 'Modi', 0, 'Chunar', '2025-12-31', NULL, 'Pending', NULL, '2025-09-22 14:16:01', '2025-09-22 19:46:01'),
(4, 1, 'xyzaa', 0, 'Mirzapur', '2025-12-28', NULL, 'Deleted', NULL, '2025-09-23 11:43:22', '2026-02-11 18:46:04'),
(5, 1, 'abc', 0, 'Mirzapur', '2025-12-31', NULL, 'Pending', NULL, '2025-09-23 11:59:57', '2025-09-23 17:29:57'),
(8, 1, 'ddddddd', 0, 'Mirzapur', '2026-01-01', NULL, 'Pending', 'test test', '2025-09-23 12:09:12', '2026-02-05 16:26:31'),
(10, 1, 'sdfsdfsd', 0, 'Mirzapur', '2025-12-31', NULL, 'Deleted', NULL, '2025-09-23 12:09:59', '2026-02-11 18:13:03'),
(11, 4, 'yyyyuy', 0, 'Mirzapur', '2025-12-31', NULL, 'Pending', 'test', '2025-10-10 12:02:27', '2025-10-10 17:32:27'),
(12, 1, 'Test 123', 5, 'Noida, Uttar Pradesh', '2026-02-26', NULL, 'Hold', 'Due to some leagel issue', '2026-02-05 08:34:03', '2026-02-11 18:20:36'),
(13, 1, 'test data', 8, 'Noida', '2026-03-01', '2026-06-27', 'Pending', NULL, '2026-02-06 08:52:46', '2026-02-06 14:22:46'),
(14, 1, 'ggggg', 0, 'Mirzapur', '2025-12-31', NULL, 'Pending', 'test', '2026-02-16 14:51:41', '2026-02-16 20:21:41');

-- --------------------------------------------------------

--
-- Table structure for table `project_images`
--

CREATE TABLE `project_images` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_images`
--

INSERT INTO `project_images` (`id`, `post_id`, `image_path`, `created_on`, `updated_on`) VALUES
(4, 2, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759829561498-492686950-ChatGPT Image Aug 11, 2025, 02_20_49 AM.png', '2025-10-07 09:32:42', '2025-10-07 09:32:42'),
(9, 2, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759840042313-697143966-First Photo.jpg', '2025-10-07 12:27:22', '2025-10-07 12:27:22'),
(10, 2, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759840042333-287314284-Claim Form (2).jpg', '2025-10-07 12:27:22', '2025-10-07 12:27:22'),
(11, 2, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759840148968-35676116-First Photo.jpg', '2025-10-07 12:29:09', '2025-10-07 12:29:09'),
(12, 2, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759840148976-963025178-Claim Form (2).jpg', '2025-10-07 12:29:09', '2025-10-07 12:29:09'),
(13, 4, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1759840179425-380633786-First Photo.jpg', '2025-10-07 12:29:39', '2025-10-07 12:29:39'),
(16, 12, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1760099762537-401782486-ChatGPT Image Aug 11, 2025, 02_20_49 AM.png', '2025-10-10 12:36:03', '2025-10-10 12:36:03'),
(17, 4, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1760100266042-163556313-First Photo.jpg', '2025-10-10 12:44:26', '2025-10-10 12:44:26'),
(18, 4, '/media/niraj-singh/Office/new-projects/civil-contractor/public/uploads/projects/1760100266055-975916902-Claim Form (2).jpg', '2025-10-10 12:44:26', '2025-10-10 12:44:26'),
(19, 13, '/media/niraj-singh/Office/new-projects/civil-contractor/backend/public/uploads/projects/1769072081450-916367287-WhatsApp Image 2025-09-01 at 4.17.07 PM.jpeg', '2026-01-22 08:54:42', '2026-01-22 08:54:42'),
(20, 13, '/media/niraj-singh/Office/new-projects/civil-contractor/backend/public/uploads/projects/1769072081461-567938256-ChatGPT Image Aug 11, 2025, 02_20_49 AM.png', '2026-01-22 08:54:42', '2026-01-22 08:54:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(13) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('contractor','supervisor') NOT NULL,
  `parent_id` tinyint NOT NULL DEFAULT '0',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `role`, `parent_id`, `created_on`, `updated_on`) VALUES
(1, 'Niraj Singh', 'niraj@example.com', '1234567890', '$2a$10$QQjoiSsiv6aF/YyZJncuLudFv17ka6fk7ZZxNJOgG62d6fieGanJe', 'contractor', 0, '2025-09-18 08:35:03', '2025-09-18 08:35:03'),
(3, 'Rohit', 'rohit@example.com', '1134567890', '$2a$10$GNlfjF4YPbw8ujGu8zMmzuVcJKjQcLVd4.VmBHcSUk9W2wqsThHQC', 'contractor', 0, '2025-09-18 08:48:33', '2025-09-18 08:48:33'),
(4, 'Sandeep', 'sandeep@example.com', '1224567890', '$2a$10$oonlM4V4C1NTB0.DP/E1B.cxTl9csPM0H4bipQTSfpQmgjW6.Yr.a', 'contractor', 0, '2025-10-10 11:30:31', '2025-10-10 11:30:31');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `worker_name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(13) DEFAULT NULL,
  `status` enum('Active','Inactive','Engaged') NOT NULL,
  `base_rate` int DEFAULT NULL COMMENT 'Rate/day',
  `expertise` varchar(255) DEFAULT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `user_id`, `worker_name`, `address`, `contact`, `status`, `base_rate`, `expertise`, `created_on`, `updated_on`) VALUES
(1, 3, 'xzzxczxczxc', 'ssssssssss', '1234565437', 'Engaged', 300, 'Labour', '2025-10-08 11:13:27', '2025-10-15 09:07:47'),
(3, 4, 'Ramesh', 'dssddsds', '1212123432', 'Active', 300, 'Labour', '2025-10-13 11:35:43', '2025-10-13 11:37:16'),
(4, 3, 'ssasas', 'ffffff', '1232123433', 'Engaged', 400, 'Labour', '2025-10-15 11:05:48', '2025-10-15 11:10:03');

-- --------------------------------------------------------

--
-- Table structure for table `worker_attendance`
--

CREATE TABLE `worker_attendance` (
  `id` int NOT NULL,
  `worker_id` int NOT NULL,
  `project_id` int NOT NULL,
  `working_date` date NOT NULL,
  `half_day` tinyint(1) DEFAULT '0',
  `full_day` tinyint(1) DEFAULT '0',
  `rate_per_day` int NOT NULL,
  `notes` varchar(255) NOT NULL,
  `created_on` timestamp NOT NULL,
  `updated_on` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `worker_attendance`
--

INSERT INTO `worker_attendance` (`id`, `worker_id`, `project_id`, `working_date`, `half_day`, `full_day`, `rate_per_day`, `notes`, `created_on`, `updated_on`) VALUES
(1, 1, 2, '2025-10-15', 1, 0, 350, 'test test', '2025-10-15 12:30:41', '2025-10-28 12:05:21'),
(2, 4, 2, '2025-10-15', 0, 1, 300, 'test test', '2025-10-15 12:30:41', '2025-10-28 12:05:31'),
(3, 1, 2, '2025-10-27', 0, 1, 350, 'test test', '2025-10-28 12:07:36', '2025-10-28 12:07:36'),
(4, 4, 2, '2025-10-27', 0, 1, 300, 'test test', '2025-10-28 12:07:36', '2025-10-28 12:07:36');

-- --------------------------------------------------------

--
-- Table structure for table `worker_projects`
--

CREATE TABLE `worker_projects` (
  `id` int NOT NULL,
  `worker_id` int NOT NULL,
  `project_id` int NOT NULL,
  `rate_per_day` int NOT NULL,
  `work_start_date` date NOT NULL,
  `assigned_on` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `worker_projects`
--

INSERT INTO `worker_projects` (`id`, `worker_id`, `project_id`, `rate_per_day`, `work_start_date`, `assigned_on`) VALUES
(8, 1, 2, 350, '2025-01-01', '2025-10-15 09:07:47'),
(10, 4, 2, 300, '2025-01-01', '2025-10-15 11:10:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `material_orders`
--
ALTER TABLE `material_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `material_used`
--
ALTER TABLE `material_used`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_material_order` (`order_id`),
  ADD KEY `fk_projects` (`project_id`);

--
-- Indexes for table `other_expenses`
--
ALTER TABLE `other_expenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_on_project`
--
ALTER TABLE `post_on_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_name` (`project_name`);

--
-- Indexes for table `project_images`
--
ALTER TABLE `project_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `worker_attendance`
--
ALTER TABLE `worker_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `worker_projects`
--
ALTER TABLE `worker_projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_worker` (`worker_id`),
  ADD KEY `fk_project` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `material_orders`
--
ALTER TABLE `material_orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `material_used`
--
ALTER TABLE `material_used`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `other_expenses`
--
ALTER TABLE `other_expenses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_on_project`
--
ALTER TABLE `post_on_project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `project_images`
--
ALTER TABLE `project_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `worker_attendance`
--
ALTER TABLE `worker_attendance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `worker_projects`
--
ALTER TABLE `worker_projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `material_used`
--
ALTER TABLE `material_used`
  ADD CONSTRAINT `fk_material_order` FOREIGN KEY (`order_id`) REFERENCES `material_orders` (`id`),
  ADD CONSTRAINT `fk_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `worker_attendance`
--
ALTER TABLE `worker_attendance`
  ADD CONSTRAINT `worker_attendance_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `worker_attendance_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `worker_projects`
--
ALTER TABLE `worker_projects`
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `fk_worker` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
