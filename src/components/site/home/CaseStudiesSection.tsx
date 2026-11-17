import { BarChart3, Code2, Workflow, ArrowUpRight } from "lucide-react";
import Link from "@/components/common/Link";

export function CaseStudiesSection() {
  return (
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
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/85 text-lime border border-lime/30 text-xs font-mono font-bold shadow-xs">
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
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/85 text-lime border border-lime/30 text-xs font-mono font-bold shadow-xs">
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
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/85 text-lime border border-lime/30 text-xs font-mono font-bold shadow-xs">
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
  );
}

export default CaseStudiesSection;
