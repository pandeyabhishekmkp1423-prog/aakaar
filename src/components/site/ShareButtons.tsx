"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center text-xs font-bold"
      >
        in
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center text-xs font-bold"
      >
        𝕏
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        aria-label="Copy link to clipboard"
        className="p-2 rounded-lg border border-line text-secondary hover:text-ink hover:bg-mist transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center text-xs font-bold gap-1"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
            <span className="text-[#4B6300] dark:text-[#B9F000]">Copied</span>
          </>
        ) : (
          <Link2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
