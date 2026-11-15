<?php
declare(strict_types=1);

/**
 * Cross-Origin Resource Sharing (CORS) Middleware
 */

class CorsMiddleware {
    public static function handle(array $config): void {
        $cors = $config['cors'];
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (!empty($origin)) {
            $allowed = $cors['allowed_origins'];
            $isAllowed = false;

            // Check exact matches or wildcard subdomains for aakaardigital.com
            foreach ($allowed as $pattern) {
                if ($pattern === '*' || $origin === $pattern) {
                    $isAllowed = true;
                    break;
                }
                // Allow any subdomain of aakaardigital.com (e.g. admin.aakaardigital.com, preview.aakaardigital.com)
                if (str_ends_with($origin, '.aakaardigital.com') || $origin === 'https://aakaardigital.com') {
                    $isAllowed = true;
                    break;
                }
            }

            if ($isAllowed) {
                header("Access-Control-Allow-Origin: {$origin}");
                header("Access-Control-Allow-Credentials: true");
                header("Access-Control-Max-Age: " . ($cors['max_age'] ?? 86400));
                header("Access-Control-Allow-Methods: " . implode(', ', $cors['allowed_methods']));
                header("Access-Control-Allow-Headers: " . implode(', ', $cors['allowed_headers']));
            }
        }

        // Handle preflight OPTIONS request immediately
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
}

