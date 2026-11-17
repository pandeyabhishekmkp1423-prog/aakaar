import { useState } from "react";
import {
  Megaphone,
  Globe,
  Workflow,
  Smartphone,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/common/Button";

export function SolutionConfiguratorSection() {
  const [configDomain, setConfigDomain] = useState<"marketing" | "web" | "crm" | "mobile">("web");
  const [configScope, setConfigScope] = useState<"starter" | "growth" | "enterprise">("growth");

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
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      configDomain === item.id
                        ? "border-lime/80 shadow-[0_0_24px_rgba(180,232,30,0.22)] bg-surface-2 text-lime"
                        : "border-border bg-surface/60 text-text-muted hover:text-ink dark:hover:text-white hover:border-border/80"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Selection */}
            <div className="panel-card p-6 bg-surface border border-border rounded-2xl shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-3">
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
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      configScope === tier.id
                        ? "border-lime/80 shadow-[0_0_24px_rgba(180,232,30,0.22)] bg-surface-2 text-lime"
                        : "border-border bg-surface/60 text-text-muted hover:text-ink dark:hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{tier.label}</div>
                    <div className="text-xs text-text-muted mt-0.5">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Output Card */}
          <div className="lg:col-span-7">
            <div className="panel-card p-7 sm:p-8 bg-surface border border-lime/30 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-lime">
                  Architected Scope Blueprint
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 text-ink dark:text-white border border-border font-semibold text-xs">
                  <Clock className="w-3.5 h-3.5 text-lime" />
                  <span>{activeConfig.timeline}</span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink dark:text-white mb-4">
                {activeConfig.title}
              </h3>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  Included Deliverables &amp; Milestones:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeConfig.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-muted">
                      <CheckCircle2 className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-5 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                  Engineered Tech Stack &amp; Tools:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeConfig.techStack.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-surface-2 text-ink dark:text-white font-mono text-xs border border-border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button variant="primary" size="md" href="/contact" arrow="right" className="w-full sm:w-auto">
                  Request Exact Quote &amp; SLA
                </Button>
                <p className="text-xs text-text-muted">
                  Fixed-price milestone terms • Non-binding initial estimate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionConfiguratorSection;
