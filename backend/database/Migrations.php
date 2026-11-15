<?php
declare(strict_types=1);

/**
 * Database Migrations Runner
 * Creates required schema if tables do not exist
 */

class Migrations {
    public static function run(PDO $pdo, string $driver = 'sqlite'): void {
        $isSqlite = ($driver === 'sqlite');

        $idCol = $isSqlite ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
        $textCol = $isSqlite ? 'TEXT' : 'LONGTEXT';
        $dateTimeCol = $isSqlite ? 'DATETIME' : 'DATETIME';

        $queries = [
            // 1. Users
            "CREATE TABLE IF NOT EXISTS users (
                id {$idCol},
                name VARCHAR(150) NOT NULL,
                email VARCHAR(191) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(30) NOT NULL DEFAULT 'editor',
                remember_token VARCHAR(100) NULL,
                created_at {$dateTimeCol} NOT NULL,
                updated_at {$dateTimeCol} NOT NULL
            );",

            // 2. Categories
            "CREATE TABLE IF NOT EXISTS categories (
                id {$idCol},
                name VARCHAR(150) NOT NULL,
                slug VARCHAR(191) NOT NULL UNIQUE,
                description TEXT NULL,
                created_at {$dateTimeCol} NOT NULL,
                updated_at {$dateTimeCol} NOT NULL
            );",

            // 3. Posts
            "CREATE TABLE IF NOT EXISTS posts (
                id {$idCol},
                author_id INT NULL,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(191) NOT NULL UNIQUE,
                excerpt TEXT NULL,
                content {$textCol} NOT NULL,
                cover_image VARCHAR(255) NULL,
                cover_alt VARCHAR(255) NULL,
                meta_title VARCHAR(255) NULL,
                meta_description TEXT NULL,
                status VARCHAR(30) NOT NULL DEFAULT 'draft',
                reading_time INT NOT NULL DEFAULT 5,
                published_at {$dateTimeCol} NULL,
                created_at {$dateTimeCol} NOT NULL,
                updated_at {$dateTimeCol} NOT NULL
            );",

            // 4. Post Categories Pivot
            "CREATE TABLE IF NOT EXISTS post_categories (
                post_id INT NOT NULL,
                category_id INT NOT NULL,
                PRIMARY KEY (post_id, category_id)
            );",

            // 5. Slug Redirects (for 301 preservation when slug changes)
            "CREATE TABLE IF NOT EXISTS slug_redirects (
                id {$idCol},
                old_slug VARCHAR(191) NOT NULL UNIQUE,
                new_slug VARCHAR(191) NOT NULL,
                created_at {$dateTimeCol} NOT NULL
            );",

            // 6. Inbound Enquiries / Leads
            "CREATE TABLE IF NOT EXISTS enquiries (
                id {$idCol},
                name VARCHAR(150) NOT NULL,
                email VARCHAR(191) NOT NULL,
                phone VARCHAR(60) NULL,
                company VARCHAR(150) NULL,
                service VARCHAR(120) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(30) NOT NULL DEFAULT 'new',
                internal_notes TEXT NULL,
                ip_address VARCHAR(45) NULL,
                user_agent TEXT NULL,
                created_at {$dateTimeCol} NOT NULL,
                updated_at {$dateTimeCol} NOT NULL
            );",

            // 7. Media Library
            "CREATE TABLE IF NOT EXISTS media (
                id {$idCol},
                user_id INT NULL,
                filename VARCHAR(255) NOT NULL,
                original_name VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                alt_text VARCHAR(255) NULL,
                mime_type VARCHAR(100) NOT NULL,
                file_size INT NOT NULL,
                created_at {$dateTimeCol} NOT NULL
            );",

            // 8. Activity / Audit Log
            "CREATE TABLE IF NOT EXISTS activity_logs (
                id {$idCol},
                user_id INT NULL,
                admin_name VARCHAR(150) NULL,
                action VARCHAR(100) NOT NULL,
                details TEXT NULL,
                ip_address VARCHAR(45) NULL,
                created_at {$dateTimeCol} NOT NULL
            );",

            // 9. Rate Limits
            "CREATE TABLE IF NOT EXISTS rate_limits (
                ip_key VARCHAR(191) NOT NULL PRIMARY KEY,
                attempts INT NOT NULL DEFAULT 1,
                reset_at INT NOT NULL
            );"
        ];

        foreach ($queries as $sql) {
            $pdo->exec($sql);
        }
    }
}
