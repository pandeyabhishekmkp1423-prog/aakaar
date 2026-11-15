<?php
declare(strict_types=1);

/**
 * Public & Admin Blog Posts Controller
 */

class PostController {
    public static function publicIndex(PDO $pdo): void {
        $page = max(1, (int)($_GET['page'] ?? 1));
        $perPage = max(1, min(50, (int)($_GET['per_page'] ?? 9)));
        $offset = ($page - 1) * $perPage;

        $categorySlug = trim($_GET['category'] ?? '');
        $q = trim($_GET['q'] ?? '');
        $now = date('Y-m-d H:i:s');

        $where = ["p.status = 'published'", "(p.published_at IS NULL OR p.published_at <= :now)"];
        $params = [':now' => $now];

        $joinCategory = '';
        if ($categorySlug !== '') {
            $joinCategory = "
                INNER JOIN post_categories pc ON pc.post_id = p.id
                INNER JOIN categories c ON c.id = pc.category_id AND c.slug = :cat_slug
            ";
            $params[':cat_slug'] = $categorySlug;
        }

        if ($q !== '') {
            $where[] = "(p.title LIKE :q OR p.excerpt LIKE :q OR p.content LIKE :q)";
            $params[':q'] = "%{$q}%";
        }

        $whereSql = "WHERE " . implode(' AND ', $where);

        // Count total
        $countSql = "SELECT COUNT(DISTINCT p.id) FROM posts p {$joinCategory} {$whereSql}";
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        // Query published posts
        $dataSql = "
            SELECT 
                p.id, p.title, p.slug, p.excerpt, p.cover_image, p.cover_alt,
                p.reading_time, p.published_at, p.updated_at,
                u.name AS author_name
            FROM posts p
            LEFT JOIN users u ON u.id = p.author_id
            {$joinCategory}
            {$whereSql}
            ORDER BY COALESCE(p.published_at, p.created_at) DESC
            LIMIT {$perPage} OFFSET {$offset}
        ";
        $dataStmt = $pdo->prepare($dataSql);
        $dataStmt->execute($params);
        $posts = $dataStmt->fetchAll();

        // Attach categories to each post
        if (count($posts) > 0) {
            $postIds = array_column($posts, 'id');
            $inClause = implode(',', array_map('intval', $postIds));

            $catsStmt = $pdo->query("
                SELECT pc.post_id, c.id, c.name, c.slug
                FROM post_categories pc
                INNER JOIN categories c ON c.id = pc.category_id
                WHERE pc.post_id IN ({$inClause})
            ");
            $categoriesByPost = [];
            while ($row = $catsStmt->fetch()) {
                $categoriesByPost[$row['post_id']][] = [
                    'id' => (int)$row['id'],
                    'name' => $row['name'],
                    'slug' => $row['slug'],
                ];
            }

            foreach ($posts as &$post) {
                $post['categories'] = $categoriesByPost[$post['id']] ?? [];
            }
            unset($post);
        }

        $totalPages = (int)ceil($total / $perPage);

        Response::success($posts, [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'total_pages' => max(1, $totalPages),
        ]);
    }

    public static function publicShow(PDO $pdo, string $slug): void {
        // 1. Check for 301 Redirect for changed slugs
        $targetSlug = SlugRedirectService::findRedirect($pdo, $slug);
        if ($targetSlug !== null) {
            Response::redirect301($targetSlug);
        }

        $now = date('Y-m-d H:i:s');
        $stmt = $pdo->prepare("
            SELECT 
                p.*,
                u.name AS author_name
            FROM posts p
            LEFT JOIN users u ON u.id = p.author_id
            WHERE p.slug = :slug
              AND p.status = 'published'
              AND (p.published_at IS NULL OR p.published_at <= :now)
            LIMIT 1
        ");
        $stmt->execute([':slug' => $slug, ':now' => $now]);
        $post = $stmt->fetch();

        if (!$post) {
            Response::notFound("Article was not found or is no longer published.");
        }

        // Attach categories
        $catsStmt = $pdo->prepare("
            SELECT c.id, c.name, c.slug
            FROM post_categories pc
            INNER JOIN categories c ON c.id = pc.category_id
            WHERE pc.post_id = :post_id
        ");
        $catsStmt->execute([':post_id' => $post['id']]);
        $post['categories'] = $catsStmt->fetchAll();

        // Fetch up to 3 related published posts
        $catIds = array_column($post['categories'], 'id');
        $relatedPosts = [];

        if (count($catIds) > 0) {
            $inCats = implode(',', array_map('intval', $catIds));
            $relStmt = $pdo->prepare("
                SELECT DISTINCT p.id, p.title, p.slug, p.excerpt, p.reading_time, p.published_at
                FROM posts p
                INNER JOIN post_categories pc ON pc.post_id = p.id
                WHERE pc.category_id IN ({$inCats})
                  AND p.id != :current_id
                  AND p.status = 'published'
                  AND (p.published_at IS NULL OR p.published_at <= :now)
                ORDER BY p.published_at DESC
                LIMIT 3
            ");
            $relStmt->execute([':current_id' => $post['id'], ':now' => $now]);
            $relatedPosts = $relStmt->fetchAll();
        }

        // Fallback: If not enough related posts by category, fetch latest published
        if (count($relatedPosts) < 3) {
            $excludeIds = array_merge([(int)$post['id']], array_column($relatedPosts, 'id'));
            $inExclude = implode(',', $excludeIds);
            $limit = 3 - count($relatedPosts);

            $fallbackStmt = $pdo->prepare("
                SELECT id, title, slug, excerpt, reading_time, published_at
                FROM posts
                WHERE id NOT IN ({$inExclude})
                  AND status = 'published'
                  AND (published_at IS NULL OR published_at <= :now)
                ORDER BY published_at DESC
                LIMIT {$limit}
            ");
            $fallbackStmt->execute([':now' => $now]);
            $relatedPosts = array_merge($relatedPosts, $fallbackStmt->fetchAll());
        }

        $post['related_posts'] = $relatedPosts;

        Response::success($post);
    }

    public static function adminIndex(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);

        $page = max(1, (int)($_GET['page'] ?? 1));
        $perPage = max(1, min(100, (int)($_GET['per_page'] ?? 15)));
        $offset = ($page - 1) * $perPage;

        $status = trim($_GET['status'] ?? '');
        $q = trim($_GET['q'] ?? '');

        $where = [];
        $params = [];

        if ($status !== '') {
            $where[] = "p.status = :status";
            $params[':status'] = $status;
        }

        if ($q !== '') {
            $where[] = "(p.title LIKE :q OR p.slug LIKE :q OR p.excerpt LIKE :q)";
            $params[':q'] = "%{$q}%";
        }

        $whereSql = count($where) > 0 ? "WHERE " . implode(' AND ', $where) : "";

        $countStmt = $pdo->prepare("SELECT COUNT(*) FROM posts p {$whereSql}");
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        $dataStmt = $pdo->prepare("
            SELECT 
                p.id, p.title, p.slug, p.status, p.reading_time, p.published_at, p.updated_at,
                u.name AS author_name
            FROM posts p
            LEFT JOIN users u ON u.id = p.author_id
            {$whereSql}
            ORDER BY p.id DESC
            LIMIT {$perPage} OFFSET {$offset}
        ");
        $dataStmt->execute($params);
        $rows = $dataStmt->fetchAll();

        // Attach categories
        if (count($rows) > 0) {
            $postIds = array_column($rows, 'id');
            $inClause = implode(',', array_map('intval', $postIds));

            $catsStmt = $pdo->query("
                SELECT pc.post_id, c.id, c.name, c.slug
                FROM post_categories pc
                INNER JOIN categories c ON c.id = pc.category_id
                WHERE pc.post_id IN ({$inClause})
            ");
            $categoriesByPost = [];
            while ($cRow = $catsStmt->fetch()) {
                $categoriesByPost[$cRow['post_id']][] = [
                    'id' => (int)$cRow['id'],
                    'name' => $cRow['name'],
                    'slug' => $cRow['slug'],
                ];
            }

            foreach ($rows as &$r) {
                $r['categories'] = $categoriesByPost[$r['id']] ?? [];
            }
            unset($r);
        }

        $totalPages = (int)ceil($total / $perPage);

        Response::success($rows, [
            'total' => $total,
            'page' => $page,
            'per_page' => $perPage,
            'total_pages' => max(1, $totalPages),
        ]);
    }

    public static function adminShow(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);

        $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $post = $stmt->fetch();

        if (!$post) {
            Response::notFound("Article #{$id} was not found.");
        }

        // Attach category IDs
        $catsStmt = $pdo->prepare("SELECT category_id FROM post_categories WHERE post_id = :id");
        $catsStmt->execute([':id' => $id]);
        $post['category_ids'] = array_map('intval', $catsStmt->fetchAll(PDO::FETCH_COLUMN));

        Response::success($post);
    }

    public static function store(PDO $pdo): void {
        $user = AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('title', 'Article title is required.')
                  ->required('slug', 'URL slug is required.')
                  ->slug('slug')
                  ->required('content', 'Article content is required.')
                  ->in('status', ['draft', 'scheduled', 'published']);

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $slug = trim($input['slug']);

        // Check unique slug
        $check = $pdo->prepare("SELECT id FROM posts WHERE slug = :slug LIMIT 1");
        $check->execute([':slug' => $slug]);
        if ($check->fetch()) {
            Response::error("The slug '{$slug}' is already taken by another article.", 'SLUG_EXISTS', 422, ['slug' => 'Slug already taken.']);
        }

        $content = (string)$input['content'];
        $plainText = strip_tags($content);
        $wordCount = str_word_count($plainText);
        $readingTime = max(1, (int)ceil($wordCount / 200));

        $status = $input['status'] ?? 'draft';
        $now = date('Y-m-d H:i:s');
        $publishedAt = null;

        if ($status === 'published') {
            $publishedAt = !empty($input['published_at']) ? $input['published_at'] : $now;
        } elseif ($status === 'scheduled') {
            $publishedAt = !empty($input['published_at']) ? $input['published_at'] : null;
        }

        $stmt = $pdo->prepare("
            INSERT INTO posts (
                author_id, title, slug, excerpt, content, cover_image, cover_alt,
                meta_title, meta_description, status, reading_time, published_at, created_at, updated_at
            ) VALUES (
                :author_id, :title, :slug, :excerpt, :content, :cover_image, :cover_alt,
                :meta_title, :meta_description, :status, :reading_time, :published_at, :created_at, :updated_at
            )
        ");

        $stmt->execute([
            ':author_id' => $user['id'],
            ':title' => trim($input['title']),
            ':slug' => $slug,
            ':excerpt' => trim($input['excerpt'] ?? ''),
            ':content' => $content,
            ':cover_image' => trim($input['cover_image'] ?? ''),
            ':cover_alt' => trim($input['cover_alt'] ?? ''),
            ':meta_title' => trim($input['meta_title'] ?? ''),
            ':meta_description' => trim($input['meta_description'] ?? ''),
            ':status' => $status,
            ':reading_time' => $readingTime,
            ':published_at' => $publishedAt,
            ':created_at' => $now,
            ':updated_at' => $now,
        ]);

        $postId = (int)$pdo->lastInsertId();

        // Sync category IDs
        if (!empty($input['category_ids']) && is_array($input['category_ids'])) {
            $syncStmt = $pdo->prepare("INSERT INTO post_categories (post_id, category_id) VALUES (:post_id, :cat_id)");
            foreach ($input['category_ids'] as $catId) {
                $syncStmt->execute([':post_id' => $postId, ':cat_id' => (int)$catId]);
            }
        }

        AuditLogger::log($pdo, 'POST_CREATED', "Created article '{$input['title']}' (#{$postId}) with status '{$status}'");

        Response::success([
            'id' => $postId,
            'title' => $input['title'],
            'slug' => $slug,
            'status' => $status,
        ], null, 201);
    }

    public static function update(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT * FROM posts WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            Response::notFound("Article #{$id} was not found.");
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('title', 'Article title is required.')
                  ->required('slug', 'URL slug is required.')
                  ->slug('slug')
                  ->required('content', 'Article content is required.')
                  ->in('status', ['draft', 'scheduled', 'published']);

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $newSlug = trim($input['slug']);
        $oldSlug = $existing['slug'];

        // If slug changed, ensure unique and create 301 redirect mapping
        if ($newSlug !== $oldSlug) {
            $check = $pdo->prepare("SELECT id FROM posts WHERE slug = :slug AND id != :id LIMIT 1");
            $check->execute([':slug' => $newSlug, ':id' => $id]);
            if ($check->fetch()) {
                Response::error("The slug '{$newSlug}' is already taken.", 'SLUG_EXISTS', 422, ['slug' => 'Slug already taken.']);
            }
            SlugRedirectService::track($pdo, $oldSlug, $newSlug);
        }

        $content = (string)$input['content'];
        $plainText = strip_tags($content);
        $wordCount = str_word_count($plainText);
        $readingTime = max(1, (int)ceil($wordCount / 200));

        $status = $input['status'] ?? $existing['status'];
        $now = date('Y-m-d H:i:s');
        $publishedAt = $existing['published_at'];

        if ($status === 'published' && !$publishedAt) {
            $publishedAt = !empty($input['published_at']) ? $input['published_at'] : $now;
        } elseif ($status === 'scheduled') {
            $publishedAt = !empty($input['published_at']) ? $input['published_at'] : $publishedAt;
        }

        $updateStmt = $pdo->prepare("
            UPDATE posts SET
                title = :title,
                slug = :slug,
                excerpt = :excerpt,
                content = :content,
                cover_image = :cover_image,
                cover_alt = :cover_alt,
                meta_title = :meta_title,
                meta_description = :meta_description,
                status = :status,
                reading_time = :reading_time,
                published_at = :published_at,
                updated_at = :updated_at
            WHERE id = :id
        ");

        $updateStmt->execute([
            ':title' => trim($input['title']),
            ':slug' => $newSlug,
            ':excerpt' => trim($input['excerpt'] ?? ''),
            ':content' => $content,
            ':cover_image' => trim($input['cover_image'] ?? ''),
            ':cover_alt' => trim($input['cover_alt'] ?? ''),
            ':meta_title' => trim($input['meta_title'] ?? ''),
            ':meta_description' => trim($input['meta_description'] ?? ''),
            ':status' => $status,
            ':reading_time' => $readingTime,
            ':published_at' => $publishedAt,
            ':updated_at' => $now,
            ':id' => $id,
        ]);

        // Sync category IDs
        if (isset($input['category_ids']) && is_array($input['category_ids'])) {
            $pdo->prepare("DELETE FROM post_categories WHERE post_id = :id")->execute([':id' => $id]);
            $syncStmt = $pdo->prepare("INSERT INTO post_categories (post_id, category_id) VALUES (:post_id, :cat_id)");
            foreach ($input['category_ids'] as $catId) {
                $syncStmt->execute([':post_id' => $id, ':cat_id' => (int)$catId]);
            }
        }

        AuditLogger::log($pdo, 'POST_UPDATED', "Updated article '{$input['title']}' (#{$id})");

        Response::success([
            'id' => $id,
            'title' => $input['title'],
            'slug' => $newSlug,
            'status' => $status,
            'updated_at' => $now,
        ]);
    }

    public static function destroy(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT title FROM posts WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $title = $stmt->fetchColumn();

        if (!$title) {
            Response::notFound("Article #{$id} was not found.");
        }

        $pdo->prepare("DELETE FROM post_categories WHERE post_id = :id")->execute([':id' => $id]);
        $pdo->prepare("DELETE FROM posts WHERE id = :id")->execute([':id' => $id]);

        AuditLogger::log($pdo, 'POST_DELETED', "Deleted article #{$id} ('{$title}')");

        Response::success(['message' => "Article #{$id} deleted successfully."]);
    }
}
