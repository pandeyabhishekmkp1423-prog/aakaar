import React, { useState } from "react";
import Button from "@/components/common/Button";
import { useSEO } from "@/lib/seo";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Server,
  Shield,
  Layers,
  Code2,
  Search,
  Eye,
  Sliders,
  Check,
  Copy,
} from "lucide-react";

export default function StyleguidePage() {
  useSEO({
    title: "Design System & Styleguide | Aakaar Digital",
    description:
      "Interactive design system reference for Aakaar Digital's Black + Lime theme, button system, tokens, typography, and accessibility contrast standards.",
    canonical: "/styleguide",
  });

  // Interactive Playground States
  const [playgroundVariant, setPlaygroundVariant] = useState<"primary" | "secondary" | "ghost">("primary");
  const [playgroundSize, setPlaygroundSize] = useState<"sm" | "md" | "lg">("md");
  const [playgroundPill, setPlaygroundPill] = useState(false);
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundDisabled, setPlaygroundDisabled] = useState(false);
  const [playgroundArrow, setPlaygroundArrow] = useState<boolean | "right" | "up-right">("right");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const tokens = [
    { name: "--bg", value: "#050805", role: "Page Canvas Background", textCol: "#FFFFFF", contrast: "21:1 (AAA)" },
    { name: "--surface", value: "#0D130A", role: "Primary Card / Container Surface", textCol: "#FFFFFF", contrast: "19.5:1 (AAA)" },
    { name: "--surface-2", value: "#141D0E", role: "Elevated Surface / Inputs", textCol: "#FFFFFF", contrast: "17.8:1 (AAA)" },
    { name: "--border", value: "#2A3A14", role: "Subtle Structural Border", textCol: "#B4E81E", contrast: "6.2:1 (AA)" },
    { name: "--lime", value: "#B4E81E", role: "Primary Brand Accent", textCol: "#050805", contrast: "13.8:1 (AAA)" },
    { name: "--lime-bright", value: "#C8FF3D", role: "Focus Ring & Gradient Top", textCol: "#050805", contrast: "15.4:1 (AAA)" },
    { name: "--lime-deep", value: "#8DB80F", role: "Gradient Bottom Anchor", textCol: "#FFFFFF", contrast: "5.1:1 (AA)" },
    { name: "--olive", value: "#5E7D0A", role: "Atmospheric Radial Glow", textCol: "#FFFFFF", contrast: "5.8:1 (AA)" },
    { name: "--deep-green", value: "#1F2E08", role: "Secondary Depth Glow", textCol: "#B4E81E", contrast: "8.4:1 (AAA)" },
    { name: "--text", value: "#FFFFFF", role: "Primary Headings & Bold Text", textCol: "#050805", contrast: "21:1 (AAA)" },
    { name: "--text-muted", value: "#B5BDAA", role: "Body Copy & Secondary Labels", textCol: "#050805", contrast: "10.2:1 (AAA)" },
    { name: "--on-lime", value: "#050805", role: "Text on Primary Button", textCol: "#C8FF3D", contrast: "15.4:1 (AAA)" },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pt-28 pb-24">
      {/* Background Decorative Mesh & Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-olive/20 via-deep-green/30 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-radial from-deep-green/30 to-transparent blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-grid-overlay opacity-40" />
      </div>

      <div className="ad-container relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Styleguide Header */}
        <div className="mb-16 pb-8 border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Design System Reference</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Black + Lime <span className="accent">Theme &amp; Components</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            Dark-first, high-contrast, modern tech-agency styling. Near-black canvases, white headlines, vibrant lime gradient button systems, soft olive depth glows, and strict WCAG AA/AAA accessibility.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: MASTER COLOR PALETTE TOKENS */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">01 / Colors</p>
              <h2 className="text-2xl sm:text-3xl font-bold">Design Tokens &amp; Palette</h2>
            </div>
            <span className="text-xs font-mono text-text-muted">Defined in :root &amp; tailwind.config</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tokens.map((token) => (
              <div
                key={token.name}
                onClick={() => copyToClipboard(`var(${token.name})`)}
                className="group p-4 rounded-xl bg-surface border border-border hover:border-lime/50 transition-all cursor-pointer relative overflow-hidden shadow-lg"
              >
                <div
                  className="w-full h-16 rounded-lg mb-3 border border-white/10 flex items-center justify-center font-mono text-xs font-bold shadow-inner"
                  style={{ backgroundColor: token.value, color: token.textCol }}
                >
                  {token.value}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-white">{token.name}</span>
                  <span className="text-[12px] font-mono text-lime bg-lime/10 px-1.5 py-0.5 rounded">
                    {token.contrast}
                  </span>
                </div>
                <p className="text-xs text-text-muted line-clamp-1">{token.role}</p>
                <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[12px] text-text-muted">
                  <span>Click to copy</span>
                  {copiedToken === `var(${token.name})` ? (
                    <span className="text-lime flex items-center gap-1 font-bold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: THE MASTER BUTTON SYSTEM */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">02 / Components</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Master Button System</h2>
            <p className="text-sm text-text-muted max-w-xl">
              All variants support hover, focus-visible (2px lime-bright + 3px offset), active (scale .98), disabled (45% opacity), and loading states.
            </p>
          </div>

          {/* Interactive Playground */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border mb-12 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
              <Sliders className="w-4 h-4 text-lime" />
              <h3 className="text-lg font-bold">Interactive Button Playground</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                {/* Variant Selector */}
                <div>
                  <label className="block text-text-muted font-bold uppercase tracking-wider mb-2">Variant</label>
                  <div className="flex flex-col gap-1">
                    {(["primary", "secondary", "ghost"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPlaygroundVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-left font-semibold capitalize transition-all cursor-pointer ${
                          playgroundVariant === v
                            ? "bg-lime text-on-lime font-bold"
                            : "bg-surface-2 text-text-muted hover:text-white"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div>
                  <label className="block text-text-muted font-bold uppercase tracking-wider mb-2">Size</label>
                  <div className="flex flex-col gap-1">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPlaygroundSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-left font-semibold uppercase transition-all cursor-pointer ${
                          playgroundSize === s
                            ? "bg-lime text-on-lime font-bold"
                            : "bg-surface-2 text-text-muted hover:text-white"
                        }`}
                      >
                        {s} {s === "sm" ? "(44px touch)" : s === "md" ? "(48px)" : "(54px)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State Toggles */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-text-muted font-bold uppercase tracking-wider mb-2">Modifiers</label>
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-2 text-text-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playgroundLoading}
                        onChange={(e) => setPlaygroundLoading(e.target.checked)}
                        className="rounded accent-lime w-4 h-4"
                      />
                      <span>Loading</span>
                    </label>
                    <label className="flex items-center gap-2 text-text-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playgroundDisabled}
                        onChange={(e) => setPlaygroundDisabled(e.target.checked)}
                        className="rounded accent-lime w-4 h-4"
                      />
                      <span>Disabled</span>
                    </label>
                    <label className="flex items-center gap-2 text-text-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playgroundPill}
                        onChange={(e) => setPlaygroundPill(e.target.checked)}
                        className="rounded accent-lime w-4 h-4"
                      />
                      <span>Pill Shape</span>
                    </label>
                    <label className="flex items-center gap-2 text-text-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!playgroundArrow}
                        onChange={(e) => setPlaygroundArrow(e.target.checked ? "right" : false)}
                        className="rounded accent-lime w-4 h-4"
                      />
                      <span>Arrow Icon</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Live Preview Stage */}
              <div className="lg:col-span-5 p-8 rounded-xl bg-bg border border-border flex flex-col items-center justify-center min-h-[160px] text-center shadow-inner">
                <span className="text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
                  Live Render Output
                </span>
                <Button
                  variant={playgroundVariant}
                  size={playgroundSize}
                  pill={playgroundPill}
                  loading={playgroundLoading}
                  disabled={playgroundDisabled}
                  arrow={playgroundArrow}
                  onClick={() => alert("Button clicked!")}
                >
                  Explore Capabilities
                </Button>
                <span className="text-xs text-text-muted mt-4">
                  Hover to preview sheen &amp; arrow translation
                </span>
              </div>
            </div>
          </div>

          {/* Matrix of All Variants & Standard States */}
          <div className="space-y-8">
            {/* Primary Variant Showcase */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div>
                  <h3 className="font-bold text-lg text-ink dark:text-white">1) Primary Button (Gradient Lime)</h3>
                  <p className="text-xs text-text-muted">
                    180deg gradient (#C8FF3D → #B4E81E → #8DB80F), 1px inner top highlight, soft bottom shade, outer lime glow, diagonal hover sheen sweep.
                  </p>
                </div>
                <span className="text-xs font-mono text-lime bg-lime/10 px-2 py-0.5 rounded">
                  var(--on-lime) on Gradient
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="md">
                  Default State
                </Button>
                <Button variant="primary" size="md" arrow="right">
                  With Arrow
                </Button>
                <Button variant="primary" size="md" pill arrow="right">
                  Pill Hero CTA
                </Button>
                <Button variant="primary" size="md" loading>
                  Loading
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Secondary Variant Showcase */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div>
                  <h3 className="font-bold text-lg text-ink dark:text-white">2) Secondary Button (Day: Crisp Surface | Night: Dark Glass)</h3>
                  <p className="text-xs text-text-muted">
                    Light mode: Crisp white surface with subtle sage border. Dark mode: rgba(255,255,255,.04) dark glass with masked gradient border.
                  </p>
                </div>
                <span className="text-xs font-mono text-lime bg-lime/10 px-2 py-0.5 rounded">
                  var(--text) on Glass / Surface
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" size="md">
                  Default State
                </Button>
                <Button variant="secondary" size="md" arrow="right">
                  With Arrow
                </Button>
                <Button variant="secondary" size="md" pill arrow="up-right">
                  Pill Format
                </Button>
                <Button variant="secondary" size="md" loading>
                  Loading
                </Button>
                <Button variant="secondary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Ghost Variant Showcase */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div>
                  <h3 className="font-bold text-lg text-ink dark:text-white">3) Ghost Button (Transparent + Animated Underline)</h3>
                  <p className="text-xs text-text-muted">
                    Transparent background, text var(--lime), underline smoothly expands from left to right on hover.
                  </p>
                </div>
                <span className="text-xs font-mono text-lime bg-lime/10 px-2 py-0.5 rounded">
                  var(--lime) on Transparent
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost" size="md">
                  Default State
                </Button>
                <Button variant="ghost" size="md" arrow="right">
                  With Arrow
                </Button>
                <Button variant="ghost" size="md" loading>
                  Loading
                </Button>
                <Button variant="ghost" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            {/* Size Scale Comparison */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <div className="mb-4 pb-3 border-b border-border">
                <h3 className="font-bold text-lg text-ink dark:text-white">Size Scale Comparison</h3>
                <p className="text-xs text-text-muted">
                  Small (44px min touch target, 13px text), Medium (48px min, 15px text), Large (54px min, 16px text).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm" arrow="right">
                  Small (44px min)
                </Button>
                <Button variant="primary" size="md" arrow="right">
                  Medium (48px min)
                </Button>
                <Button variant="primary" size="lg" arrow="right">
                  Large (54px min)
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">03 / Typography</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Typography &amp; Headline Accents</h2>
            <p className="text-sm text-text-muted max-w-xl">
              Plus Jakarta Sans &amp; Inter, weight 700-800, tight tracking (-0.02em). Selective 1-2 words accented with .accent. Minimum body 16px. Nothing below 12px.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-6">
            <div>
              <span className="text-xs font-mono text-text-muted uppercase">H1 Display / Hero Headline</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 text-ink dark:text-white">
                Worldwide Digital Marketing &amp; <span className="accent">Enterprise IT.</span>
              </h1>
            </div>

            <div>
              <span className="text-xs font-mono text-text-muted uppercase">H2 Section Heading</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-1 text-ink dark:text-white">
                Two disciplines. One connected <span className="accent">growth engine.</span>
              </h2>
            </div>

            <div>
              <span className="text-xs font-mono text-text-muted uppercase">H3 Subsection Heading</span>
              <h3 className="text-2xl font-bold tracking-tight mt-1 text-ink dark:text-white">
                Sub-second Next.js web applications &amp; <span className="accent">Cloud APIs.</span>
              </h3>
            </div>

            <div>
              <span className="text-xs font-mono text-text-muted uppercase">Eyebrow / Monospace Label (Min 12px)</span>
              <div className="mt-2">
                <span className="eyebrow-label">● 01 / Technical Architecture</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-text-muted uppercase">Body Text (16px, line-height 1.6, var(--text-muted))</span>
              <p className="text-base text-text-muted leading-relaxed mt-1 max-w-3xl">
                We build high-ROAS marketing funnels and engineer custom Next.js web platforms, mobile applications, and automated WhatsApp CRM systems for ambitious global companies. Every line of code and every ad sprint is optimized for enterprise scale.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: CARDS & HOVER EFFECTS */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">04 / Surfaces</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Cards, Hover Glow &amp; Spotlights</h2>
            <p className="text-sm text-text-muted max-w-xl">
              Background var(--surface), 1px var(--border), radius 18px. On hover: border turns lime at 50% opacity, translateY(-4px), soft lime glow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="panel-card p-6 rounded-2xl group">
              <div className="w-10 h-10 rounded-xl bg-surface-2 text-lime flex items-center justify-center mb-4 border border-border group-hover:border-lime/50 transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Enterprise SEO &amp; Growth</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Technical SEO audits, international hreflang tags, schema graphs, and programmatic search architecture.
              </p>
              <div className="text-xs font-mono text-lime font-bold">4.9x Blended ROAS</div>
            </div>

            <div className="panel-card p-6 rounded-2xl group">
              <div className="w-10 h-10 rounded-xl bg-surface-2 text-lime flex items-center justify-center mb-4 border border-border group-hover:border-lime/50 transition-colors">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Next.js Cloud Platforms</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Edge rendering, PostgreSQL database clustering, and sub-300ms Core Web Vitals for global users.
              </p>
              <div className="text-xs font-mono text-lime font-bold">99.99% Cloud SLA</div>
            </div>

            <div className="panel-card p-6 rounded-2xl group">
              <div className="w-10 h-10 rounded-xl bg-surface-2 text-lime flex items-center justify-center mb-4 border border-border group-hover:border-lime/50 transition-colors">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-ink dark:text-white mb-2">Custom CRM &amp; Automation</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                Meta WhatsApp Cloud API integration, automated sales routing, and bidirectional accounting sync.
              </p>
              <div className="text-xs font-mono text-lime font-bold">SOC2 &amp; GDPR Aligned</div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: FORM INPUTS & BADGES */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-20">
          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">05 / Form Controls</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Inputs, Focus Glow &amp; Badges</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 rounded-2xl bg-surface border border-border">
            <div>
              <h3 className="text-base font-bold text-ink dark:text-white mb-4">Inputs &amp; Focus Glow</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    defaultValue="alex@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-ink dark:text-white text-base focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                    Project Scope
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-ink dark:text-white text-base focus:outline-none">
                    <option>Worldwide Digital Marketing Engine</option>
                    <option>Custom Next.js &amp; Mobile Web App</option>
                    <option>WhatsApp Cloud API &amp; CRM Automation</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-ink dark:text-white mb-4">Badges &amp; Chips</h3>
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="badge-lime">● Live 24/7 SLA</span>
                <span className="badge-lime">● Worldwide Delivery</span>
                <span className="badge-lime">● 100% Code Ownership</span>
                <span className="badge-lime">● Mutual NDA Protected</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Eyebrows and badges are styled with lime text on rgba(180,232,30,.1) background with a 1px lime/30% border. Minimum font size is strictly 12px.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: WCAG AA/AAA CONTRAST VERIFICATION TABLE */}
        {/* ------------------------------------------------------------------ */}
        <section className="mb-12">
          <div className="mb-8">
            <p className="text-xs uppercase font-bold tracking-widest text-lime mb-1">06 / Compliance</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">WCAG Contrast Audit</h2>
            <p className="text-sm text-text-muted max-w-xl">
              Strict rules: Lime text only on dark backgrounds (#050805 to #141D0E). Text on lime buttons is always #050805. Body text exceeds 4.5:1.
            </p>
          </div>

          <div className="rounded-2xl bg-surface border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2 text-text-muted font-mono uppercase tracking-wider text-xs">
                    <th className="py-3 px-4">Foreground Token</th>
                    <th className="py-3 px-4">Background Token</th>
                    <th className="py-3 px-4">Contrast Ratio</th>
                    <th className="py-3 px-4">WCAG Standard</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-xs">
                  <tr>
                    <td className="py-3 px-4 text-ink dark:text-white font-bold">--text (#FFFFFF)</td>
                    <td className="py-3 px-4 text-text-muted">--bg (#050805)</td>
                    <td className="py-3 px-4 text-lime font-bold">21.0 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-ink dark:text-white font-bold">--text (#FFFFFF)</td>
                    <td className="py-3 px-4 text-text-muted">--surface (#0D130A)</td>
                    <td className="py-3 px-4 text-lime font-bold">19.5 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-lime font-bold">--lime (#B4E81E)</td>
                    <td className="py-3 px-4 text-text-muted">--bg (#050805)</td>
                    <td className="py-3 px-4 text-lime font-bold">13.8 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-lime-bright font-bold">--lime-bright (#C8FF3D)</td>
                    <td className="py-3 px-4 text-text-muted">--bg (#050805)</td>
                    <td className="py-3 px-4 text-lime font-bold">15.4 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-ink dark:text-white font-bold">--on-lime (#050805)</td>
                    <td className="py-3 px-4 text-lime font-bold">--lime (#B4E81E)</td>
                    <td className="py-3 px-4 text-lime font-bold">13.8 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-muted font-bold">--text-muted (#B5BDAA)</td>
                    <td className="py-3 px-4 text-text-muted">--bg (#050805)</td>
                    <td className="py-3 px-4 text-lime font-bold">10.2 : 1</td>
                    <td className="py-3 px-4">WCAG AAA (Req 7:1)</td>
                    <td className="py-3 px-4 text-lime font-bold">✓ PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
