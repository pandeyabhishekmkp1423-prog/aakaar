<?php
declare(strict_types=1);

/**
 * Authentication Middleware for Admin routes
 */

class AuthMiddleware {
    private static ?array $cachedUser = null;

    public static function authenticate(PDO $pdo, ?string $requiredRole = null): array {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }

        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            Response::unauthorized('You must be signed in to access the management portal.');
        }

        if (self::$cachedUser !== null && self::$cachedUser['id'] === (int)$userId) {
            $user = self::$cachedUser;
        } else {
            $stmt = $pdo->prepare("SELECT id, name, email, role FROM users WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $userId]);
            $user = $stmt->fetch();

            if (!$user) {
                // Invalid or deleted user session
                $_SESSION = [];
                session_destroy();
                Response::unauthorized('User account no longer exists. Please sign in again.');
            }
            self::$cachedUser = $user;
        }

        if ($requiredRole !== null && $user['role'] !== $requiredRole) {
            Response::forbidden('Insufficient privileges. Administrator role required for this action.');
        }

        return $user;
    }

    public static function user(): ?array {
        return self::$cachedUser;
    }
}
