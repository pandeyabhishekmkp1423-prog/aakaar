import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  X,
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  Users,
  GraduationCap,
  MessageSquare,
  Cpu,
  ShieldCheck,
  FileText,
  Sparkles,
  Layers,
  Building2,
  Clock,
  Compass,
  CornerDownLeft,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { INDUSTRIES_DATA } from "@/lib/industries-data";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "Services" | "Case Studies" | "Industries" | "Architecture";
  href: string;
  icon: React.ReactNode;
  keywords: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. Build authoritative indexed dataset
  const searchableItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // Services
    Object.values(SERVICES_DATA).forEach((svc) => {
      let icon = <Globe className="w-4 h-4 text-lime" />;
      if (svc.slug.includes("mobile")) icon = <Smartphone className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("custom")) icon = <Code2 className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("crm")) icon = <Users className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("lms")) icon = <GraduationCap className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("whatsapp")) icon = <MessageSquare className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("integration")) icon = <Cpu className="w-4 h-4 text-lime" />;
      else if (svc.slug.includes("maintenance")) icon = <ShieldCheck className="w-4 h-4 text-lime" />;

      items.push({
        id: `svc-${svc.slug}`,
        title: svc.title,
        description: svc.shortDescription,
        category: "Services",
        href: `/services/${svc.slug}`,
        icon,
        keywords: [
          svc.slug,
          svc.tagline,
          ...svc.deliverables,
          ...svc.useCases.map((u) => u.title),
        ],
      });
    });

    // Case Studies
    Object.values(CASE_STUDIES).forEach((cs) => {
      items.push({
        id: `cs-${cs.slug}`,
        title: `${cs.title} (${cs.clientName})`,
        description: `${cs.industry} • ${cs.location} • ${cs.summary}`,
        category: "Case Studies",
        href: `/case-studies/${cs.slug}`,
        icon: <Layers className="w-4 h-4 text-lime" />,
        keywords: [
          cs.slug,
          cs.industry,
          cs.location,
          cs.architecture.frontend,
          cs.architecture.backend,
          ...cs.keyResults.map((k) => k.label),
        ],
      });
    });

    // Industries
    Object.values(INDUSTRIES_DATA).forEach((ind) => {
      items.push({
        id: `ind-${ind.slug}`,
        title: ind.name,
        description: `${ind.headline} — ${ind.heroSummary}`,
        category: "Industries",
        href: `/industries/${ind.slug}`,
        icon: <Building2 className="w-4 h-4 text-lime" />,
        keywords: [
          ind.slug,
          ind.tagline,
          ...ind.solutions.map((s) => s.title),
        ],
      });
    });

    // Core Architecture & Essential Pages
    items.push(
      {
        id: "page-scoping",
        title: "Project Scoping Engine & Calculator",
        description: "Interactive architecture selector, timeline planner, and milestone budgeting engine.",
        category: "Architecture",
        href: "/#scoping-calculator",
        icon: <Sparkles className="w-4 h-4 text-lime" />,
        keywords: ["calculator", "pricing", "cost", "quote", "timeline", "scope"],
      },
      {
        id: "page-how-we-work",
        title: "Operational Delivery Sequence (How We Work)",
        description: "Explore our disciplined four-step development and deployment sequence.",
        category: "Architecture",
        href: "/#how-we-work",
        icon: <Compass className="w-4 h-4 text-lime" />,
        keywords: ["process", "delivery", "sprints", "methodology", "agile"],
      },
      {
        id: "page-about",
        title: "About Aakaar Digital",
        description: "Learn about our engineering pedigree, 100% IP ownership, and zero agency lock-in.",
        category: "Architecture",
        href: "/about",
        icon: <FileText className="w-4 h-4 text-lime" />,
        keywords: ["company", "team", "agency", "ownership", "pedigree"],
      },
      {
        id: "page-contact",
        title: "Contact & RFP Engineering Discovery",
        description: "Schedule a confidential discovery session and receive fixed-price milestone terms.",
        category: "Architecture",
        href: "/contact",
        icon: <Clock className="w-4 h-4 text-lime" />,
        keywords: ["contact", "rfp", "quote", "consultation", "email", "phone"],
      },
      {
        id: "page-blog",
        title: "Engineering Insights & Technical Knowledge",
        description: "Deep technical articles on Next.js, API security, CRM automations, and growth.",
        category: "Architecture",
        href: "/blog",
        icon: <FileText className="w-4 h-4 text-lime" />,
        keywords: ["blog", "insights", "articles", "guides", "seo", "tutorials"],
      }
    );

    return items;
  }, []);

  // 2. Filter logic
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return searchableItems.filter((item) => {
      // Tab filter
      if (activeTab !== "All" && item.category !== activeTab) {
        return false;
      }

      if (!q) return true;

      // Match in title, description, category, or keywords
      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(q));

      return titleMatch || descMatch || catMatch || keywordMatch;
    });
  }, [searchableItems, query, activeTab]);

  // Reset index when query or tab changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery("");
      setActiveTab("All");
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex].href);
        } else if (query.trim()) {
          handleSelect(`/blog?q=${encodeURIComponent(query.trim())}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, query]);

  // Auto-scroll selected into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (href: string) => {
    onClose();
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
    } else {
      navigate(href);
    }
  };

  const tabs = ["All", "Services", "Case Studies", "Industries", "Architecture"];

  const popularKeywords = [
    "WhatsApp Automation",
    "Custom CRM",
    "Web Development",
    "Mobile Apps",
    "Logistics",
    "SLA Support",
    "Project Scoping",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Site Search"
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#0D130A] rounded-2xl shadow-2xl border border-[#DCE3D6] dark:border-[#2A3A14] overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input Field */}
        <div className="relative flex items-center p-4 sm:p-5 border-b border-line bg-canvas/60">
          <Search className="w-5 h-5 text-lime shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all services, case studies, industries & engineering docs..."
            className="w-full bg-transparent pl-3 pr-10 py-1 text-base sm:text-lg font-medium text-ink placeholder:text-secondary focus:outline-none"
            aria-autocomplete="list"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-secondary hover:text-ink cursor-pointer transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-2 text-[10px] font-mono text-secondary border border-line">
              ESC
            </kbd>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 border-b border-line overflow-x-auto no-scrollbar bg-surface/50">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-lime text-black font-bold shadow-xs"
                  : "bg-surface-2/60 text-secondary hover:text-ink hover:bg-surface-2"
              }`}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-secondary hidden sm:inline">
            {filteredResults.length} matches
          </span>
        </div>

        {/* Results Container */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 overscroll-contain"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  data-selected={isSelected}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-surface-2 border-lime/80 shadow-xs"
                      : "bg-transparent border-transparent hover:bg-surface-2/50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-[#050805] border-lime text-lime shadow-xs"
                        : "bg-surface-2 border-line text-secondary"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-lime">
                        {item.category}
                      </span>
                      <span className="text-secondary text-xs">•</span>
                      <h4 className="text-sm sm:text-base font-bold text-ink truncate group-hover:text-lime transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-secondary line-clamp-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 text-secondary group-hover:text-lime transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-2 flex items-center justify-center mx-auto text-secondary border border-line">
                <Search className="w-6 h-6 text-lime" />
              </div>
              <div>
                <h4 className="text-base font-bold text-ink">
                  No internal catalog matches for "{query}"
                </h4>
                <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto mt-1">
                  Try searching our technical blog articles directly or browse one of our suggested enterprise topics below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleSelect(`/blog?q=${encodeURIComponent(query.trim())}`)}
                className="btn-primary !min-h-[40px] !px-4 !py-1.5 !text-xs !shadow-xs"
              >
                <span>Search engineering blog for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          )}

          {/* Quick Keyword Suggestions if query is empty */}
          {!query && (
            <div className="pt-3 pb-1 border-t border-line mt-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold block mb-2 px-1">
                Frequently Explored Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setQuery(kw)}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-2 border border-line text-secondary hover:text-ink hover:border-lime/60 transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 sm:px-5 border-t border-line bg-canvas/80 text-[11px] text-secondary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-line font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-line font-mono">↓</kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-line font-mono flex items-center gap-0.5">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>
              Open
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span>Aakaar Digital Search Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
