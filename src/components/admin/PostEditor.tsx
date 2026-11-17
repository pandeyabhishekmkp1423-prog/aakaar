import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import { TipTapEditor, TipTapEditorRef } from "./TipTapEditor";
import { MediaPickerModal } from "./MediaPickerModal";
import {
  Save,
  Send,
  Clock,
  Trash2,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Search,
  ExternalLink,
} from "lucide-react";

interface PostEditorProps {
  postId?: number;
}

export function PostEditor({ postId }: PostEditorProps) {
  const { csrfToken } = useAdminAuth();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [coverImage, setCoverImage] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "scheduled" | "published">("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Metadata & categories list
  const [availableCategories, setAvailableCategories] = useState<any[]>([]);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"cover" | "content">("cover");
  const tipTapRef = useRef<TipTapEditorRef>(null);

  // Status flags
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-generate slug from title if not manually customized
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setHasUnsavedChanges(true);
    if (!slugManual && !postId) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generated);
    }
  };

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Load existing post and categories
  useEffect(() => {
    const initData = async () => {
      const catsRes = await fetchApi("/v1/admin/categories");
      if (catsRes.success && catsRes.data) {
        setAvailableCategories(catsRes.data);
      }

      if (postId) {
        const postRes = await fetchApi(`/v1/admin/posts/${postId}`);
        if (postRes.success && postRes.data) {
          const p = postRes.data;
          setTitle(p.title);
          setSlug(p.slug);
          setSlugManual(true);
          setExcerpt(p.excerpt || "");
          setContent(p.content || "<p></p>");
          setCoverImage(p.cover_image || "");
          setCoverAlt(p.cover_alt || "");
          setMetaTitle(p.meta_title || "");
          setMetaDescription(p.meta_description || "");
          setStatus(p.status);
          if (p.published_at && p.status === "scheduled") {
            setScheduledAt(p.published_at.replace(" ", "T").slice(0, 16));
          }
          if (p.categories) {
            setSelectedCategories(p.categories.map((c: any) => c.id));
          }
        }
        setLoading(false);
      }
    };

    initData();
  }, [postId]);

  // Save handler
  const savePost = async (targetStatus?: "draft" | "scheduled" | "published") => {
    setSaving(true);
    setErrorMessage(null);

    const activeStatus = targetStatus || status;

    const payload: any = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      cover_alt: coverAlt,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status: activeStatus,
      category_ids: selectedCategories,
    };

    if (activeStatus === "scheduled" && scheduledAt) {
      payload.published_at = scheduledAt.replace("T", " ") + ":00";
    }

    const endpoint = postId ? `/v1/admin/posts/${postId}` : "/v1/admin/posts";
    const method = postId ? "PUT" : "POST";

    const res = await fetchApi(endpoint, {
      method,
      body: JSON.stringify(payload),
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setSaving(false);

    if (res.success && res.data) {
      setHasUnsavedChanges(false);
      setStatus(activeStatus);
      setSaveMessage(`Article saved as ${activeStatus}.`);
      setTimeout(() => setSaveMessage(null), 3000);

      if (!postId) {
        navigate(`/admin/posts/${res.data.id}`);
      }
    } else {
      setErrorMessage(res.error?.message || "Failed to save post.");
    }
  };

  // Delete post
  const deletePost = async () => {
    if (!postId || !window.confirm("Are you sure you want to delete this article?")) {
      return;
    }

    setSaving(true);
    const res = await fetchApi(`/v1/admin/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    if (res.success) {
      navigate("/admin/posts");
    } else {
      setErrorMessage(res.error?.message || "Failed to delete post.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
      </div>
    );
  }

  const serpTitle = metaTitle || title || "Article Title Preview";
  const serpDescription =
    metaDescription ||
    excerpt ||
    "Preview description of the article as it will appear in Canadian Google search results...";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-surface rounded-xl border border-line shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/posts")}
            className="p-2 rounded-lg hover:bg-mist text-secondary hover:text-ink transition-colors"
            title="Back to Posts"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold font-heading text-ink truncate max-w-sm sm:max-w-md">
              {title || "Untitled Article"}
            </h1>
            <span className="text-xs text-secondary capitalize flex items-center gap-1.5">
              <span>Status: {status}</span>
              {hasUnsavedChanges && <span className="text-maple font-bold">&bull; Unsaved</span>}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {saveMessage && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mr-2">
              <Check className="w-4 h-4" />
              <span>{saveMessage}</span>
            </span>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => savePost("draft")}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => savePost("published")}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Publish Now</span>
          </button>

          {slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex items-center gap-1.5 hover:text-primary-spruce"
              title="View live article in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live</span>
            </a>
          )}

          {postId && (
            <button
              type="button"
              disabled={saving}
              onClick={deletePost}
              className="p-2 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 transition-colors"
              title="Delete Article"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Content, Title, Excerpt */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Local SEO Guide for Canadian Small Businesses"
              className="w-full px-4 py-3 text-lg font-bold rounded-xl border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              URL Slug (Editable)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary font-mono">/blog/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManual(true);
                  setHasUnsavedChanges(true);
                }}
                className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Summary / Excerpt
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
                setHasUnsavedChanges(true);
              }}
              placeholder="A brief 1-2 sentence overview of the article shown on cards and RSS feed..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
            />
          </div>

          {/* TipTap Rich Text Editor */}
          <div>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
              Article Content (Rich Text) *
            </label>
            <TipTapEditor
              ref={tipTapRef}
              content={content}
              onChange={(html) => {
                setContent(html);
                setHasUnsavedChanges(true);
              }}
              onOpenMediaPicker={() => {
                setMediaTarget("content");
                setMediaPickerOpen(true);
              }}
            />
          </div>

          {/* SEO Metadata & SERP Preview */}
          <div className="panel-card p-6 bg-surface space-y-6">
            <h3 className="text-base font-bold font-heading text-ink flex items-center gap-2">
              <Search className="w-4 h-4 text-primary-spruce" />
              <span>Search Engine Optimization (SEO) & Meta Data</span>
            </h3>

            {/* Google SERP Preview */}
            <div className="p-4 rounded-xl bg-canvas border border-line space-y-1">
              <div className="text-xs text-secondary flex items-center gap-1">
                <span>aakaardigital.com</span>
                <span>›</span>
                <span>blog</span>
                <span>›</span>
                <span className="truncate">{slug || "slug"}</span>
              </div>
              <div className="text-base font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate">
                {serpTitle.slice(0, 60)}
              </div>
              <div className="text-xs text-secondary line-clamp-2 leading-relaxed">
                {serpDescription.slice(0, 160)}
              </div>
            </div>

            {/* Meta Title with Counter */}
            <div>
              <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                <span className="font-semibold uppercase tracking-wider">Meta Title</span>
                <span className={metaTitle.length > 60 ? "text-maple font-bold" : ""}>
                  {metaTitle.length}/60 characters
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => {
                  setMetaTitle(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                placeholder="Custom title tag for search engines..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
              />
            </div>

            {/* Meta Description with Counter */}
            <div>
              <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                <span className="font-semibold uppercase tracking-wider">Meta Description</span>
                <span className={metaDescription.length > 160 ? "text-maple font-bold" : ""}>
                  {metaDescription.length}/160 characters
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => {
                  setMetaDescription(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                placeholder="Concise, compelling description under 160 characters..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-line bg-surface text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Cover Image, Categories, Scheduling */}
        <div className="lg:col-span-4 space-y-6">
          {/* Scheduling / Publishing Panel */}
          <div className="panel-card p-6 bg-surface space-y-4">
            <h3 className="text-sm font-bold font-heading text-ink flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-spruce" />
              <span>Publishing Schedule</span>
            </h3>

            <div>
              <label className="text-xs text-secondary block mb-1.5">Schedule for later date/time:</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => {
                  setScheduledAt(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce"
              />
            </div>

            {scheduledAt && (
              <button
                type="button"
                onClick={() => savePost("scheduled")}
                className="btn-secondary w-full text-xs text-center"
              >
                Schedule Publication
              </button>
            )}
          </div>

          {/* Cover Image Panel */}
          <div className="panel-card p-6 bg-surface space-y-4">
            <h3 className="text-sm font-bold font-heading text-ink flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary-spruce" />
              <span>Cover Image</span>
            </h3>

            {coverImage ? (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-line bg-canvas">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getMediaUrl(coverImage)}
                    alt={coverAlt || "Cover"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = "0.4";
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={coverAlt}
                  onChange={(e) => {
                    setCoverAlt(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  placeholder="Image alt text (accessibility)..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-line bg-canvas text-ink"
                />
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaTarget("cover");
                      setMediaPickerOpen(true);
                    }}
                    className="font-semibold text-primary-spruce hover:underline"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage("");
                      setCoverAlt("");
                      setHasUnsavedChanges(true);
                    }}
                    className="text-maple hover:underline"
                  >
                    Remove Cover Image
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMediaTarget("cover");
                  setMediaPickerOpen(true);
                }}
                className="w-full py-8 border-2 border-dashed border-line hover:border-primary-spruce rounded-xl flex flex-col items-center justify-center text-secondary hover:text-ink transition-colors"
              >
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-xs font-semibold">Select from Media Library</span>
              </button>
            )}
          </div>

          {/* Categories Panel */}
          <div className="panel-card p-6 bg-surface space-y-4">
            <h3 className="text-sm font-bold font-heading text-ink">
              Article Categories
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCategories.map((c: any) => {
                const checked = selectedCategories.includes(c.id);
                return (
                  <label
                    key={c.id}
                    className="flex items-center gap-2.5 text-xs text-ink cursor-pointer hover:bg-mist p-1.5 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setHasUnsavedChanges(true);
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, c.id]);
                        } else {
                          setSelectedCategories(selectedCategories.filter((id) => id !== c.id));
                        }
                      }}
                      className="w-4 h-4 rounded border-line text-primary-spruce focus:ring-primary-spruce"
                    />
                    <span>{c.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 bg-surface rounded-xl border border-line shadow-xs">
        <div className="text-xs text-secondary">
          {hasUnsavedChanges ? (
            <span className="text-maple font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-maple animate-pulse" />
              You have unsaved changes
            </span>
          ) : (
            <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              All changes saved
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {saveMessage && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mr-2">
              <Check className="w-4 h-4" />
              <span>{saveMessage}</span>
            </span>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => savePost("draft")}
            className="btn-secondary text-xs flex items-center gap-1.5 min-h-[38px] px-3.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => savePost("published")}
            className="btn-primary text-xs flex items-center gap-1.5 min-h-[38px] px-3.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Publish Now</span>
          </button>

          {slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs flex items-center gap-1.5 hover:text-primary-spruce min-h-[38px] px-3 cursor-pointer"
              title="View live article in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(item) => {
          const resolvedUrl = getMediaUrl(item.url);
          if (mediaTarget === "cover") {
            setCoverImage(item.url);
            setCoverAlt(item.alt_text || item.original_name);
            setHasUnsavedChanges(true);
          } else {
            // Insert image into TipTap article content
            tipTapRef.current?.insertImage(resolvedUrl, item.alt_text || item.original_name);
            setHasUnsavedChanges(true);
          }
        }}
      />
    </div>
  );
}

