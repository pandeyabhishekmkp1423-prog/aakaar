<?php
declare(strict_types=1);

/**
 * Public & Admin Category Management Controller
 */

class CategoryController {
    public static function index(PDO $pdo): void {
        $now = date('Y-m-d H:i:s');

        // Categories with count of live published posts
        $stmt = $pdo->prepare("
            SELECT 
                c.id, c.name, c.slug, c.description,
                COUNT(p.id) AS post_count
            FROM categories c
            LEFT JOIN post_categories pc ON pc.category_id = c.id
            LEFT JOIN posts p ON p.id = pc.post_id AND p.status = 'published' AND (p.published_at IS NULL OR p.published_at <= :now)
            GROUP BY c.id, c.name, c.slug, c.description
            ORDER BY c.name ASC
        ");
        $stmt->execute([':now' => $now]);
        $rows = $stmt->fetchAll();

        foreach ($rows as &$r) {
            $r['id'] = (int)$r['id'];
            $r['post_count'] = (int)$r['post_count'];
        }

        Response::success($rows);
    }

    public static function adminIndex(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);

        $stmt = $pdo->query("
            SELECT 
                c.id, c.name, c.slug, c.description, c.created_at,
                COUNT(pc.post_id) AS post_count
            FROM categories c
            LEFT JOIN post_categories pc ON pc.category_id = c.id
            GROUP BY c.id, c.name, c.slug, c.description, c.created_at
            ORDER BY c.name ASC
        ");
        $rows = $stmt->fetchAll();

        foreach ($rows as &$r) {
            $r['id'] = (int)$r['id'];
            $r['post_count'] = (int)$r['post_count'];
        }

        Response::success($rows);
    }

    public static function store(PDO $pdo): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('name', 'Category name is required.')
                  ->required('slug', 'Category slug is required.')
                  ->slug('slug');

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $slug = trim($input['slug']);
        $check = $pdo->prepare("SELECT id FROM categories WHERE slug = :slug LIMIT 1");
        $check->execute([':slug' => $slug]);
        if ($check->fetch()) {
            Response::error("Category slug '{$slug}' is already in use.", 'SLUG_EXISTS', 422);
        }

        $now = date('Y-m-d H:i:s');
        $stmt = $pdo->prepare("
            INSERT INTO categories (name, slug, description, created_at, updated_at)
            VALUES (:name, :slug, :description, :created_at, :updated_at)
        ");
        $stmt->execute([
            ':name' => trim($input['name']),
            ':slug' => $slug,
            ':description' => trim($input['description'] ?? ''),
            ':created_at' => $now,
            ':updated_at' => $now,
        ]);

        $id = (int)$pdo->lastInsertId();
        AuditLogger::log($pdo, 'CATEGORY_CREATED', "Created category '{$input['name']}' (#{$id})");

        Response::success([
            'id' => $id,
            'name' => $input['name'],
            'slug' => $slug,
            'description' => $input['description'] ?? '',
        ], null, 201);
    }

    public static function update(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $existing = $stmt->fetch();

        if (!$existing) {
            Response::notFound("Category #{$id} was not found.");
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? $_POST ?? [];
        $validator = new Validator($input);
        $validator->required('name', 'Category name is required.')
                  ->required('slug', 'Category slug is required.')
                  ->slug('slug');

        if ($validator->fails()) {
            Response::error($validator->getFirstErrorMessage(), 'VALIDATION_ERROR', 422, $validator->getErrors());
        }

        $newSlug = trim($input['slug']);
        if ($newSlug !== $existing['slug']) {
            $check = $pdo->prepare("SELECT id FROM categories WHERE slug = :slug AND id != :id LIMIT 1");
            $check->execute([':slug' => $newSlug, ':id' => $id]);
            if ($check->fetch()) {
                Response::error("Slug '{$newSlug}' is already in use.", 'SLUG_EXISTS', 422);
            }
        }

        $now = date('Y-m-d H:i:s');
        $updateStmt = $pdo->prepare("
            UPDATE categories
            SET name = :name, slug = :slug, description = :description, updated_at = :updated_at
            WHERE id = :id
        ");
        $updateStmt->execute([
            ':name' => trim($input['name']),
            ':slug' => $newSlug,
            ':description' => trim($input['description'] ?? ''),
            ':updated_at' => $now,
            ':id' => $id,
        ]);

        AuditLogger::log($pdo, 'CATEGORY_UPDATED', "Updated category '{$input['name']}' (#{$id})");

        Response::success([
            'id' => $id,
            'name' => $input['name'],
            'slug' => $newSlug,
            'description' => $input['description'] ?? '',
            'updated_at' => $now,
        ]);
    }

    public static function destroy(PDO $pdo, int $id): void {
        AuthMiddleware::authenticate($pdo);
        CsrfMiddleware::verify();

        $stmt = $pdo->prepare("SELECT name FROM categories WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $name = $stmt->fetchColumn();

        if (!$name) {
            Response::notFound("Category #{$id} was not found.");
        }

        $pdo->prepare("DELETE FROM post_categories WHERE category_id = :id")->execute([':id' => $id]);
        $pdo->prepare("DELETE FROM categories WHERE id = :id")->execute([':id' => $id]);

        AuditLogger::log($pdo, 'CATEGORY_DELETED', "Deleted category '{$name}' (#{$id})");

        Response::success(['message' => "Category #{$id} deleted successfully."]);
    }
}
