<?php
declare(strict_types=1);

/**
 * Authentication & Session Management Controller
 */

class AuthController {
    public static function login(PDO $pdo, array $config): void {
        RateLimiter::check($pdo, 'login', $config['security']['login_max_attempts'], $config['security']['login_decay_minutes'] * 60);

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('email')->email('email')->required('password');

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $email = strtolower(trim($input['email']));
        $password = (string)$input['password'];

        $stmt = $pdo->prepare("SELECT id, name, email, password, role FROM users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();

        if (!$user || !Security::verifyPassword($password, $user['password'])) {
            Response::error('Invalid email or password combination.', 'AUTH_FAILED', 401);
        }

        // Login success: Clear rate limiter
        RateLimiter::clear($pdo, 'login');

        // Session fixation protection
        if (session_status() === PHP_SESSION_ACTIVE) {
            session_regenerate_id(true);
        } else {
            session_start();
        }

        $_SESSION['user_id'] = (int)$user['id'];
        $_SESSION['user_role'] = $user['role'];
        $_SESSION['last_activity'] = time();

        $csrfToken = Security::generateCsrfToken();

        AuditLogger::log($pdo, 'AUTH_LOGIN', "Administrator signed in from " . Security::getClientIp(), $user);

        Response::success([
            'user' => [
                'id' => (int)$user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
            ],
            'csrf_token' => $csrfToken,
        ]);
    }

    public static function logout(PDO $pdo): void {
        CsrfMiddleware::verify();

        if (session_status() === PHP_SESSION_ACTIVE) {
            $user = AuthMiddleware::user();
            if ($user) {
                AuditLogger::log($pdo, 'AUTH_LOGOUT', "Administrator signed out", $user);
            }
            $_SESSION = [];
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(
                    session_name(),
                    '',
                    time() - 42000,
                    $params["path"],
                    $params["domain"],
                    $params["secure"],
                    $params["httponly"]
                );
            }
            session_destroy();
        }

        Response::success(['message' => 'Logged out successfully.']);
    }

    public static function me(PDO $pdo): void {
        $user = AuthMiddleware::authenticate($pdo);
        $csrfToken = Security::generateCsrfToken();

        Response::success([
            'id' => (int)$user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role'],
            'csrf_token' => $csrfToken,
        ]);
    }

    public static function changePassword(PDO $pdo): void {
        $user = AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('current_password')->required('new_password')->minLength('new_password', 12);

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        // Verify current password
        $stmt = $pdo->prepare("SELECT password FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $user['id']]);
        $currentHash = $stmt->fetchColumn();

        if (!Security::verifyPassword($input['current_password'], (string)$currentHash)) {
            Response::error('Current password does not match records.', 'INVALID_CREDENTIALS', 400);
        }

        // Update password
        $newHash = Security::hashPassword($input['new_password']);
        $now = date('Y-m-d H:i:s');

        $update = $pdo->prepare("UPDATE users SET password = :password, updated_at = :updated_at WHERE id = :id");
        $update->execute([
            ':password' => $newHash,
            ':updated_at' => $now,
            ':id' => $user['id'],
        ]);

        AuditLogger::log($pdo, 'USER_PASSWORD_CHANGED', "User updated their account password.");

        Response::success(['message' => 'Password changed successfully.']);
    }
}
