<?php
declare(strict_types=1);

/**
 * Lightweight, High-Performance REST API Router
 */

class Router {
    private array $routes = [];
    private ?PDO $pdo = null;
    private array $config;

    public function __construct(?PDO $pdo, array $config) {
        $this->pdo = $pdo;
        $this->config = $config;
    }

    public function get(string $path, callable|array $handler): self {
        return $this->addRoute('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): self {
        return $this->addRoute('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): self {
        return $this->addRoute('PUT', $path, $handler);
    }

    public function patch(string $path, callable|array $handler): self {
        return $this->addRoute('PATCH', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): self {
        return $this->addRoute('DELETE', $path, $handler);
    }

    private function addRoute(string $method, string $path, callable|array $handler): self {
        $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $path);
        $regex = '#^' . $pattern . '$#';

        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'regex' => $regex,
            'handler' => $handler,
        ];
        return $this;
    }

    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

        // Normalize trailing slashes
        if ($uri !== '/' && str_ends_with($uri, '/')) {
            $uri = rtrim($uri, '/');
        }

        // Support both subdomain (admin.aakaardigital.com/v1/...) and subdirectory (aakaardigital.com/admin/v1/...)
        if (str_starts_with($uri, '/admin/')) {
            $uri = substr($uri, 6);
        } elseif ($uri === '/admin') {
            $uri = '/';
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }

            if (preg_match($route['regex'], $uri, $matches)) {
                $params = [];
                foreach ($matches as $key => $value) {
                    if (is_string($key)) {
                        $params[$key] = is_numeric($value) ? (int)$value : urldecode($value);
                    }
                }

                $handler = $route['handler'];

                try {
                    if (is_array($handler) && count($handler) === 2) {
                        [$class, $action] = $handler;
                        $ref = new ReflectionMethod($class, $action);
                        $callable = [$class, $action];
                    } elseif ($handler instanceof Closure) {
                        $ref = new ReflectionFunction($handler);
                        $callable = $handler;
                    } else {
                        $ref = new ReflectionFunction($handler);
                        $callable = $handler;
                    }

                    $args = [];
                    $remainingParams = array_values($params);
                    foreach ($ref->getParameters() as $param) {
                        $name = $param->getName();
                        if ($name === 'pdo') {
                            if ($this->pdo === null) {
                                $detail = $this->config['_db_error'] ?? 'Please check database password in .env';
                                Response::error(
                                    'Database connection failed: ' . $detail,
                                    'DATABASE_NOT_CONNECTED',
                                    503
                                );
                            }
                            $args[] = $this->pdo;
                        } elseif ($name === 'config') {
                            $args[] = $this->config;
                        } elseif (isset($params[$name])) {
                            $args[] = $params[$name];
                        } elseif (count($remainingParams) > 0) {
                            $args[] = array_shift($remainingParams);
                        } elseif ($param->isDefaultValueAvailable()) {
                            $args[] = $param->getDefaultValue();
                        } else {
                            $args[] = null;
                        }
                    }

                    call_user_func_array($callable, $args);
                    return;
                } catch (Throwable $e) {
                    error_log("Unhandled Server Exception: " . $e->getMessage() . "\n" . $e->getTraceAsString());
                    $debug = (bool)($this->config['app']['debug'] ?? false);
                    Response::error(
                        $debug ? $e->getMessage() : 'An unexpected internal server error occurred.',
                        'INTERNAL_SERVER_ERROR',
                        500,
                        $debug ? ['trace' => $e->getTraceAsString()] : []
                    );
                }
            }
        }

        Response::notFound("Endpoint '{$method} {$uri}' was not found on this server.");
    }
}

