<?php
declare(strict_types=1);

/**
 * Public Lead Form & Admin Enquiry Management Controller
 */

class EnquiryController {
    public static function store(PDO $pdo, array $config): void {
        // 1. IP Rate Limiting for Public Submissions
        RateLimiter::check($pdo, 'enquiry_submit', 10, 600); // Max 10 per 10 minutes per IP

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];

        // 2. Anti-Spam: Honeypot check (hidden input that automated bots populate)
        if (!empty($input['website_hp'])) {
            // Silently reject bot without tipping off attacker
            Response::success(['id' => 0, 'message' => 'Enquiry received.']);
        }

        // 3. Anti-Spam: Form fill time threshold check
        $formTs = isset($input['_form_ts']) ? (int)$input['_form_ts'] : 0;
        $minSeconds = (int)$config['security']['enquiry_min_time_sec'];
        if ($formTs > 0 && (time() - $formTs) < $minSeconds) {
            Response::error('Submission rejected due to automated behavior detected.', 'SPAM_DETECTED', 422);
        }

        // 4. Validate Fields
        $validator = new Validator($input);
        $validator->required('name', 'Full name is required.')
                  ->minLength('name', 2)
                  ->required('email', 'Corporate email is required.')
                  ->email('email')
                  ->required('service', 'Please select a service area.')
                  ->required('message', 'Project requirements message is required.')
                  ->minLength('message', 10)
                  ->maxLength('message', 3000);

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $now = date('Y-m-d H:i:s');
        $ip = Security::getClientIp();
        $userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);

        $stmt = $pdo->prepare("
            INSERT INTO enquiries (name, email, phone, company, service, message, status, ip_address, user_agent, created_at, updated_at)
            VALUES (:name, :email, :phone, :company, :service, :message, 'new', :ip, :ua, :created_at, :updated_at)
        ");

        $stmt->execute([
            ':name' => Security::sanitizeString($input['name']),
            ':email' => strtolower(trim($input['email'])),
            ':phone' => Security::sanitizeString($input['phone'] ?? ''),
            ':company' => Security::sanitizeString($input['company'] ?? ''),
            ':service' => Security::sanitizeString($input['service']),
            ':message' => Security::sanitizeString($input['message']),
            ':ip' => $ip,
            ':ua' => $userAgent,
            ':created_at' => $now,
            ':updated_at' => $now,
        ]);

        $enquiryId = (int)$pdo->lastInsertId();

        // 5. Send Email Alert to Admin
        EmailNotifier::notifyNewEnquiry($config, [
            'id' => $enquiryId,
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? '',
            'company' => $input['company'] ?? '',
            'service' => $input['service'],
            'message' => $input['message'],
            'ip_address' => $ip,
        ]);

        Response::success(['id' => $enquiryId, 'message' => 'Thank you. Your enquiry has been received.'], null, 201);
    }

    public static function index(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);

        $page = max(1, (int)($_GET['page'] ?? 1));
        $perPage = max(1, min(100, (int)($_GET['per_page'] ?? 15)));
        $offset = ($page - 1) * $perPage;

        $status = trim($_GET['status'] ?? '');
        $service = trim($_GET['service'] ?? '');
        $q = trim($_GET['q'] ?? '');

        $where = [];
        $params = [];

        if ($status !== '') {
            $where[] = "status = :status";
            $params[':status'] = $status;
        }

        if ($service !== '') {
            $where[] = "service = :service";
            $params[':service'] = $service;
        }

        if ($q !== '') {
            $where[] = "(name LIKE :q OR email LIKE :q OR company LIKE :q OR message LIKE :q)";
            $params[':q'] = "%{$q}%";
        }

        $whereSql = count($where) > 0 ? "WHERE " . implode(' AND ', $where) : "";

        // Total count
        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM enquiries {$whereSql}");
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        // Paginated rows
        $dataStmt = $pdo->prepare("
            SELECT id, name, email, phone, company, service, status, internal_notes, ip_address, created_at
            FROM enquiries
            {$whereSql}
            ORDER BY id DESC
            LIMIT {$perPage} OFFSET {$offset}
        ");
        $dataStmt->execute($params);
        $rows = $dataStmt->fetchAll();

        $totalPages = (int)ceil($total / $perPage);

        Response::success($rows, [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'total_pages' => max(1, $totalPages),
        ]);
    }

    public static function show(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);

        $stmt = $pdo->prepare("SELECT * FROM enquiries WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            Response::notFound("Enquiry #{$id} was not found.");
        }

        Response::success($row);
    }

    public static function update(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT * FROM enquiries WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            Response::notFound("Enquiry #{$id} was not found.");
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $status = $input['status'] ?? $existing['status'];
        $notes = $input['internal_notes'] ?? $existing['internal_notes'];

        $allowedStatuses = ['new', 'contacted', 'qualified', 'closed', 'spam'];
        if (!in_array($status, $allowedStatuses, true)) {
            Response::error('Invalid enquiry status.', 'INVALID_STATUS', 422);
        }

        $now = date('Y-m-d H:i:s');
        $updateStmt = $pdo->prepare("
            UPDATE enquiries
            SET status = :status, internal_notes = :notes, updated_at = :updated_at
            WHERE id = :id
        ");
        $updateStmt->execute([
            ':status' => $status,
            ':notes' => $notes,
            ':updated_at' => $now,
            ':id' => $id,
        ]);

        AuditLogger::log($pdo, 'ENQUIRY_UPDATED', "Updated status to '{$status}' on enquiry #{$id} ({$existing['name']})");

        Response::success([
            'id' => $id,
            'status' => $status,
            'internal_notes' => $notes,
            'updated_at' => $now,
        ]);
    }

    public static function destroy(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT name FROM enquiries WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $name = $stmt->fetchColumn();

        if (!$name) {
            Response::notFound("Enquiry #{$id} was not found.");
        }

        $pdo->prepare("DELETE FROM enquiries WHERE id = :id")->execute([':id' => $id]);

        AuditLogger::log($pdo, 'ENQUIRY_DELETED', "Permanently deleted enquiry #{$id} ({$name})");

        Response::success(['message' => "Enquiry #{$id} deleted successfully."]);
    }
}
