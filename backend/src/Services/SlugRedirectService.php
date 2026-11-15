<?php
declare(strict_types=1);

/**
 * 301 Slug Redirect Manager for SEO preservation
 */

class SlugRedirectService {
    public static function track(PDO $pdo, string $oldSlug, string $newSlug): void {
        if ($oldSlug === $newSlug || trim($oldSlug) === '' || trim($newSlug) === '') {
            return;
        }

        $now = date('Y-m-d H:i:s');

        // Check if any existing redirect points to old_slug; update it to new_slug
        $pdo->prepare("UPDATE slug_redirects SET new_slug = :new_slug WHERE new_slug = :old_slug")
            ->execute([':new_slug' => $newSlug, ':old_slug' => $oldSlug]);

        // Insert or replace redirect for old_slug
        $stmt = $pdo->prepare("
            INSERT INTO slug_redirects (old_slug, new_slug, created_at)
            VALUES (:old_slug, :new_slug, :created_at)
        ");
        try {
            $stmt->execute([
                ':old_slug' => $oldSlug,
                ':new_slug' => $newSlug,
                ':created_at' => $now,
            ]);
        } catch (PDOException $e) {
            // Already exists, update target
            $pdo->prepare("UPDATE slug_redirects SET new_slug = :new_slug WHERE old_slug = :old_slug")
                ->execute([':new_slug' => $newSlug, ':old_slug' => $oldSlug]);
        }
    }

    public static function findRedirect(PDO $pdo, string $slug): ?string {
        $stmt = $pdo->prepare("SELECT new_slug FROM slug_redirects WHERE old_slug = :slug LIMIT 1");
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        return $row ? (string)$row['new_slug'] : null;
    }
}
