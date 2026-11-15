<?php
declare(strict_types=1);

/**
 * IP-based Rate Limiter for Brute-force & Spam Protection
 */

class RateLimiter {
    public static function check(PDO $pdo, string $action, int $maxAttempts = 5, int $decaySeconds = 900): void {
        $ip = Security::getClientIp();
        $key = "{$action}:{$ip}";
        $now = time();

        // Clean expired rate limits periodically (1 in 50 chance)
        if (random_int(1, 50) === 1) {
            $pdo->prepare("DELETE FROM rate_limits WHERE reset_at < :now")->execute([':now' => $now]);
        }

        $stmt = $pdo->prepare("SELECT attempts, reset_at FROM rate_limits WHERE ip_key = :key LIMIT 1");
        $stmt->execute([':key' => $key]);
        $row = $stmt->fetch();

        if ($row) {
            if ($row['reset_at'] > $now) {
                if ($row['attempts'] >= $maxAttempts) {
                    $retryAfter = $row['reset_at'] - $now;
                    header("Retry-After: {$retryAfter}");
                    Response::error(
                        "Too many attempts. For security reasons, this request has been rate-limited. Please retry in {$retryAfter} seconds.",
                        'TOO_MANY_ATTEMPTS',
                        429
                    );
                }
                // Increment attempts
                $pdo->prepare("UPDATE rate_limits SET attempts = attempts + 1 WHERE ip_key = :key")->execute([':key' => $key]);
            } else {
                // Reset expired window
                $pdo->prepare("UPDATE rate_limits SET attempts = 1, reset_at = :reset WHERE ip_key = :key")->execute([
                    ':reset' => $now + $decaySeconds,
                    ':key' => $key,
                ]);
            }
        } else {
            // First attempt
            $pdo->prepare("INSERT INTO rate_limits (ip_key, attempts, reset_at) VALUES (:key, 1, :reset)")->execute([
                ':key' => $key,
                ':reset' => $now + $decaySeconds,
            ]);
        }
    }

    public static function clear(PDO $pdo, string $action): void {
        $ip = Security::getClientIp();
        $key = "{$action}:{$ip}";
        $pdo->prepare("DELETE FROM rate_limits WHERE ip_key = :key")->execute([':key' => $key]);
    }
}
