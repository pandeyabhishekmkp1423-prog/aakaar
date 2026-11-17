import { useState } from "react";
import {
  Search,
  LineChart,
  TrendingUp,
  Globe,
  Users,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import Link from "@/components/common/Link";

export function CapabilitiesSection() {
  const [activeTab, setActiveTab] = useState<"marketing" | "technology">("marketing");

  return (
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
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "marketing"
                  ? "btn-primary !min-h-[38px] !px-4"
                  : "text-secondary hover:text-ink"
              }`}
            >
              Worldwide Digital Marketing
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("technology")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "technology"
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
  );
}

export default CapabilitiesSection;
