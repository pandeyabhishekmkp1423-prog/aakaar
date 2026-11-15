<?php
declare(strict_types=1);

/**
 * Aakaar Digital - Production PHP 8.2 Backend Entrypoint
 */

// Detect base directory whether placed in /public or root directory
$baseDir = is_dir(__DIR__ . '/config') ? __DIR__ : dirname(__DIR__);

// Case-insensitive autoloader for Linux / Hostinger compatibility
spl_autoload_register(function (string $class) use ($baseDir): void {
    $dirs = [
        $baseDir . '/config',
        $baseDir . '/database',
        $baseDir . '/src',
        $baseDir . '/src/Controllers',
        $baseDir . '/src/Middleware',
        $baseDir . '/src/Services',
        $baseDir . '/src/Utils',
    ];

    foreach ($dirs as $dir) {
        $candidates = [
            $dir . '/' . $class . '.php',
            $dir . '/' . lcfirst($class) . '.php',
            $dir . '/' . strtolower($class) . '.php',
        ];

        foreach ($candidates as $file) {
            if (file_exists($file)) {
                require_once $file;
                return;
            }
        }
    }
});

// Explicitly require core database and router files to ensure instant availability
if (file_exists($baseDir . '/config/database.php')) {
    require_once $baseDir . '/config/database.php';
} elseif (file_exists($baseDir . '/config/Database.php')) {
    require_once $baseDir . '/config/Database.php';
}
if (file_exists($baseDir . '/src/Router.php')) {
    require_once $baseDir . '/src/Router.php';
}

// Load configuration
$config = require $baseDir . '/config/config.php';

// Configure error reporting
if ($config['app']['debug']) {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('error_log', $baseDir . '/storage/logs/error.log');
    error_reporting(E_ALL);
}

// Configure Secure Session Storage & Parameters (must run before any headers are sent)
$sessionSavePath = $baseDir . '/storage/sessions';
if (!is_dir($sessionSavePath)) {
    @mkdir($sessionSavePath, 0755, true);
}
if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
    if (is_dir($sessionSavePath) && is_writable($sessionSavePath)) {
        session_save_path($sessionSavePath);
    }
    $sessionConfig = $config['session'];
    session_name($sessionConfig['cookie_name']);

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
               (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

    $cookieParams = [
        'lifetime' => $sessionConfig['lifetime'],
        'path' => '/',
        'secure' => $isHttps || (bool)$sessionConfig['secure'],
        'httponly' => true,
        'samesite' => $sessionConfig['samesite'],
    ];

    if (!empty($sessionConfig['domain'])) {
        $cookieParams['domain'] = $sessionConfig['domain'];
    }

    session_set_cookie_params($cookieParams);
}

// Security headers & CORS
Security::sendSecurityHeaders($config);
CorsMiddleware::handle($config);

// Handle direct uploaded static media & SPA asset delivery
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

// Normalize /admin prefix if accessed via aakaardigital.com/admin/
$normalizedUri = $uri;
if (str_starts_with($normalizedUri, '/admin/')) {
    $normalizedUri = substr($normalizedUri, 6);
} elseif ($normalizedUri === '/admin') {
    $normalizedUri = '/';
}

if (str_starts_with($normalizedUri, '/uploads/')) {
    $filename = basename($normalizedUri);
    $filepath = $config['storage']['uploads_path'] . '/' . $filename;

    if (file_exists($filepath) && is_file($filepath)) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($filepath);
        header("Content-Type: {$mime}");
        header("Content-Length: " . filesize($filepath));
        header("Cache-Control: public, max-age=31536000, immutable");
        readfile($filepath);
        exit;
    } else {
        Response::notFound('Media asset was not found.');
    }
}

// Handle static Vite asset delivery (when frontend build assets/ is present)
if (str_starts_with($normalizedUri, '/assets/')) {
    $assetFile = $baseDir . $normalizedUri;
    if (file_exists($assetFile) && is_file($assetFile)) {
        $mime = 'application/octet-stream';
        if (str_ends_with($normalizedUri, '.css')) $mime = 'text/css; charset=utf-8';
        elseif (str_ends_with($normalizedUri, '.js')) $mime = 'application/javascript; charset=utf-8';
        elseif (str_ends_with($normalizedUri, '.png')) $mime = 'image/png';
        elseif (str_ends_with($normalizedUri, '.svg')) $mime = 'image/svg+xml';
        elseif (str_ends_with($normalizedUri, '.ico')) $mime = 'image/x-icon';
        elseif (str_ends_with($normalizedUri, '.webp')) $mime = 'image/webp';
        header("Content-Type: {$mime}");
        header("Cache-Control: public, max-age=31536000, immutable");
        readfile($assetFile);
        exit;
    }
}

// Fallback to React Single Page Application (index.html) for non-API browser navigation
if (!str_starts_with($normalizedUri, '/v1/') && $normalizedUri !== '/v1') {
    $indexHtml = $baseDir . '/index.html';
    if (file_exists($indexHtml) && is_file($indexHtml)) {
        header("Content-Type: text/html; charset=utf-8");
        header("Cache-Control: no-cache, no-store, must-revalidate");

        $html = file_get_contents($indexHtml);
        $requestUri = $_SERVER['REQUEST_URI'] ?? '';
        if (str_starts_with($requestUri, '/admin')) {
            // Rewrite root-relative asset URLs to /admin/assets/ so the browser loads them from the admin folder
            $html = str_replace('href="/assets/', 'href="/admin/assets/', $html);
            $html = str_replace('src="/assets/', 'src="/admin/assets/', $html);
        }
        echo $html;
        exit;
    }
}

// Database Connection & Auto-Migration
$pdo = null;
$dbError = null;

try {
    $pdo = Database::getConnection($config);
    try {
        Migrations::run($pdo, $config['database']['driver']);
        Seeder::run($pdo);
    } catch (Throwable $migrationErr) {
        error_log("Database Migration Notice: " . $migrationErr->getMessage());
    }
} catch (Throwable $e) {
    $dbError = $e->getMessage();
    $config['_db_error'] = $dbError;
    error_log("Database Connection Warning: " . $e->getMessage());
}

// Initialize Router
$router = new Router($pdo, $config);

// -------------------------------------------------------------
// Root & Health Check Routes
// -------------------------------------------------------------
$router->get('/', function () use ($config, $pdo, $dbError) {
    if ($pdo === null) {
        Response::json([
            'service' => 'Aakaar Digital Backend API',
            'status' => 'database_setup_required',
            'connected' => false,
            'message' => 'Backend is installed! Database connection is pending. Please verify DB_PASSWORD in .env and import schema.sql into phpMyAdmin.',
            'db_driver' => $config['database']['driver'],
            'db_database' => $config['database']['database'],
            'php_version' => PHP_VERSION,
            'environment' => $config['app']['env'],
            'error_detail' => $dbError,
        ], 200);
    }

    Response::success([
        'service' => 'Aakaar Digital Backend API',
        'status' => 'operational',
        'database' => 'connected',
        'php_version' => PHP_VERSION,
        'environment' => $config['app']['env'],
        'time' => date('Y-m-d H:i:s T'),
    ]);
});

$router->get('/health', function () use ($pdo) {
    Response::success([
        'status' => $pdo !== null ? 'ok' : 'degraded',
        'database' => $pdo !== null ? 'connected' : 'disconnected',
    ]);
});

// -------------------------------------------------------------
// Public Endpoints
// -------------------------------------------------------------
$router->get('/v1/posts', [PostController::class, 'publicIndex']);
$router->get('/v1/posts/{slug}', [PostController::class, 'publicShow']);
$router->get('/v1/categories', [CategoryController::class, 'index']);
$router->post('/v1/enquiries', [EnquiryController::class, 'store']);

// -------------------------------------------------------------
// Admin Authentication & Account Endpoints
// -------------------------------------------------------------
$router->post('/v1/admin/login', [AuthController::class, 'login']);
$router->post('/v1/admin/logout', [AuthController::class, 'logout']);
$router->get('/v1/admin/me', [AuthController::class, 'me']);
$router->post('/v1/admin/password', [AuthController::class, 'changePassword']);

// -------------------------------------------------------------
// Admin Dashboard & Overview
// -------------------------------------------------------------
$router->get('/v1/admin/dashboard', [DashboardController::class, 'index']);

// -------------------------------------------------------------
// Admin Inbound Leads / Enquiries
// -------------------------------------------------------------
$router->get('/v1/admin/enquiries', [EnquiryController::class, 'index']);
$router->get('/v1/admin/enquiries/{id}', [EnquiryController::class, 'show']);
$router->patch('/v1/admin/enquiries/{id}', [EnquiryController::class, 'update']);
$router->delete('/v1/admin/enquiries/{id}', [EnquiryController::class, 'destroy']);

// -------------------------------------------------------------
// Admin Blog Posts CMS
// -------------------------------------------------------------
$router->get('/v1/admin/posts', [PostController::class, 'adminIndex']);
$router->post('/v1/admin/posts', [PostController::class, 'store']);
$router->get('/v1/admin/posts/{id}', [PostController::class, 'adminShow']);
$router->put('/v1/admin/posts/{id}', [PostController::class, 'update']);
$router->delete('/v1/admin/posts/{id}', [PostController::class, 'destroy']);

// -------------------------------------------------------------
// Admin Categories
// -------------------------------------------------------------
$router->get('/v1/admin/categories', [CategoryController::class, 'adminIndex']);
$router->post('/v1/admin/categories', [CategoryController::class, 'store']);
$router->put('/v1/admin/categories/{id}', [CategoryController::class, 'update']);
$router->delete('/v1/admin/categories/{id}', [CategoryController::class, 'destroy']);

// -------------------------------------------------------------
// Admin Media Library
// -------------------------------------------------------------
$router->get('/v1/admin/media', [MediaController::class, 'index']);
$router->post('/v1/admin/media', [MediaController::class, 'store']);
$router->patch('/v1/admin/media/{id}', [MediaController::class, 'update']);
$router->delete('/v1/admin/media/{id}', [MediaController::class, 'destroy']);

// -------------------------------------------------------------
// Admin User Management
// -------------------------------------------------------------
$router->get('/v1/admin/users', [UserController::class, 'index']);
$router->post('/v1/admin/users', [UserController::class, 'store']);
$router->delete('/v1/admin/users/{id}', [UserController::class, 'destroy']);

// Dispatch incoming request
$router->dispatch();

