<?php
declare(strict_types=1);

/**
 * Database Connection Provider (PDO Singleton)
 * Resilient multi-credential and socket fallback handler for Hostinger
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(array $config): PDO {
        if (self::$instance !== null) {
            return self::$instance;
        }

        $dbConfig = $config['database'];
        $driver = strtolower($dbConfig['driver']);

        if ($driver === 'sqlite') {
            try {
                $path = $dbConfig['sqlite_path'];
                $dir = dirname($path);
                if (!is_dir($dir)) {
                    @mkdir($dir, 0755, true);
                }
                $dsn = "sqlite:{$path}";
                $pdo = new PDO($dsn, null, null, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                $pdo->exec('PRAGMA foreign_keys = ON;');
                $pdo->exec('PRAGMA journal_mode = WAL;');
                self::$instance = $pdo;
                return self::$instance;
            } catch (PDOException $e) {
                error_log("SQLite Connection Error: " . $e->getMessage());
                throw new RuntimeException("SQLite connection failed: " . $e->getMessage());
            }
        }

        // MySQL / MariaDB Resilient Connection Handler
        $hosts = array_values(array_unique([$dbConfig['host'], 'localhost', '127.0.0.1']));
        $passwords = array_values(array_unique([
            $dbConfig['password'],
            rtrim($dbConfig['password'], ':'),
            'lGuCw4y4',
            'lGuCw4y4:',
            '3N@vJI^da3P',
        ]));
        $users = array_values(array_unique([
            $dbConfig['username'],
            'u948388602_admin',
            'u948388602_techvora',
        ]));

        $lastException = null;

        foreach ($hosts as $host) {
            foreach ($users as $user) {
                if (empty($user)) continue;
                foreach ($passwords as $pwd) {
                    try {
                        $dsn = sprintf(
                            "mysql:host=%s;dbname=%s;charset=%s",
                            $host,
                            $dbConfig['database'],
                            $dbConfig['charset']
                        );
                        if ($host === '127.0.0.1' && !empty($dbConfig['port'])) {
                            $dsn .= ";port=" . (int)$dbConfig['port'];
                        }

                        $pdo = new PDO($dsn, $user, $pwd, [
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                            PDO::ATTR_EMULATE_PREPARES => false,
                            PDO::ATTR_TIMEOUT => 3,
                        ]);
                        $pdo->exec("SET NAMES {$dbConfig['charset']}");

                        self::$instance = $pdo;
                        return self::$instance;
                    } catch (PDOException $e) {
                        $lastException = $e;
                    }
                }
            }
        }

        $errorMsg = $lastException ? $lastException->getMessage() : 'Unknown database connection error';
        error_log("Database Connection Error: " . $errorMsg);
        throw new RuntimeException("Could not connect to database: " . $errorMsg);
    }
}
