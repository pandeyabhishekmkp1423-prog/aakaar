-- ----------------------------------------------------------------------
-- Aakaar Digital MySQL / MariaDB Schema & Initial Seed Data
-- Database: u948388602_techvora
-- ----------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(30) NOT NULL DEFAULT 'editor',
  `remember_token` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Posts Table
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `author_id` INT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NOT NULL,
  `cover_image` VARCHAR(255) NULL,
  `cover_alt` VARCHAR(255) NULL,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'draft',
  `reading_time` INT NOT NULL DEFAULT 5,
  `published_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  INDEX `idx_posts_status` (`status`),
  INDEX `idx_posts_published` (`published_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Post Categories Pivot Table
CREATE TABLE IF NOT EXISTS `post_categories` (
  `post_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`post_id`, `category_id`),
  INDEX `idx_pc_cat` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Slug Redirects Table (301 Preservation)
CREATE TABLE IF NOT EXISTS `slug_redirects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `old_slug` VARCHAR(191) NOT NULL UNIQUE,
  `new_slug` VARCHAR(191) NOT NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Inbound Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(60) NULL,
  `company` VARCHAR(150) NULL,
  `service` VARCHAR(120) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'new',
  `internal_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  INDEX `idx_enq_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Media Library Table
CREATE TABLE IF NOT EXISTS `media` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `alt_text` VARCHAR(255) NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `file_size` INT NOT NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Activity / Audit Logs Table
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `admin_name` VARCHAR(150) NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Rate Limits Table
CREATE TABLE IF NOT EXISTS `rate_limits` (
  `ip_key` VARCHAR(191) NOT NULL PRIMARY KEY,
  `attempts` INT NOT NULL DEFAULT 1,
  `reset_at` INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------
-- Seed Initial Data
-- ----------------------------------------------------------------------

-- Default Admin User (Password: AdminPassword2026!)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`)
VALUES (1, 'Lead Administrator', 'admin@aakaardigital.com', '$2y$12$PlvDl7rFmVNrAMTe5AK.8eFWi1lNtKG9Z82EFq1nJHUqVXihHlJsK', 'admin', NOW(), NOW())
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Default Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Web Development', 'web-development', 'Architectures, React/Next.js, performance and full-stack web applications.', NOW(), NOW()),
(2, 'Mobile Engineering', 'mobile-apps', 'Cross-platform iOS and Android mobile development using Flutter.', NOW(), NOW()),
(3, 'Custom Software', 'custom-software', 'Bespoke enterprise platforms, legacy modernization, and internal ERP systems.', NOW(), NOW()),
(4, 'CRM & Automation', 'crm-solutions', 'Custom customer relation pipelines, lead scoring, and automated workflows.', NOW(), NOW()),
(5, 'WhatsApp Cloud API', 'whatsapp-automation', 'Official Meta Cloud API integration, chatbots, and notifications.', NOW(), NOW()),
(6, 'Cybersecurity & Compliance', 'cybersecurity', 'PIPEDA, GDPR, and SOC2 compliance guides for growing organizations.', NOW(), NOW())
ON DUPLICATE KEY UPDATE `id` = `id`;

-- Default Initial Post
INSERT INTO `posts` (`id`, `author_id`, `title`, `slug`, `excerpt`, `content`, `cover_image`, `cover_alt`, `meta_title`, `meta_description`, `status`, `reading_time`, `published_at`, `created_at`, `updated_at`)
VALUES (
  1,
  1,
  'Modern Software Architecture Standards for Scalable Global Enterprises',
  'modern-software-architecture-standards-for-scalable-enterprises',
  'A comprehensive review of engineering principles, database partitioning, and modular system design for organizations seeking full IP ownership.',
  '<h2>The Evolution of Modern Business Software</h2><p>In today\'s demanding digital economy, off-the-shelf software packages often force high-growth organizations into rigid workflows and compounding monthly subscription fees. Bespoke software architectures deliver complete ownership, custom API integrations, and precise feature alignment tailored to unique operations.</p><h3>Key Pillars of Modern Software Delivery</h3><ul><li><strong>Modular Architecture:</strong> Decoupled frontend components paired with high-throughput backend APIs.</li><li><strong>Global Data Privacy:</strong> Adherence to international security standards (GDPR, PIPEDA) through localized databases and encrypted transport.</li><li><strong>Enterprise Scalability:</strong> Predictable performance under load with relational database optimization and edge caching.</li></ul><p>Explore how Aakaar Digital helps ambitious companies modernize legacy applications and build future-proof platforms with zero technical debt.</p>',
  '/images/og-default.jpg',
  'Aakaar Digital Software Architecture',
  'Modern Software Architecture Standards | Aakaar Digital',
  'A comprehensive review of engineering principles, database partitioning, and modular system design for organizations seeking full IP ownership.',
  'published',
  5,
  NOW(),
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `id` = `id`;

-- Attach post to category
INSERT IGNORE INTO `post_categories` (`post_id`, `category_id`) VALUES (1, 1), (1, 3);

SET FOREIGN_KEY_CHECKS = 1;


