<?php
declare(strict_types=1);

/**
 * Aakaar Digital - Application Configuration
 */

// Simple .env parser without external dependencies
if (!function_exists('loadEnv')) {
    function loadEnv(string $path): void {
        if (!file_exists($path)) {
            return;
        }
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            if (str_contains($line, '=')) {
                [$key, $val] = explode('=', $line, 2);
                $key = trim($key);
                $val = trim($val);
                // Strip surrounding quotes
                if (preg_match('/^(["\'])(.*)\1$/', $val, $matches)) {
                    $val = $matches[2];
                }
                if (!array_key_exists($key, $_SERVER) && !array_key_exists($key, $_ENV)) {
                    putenv("{$key}={$val}");
                    $_ENV[$key] = $val;
                    $_SERVER[$key] = $val;
                }
            }
        }
    }
}

// Load .env or .env.production from backend root or parent directory
loadEnv(dirname(__DIR__) . '/.env');
loadEnv(dirname(__DIR__) . '/.env.production');
loadEnv(dirname(__DIR__, 2) . '/.env');
loadEnv(dirname(__DIR__, 2) . '/.env.production');

if (!function_exists('env')) {
    function env(string $key, mixed $default = null): mixed {
        $val = getenv($key);
        if ($val === false) {
            $val = $_ENV[$key] ?? $_SERVER[$key] ?? null;
        }
        if ($val === null || $val === false) {
            return $default;
        }
        return match (strtolower((string)$val)) {
            'true', '(true)' => true,
            'false', '(false)' => false,
            'null', '(null)' => null,
            'empty', '(empty)' => '',
            default => $val,
        };
    }
}

$baseDir = dirname(__DIR__);

$sqlitePath = env('DB_SQLITE_PATH', 'database/data/database.sqlite');
if (!str_starts_with($sqlitePath, '/') && !preg_match('/^[a-zA-Z]:/', $sqlitePath)) {
    $sqlitePath = $baseDir . '/' . ltrim($sqlitePath, '/\\');
}

return [
    'app' => [
        'name' => env('APP_NAME', 'Aakaar Digital API'),
        'env' => env('APP_ENV', 'production'),
        'debug' => (bool)env('APP_DEBUG', false),
        'url' => rtrim(env('APP_URL', 'http://localhost:8000'), '/'),
        'admin_url' => rtrim(env('ADMIN_URL', 'https://admin.aakaardigital.com'), '/'),
        'frontend_url' => rtrim(env('FRONTEND_URL', 'https://aakaardigital.com'), '/'),
        'key' => env('APP_KEY', 'techvora-secret-key-32-chars-hex-string'),
    ],

    'database' => [
        'driver' => env('DB_DRIVER', 'sqlite'), // 'sqlite' or 'mysql'
        'sqlite_path' => $sqlitePath,
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => (int)env('DB_PORT', 3306),
        'database' => env('DB_DATABASE', 'techvora_db'),
        'username' => env('DB_USERNAME', 'root'),
        'password' => env('DB_PASSWORD', ''),
        'charset' => env('DB_CHARSET', 'utf8mb4'),
    ],

    'cors' => [
        'allowed_origins' => array_filter(array_map('trim', explode(',', env('ALLOWED_ORIGINS', 
            'https://aakaardigital.com,https://www.aakaardigital.com,https://admin.aakaardigital.com,http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173'
        )))),
        'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token', 'Accept'],
        'allow_credentials' => true,
        'max_age' => 86400,
    ],

    'session' => [
        'cookie_name' => env('SESSION_COOKIE_NAME', 'techvora_admin_session'),
        'lifetime' => (int)env('SESSION_LIFETIME', 86400 * 7), // 7 days
        'secure' => (bool)env('SESSION_SECURE', false), // true in HTTPS production
        'samesite' => env('SESSION_SAMESITE', 'Lax'), // Lax or None (None requires Secure)
        'domain' => env('SESSION_DOMAIN', null), // e.g. .aakaardigital.com to share across subdomains
    ],

    'security' => [
        'rate_limit_enabled' => (bool)env('RATE_LIMIT_ENABLED', true),
        'login_max_attempts' => (int)env('LOGIN_MAX_ATTEMPTS', 5),
        'login_decay_minutes' => (int)env('LOGIN_DECAY_MINUTES', 15),
        'enquiry_min_time_sec' => (int)env('ENQUIRY_MIN_TIME_SEC', 3), // Min seconds to fill form
    ],

    'storage' => [
        'uploads_path' => $baseDir . '/storage/uploads',
        'uploads_url' => env('UPLOADS_URL', '/uploads'),
        'max_file_size' => 5 * 1024 * 1024, // 5MB
        'allowed_mime_types' => [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/avif',
            'image/svg+xml',
            'application/pdf',
        ],
    ],

    'mail' => [
        'enabled' => (bool)env('MAIL_ENABLED', false),
        'admin_notification_email' => env('ADMIN_EMAIL', 'info@aakaardigital.com'),
        'from_address' => env('MAIL_FROM_ADDRESS', 'noreply@aakaardigital.com'),
        'from_name' => env('MAIL_FROM_NAME', 'Aakaar Digital Leads'),
    ],
];

