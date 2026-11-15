"use client";

import { useEffect, useState } from "react";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { useAdminAuth } from "@/lib/admin-auth";
import { X, Upload, Check, Loader2, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  alt_text: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const { csrfToken } = useAdminAuth();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    setLoading(true);
    const res = await fetchApi("/v1/admin/media?per_page=40");
    if (res.success && res.data) {
      setMedia(res.data);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt_text", file.name);

    const res = await fetchApi("/v1/admin/media", {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    setUploading(false);
    if (res.success && res.data) {
      onSelect(res.data);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-picker-title"
    >
      <div className="panel-card w-full max-w-3xl max-h-[85vh] flex flex-col bg-surface shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <div>
            <h3 id="media-picker-title" className="text-xl font-bold font-heading text-ink">
              Select or Upload Media
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              Choose an image from the library or upload a new asset (JPEG, PNG, WebP, AVIF max 5MB).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-mist text-secondary hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Bar */}
        <div className="p-4 bg-canvas border-b border-line flex items-center justify-between gap-4">
          <label className="btn-secondary text-xs cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Upload New Image</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {uploading && (
            <div className="text-xs text-secondary flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-spruce" />
              <span>Uploading asset...</span>
            </div>
          )}
        </div>

        {/* Media Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
            </div>
          ) : media.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {media.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group relative border border-line rounded-xl overflow-hidden aspect-video bg-canvas hover:border-primary-spruce focus:ring-2 focus:ring-primary-spruce transition-all text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getMediaUrl(item.url)}
                    alt={item.alt_text || item.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = "0.4";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-[10px] text-white truncate px-2">
                    {item.original_name}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-secondary">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No media assets in library yet. Upload one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
