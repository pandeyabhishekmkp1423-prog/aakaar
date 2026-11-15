/**
 * Aakaar Digital API Client
 * Connects React frontend to the backend
 */

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    // 1. If browsing directly on the admin subdomain (admin.aakaardigital.com):
    if (host.startsWith("admin.") || (host === "localhost" && window.location.port === "8000")) {
      return "";
    }
    // 2. If browsing on aakaardigital.com:
    // Route to /admin which is hosted on the SAME domain using the active SSL certificate
    if (host.includes("aakaardigital.com")) {
      return "/admin";
    }
  }
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return "";
};

export function getMediaUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Data URLs or external third-party images (Unsplash, Cloudinary, etc.)
  if (
    trimmed.startsWith("data:") ||
    (trimmed.startsWith("http") &&
      !trimmed.includes("aakaardigital.com") &&
      !trimmed.includes("localhost"))
  ) {
    return trimmed;
  }

  // Extract filename from /uploads/xxx.ext or raw filename
  const match = trimmed.match(/\/uploads\/([^/?#]+)/);
  const filename = match
    ? match[1]
    : !trimmed.includes("/") && /\.(jpg|jpeg|png|webp|avif|svg|gif)$/i.test(trimmed)
    ? trimmed
    : null;

  if (filename) {
    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      if (host.startsWith("admin.")) {
        return `/uploads/${filename}`;
      }
      return `/admin/uploads/${filename}`;
    }
    return `/admin/uploads/${filename}`;
  }

  return trimmed;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    per_page?: number;
    total_pages?: number;
  };
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
  redirect?: boolean;
  target_slug?: string;
  status?: number;
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers as Record<string, string>),
      },
      // Keep credentials included for admin session cookies
      credentials: options.credentials || "include",
    });

    // Handle 301 Redirect for blog slugs
    if (res.status === 301) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        redirect: true,
        target_slug: data.target_slug,
        status: 301,
      };
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error.message || "Failed to communicate with API server.",
        fields: {},
      },
    };
  }
}


