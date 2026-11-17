import { useEffect, useState, useCallback } from "react";
import Link from "@/components/common/Link";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  Search,
  Plus,
  Loader2,
  FileText,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminPostsPage() {
  const { csrfToken } = useAdminAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({ total: 0, page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    const query = new URLSearchParams();
    query.set("page", page.toString());
    query.set("per_page", "15");
    if (search) query.set("q", search);
    if (statusFilter) query.set("status", statusFilter);

    const res = await fetchApi(`/v1/admin/posts?${query.toString()}`);
    if (res.success && res.data) {
      setPosts(res.data);
      if (res.meta) setMeta(res.meta);
    }
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete post "${title}"?`)) {
      return;
    }

    const res = await fetchApi(`/v1/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (res.success) {
      loadPosts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-ink">Blog Articles</h1>
          <p className="text-xs sm:text-sm text-secondary mt-1">
            Write, schedule, edit, and publish technical guides and commercial articles.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto min-h-[40px] px-3.5"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="panel-card p-3 sm:p-4 bg-surface flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts by title or slug..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
          />
          <Search className="w-4 h-4 text-secondary absolute left-3 top-3" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2.5 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce w-full sm:w-auto min-w-[140px]"
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      {/* Table */}
      <div className="panel-card bg-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="bg-canvas border-b border-line text-xs font-semibold text-secondary uppercase tracking-wider">
              <tr>
                <th className="p-3.5 sm:p-4">Title & Slug</th>
                <th className="p-3.5 sm:p-4">Categories</th>
                <th className="p-3.5 sm:p-4">Status</th>
                <th className="p-3.5 sm:p-4">Date</th>
                <th className="p-3.5 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary-spruce" />
                    <span>Loading articles...</span>
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-mist/30 transition-colors">
                    <td className="p-3.5 sm:p-4 max-w-md">
                      <div className="flex items-center gap-3">
                        {post.cover_image && (
                          <div className="w-12 h-8 rounded-md overflow-hidden bg-canvas border border-line shrink-0">
                            <img
                              src={getMediaUrl(post.cover_image)}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-bold text-ink leading-snug truncate">
                            <Link
                              href={`/admin/posts/${post.id}`}
                              className="hover:text-primary-spruce hover:underline"
                            >
                              {post.title}
                            </Link>
                          </div>
                          <div className="text-xs text-secondary mt-1 font-mono truncate">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 sm:p-4">
                      <div className="flex flex-wrap gap-1">
                        {post.categories?.map((c: any) => (
                          <span
                            key={c.id}
                            className="text-xs font-medium bg-mist text-primary-spruce px-2 py-0.5 rounded"
                          >
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5 sm:p-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-flex items-center gap-1 ${
                          post.status === "published"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : post.status === "scheduled"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        {post.status === "published" && <CheckCircle className="w-3 h-3" />}
                        {post.status === "scheduled" && <Clock className="w-3 h-3" />}
                        <span>{post.status}</span>
                      </span>
                    </td>

                    <td className="p-3.5 sm:p-4 text-xs text-secondary whitespace-nowrap">
                      {post.published_at ? (
                        <span>{new Date(post.published_at).toLocaleDateString("en-CA")}</span>
                      ) : (
                        <span className="italic">Draft</span>
                      )}
                    </td>

                    <td className="p-3.5 sm:p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
                            title="View Public Post"
                            aria-label="View Public Post"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-2 rounded-lg border border-line text-secondary hover:text-primary-spruce hover:bg-mist transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center"
                          title="Edit Post"
                          aria-label="Edit Post"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-2 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center cursor-pointer"
                          title="Delete Post"
                          aria-label="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-secondary">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>No blog articles found.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {meta.total_pages > 1 && (
          <div className="p-3.5 sm:p-4 bg-canvas border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
            <span>
              Total {meta.total} articles &bull; Page {meta.page} of {meta.total_pages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg border border-line bg-surface text-ink hover:bg-mist disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= meta.total_pages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg border border-line bg-surface text-ink hover:bg-mist disabled:opacity-40 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
