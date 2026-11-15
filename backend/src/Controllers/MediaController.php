<?php
declare(strict_types=1);

/**
 * Media Library & Secure File Upload Controller
 */

class MediaController {
    public static function index(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);

        $page = max(1, (int)($_GET['page'] ?? 1));
        $perPage = max(1, min(100, (int)($_GET['per_page'] ?? 50)));
        $offset = ($page - 1) * $perPage;

        $total = (int)$pdo->query("SELECT COUNT(*) FROM media")->fetchColumn();

        $stmt = $pdo->prepare("
            SELECT id, user_id, filename, original_name, url, alt_text, mime_type, file_size, created_at
            FROM media
            ORDER BY id DESC
            LIMIT {$perPage} OFFSET {$offset}
        ");
        $stmt->execute();
        $rows = $stmt->fetchAll();

        // Normalize URLs for current domain and path context
        $isSubdir = str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/admin');
        $prefix = $isSubdir ? '/admin' : '';

        foreach ($rows as &$row) {
            $filename = basename($row['url'] ?: $row['filename']);
            $row['url'] = $prefix . '/uploads/' . $filename;
        }
        unset($row);

        $totalPages = (int)ceil($total / $perPage);

        Response::success($rows, [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'total_pages' => max(1, $totalPages),
        ]);
    }

    public static function store(PDO $pdo, array $config): void {
        $user = AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $errCode = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
            $msg = match ($errCode) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'File exceeds maximum upload size limit.',
                UPLOAD_ERR_PARTIAL => 'File was only partially uploaded.',
                UPLOAD_ERR_NO_FILE => 'No file was submitted.',
                default => 'File upload failed on server.',
            };
            Response::error($msg, 'UPLOAD_ERROR', 400);
        }

        $file = $_FILES['file'];
        $maxSize = $config['storage']['max_file_size'];

        if ($file['size'] > $maxSize) {
            Response::error('File exceeds maximum size of 5MB.', 'FILE_TOO_LARGE', 422);
        }

        // Verify MIME type using FileInfo
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        $allowedTypes = $config['storage']['allowed_mime_types'];

        if (!in_array($mimeType, $allowedTypes, true)) {
            Response::error('Invalid file format. Only JPEG, PNG, WebP, AVIF, SVG, and PDF are allowed.', 'INVALID_FILE_TYPE', 422);
        }

        // Derive secure extension
        $extMap = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/avif' => 'avif',
            'image/svg+xml' => 'svg',
            'application/pdf' => 'pdf',
        ];
        $ext = $extMap[$mimeType] ?? 'bin';

        // Cryptographically random unique filename (prevents directory traversal or collisions)
        $uniqueFilename = bin2hex(random_bytes(16)) . '.' . $ext;
        $uploadDir = $config['storage']['uploads_path'];

        if (!is_dir($uploadDir)) {
            @mkdir($uploadDir, 0755, true);
        }

        $destPath = $uploadDir . '/' . $uniqueFilename;
        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            Response::error('Failed to move uploaded file to permanent storage.', 'STORAGE_ERROR', 500);
        }
        @chmod($destPath, 0644);

        $isSubdir = str_starts_with($_SERVER['REQUEST_URI'] ?? '', '/admin');
        $prefix = $isSubdir ? '/admin' : '';
        $url = $prefix . '/uploads/' . $uniqueFilename;
        $altText = Security::sanitizeString($_POST['alt_text'] ?? pathinfo($file['name'], PATHINFO_FILENAME));
        $now = date('Y-m-d H:i:s');

        $stmt = $pdo->prepare("
            INSERT INTO media (user_id, filename, original_name, url, alt_text, mime_type, file_size, created_at)
            VALUES (:user_id, :filename, :original_name, :url, :alt_text, :mime_type, :file_size, :created_at)
        ");

        $stmt->execute([
            ':user_id' => $user['id'],
            ':filename' => $uniqueFilename,
            ':original_name' => Security::sanitizeString($file['name']),
            ':url' => $url,
            ':alt_text' => $altText,
            ':mime_type' => $mimeType,
            ':file_size' => (int)$file['size'],
            ':created_at' => $now,
        ]);

        $mediaId = (int)$pdo->lastInsertId();
        AuditLogger::log($pdo, 'MEDIA_UPLOADED', "Uploaded file '{$uniqueFilename}' ({$mimeType})");

        Response::success([
            'id' => $mediaId,
            'filename' => $uniqueFilename,
            'original_name' => $file['name'],
            'url' => $url,
            'alt_text' => $altText,
            'mime_type' => $mimeType,
            'file_size' => (int)$file['size'],
            'created_at' => $now,
        ], null, 201);
    }

    public static function update(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT * FROM media WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            Response::notFound("Media item #{$id} was not found.");
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $altText = Security::sanitizeString($input['alt_text'] ?? $existing['alt_text']);

        $update = $pdo->prepare("UPDATE media SET alt_text = :alt WHERE id = :id");
        $update->execute([':alt' => $altText, ':id' => $id]);

        Response::success([
            'id' => $id,
            'alt_text' => $altText,
        ]);
    }

    public static function destroy(PDO $pdo, int $id, array $config): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT * FROM media WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $media = $stmt->fetch();

        if (!$media) {
            Response::notFound("Media item #{$id} was not found.");
        }

        $force = !empty($_GET['force']);

        // Check if file is used in posts (cover or body content)
        if (!$force) {
            $inUseStmt = $pdo->prepare("
                SELECT COUNT(*) FROM posts
                WHERE cover_image LIKE :filename OR content LIKE :filename
            ");
            $inUseStmt->execute([':filename' => "%{$media['filename']}%"]);
            $usedCount = (int)$inUseStmt->fetchColumn();

            if ($usedCount > 0) {
                Response::error(
                    "This image is currently referenced in {$usedCount} article(s). Pass ?force=1 to force delete.",
                    'FILE_IN_USE',
                    409
                );
            }
        }

        // Delete from filesystem
        $filePath = $config['storage']['uploads_path'] . '/' . $media['filename'];
        if (file_exists($filePath)) {
            @unlink($filePath);
        }

        // Delete from database
        $pdo->prepare("DELETE FROM media WHERE id = :id")->execute([':id' => $id]);

        AuditLogger::log($pdo, 'MEDIA_DELETED', "Deleted media file '{$media['filename']}'");

        Response::success(['message' => 'Media file deleted successfully.']);
    }
}
