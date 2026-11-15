<?php
declare(strict_types=1);

/**
 * Audit Logger Service
 */

class AuditLogger {
    public static function log(PDO $pdo, string $action, ?string $details = null, ?array $user = null): void {
        try {
            $user = $user ?? AuthMiddleware::user();
            $userId = $user['id'] ?? null;
            $adminName = $user['name'] ?? 'System';
            $ip = Security::getClientIp();
            $now = date('Y-m-d H:i:s');

            $stmt = $pdo->prepare("
                INSERT INTO activity_logs (user_id, admin_name, action, details, ip_address, created_at)
                VALUES (:user_id, :admin_name, :action, :details, :ip, :created_at)
            ");
            $stmt->execute([
                ':user_id' => $userId,
                ':admin_name' => $adminName,
                ':action' => $action,
                ':details' => $details,
                ':ip' => $ip,
                ':created_at' => $now,
            ]);
        } catch (Throwable $e) {
            error_log("Audit Logger Failure: " . $e->getMessage());
        }
    }
}
