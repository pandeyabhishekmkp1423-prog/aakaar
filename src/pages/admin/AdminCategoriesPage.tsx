"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchApi } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export default function AdminCategoriesPage() {
  const { csrfToken } = useAdminAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form modal/drawer state
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetchApi("/v1/admin/categories");
    if (res.success && res.data) {
      setCategories(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: any) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { name, slug, description };
    const endpoint = editingCategory
      ? `/v1/admin/categories/${editingCategory.id}`
      : "/v1/admin/categories";
    const method = editingCategory ? "PUT" : "POST";

    const res = await fetchApi(endpoint, {
      method,
      body: JSON.stringify(payload),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setSaving(false);
    if (res.success) {
      setIsModalOpen(false);
      loadCategories();
    } else {
      setError(res.error?.message || "Failed to save category.");
    }
  };

  const handleDelete = async (cat: any) => {
    if (
      !window.confirm(
        `Are you sure you want to delete category "${cat.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    const res = await fetchApi(`/v1/admin/categories/${cat.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (res.success) {
      loadCategories();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">Categories</h1>
          <p className="text-sm text-secondary mt-1">
            Organize articles into thematic clusters to boost topical authority and user exploration.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-primary text-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="panel-card bg-surface overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas border-b border-line text-xs font-semibold text-secondary uppercase tracking-wider">
              <tr>
                <th className="p-4">Name & Slug</th>
                <th className="p-4">Description</th>
                <th className="p-4">Posts Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-secondary">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary-spruce" />
                    <span>Loading categories...</span>
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-mist/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-ink">{cat.name}</div>
                      <div className="text-xs text-secondary font-mono mt-0.5">
                        {cat.slug}
                      </div>
                    </td>

                    <td className="p-4 text-xs text-secondary max-w-xs">
                      {cat.description || "—"}
                    </td>

                    <td className="p-4">
                      <span className="text-xs font-bold text-primary-spruce bg-mist px-2.5 py-1 rounded-md">
                        {cat.posts_count || 0} posts
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-lg border border-line text-secondary hover:text-primary-spruce hover:bg-mist transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-1.5 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-secondary">
                    <FolderTree className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>No categories found. Create one above!</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="panel-card w-full max-w-md p-6 bg-surface shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <h3 className="text-lg font-bold font-heading text-ink">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-mist text-secondary hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCategory) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "")
                      );
                    }
                  }}
                  placeholder="e.g. Local SEO"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="local-seo"
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of what this category covers..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
