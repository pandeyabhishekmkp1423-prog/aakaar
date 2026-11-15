<?php
declare(strict_types=1);

/**
 * Cross-Site Request Forgery (CSRF) Protection Middleware
 */

class CsrfMiddleware {
    public static function verify(): void {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        if (in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
            return;
        }

        $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;

        if (!$token || !Security::verifyCsrfToken($token)) {
            Response::forbidden('Invalid or expired CSRF security token. Please refresh the page and retry.');
        }
    }
}
