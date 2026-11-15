<?php
declare(strict_types=1);

/**
 * Admin Dashboard & Metrics Controller
 */

class DashboardController {
    public static function index(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);

        $sevenDaysAgo = date('Y-m-d H:i:s', strtotime('-7 days'));

        // 1. Enquiries in the last 7 days
        $enqWeekStmt = $pdo->prepare("SELECT COUNT(*) FROM enquiries WHERE status = 'new' AND created_at >= :since");
        $enqWeekStmt->execute([':since' => $sevenDaysAgo]);
        $newEnquiriesWeek = (int)$enqWeekStmt->fetchColumn();

        // 2. Post counts
        $totalPosts = (int)$pdo->query("SELECT COUNT(*) FROM posts")->fetchColumn();
        $publishedPosts = (int)$pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'published'")->fetchColumn();
        $draftPosts = (int)$pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'draft'")->fetchColumn();
        $scheduledPosts = (int)$pdo->query("SELECT COUNT(*) FROM posts WHERE status = 'scheduled'")->fetchColumn();

        // 3. Recent enquiries (5 most recent)
        $recentEnquiries = $pdo->query("
            SELECT id, name, email, phone, company, service, status, created_at
            FROM enquiries
            ORDER BY id DESC
            LIMIT 5
        ")->fetchAll();

        // 4. Recent activity log (8 most recent)
        $recentActivity = $pdo->query("
            SELECT id, admin_name, action, details, created_at
            FROM activity_logs
            ORDER BY id DESC
            LIMIT 8
        ")->fetchAll();

        Response::success([
            'counts' => [
                'new_enquiries_week' => $newEnquiriesWeek,
                'total_posts' => $totalPosts,
                'published_posts' => $publishedPosts,
                'draft_posts' => $draftPosts,
                'scheduled_posts' => $scheduledPosts,
            ],
            'recent_enquiries' => $recentEnquiries,
            'recent_activity' => $recentActivity,
        ]);
    }
}
