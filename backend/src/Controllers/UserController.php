<?php
declare(strict_types=1);

/**
 * Admin User Management Controller (Role: Admin only)
 */

class UserController {
    public static function index(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo, 'admin');

        $stmt = $pdo->query("SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY id ASC");
        $rows = $stmt->fetchAll();

        foreach ($rows as &$r) {
            $r['id'] = (int)$r['id'];
        }

        Response::success($rows);
    }

    public static function store(PDO $pdo): void {
        $currentUser = AuthMiddleware::authenticate($pdo, 'admin');
        CsrfMiddleware::verify();

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('name', 'Full name is required.')
                  ->required('email', 'Email is required.')
                  ->email('email')
                  ->required('password', 'Password is required.')
                  ->minLength('password', 12, 'Password must be at least 12 characters.')
                  ->in('role', ['admin', 'editor']);

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $email = strtolower(trim($input['email']));
        $check = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
        $check->execute([':email' => $email]);
        if ($check->fetch()) {
            Response::error("An account with email '{$email}' already exists.", 'EMAIL_EXISTS', 422);
        }

        $hash = Security::hashPassword($input['password']);
        $role = $input['role'] ?? 'editor';
        $now = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare("
            INSERT INTO users (name, email, password, role, created_at, updated_at)
            VALUES (:name, :email, :password, :role, :created_at, :updated_at)
        ");

        $stmt->execute([
            ':name' => Security::sanitizeString($input['name']),
            ':email' => $email,
            ':password' => $hash,
            ':role' => $role,
            ':created_at' => $now,
            ':updated_at' => $now,
        ]);

        $userId = (int)$pdo->lastInsertId();
        AuditLogger::log($pdo, 'USER_CREATED', "Created new user '{$input['name']}' ({$email}) with role '{$role}'");

        Response::success([
            'id' => $userId,
            'name' => $input['name'],
            'email' => $email,
            'role' => $role,
            'created_at' => $now,
        ], null, 201);
    }

    public static function destroy(PDO $pdo, int $id): void {
        $currentUser = AuthMiddleware::authenticate($pdo, 'admin');
        CsrfMiddleware::verify();

        if ((int)$currentUser['id'] === $id) {
            Response::error("You cannot delete your own active administrator account.", 'SELF_DELETION_DENIED', 400);
        }

        $stmt = $pdo->prepare("SELECT name, email FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $target = $stmt->fetch();

        if (!$target) {
            Response::notFound("User #{$id} was not found.");
        }

        $pdo->prepare("DELETE FROM users WHERE id = :id")->execute([':id' => $id]);

        AuditLogger::log($pdo, 'USER_DELETED', "Deleted user #{$id} ({$target['name']} <{$target['email']}>)");

        Response::success(['message' => "User account deleted successfully."]);
    }
}
