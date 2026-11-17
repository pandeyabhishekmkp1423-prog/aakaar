"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  Upload,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminMediaPage() {
  const { csrfToken } = useAdminAuth();
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Edit alt modal
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [altText, setAltText] = useState("");
  const [savingAlt, setSavingAlt] = useState(false);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    const res = await fetchApi("/v1/admin/media?per_page=50");
    if (res.success && res.data) {
      setMedia(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const uploadFile = async (file: File) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      setErrorMessage("Only JPEG, PNG, WebP, and AVIF images are permitted.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File exceeds 5MB size limit.");
      return;
    }

    setUploading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt_text", file.name.split(".")[0]);

    const res = await fetchApi("/v1/admin/media", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setUploading(false);
    if (res.success) {
      loadMedia();
    } else {
      setErrorMessage(res.error?.message || "Failed to upload image.");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDelete = async (item: any) => {
    if (!window.confirm(`Delete image "${item.original_name}"?`)) {
      return;
    }

    const res = await fetchApi(`/v1/admin/media/${item.id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (res.success) {
      loadMedia();
    } else if (res.error?.code === "MEDIA_IN_USE") {
      const confirmForce = window.confirm(
        "Warning: This image is currently referenced in published blog posts. Are you sure you want to force delete it?"
      );
      if (confirmForce) {
        await fetchApi(`/v1/admin/media/${item.id}?force=1`, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        });
        loadMedia();
      }
    } else {
      setErrorMessage(res.error?.message || "Failed to delete image.");
    }
  };

  const handleSaveAlt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setSavingAlt(true);
    const res = await fetchApi(`/v1/admin/media/${editingItem.id}`, {
      method: "PATCH",
      body: JSON.stringify({ alt_text: altText }),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setSavingAlt(false);
    if (res.success) {
      setEditingItem(null);
      loadMedia();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ink">Media Library</h1>
          <p className="text-sm text-secondary mt-1">
            Upload, inspect, and manage images for blog posts and service pages.
          </p>
        </div>

        <label className="btn-primary text-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`panel-card p-8 border-2 border-dashed text-center transition-colors ${
          dragActive
            ? "border-primary-spruce bg-mist/50"
            : "border-line bg-surface hover:border-primary-spruce/60"
        }`}
      >
        <div className="max-w-md mx-auto">
          <Upload className="w-8 h-8 text-primary-spruce mx-auto mb-3" />
          <p className="text-sm font-semibold text-ink mb-1">
            Drag and drop images here, or browse files
          </p>
          <p className="text-xs text-secondary">
            JPEG, PNG, WebP, or AVIF up to 5 MB. Stripped of sensitive metadata.
          </p>
          {uploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-primary-spruce">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading asset...</span>
            </div>
          )}
        </div>
      </div>

      {/* Media Grid */}
      <div className="panel-card p-6 bg-surface">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
          </div>
        ) : media.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group panel-card overflow-hidden bg-canvas border border-line flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black/5 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getMediaUrl(item.url)}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = "0.4";
                    }}
                  />
                </div>

                <div className="p-3">
                  <div className="text-xs font-bold text-ink truncate mb-0.5" title={item.original_name}>
                    {item.original_name}
                  </div>
                  <div className="text-xs text-secondary">
                    {(item.size / 1024).toFixed(0)} KB &bull; {item.width ? `${item.width}×${item.height}` : ""}
                  </div>

                  <div className="mt-2 pt-2 border-t border-line flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setAltText(item.alt_text || "");
                      }}
                      className="text-primary-spruce hover:underline text-xs font-semibold flex items-center gap-1"
                      title="Edit Alt Text"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Alt Text</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-secondary">
            <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No media files uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Edit Alt Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="panel-card w-full max-w-md p-6 bg-surface shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
              <h3 className="text-lg font-bold font-heading text-ink">Edit Image Alt Text</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg hover:bg-mist text-secondary hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAlt} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  required
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe image content for screen readers..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAlt}
                  className="btn-primary text-xs flex items-center gap-1.5"
                >
                  {savingAlt && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Alt Text</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
