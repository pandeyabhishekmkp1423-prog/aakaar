import { useEffect, useState } from "react";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
  isMobile?: boolean;
}

export function TableOfContents({ contentHtml, isMobile = false }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Parse headings from the rendered HTML in DOM or content
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const elements = doc.querySelectorAll("h1, h2, h3, h4");
    const items: TocItem[] = [];

    elements.forEach((el, index) => {
      const text = el.textContent?.trim() || "";
      if (!text) return;
      const id = el.id || `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`;
      const tagLevel = parseInt(el.tagName.replace("H", ""), 10) || 2;
      items.push({
        id,
        text,
        level: tagLevel,
      });
    });

    setHeadings(items);
  }, [contentHtml]);

  useEffect(() => {
    if (headings.length === 0 || isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -65% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, isMobile]);

  if (headings.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="panel-card bg-canvas/60 border border-line rounded-xl overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink cursor-pointer hover:bg-mist transition-colors min-h-[44px]"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
            <span>Table of Contents ({headings.length})</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-secondary transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {mobileOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-line/60 bg-surface">
            <ul className="space-y-2 text-xs">
              {headings.map((item) => (
                <li
                  key={item.id}
                  className={item.level === 3 ? "pl-3 text-xs" : "font-medium"}
                >
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      setMobileOpen(false);
                    }}
                    className="block text-left w-full text-secondary hover:text-[#4B6300] dark:hover:text-[#B9F000] py-1 leading-snug cursor-pointer"
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <nav
      className="panel-card p-6 sticky top-28"
      aria-label="Table of contents"
    >
      <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
        <List className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
        <span>On This Page</span>
      </h3>
      <ul className="space-y-2.5 text-sm">
        {headings.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "pl-4 text-xs" : ""}
          >
            <button
              type="button"
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-left w-full transition-colors leading-snug cursor-pointer ${
                activeId === item.id
                  ? "text-[#4B6300] dark:text-[#B9F000] font-semibold underline"
                  : "text-secondary hover:text-ink"
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
