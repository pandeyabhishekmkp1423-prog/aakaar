# Aakaar Digital - Enterprise PHP 8.2 Backend & Admin API

A secure, high-performance, dependency-free PHP 8.2 REST API and management portal backend engineered for **Aakaar Digital**.

---

## Key Features & Security Architecture

1. **Zero External Dependencies**:
   - Runs on pure, native PHP 8.2+ with PDO and FileInfo.
   - Extremely fast (< 5ms response times) with zero vendor bloat.
   - Compatible with any PHP host: **Hostinger**, cPanel, Apache, Nginx, or Docker.

2. **Enterprise Security Hardening**:
   - **Password Security**: Bcrypt algorithm with cost 12 (`password_hash`).
   - **SQL Injection Prevention**: Strict PDO prepared statements everywhere with emulation disabled.
   - **Session Hardening**: HTTP-only, SameSite cookies with session ID regeneration on login (`session_regenerate_id`).
   - **CSRF Protection**: Cryptographic `X-CSRF-Token` required for all state-changing operations (`POST`, `PUT`, `PATCH`, `DELETE`).
   - **Anti-Spam & Bot Defense**: Public lead forms incorporate a hidden honeypot (`website_hp`) and submission duration analysis (`_form_ts`).
   - **IP Rate Limiting**: Built-in rate limiter against brute-force login attacks and form flooding.
   - **Upload Protection**: File uploads validate actual MIME types via `finfo_file` (not just extensions), assign cryptographically random filenames, and include `.htaccess` disabling script execution inside `storage/uploads/`.
   - **Security Headers**: HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
   - **CORS Configured**: Pre-configured for `https://aakaardigital.com`, `https://admin.aakaardigital.com`, and local development.

3. **Dual Database Engine**:
   - **SQLite** (Default): Zero-configuration file database located in `database/data/database.sqlite`.
   - **MySQL / MariaDB**: Simply change `DB_DRIVER=mysql` in `.env`.
   - **Auto-Bootstrapping**: Tables, schema migrations, and initial seed data automatically initialize on first run.

---

## Default Administrator Credentials

On first run, the database is automatically seeded with the primary administrator account:

| Field | Default Value |
|---|---|
| **Portal URL** | `https://aakaardigital.com/admin` or `https://admin.aakaardigital.com` |
| **Email** | `admin@aakaardigital.com` |
| **Password** | `AdminPassword2026!` |
| **Role** | `admin` |

> [!IMPORTANT]
> Change this password immediately after logging into the admin portal under **Settings -> Change Password**.

---

## Local Development

Start the PHP backend server:
```bash
npm run backend
# Starts PHP built-in server on http://127.0.0.1:8000 serving backend/public
```

In a separate terminal, start the React frontend:
```bash
npm run dev
# Starts Vite frontend on http://localhost:3000
```

The frontend will communicate with `http://127.0.0.1:8000` via [api-client.ts](file:///c:/Users/Abhishek%20pandey/Desktop/aakaardigital/src/lib/api-client.ts).

---

## Deployment to `admin.aakaardigital.com` (Hostinger / cPanel)

### Method A: Hostinger Subdomain Setup (Recommended)
1. In your **Hostinger hPanel**:
   - Go to **Domains** &rarr; **Subdomains**.
   - Create subdomain: `admin` for domain `aakaardigital.com`.
   - Set the document root folder to `public_html/admin/backend/public` (or create a folder `admin.aakaardigital.com` with document root pointing to `backend/public`).
2. Upload the `backend/` folder to that directory.
3. In `backend/.env`, set:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://admin.aakaardigital.com
   ADMIN_URL=https://admin.aakaardigital.com
   FRONTEND_URL=https://aakaardigital.com
   ALLOWED_ORIGINS="https://aakaardigital.com,https://www.aakaardigital.com,https://admin.aakaardigital.com"
   SESSION_SECURE=true
   SESSION_SAMESITE=None
   SESSION_DOMAIN=.aakaardigital.com
   ```
4. If using Hostinger MySQL:
   - Create a MySQL Database in hPanel.
   - Set `DB_DRIVER=mysql`, `DB_HOST=localhost`, `DB_DATABASE=...`, `DB_USERNAME=...`, `DB_PASSWORD=...`.
5. In your React frontend `.env.production` (or environment variables), set:
   ```env
   VITE_API_URL=https://admin.aakaardigital.com
   ```
   Run `npm run build` and upload `dist/` to the main site `public_html/`.

---

## API Endpoints Reference

### Public API
- `GET  /` &mdash; API status and health check
- `GET  /v1/posts` &mdash; Paginated published articles (`?page=1&per_page=9&category=...&q=...`)
- `GET  /v1/posts/{slug}` &mdash; Single article with 301 redirect detection and related articles
- `GET  /v1/categories` &mdash; Active categories with post counts
- `POST /v1/enquiries` &mdash; Lead submission form (with honeypot & time check)

### Admin API (Protected)
- `POST   /v1/admin/login` &mdash; Admin authentication, session creation & CSRF token issuance
- `POST   /v1/admin/logout` &mdash; Session destruction
- `GET    /v1/admin/me` &mdash; Current user profile & fresh CSRF token
- `POST   /v1/admin/password` &mdash; Change logged-in user password
- `GET    /v1/admin/dashboard` &mdash; KPI counts, recent leads, and activity logs
- `GET    /v1/admin/enquiries` &mdash; Inbound lead management with filters
- `GET    /v1/admin/enquiries/{id}` &mdash; Single enquiry details
- `PATCH  /v1/admin/enquiries/{id}` &mdash; Update enquiry status (`new`, `contacted`, `qualified`, `closed`, `spam`) & notes
- `DELETE /v1/admin/enquiries/{id}` &mdash; Delete enquiry
- `GET    /v1/admin/posts` &mdash; All posts (draft, scheduled, published)
- `POST   /v1/admin/posts` &mdash; Create article with categories & SEO meta
- `GET    /v1/admin/posts/{id}` &mdash; Single post details
- `PUT    /v1/admin/posts/{id}` &mdash; Update article (tracks slug changes in 301 redirect table)
- `DELETE /v1/admin/posts/{id}` &mdash; Delete article
- `GET    /v1/admin/categories` &mdash; All categories
- `POST   /v1/admin/categories` &mdash; Create category
- `PUT    /v1/admin/categories/{id}` &mdash; Update category
- `DELETE /v1/admin/categories/{id}` &mdash; Delete category
- `GET    /v1/admin/media` &mdash; Media library files
- `POST   /v1/admin/media` &mdash; Upload image or document
- `PATCH  /v1/admin/media/{id}` &mdash; Update media alt text
- `DELETE /v1/admin/media/{id}` &mdash; Delete media file (`?force=1` if attached)
- `GET    /v1/admin/users` &mdash; List users (Admin role only)
- `POST   /v1/admin/users` &mdash; Create user (Admin role only)
- `DELETE /v1/admin/users/{id}` &mdash; Delete user (Admin role only)


