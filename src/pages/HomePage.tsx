import React, { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  LineChart,
  Lock,
  Megaphone,
  MessageSquare,
  Palette,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";
import { useSEO } from "@/lib/seo";

export default function HomePage() {
  useSEO({
    title: "Aakaar Digital | Worldwide Digital Marketing & Enterprise IT Solutions",
    description:
      "Aakaar Digital is a premier global digital growth agency and software engineering firm. We build high-ROAS marketing funnels, global SEO, custom web applications, mobile apps, CRM systems, and WhatsApp automations for ambitious businesses worldwide.",
    canonical: "/",
  });

  // Interactive Capabilities Switcher State
  const [activeTab, setActiveTab] = useState<"marketing" | "technology">("marketing");

  // Interactive Solution Configurator State
  const [configDomain, setConfigDomain] = useState<"marketing" | "web" | "crm" | "mobile">("web");
  const [configScope, setConfigScope] = useState<"starter" | "growth" | "enterprise">("growth");

  // Estimates for the Solution Configurator
  const configuratorDetails = {
    marketing: {
      starter: {
        title: "Targeted Search & Local Dominance",
        timeline: "2 to 4 Weeks to Launch",
        deliverables: [
          "Technical SEO Audit & On-Page Optimization",
          "Google Ads Search & Local Service Campaigns",
          "High-Converting Landing Page Architecture",
          "Conversion Tracking & GA4 Dashboard Setup",
        ],
        techStack: ["Google Ads", "GA4", "Search Console", "Semrush"],
      },
      growth: {
        title: "Omnichannel Growth & Scale Engine",
        timeline: "4 to 6 Weeks to Launch",
        deliverables: [
          "Multi-Channel Paid Media (Google, Meta & LinkedIn)",
          "International Technical SEO & Programmatic Content",
          "A/B Multivariate Testing & Funnel CRO",
          "Automated Lead Scoring & CRM Integration",
        ],
        techStack: ["Meta Advantage+", "Google Performance Max", "Hotjar", "HubSpot API"],
      },
      enterprise: {
        title: "Full-Funnel Global Marketing Architecture",
        timeline: "Ongoing Sprint Cycles",
        deliverables: [
          "Enterprise Account-Based Marketing (ABM) Workflows",
          "Multi-Regional International SEO (Hreflang, Entity Maps)",
          "Programmatic Paid Media with Real-Time Bidding",
          "Dedicated Growth Lead & 24/7 Analytics SLAs",
        ],
        techStack: ["BigQuery", "Looker Studio", "LinkedIn ABM", "Custom Conversion APIs"],
      },
    },
    web: {
      starter: {
        title: "High-Performance Modern Web Platform",
        timeline: "3 to 5 Weeks",
        deliverables: [
          "Next.js / React 19 Responsive Architecture",
          "Headless Content Management & SEO Schema",
          "Sub-second Core Web Vitals (<300ms LCP)",
          "Enterprise Contact & Inquiry Capture Endpoints",
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel / AWS"],
      },
      growth: {
        title: "Custom Full-Stack Web App & Client Portal",
        timeline: "6 to 10 Weeks",
        deliverables: [
          "Authenticated Customer Dashboards & Role-Based Access",
          "Relational Database (PostgreSQL) with High Concurrency",
          "REST & GraphQL Microservice API Integrations",
          "Automated Email & WhatsApp Webhook Notifications",
        ],
        techStack: ["React", "Node.js", "PostgreSQL", "Docker", "Stripe API"],
      },
      enterprise: {
        title: "Multi-Tenant SaaS / Scalable Cloud Ecosystem",
        timeline: "10 to 16 Weeks",
        deliverables: [
          "Microservices & Serverless Kubernetes Cluster",
          "Multi-Tenant Database Architecture & Row-Level Security",
          "Zero-Downtime Automated CI/CD Deployment Pipelines",
          "SOC2, GDPR & HIPAA-Ready Security Compliance",
        ],
        techStack: ["Kubernetes", "AWS EKS", "Redis Cache", "Terraform", "PostgreSQL"],
      },
    },
    crm: {
      starter: {
        title: "Custom Pipeline & Automation Engine",
        timeline: "2 to 4 Weeks",
        deliverables: [
          "Visual Deal Pipelines & Multi-Stage Sales Stages",
          "Automatic Inbound Lead Routing & Qualification",
          "Official WhatsApp API Instant Alerts",
          "Staff Activity Tracking & Quota Dashboards",
        ],
        techStack: ["Custom CRM Core", "WhatsApp Cloud API", "REST Endpoints"],
      },
      growth: {
        title: "Enterprise Workflow & Multi-Branch CRM",
        timeline: "5 to 8 Weeks",
        deliverables: [
          "Role-Based Access Control (RBAC) & Audit Logging",
          "Bi-Directional ERP & Accounting Software Sync",
          "Automated Document & Invoice Generation",
          "Omnichannel Conversations (WhatsApp, Email, SMS)",
        ],
        techStack: ["Node.js API", "PostgreSQL", "QuickBooks / Xero API", "Twilio / Meta"],
      },
      enterprise: {
        title: "Global Operations & Custom ERP Integration",
        timeline: "8 to 14 Weeks",
        deliverables: [
          "Multi-Currency, Multi-Entity Organizational Hierarchy",
          "Predictive AI Lead Scoring & Win-Probability Modeling",
          "Custom Data Warehouse Integration & Real-Time BI",
          "Dedicated 24/7 Enterprise Maintenance & SLA Support",
        ],
        techStack: ["Microservices", "Event-Driven Kafka / RabbitMQ", "AWS Aurora", "Docker"],
      },
    },
    mobile: {
      starter: {
        title: "Cross-Platform iOS & Android MVP",
        timeline: "4 to 7 Weeks",
        deliverables: [
          "High-Fidelity Flutter / React Native Native Build",
          "Biometric Authentication (FaceID & Fingerprint)",
          "Push Notifications & In-App Messaging",
          "Apple App Store & Google Play Store Submission",
        ],
        techStack: ["Flutter", "Dart", "Firebase Auth", "APNs / FCM"],
      },
      growth: {
        title: "Commercial Grade Mobile Application",
        timeline: "8 to 12 Weeks",
        deliverables: [
          "Offline-First SQLite Local Caching & Sync",
          "Integrated In-App Payments (Apple Pay & Google Pay)",
          "Real-Time Geo-Location Tracking & Maps Integration",
          "Dedicated Administrative Management Web Portal",
        ],
        techStack: ["React Native", "TypeScript", "Node.js API", "Stripe Mobile SDK"],
      },
      enterprise: {
        title: "Enterprise Multi-Region Mobile Ecosystem",
        timeline: "12 to 18 Weeks",
        deliverables: [
          "Native Swift & Kotlin Core Engine Architecture",
          "End-to-End Encrypted Data Synchronization",
          "Automated App Testing Harness & Device Cloud CI/CD",
          "SOC2 Type II Aligned Data Storage & Pen-Tested APIs",
        ],
        techStack: ["Swift", "Kotlin", "Fastlane", "AWS Mobile Backend", "Vault"],
      },
    },
  };

  const activeConfig = configuratorDetails[configDomain][configScope];

  return (
    <div className="aakaar-page">
      {/* ------------------------------------------------------------------ */}
      {/* 1. Hero Section — Single Screen, Clean, High-Impact & Keywords Rich */}
      {/* ------------------------------------------------------------------ */}
      <section className="hero-v2" id="home">
        <div className="ad-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Clear Value Prop & Strategic Direction */}
            <div className="lg:col-span-7">
              {/* Dynamic Live Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#151A0C]/90 border border-[#DCE3D6] dark:border-[#22291C] text-xs font-semibold text-ink dark:text-white mb-4 backdrop-blur-md shadow-2xs">
                <span className="w-2 h-5 rounded-full bg-[#B9F000] animate-pulse" />
                <span className="font-bold text-[#4B6300] dark:text-[#B9F000] uppercase tracking-wider text-[11px]">
                  Worldwide Digital Marketing &amp; Enterprise IT
                </span>
                <span className="text-secondary hidden sm:inline">•</span>
                <span className="text-secondary text-[11px] hidden sm:inline">North America • Europe • Worldwide</span>
              </div>

              {/* Clean, Authoritative Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-[-0.045em] leading-[1.08] text-ink dark:text-white mb-4 font-heading">
                Worldwide Digital Marketing
                <br />
                &amp; Enterprise IT Solutions.
                <br />
                <em className="gradient-text-lime not-italic">Growth Engineered.</em>
              </h1>

              {/* Concise, Sharp Value Proposition (Very Less Content) */}
              <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-xl mb-6">
                We engineer high-ROI performance marketing engines—SEO, Google &amp; Meta Ads—and build custom Next.js web applications, mobile platforms, and WhatsApp CRM automations for ambitious global brands.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <Link href="/contact" className="btn-primary group !min-h-[44px] !px-6 !text-sm">
                  <span>Start Your Project</span>
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-secondary-dark group !min-h-[44px] !px-5 !text-sm"
                >
                  <span>Explore 8 Services</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Trust Badges directly beneath CTA */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-secondary mb-6">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                  <span>Response in &lt; 4h</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                  <span>100% Code &amp; IP Ownership</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                  <span>Strict Mutual NDA Protected</span>
                </span>
              </div>

              {/* Rich Keywords Pill Strip (SEO & Service Discovery) */}
              <div className="pt-4 border-t border-line/70">
                <div className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-2.5 flex items-center gap-1.5">
                  <span>Core Solutions &amp; Technical Capabilities:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {[
                    { name: "Technical SEO & Rank", href: "/services" },
                    { name: "Google & Meta Ads", href: "/services" },
                    { name: "Next.js Web Apps", href: "/services/web-development" },
                    { name: "iOS & Android Apps", href: "/services/mobile-app-development" },
                    { name: "Custom CRM & ERP", href: "/services/crm-solutions" },
                    { name: "WhatsApp Cloud API", href: "/services/whatsapp-automation" },
                    { name: "Conversion CRO", href: "/services" },
                    { name: "Cloud & 24/7 SLA", href: "/services/maintenance-support" },
                  ].map((kw) => (
                    <Link
                      key={kw.name}
                      href={kw.href}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11.5px] font-semibold bg-surface border border-line text-secondary hover:text-ink hover:border-[#AEDD00] dark:hover:border-[#B9F000] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B9F000]" />
                      <span>{kw.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Radiant Glassmorphic Brand Frame with Lime Glow & Official Logo */}
            <div className="lg:col-span-5">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none flex items-center justify-center">
                {/* Background Ambient Lime & Olive Mesh Glow */}
                <div className="absolute w-[360px] h-[360px] rounded-full bg-radial from-[#B9F000]/20 via-[#151A0C]/35 to-transparent blur-3xl pointer-events-none" />

                {/* Glassmorphic Brand Showcase Frame */}
                <div className="relative w-full max-w-[420px] rounded-3xl bg-white/90 dark:bg-[#0B0E0B]/90 border border-[#DCE3D6] dark:border-[#22291C] p-6 sm:p-7 shadow-2xl backdrop-blur-xl overflow-hidden hover:border-[#AEDD00] transition-all duration-300">
                  {/* Subtle inner lighting gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B9F000]/5 via-transparent to-[#151A0C]/30 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="relative flex items-center justify-between pb-4 border-b border-line mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B9F000] animate-pulse" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink dark:text-white">
                        Aakaar Digital System Hub
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4B6300] dark:text-[#B9F000] px-2 py-0.5 rounded bg-[#E8EDE4] dark:bg-[#151A0C]">
                      GLOBAL NODE
                    </span>
                  </div>

                  {/* Center Brand Emblem Showcase */}
                  <div className="relative flex flex-col items-center justify-center py-5">
                    {/* Concentric subtle radar pulse rings */}
                    <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#B9F000]/25 pointer-events-none" />
                    <div className="absolute w-32 h-32 rounded-full border border-[#B9F000]/30 pointer-events-none" />

                    {/* Brand Emblem Badge */}
                    <div className="relative w-22 h-22 rounded-2xl bg-[#0B0E0B] border-2 border-[#22291C] p-3 flex items-center justify-center shadow-xl group hover:border-[#AEDD00] transition-all">
                      <Image
                        src="/Angular White and Neon Lime Logo.png"
                        alt="Aakaar Digital Emblem"
                        width={72}
                        height={72}
                        priority
                        className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(185,240,0,0.35)]"
                      />
                    </div>

                    <div className="mt-3.5 text-center">
                      <div className="text-base font-extrabold text-ink dark:text-white tracking-tight font-heading">
                        Aakaar Digital
                      </div>
                      <div className="text-xs text-secondary font-mono mt-0.5">
                        Digital Growth &amp; Technology Solutions
                      </div>
                    </div>
                  </div>

                  {/* Dual Floating Proof Badges */}
                  <div className="relative grid grid-cols-2 gap-2.5 pt-4 border-t border-line">
                    <div className="p-3 rounded-xl bg-surface/80 border border-line flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink dark:text-white">4.9x ROAS</div>
                        <div className="text-[10px] text-secondary">Google &amp; Meta Ads</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface/80 border border-line flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center shrink-0">
                        <Server className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink dark:text-white">99.99% SLA</div>
                        <div className="text-[10px] text-secondary">Next.js &amp; Cloud Edge</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Live Coordinates */}
                  <div className="relative mt-3.5 flex items-center justify-between text-[10px] font-mono text-secondary pt-3 border-t border-line/60">
                    <span>EST. 2026 • WORLDWIDE</span>
                    <span className="text-[#4B6300] dark:text-[#B9F000] font-bold">● ACTIVE 24/7 SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Global Trust & Enterprise Credential Bar */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-8 bg-surface border-b border-line">
        <div className="ad-container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">4.9x</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Average Blended ROAS</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">99.99%</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Cloud Infrastructure SLA</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">14+</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Countries Served</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">&lt;4 Hours</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Average Response Time</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">12M+</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">API &amp; Chatbot Touchpoints</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="font-heading font-extrabold text-lg text-ink">100%</span>
              <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">IP Ownership to Client</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. The Aakaar Dual Philosophy: Code & Marketing */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-intro" id="about">
        <div className="ad-container ad-intro-grid">
          <div>
            <p className="ad-kicker">01 / The Aakaar Philosophy</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] text-xs font-bold mb-4">
              <Sparkles size={14} />
              <span>Full-Stack Synergy</span>
            </div>
          </div>
          <div>
            <h2>
              Marketing without technology is fragile.
              <br />
              <span>Technology without growth is invisible.</span>
            </h2>
            <p className="ad-body">
              Traditional marketing agencies don&apos;t know how to write production code or scale cloud databases.
              Traditional IT outsourcing shops don&apos;t know how to generate commercial pipeline or convert paid traffic.
              Aakaar Digital unites both worlds into a single, high-velocity engineering and growth powerhouse.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link href="/about" className="ad-text-link group">
                <span>Our Leadership &amp; Engineering Culture</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Interactive Capabilities Matrix (Marketing vs Technology) */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-services" id="capabilities">
        <div className="ad-container">
          <div className="ad-section-head">
            <div>
              <p className="ad-kicker">02 / Dual Core Capabilities</p>
              <h2>
                Two disciplines.
                <br />
                One connected <span>growth engine.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#F1F5ED] dark:bg-[#151711] border border-line">
              <button
                type="button"
                onClick={() => setActiveTab("marketing")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "marketing"
                  ? "btn-primary !min-h-[38px] !px-4"
                  : "text-secondary hover:text-ink"
                  }`}
              >
                Worldwide Digital Marketing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("technology")}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === "technology"
                  ? "btn-primary !min-h-[38px] !px-4"
                  : "text-secondary hover:text-ink"
                  }`}
              >
                Enterprise IT &amp; Software
              </button>
            </div>
          </div>

          {activeTab === "marketing" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* Marketing Card 1 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  Enterprise SEO &amp; Organic Growth
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Technical on-page architectures, international hreflang tags, schema markup, and authoritative thought-leadership content that outranks competitors globally.
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Technical SEO &amp; Core Web Vitals Audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Multi-Region Keyword Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Entity-First Authority Content Creation</span>
                  </li>
                </ul>
                <Link href="/services" className="ad-card-link">
                  <span>Explore SEO Strategy</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              {/* Marketing Card 2 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <LineChart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  High-ROAS Performance Ads
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Precision targeting across Google Ads (Search, Shopping, PMax), Meta Ads, LinkedIn B2B, and YouTube with advanced Server-Side Tracking (CAPI).
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Google Ads &amp; Performance Max Campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Meta Advantage+ &amp; Dynamic Creative</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Server-Side CAPI &amp; First-Party Attribution</span>
                  </li>
                </ul>
                <Link href="/services" className="ad-card-link">
                  <span>Explore Paid Media</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              {/* Marketing Card 3 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  Conversion Rate Optimization (CRO)
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Turning raw site traffic into revenue. Multivariate landing page testing, behavioral heatmaps, customer friction elimination, and checkout optimization.
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Multivariate A/B Testing &amp; Split Tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Frictionless High-Converting Funnels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Behavioral Heatmaps &amp; User Recording Audits</span>
                  </li>
                </ul>
                <Link href="/services" className="ad-card-link">
                  <span>Explore CRO Services</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {/* Tech Card 1 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  Custom Web Applications
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Production-grade Next.js 15, React 19, TypeScript, and serverless edge platforms architected for ultra-fast performance, security, and global scale.
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Next.js Server-Side Rendering (SSR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>PostgreSQL &amp; High-Concurrency Databases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Sub-350ms TTFB &amp; 100/100 Lighthouse</span>
                  </li>
                </ul>
                <Link href="/services/web-development" className="ad-card-link">
                  <span>Web Engineering Details</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              {/* Tech Card 2 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  Custom CRM &amp; Business Systems
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Bespoke sales pipelines, customer lifecycle systems, automated lead scoring, and bi-directional ERP data sync tailored to your exact business rules.
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Role-Based Access Control &amp; Audit Logs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Automated Contract &amp; Invoice Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Seamless Third-Party API Integration</span>
                  </li>
                </ul>
                <Link href="/services/crm-solutions" className="ad-card-link">
                  <span>CRM Architecture Details</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              {/* Tech Card 3 */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl hover:border-[#AEDD00] transition-all group">
                <div className="w-11 h-11 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-ink mb-2">
                  Official WhatsApp &amp; AI Automation
                </h3>
                <p className="text-sm text-secondary leading-relaxed mb-5">
                  Direct integration with the official Meta WhatsApp Cloud API. Automated lead qualification, 24/7 customer support bots, and catalog checkout systems.
                </p>
                <ul className="space-y-2 text-xs text-secondary border-t border-line pt-4 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Meta Cloud API Official BSP Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Automated CRM Lead Ingestion via Webhooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>Broadcast Messaging with 98% Open Rate</span>
                  </li>
                </ul>
                <Link href="/services/whatsapp-automation" className="ad-card-link">
                  <span>WhatsApp API Details</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Interactive Solution Configurator & Cost/Timeline Estimator */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 bg-canvas border-b border-line" id="estimator">
        <div className="ad-container">
          <div className="max-w-3xl mb-12">
            <p className="ad-kicker">03 / Project Scoping Engine</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
              Configure Your Solution.
              <br />
              <span>Get Transparent Scope &amp; Timelines.</span>
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Select your primary business objective and target deployment tier to preview architecture components, deliverables, and estimated launch sprint timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Domain Selection */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl shadow-xs">
                <label className="text-xs font-bold uppercase tracking-wider text-secondary block mb-3">
                  Step 1: Select Solution Domain
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "marketing", label: "Digital Marketing", icon: <Megaphone className="w-4 h-4" /> },
                    { id: "web", label: "Web Platform", icon: <Globe className="w-4 h-4" /> },
                    { id: "crm", label: "CRM & Automation", icon: <Workflow className="w-4 h-4" /> },
                    { id: "mobile", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" /> },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setConfigDomain(item.id as any)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${configDomain === item.id
                        ? "border-[#AEDD00] bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] shadow-xs"
                        : "border-line bg-canvas/60 text-secondary hover:text-ink hover:border-line/80"
                        }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Selection */}
              <div className="panel-card p-6 bg-surface border border-line rounded-2xl shadow-xs">
                <label className="text-xs font-bold uppercase tracking-wider text-secondary block mb-3">
                  Step 2: Select Scale &amp; Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "starter", label: "Starter MVP", desc: "Fast Execution" },
                    { id: "growth", label: "Growth Scale", desc: "Recommended" },
                    { id: "enterprise", label: "Enterprise", desc: "High Volume" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setConfigScope(tier.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${configScope === tier.id
                        ? "border-[#AEDD00] bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] shadow-xs"
                        : "border-line bg-canvas/60 text-secondary hover:text-ink"
                        }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[10px] text-secondary mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Card */}
            <div className="lg:col-span-7">
              <div className="panel-card p-7 sm:p-8 bg-surface border border-[#AEDD00]/50 dark:border-[#22291C] rounded-2xl shadow-lg relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#4B6300] dark:text-[#B9F000]">
                    Architected Scope Blueprint
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-ink font-semibold text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                    <span>{activeConfig.timeline}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink mb-4">
                  {activeConfig.title}
                </h3>

                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                    Included Deliverables &amp; Milestones:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeConfig.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-line pt-5 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2.5">
                    Engineered Tech Stack &amp; Tools:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeConfig.techStack.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-canvas text-ink font-mono text-xs border border-line"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/contact" className="btn-primary w-full sm:w-auto">
                    <span>Request Exact Quote &amp; SLA</span>
                    <ArrowRight size={16} />
                  </Link>
                  <p className="text-xs text-secondary">
                    Fixed-price milestone terms • Non-binding initial estimate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Selected Case Studies & Proven Global Impact */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-work" id="portfolio">
        <div className="ad-container">
          <div className="ad-section-head">
            <div>
              <p className="ad-kicker">04 / Proven Global Case Studies</p>
              <h2>
                Measured in revenue,
                <br />
                uptime and <span>global scale.</span>
              </h2>
            </div>
            <Link href="/case-studies" className="ad-text-link group">
              <span>View All 12 Case Studies</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="ad-project-grid">
            {/* Project 1 */}
            <article className="ad-project ad-project-olive group">
              <div className="ad-project-art">
                <div className="ad-project-mark">
                  <BarChart3 className="w-9 h-9" />
                </div>
                <div className="ad-project-lines" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/75 text-[#B9F000] text-[11px] font-mono font-bold">
                  +310% ARR PIPELINE
                </div>
              </div>
              <div className="ad-project-copy">
                <p>Global B2B SaaS Enterprise</p>
                <h3>International SEO &amp; Performance Acquisition Engine</h3>
                <div className="text-xs text-secondary mt-2 line-clamp-2">
                  Engineered multilingual hreflang architecture, sub-second Next.js pages, and high-intent LinkedIn ABM funnels.
                </div>
                <ArrowUpRight size={20} />
              </div>
            </article>

            {/* Project 2 */}
            <article className="ad-project ad-project-charcoal group">
              <div className="ad-project-art">
                <div className="ad-project-mark">
                  <Code2 className="w-9 h-9" />
                </div>
                <div className="ad-project-lines" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/75 text-[#B9F000] text-[11px] font-mono font-bold">
                  99.99% UPTIME • 4.8x ROAS
                </div>
              </div>
              <div className="ad-project-copy">
                <p>E-Commerce &amp; Retail Brand</p>
                <h3>Headless Next.js Storefront &amp; Google Ads Scale</h3>
                <div className="text-xs text-secondary mt-2 line-clamp-2">
                  Migrated legacy store to microservices, boosting Core Web Vitals to 98 and scaling monthly ad spend with positive ROAS.
                </div>
                <ArrowUpRight size={20} />
              </div>
            </article>

            {/* Project 3 */}
            <article className="ad-project ad-project-surface group">
              <div className="ad-project-art">
                <div className="ad-project-mark">
                  <Workflow className="w-9 h-9" />
                </div>
                <div className="ad-project-lines" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/75 text-[#B9F000] text-[11px] font-mono font-bold">
                  100K+ DAILY CHATS
                </div>
              </div>
              <div className="ad-project-copy">
                <p>FinTech &amp; Logistics Network</p>
                <h3>Custom Multi-Tenant CRM &amp; WhatsApp Cloud Automation</h3>
                <div className="text-xs text-secondary mt-2 line-clamp-2">
                  Implemented official WhatsApp API bots for automated parcel status checks, dispatch notifications, and bill settlements.
                </div>
                <ArrowUpRight size={20} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. How We Work Process — 4-Stage "Velocity & Scale" Framework */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-process" id="how-we-work">
        <div className="ad-container">
          <div className="ad-process-intro">
            <p className="ad-kicker">05 / The 4-Stage Execution Model</p>
            <h2>
              Zero guesswork.
              <br />
              <span>Measurable velocity.</span>
            </h2>
            <p className="ad-body">
              We eliminate technical debt and marketing vanity metrics. Every sprint delivers tangible code, validated pipelines, and measurable commercial return.
            </p>
          </div>
          <div className="ad-steps">
            {[
              [
                "01",
                "Deep Audit & Data Diagnostics",
                "We inspect your current SEO footprint, paid traffic CAC, server latency, codebase structure, and database schema bottlenecks.",
              ],
              [
                "02",
                "Architecture & Growth Blueprint",
                "We design high-fidelity UX mockups, data entity models, campaign structures, and a transparent sprint roadmap.",
              ],
              [
                "03",
                "Agile Build & Campaign Deployment",
                "We write clean, test-driven production code, configure cloud infrastructure, and launch optimized multi-channel campaigns.",
              ],
              [
                "04",
                "Conversion Optimization & Scale",
                "Continuous A/B multivariate testing, automated monitoring, 24/7 security patch SLAs, and aggressive organic expansion.",
              ],
            ].map(([num, title, desc]) => (
              <div className="ad-step" key={num}>
                <b>{num}</b>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. Industry Specializations */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-industries" id="industries">
        <div className="ad-container ad-industry-grid">
          <div>
            <p className="ad-kicker">06 / Domain Expertise</p>
            <h2>
              Tailored architectures.
              <br />
              <span>Rigorous compliance.</span>
            </h2>
            <p className="text-secondary text-sm leading-relaxed mt-4 max-w-md">
              Every sector operates under specific statutory rules, user expectations, and conversion dynamics. We build solutions customized to your vertical.
            </p>
          </div>
          <div className="ad-industry-list">
            {[
              "B2B SaaS & Enterprise Technology",
              "FinTech, Banking & Payment Gateways",
              "Healthcare, HealthTech & HIPAA / PIPEDA",
              "E-Commerce, Omnichannel & Marketplaces",
              "Education, EdTech & Course Platforms",
              "Legal, Accounting & Corporate Services",
              "Supply Chain, Logistics & Fleet Operations",
            ].map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                {item}
                <ArrowUpRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. Closing Strategic Call-To-Action */}
      {/* ------------------------------------------------------------------ */}
      <section className="ad-cta" id="contact">
        <div className="ad-container">
          <p className="ad-kicker">Initiate Your Next Growth Sprint</p>
          <h2>
            Let’s build something
            <br />
            <em>engineered for scale.</em>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
            Connect directly with senior engineers and marketing growth leads. We analyze your tech stack, outline clear ROI metrics, and provide a comprehensive proposal within one business day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary group">
              <span>Start Your Software Project</span>
              <ArrowRight size={17} />
            </Link>
            <Link href="/services" className="btn-secondary-dark group">
              <span>Explore All 8 Services</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B9F000]" /> Strict Mutual NDA Protected
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#B9F000]" /> Fast Response Guaranteed
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
