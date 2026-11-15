<?php
declare(strict_types=1);

/**
 * Standard JSON Response Helper
 */

class Response {
    public static function json(array $data, int $statusCode = 200, array $headers = []): void {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');

        foreach ($headers as $header => $value) {
            header("{$header}: {$value}");
        }

        echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    public static function success(mixed $data = null, ?array $meta = null, int $statusCode = 200): void {
        $payload = ['success' => true];
        if ($data !== null) {
            $payload['data'] = $data;
        }
        if ($meta !== null) {
            $payload['meta'] = $meta;
        }
        self::json($payload, $statusCode);
    }

    public static function error(string $message, string $code = 'BAD_REQUEST', int $statusCode = 400, array $fields = []): void {
        self::json([
            'success' => false,
            'error' => [
                'code' => $code,
                'message' => $message,
                'fields' => (object)$fields,
            ],
        ], $statusCode);
    }

    public static function unauthorized(string $message = 'Authentication required.'): void {
        self::error($message, 'UNAUTHORIZED', 401);
    }

    public static function forbidden(string $message = 'Forbidden action or invalid CSRF token.'): void {
        self::error($message, 'FORBIDDEN', 403);
    }

    public static function notFound(string $message = 'Requested resource was not found.'): void {
        self::error($message, 'NOT_FOUND', 404);
    }

    public static function redirect301(string $targetSlug): void {
        self::json([
            'success' => false,
            'redirect' => true,
            'target_slug' => $targetSlug,
            'status' => 301,
        ], 301);
    }
}
