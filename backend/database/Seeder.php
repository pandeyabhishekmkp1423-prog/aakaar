<?php
declare(strict_types=1);

/**
 * Database Seeder
 * Populates default admin account, categories, and initial post if empty
 */

class Seeder {
    public static function run(PDO $pdo): void {
        $now = date('Y-m-d H:i:s');

        // 1. Seed Default Admin if table is empty
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
        $userCount = (int)$stmt->fetch()['count'];

        if ($userCount === 0) {
            $defaultPassword = password_hash('AdminPassword2026!', PASSWORD_BCRYPT, ['cost' => 12]);
            $insertUser = $pdo->prepare("
                INSERT INTO users (name, email, password, role, created_at, updated_at)
                VALUES (:name, :email, :password, :role, :created_at, :updated_at)
            ");
            $insertUser->execute([
                ':name' => 'Lead Administrator',
                ':email' => 'admin@aakaardigital.com',
                ':password' => $defaultPassword,
                ':role' => 'admin',
                ':created_at' => $now,
                ':updated_at' => $now,
            ]);
            $adminId = (int)$pdo->lastInsertId();

            // Log activity
            $pdo->prepare("
                INSERT INTO activity_logs (user_id, admin_name, action, details, ip_address, created_at)
                VALUES (:user_id, :admin_name, :action, :details, :ip, :created_at)
            ")->execute([
                ':user_id' => $adminId,
                ':admin_name' => 'System Initializer',
                ':action' => 'SYSTEM_INIT',
                ':details' => 'Initial system setup with default administrator account.',
                ':ip' => '127.0.0.1',
                ':created_at' => $now,
            ]);
        }

        // 2. Seed Default Categories if table is empty
        $catStmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
        $catCount = (int)$catStmt->fetch()['count'];

        if ($catCount === 0) {
            $categories = [
                ['name' => 'Web Development', 'slug' => 'web-development', 'description' => 'Architectures, React/Next.js, performance and full-stack web applications.'],
                ['name' => 'Mobile Engineering', 'slug' => 'mobile-apps', 'description' => 'Cross-platform iOS and Android mobile development using Flutter.'],
                ['name' => 'Custom Software', 'slug' => 'custom-software', 'description' => 'Bespoke enterprise platforms, legacy modernization, and internal ERP systems.'],
                ['name' => 'CRM & Automation', 'slug' => 'crm-solutions', 'description' => 'Custom customer relation pipelines, lead scoring, and automated workflows.'],
                ['name' => 'WhatsApp Cloud API', 'slug' => 'whatsapp-automation', 'description' => 'Official Meta Cloud API integration, chatbots, and notifications.'],
                ['name' => 'Cybersecurity & Compliance', 'slug' => 'cybersecurity', 'description' => 'PIPEDA, GDPR, and SOC2 compliance guides for growing organizations.'],
            ];

            $insertCat = $pdo->prepare("
                INSERT INTO categories (name, slug, description, created_at, updated_at)
                VALUES (:name, :slug, :description, :created_at, :updated_at)
            ");

            foreach ($categories as $cat) {
                $insertCat->execute([
                    ':name' => $cat['name'],
                    ':slug' => $cat['slug'],
                    ':description' => $cat['description'],
                    ':created_at' => $now,
                    ':updated_at' => $now,
                ]);
            }
        }

        // 3. Seed Sample Blog Post if empty
        $postStmt = $pdo->query("SELECT COUNT(*) as count FROM posts");
        $postCount = (int)$postStmt->fetch()['count'];

        if ($postCount === 0) {
            $insertPost = $pdo->prepare("
                INSERT INTO posts (
                    author_id, title, slug, excerpt, content, cover_image, cover_alt,
                    meta_title, meta_description, status, reading_time, published_at, created_at, updated_at
                ) VALUES (
                    1, :title, :slug, :excerpt, :content, :cover_image, :cover_alt,
                    :meta_title, :meta_description, :status, :reading_time, :published_at, :created_at, :updated_at
                )
            ");

            $sampleContent = '<h2>The Evolution of Modern Business Software</h2><p>In today\'s demanding digital economy, off-the-shelf software packages often force high-growth organizations into rigid workflows and compounding monthly subscription fees. Bespoke software architectures deliver complete ownership, custom API integrations, and precise feature alignment tailored to unique operations.</p><h3>Key Pillars of Modern Software Delivery</h3><ul><li><strong>Modular Architecture:</strong> Decoupled frontend components paired with high-throughput backend APIs.</li><li><strong>Global Data Privacy:</strong> Adherence to international security standards (GDPR, PIPEDA) through localized databases and encrypted transport.</li><li><strong>Enterprise Scalability:</strong> Predictable performance under load with relational database optimization and edge caching.</li></ul><p>Explore how Aakaar Digital helps ambitious companies modernize legacy applications and build future-proof platforms with zero technical debt.</p>';

            $insertPost->execute([
                ':title' => 'Modern Software Architecture Standards for Scalable Global Enterprises',
                ':slug' => 'modern-software-architecture-standards-for-scalable-enterprises',
                ':excerpt' => 'A comprehensive review of engineering principles, database partitioning, and modular system design for organizations seeking full IP ownership.',
                ':content' => $sampleContent,
                ':cover_image' => '/images/og-default.jpg',
                ':cover_alt' => 'Aakaar Digital Software Architecture',
                ':meta_title' => 'Modern Software Architecture Standards | Aakaar Digital',
                ':meta_description' => 'A comprehensive guide on enterprise software engineering, API design, and cloud scalability for global enterprises.',
                ':status' => 'published',
                ':reading_time' => 6,
                ':published_at' => $now,
                ':created_at' => $now,
                ':updated_at' => $now,
            ]);

            $postId = (int)$pdo->lastInsertId();

            // Link to category 1 & 3
            $pdo->exec("INSERT OR IGNORE INTO post_categories (post_id, category_id) VALUES ({$postId}, 1), ({$postId}, 3)");
        }

        // 4. Seed Sample Enquiry if empty
        $enqStmt = $pdo->query("SELECT COUNT(*) as count FROM enquiries");
        $enqCount = (int)$enqStmt->fetch()['count'];

        if ($enqCount === 0) {
            $pdo->prepare("
                INSERT INTO enquiries (name, email, phone, company, service, message, status, ip_address, created_at, updated_at)
                VALUES (:name, :email, :phone, :company, :service, :message, :status, :ip, :created_at, :updated_at)
            ")->execute([
                ':name' => 'Sarah Jenkins',
                ':email' => 'sarah.jenkins@example.com',
                ':phone' => '+1 (416) 555-0182',
                ':company' => 'Apex Logistics Corp',
                ':service' => 'Custom Software',
                ':message' => 'We are looking to develop a custom fleet management and automated dispatch system with real-time GPS tracking and WhatsApp customer alerts.',
                ':status' => 'new',
                ':ip' => '127.0.0.1',
                ':created_at' => $now,
                ':updated_at' => $now,
            ]);
        }
    }
}

