import { useState, useMemo } from "react";
import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
import { HelpCircle, ChevronDown, Search, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

interface FAQItem {
  id: string;
  category: "all" | "engineering" | "growth" | "pricing" | "security";
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "ip-ownership",
    category: "engineering",
    question: "Who owns the source code, databases, and intellectual property?",
    answer:
      "You retain 100% full intellectual property and code ownership upon final milestone completion. All source Git repositories, Docker containers, database schemas, CI/CD pipelines, and cloud configurations are transferred directly to your organization. There are zero proprietary locks, per-seat licensing fees, or agency hold-backs.",
  },
  {
    id: "tech-stacks",
    category: "engineering",
    question: "What technical stacks and programming frameworks do you use?",
    answer:
      "We build with modern, production-grade technologies: React, Next.js, TypeScript, Node.js, Python, PHP/Laravel, PostgreSQL, Redis, and Tailwind CSS. Cloud deployments are hosted across AWS, Google Cloud Platform (GCP), and Microsoft Azure with automated zero-downtime CI/CD workflows.",
  },
  {
    id: "pricing-models",
    category: "pricing",
    question: "What are your pricing models and commercial billing structures?",
    answer:
      "We operate primarily on transparent, fixed-price milestone contracts. Each sprint phase has documented functional acceptance criteria and deliverables that must pass your testing before billing sign-off. For evolving or continuous development roadmaps, we also provide dedicated engineering pods on structured monthly sprints.",
  },
  {
    id: "nda-agreements",
    category: "security",
    question: "Do you sign Non-Disclosure Agreements (NDAs) before project discussions?",
    answer:
      "Yes, unconditionally. Before inspecting your existing codebases, proprietary business logic, or customer data, we execute a mutual Non-Disclosure Agreement (NDA). All client discussions and technical data are kept under strict confidentiality.",
  },
  {
    id: "marketing-tech-fusion",
    category: "growth",
    question: "How do you unite digital growth with software engineering?",
    answer:
      "Most agencies either build pretty websites that load slowly or run ad campaigns on generic templates. Aakaar Digital combines both disciplines: our software engineers build high-performance web applications with sub-second LCP speeds and clean schemas, while our performance marketers craft high-ROAS funnels and conversion tracking architectures.",
  },
  {
    id: "support-slas",
    category: "security",
    question: "What post-launch support and uptime SLAs do you offer?",
    answer:
      "Every production system we deploy includes a comprehensive warranty period. Following launch, we offer dedicated Service Level Agreements (SLAs) covering 24/7 server monitoring, security patching, sub-second error telemetry, and guaranteed emergency response windows under 4 hours.",
  },
  {
    id: "global-collaboration",
    category: "engineering",
    question: "How does cross-timezone collaboration work for international clients?",
    answer:
      "Our senior engineers and growth strategists maintain dedicated daily overlap windows across North American (EST/PST) and European (GMT/CET) business hours. We communicate directly via dedicated Slack/Teams channels, asynchronous Loom video walkthroughs, and weekly live sprint reviews.",
  },
  {
    id: "wcag-compliance",
    category: "security",
    question: "Are your websites and web applications WCAG accessibility compliant?",
    answer:
      "Yes. Every front-end interface we develop is engineered and audited against WCAG 2.2 Level AA accessibility benchmarks, including full keyboard navigation, screen reader ARIA tagging, semantic HTML hierarchies, and high-contrast color ratios.",
  },
  {
    id: "project-timelines",
    category: "pricing",
    question: "What are typical project delivery timelines?",
    answer:
      "High-velocity landing pages and marketing funnels typically ship in 1 to 2 weeks. Comprehensive custom web applications, SaaS MVPs, and CRM/ERP integrations typically range from 4 to 12 weeks, broken down into 2-week agile sprints with working software delivered at each milestone.",
  },
];

export function FaqPage() {
  useSEO({
    title: "Frequently Asked Questions (FAQ) | Aakaar Digital",
    description:
      "Get clear answers about our 100% intellectual property transfer, technical architectures, pricing transparency, and global delivery standards.",
    canonical: "/faq",
  });

  const [activeCategory, setActiveCategory] = useState<"all" | "engineering" | "growth" | "pricing" | "security">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "ip-ownership": true,
    "tech-stacks": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14] text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Transparency &amp; Operating Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-4 max-w-3xl mx-auto">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto mb-8">
            Clear, honest answers regarding our intellectual property transfer, technical architectures, pricing models, and global delivery guarantees.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. code ownership, tech stack, pricing)..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-surface border border-border text-ink text-sm sm:text-base focus:outline-none focus:border-[#B9F000] shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main FAQ Content */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "all", label: "All Questions" },
              { id: "engineering", label: "Engineering & IP" },
              { id: "growth", label: "Digital Growth & CRO" },
              { id: "pricing", label: "Pricing & Contracts" },
              { id: "security", label: "Security & SLAs" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#101407] dark:bg-[#B9F000] text-white dark:text-[#101407] shadow-sm"
                    : "bg-canvas border border-border text-secondary hover:text-ink hover:border-ink/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Questions Accordion List */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-border bg-canvas overflow-hidden transition-all duration-200 hover:border-[#AEDD00]/50"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <span className="font-heading font-bold text-base sm:text-lg text-ink">
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-[#B9F000]/20 text-[#3A4E00] dark:text-[#B9F000]" : "text-secondary"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-secondary leading-relaxed border-t border-border/50 mt-1">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-secondary space-y-3">
              <p className="text-lg font-semibold text-ink">No questions matched your search query.</p>
              <p className="text-sm">Try searching for other keywords like &quot;pricing&quot;, &quot;ownership&quot;, or &quot;Next.js&quot;.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-sm font-bold text-[#4B6300] dark:text-[#B9F000] underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Bottom Direct CTA */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/90 to-[#F1F5ED]/80 dark:from-[#151711] dark:to-[#0D100A] border border-[#DCE3D6] dark:border-[#22291C] text-center relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(185,240,0,0.15),transparent_70%)]" />
            <div className="relative z-10 space-y-4 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] text-xs font-bold border border-[#DCE3D6] dark:border-[#2A3A14]">
                <Sparkles className="w-3.5 h-3.5" />
                Have an architecture or scope question?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink">
                Speak directly with our senior engineering directors.
              </h3>
              <p className="text-sm sm:text-base text-secondary">
                We review technical specifications, evaluate API integrations, and provide fixed milestone estimates within 24 hours.
              </p>
              <div className="pt-2">
                <Button variant="primary" size="md" href="/contact" arrow="right">
                  Start a Project Conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FaqPage;
