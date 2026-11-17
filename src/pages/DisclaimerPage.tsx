import Link from "@/components/common/Link";
import { AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/lib/seo";

export function DisclaimerPage() {
  useSEO({
    title: "Disclaimer & Performance Notice | Aakaar Digital",
    description: "Legal and commercial performance disclaimer regarding marketing ROAS estimates, case study representations, and third-party platform dependencies.",
    canonical: "/disclaimer",
  });

  const lastUpdated = "October 6, 2026";

  return (
    <div className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14] text-xs font-semibold mb-4">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Legal &amp; Commercial Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Disclaimer
        </h1>
        <p className="text-secondary text-sm sm:text-base leading-relaxed">
          Last updated: <span className="font-semibold text-ink">{lastUpdated}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="panel-card p-6 bg-surface sticky top-28 space-y-4 shadow-xs rounded-2xl border border-border">
            <h3 className="font-heading font-bold text-sm text-ink uppercase tracking-wider">
              Sections
            </h3>
            <nav className="flex flex-col space-y-1.5 text-xs sm:text-sm text-secondary">
              {[
                { id: "informational-purpose", label: "1. Informational Purposes Only" },
                { id: "performance-earnings", label: "2. Marketing ROI & Earnings Notice" },
                { id: "case-studies", label: "3. Case Study Representations" },
                { id: "third-party-platforms", label: "4. Third-Party Platform Policies" },
                { id: "technical-accuracy", label: "5. Technical Accuracy & Uptime" },
                { id: "contact-legal", label: "6. Legal Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left hover:text-[#4B6300] dark:hover:text-[#B9F000] py-1 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="pt-4 border-t border-line text-xs text-secondary leading-relaxed">
              Also consult our{" "}
              <Link href="/terms" className="text-[#4B6300] dark:text-[#B9F000] underline font-medium">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="text-[#4B6300] dark:text-[#B9F000] underline font-medium">
                Privacy Policy
              </Link>.
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-secondary text-sm sm:text-base leading-relaxed">
          
          <section id="informational-purpose" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              1. Informational Purposes Only
            </h2>
            <p>
              The content, technical guides, architectural comparisons, and marketing insights published on <strong>aakaardigital.com</strong> are provided strictly for general informational and educational purposes. Nothing on this website constitutes legal, formal financial, tax, or binding IT architecture advice.
            </p>
          </section>

          <section id="performance-earnings" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              2. Marketing ROI &amp; Revenue Notice
            </h2>
            <div className="p-4 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] border border-[#AEDD00]/40 dark:border-[#22291C] text-ink text-xs sm:text-sm leading-relaxed">
              <strong>Performance Transparency:</strong> Aakaar Digital does not guarantee specific monetary gains, sales figures, ROAS percentages, or organic search engine rankings.
            </div>
            <p>
              Digital marketing performance (including Google Ads, Meta Ads, Search Engine Optimization, and conversion rate optimization) is intrinsically influenced by external variables outside any agency&apos;s direct control. These include broader macroeconomic conditions, client product-market fit, competitor bidding aggression, pricing competitiveness, and customer service execution.
            </p>
          </section>

          <section id="case-studies" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              3. Case Study Representations
            </h2>
            <p>
              Metrics and outcome testimonials cited in our case studies (such as &quot;4.8x ROAS&quot;, &quot;210% pipeline increase&quot;, or &quot;&lt;1.8s mobile load times&quot;) represent verified historical results achieved under specific project conditions, budgets, and operational collaboration with those specific enterprise clients. Past performance does not guarantee identical future outcomes for other engagements.
            </p>
          </section>

          <section id="third-party-platforms" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              4. Third-Party Platform Policies &amp; Algorithms
            </h2>
            <p>
              Our custom software, automation flows, and marketing campaigns frequently integrate with third-party platforms, such as Meta (WhatsApp Business, Facebook, Instagram), Google (Search, Ads, Cloud), Apple (App Store), and Amazon Web Services (AWS).
            </p>
            <p>
              Aakaar Digital has no control over sudden policy updates, algorithm modifications, account reviews, pricing shifts, or downtime instituted by these third-party platform operators.
            </p>
          </section>

          <section id="technical-accuracy" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              5. Technical Accuracy &amp; Uptime
            </h2>
            <p>
              While our engineering team applies rigorous software verification standards, we make no representations or warranties that website materials, interactive calculators, or documentation will always be uninterrupted, timely, secure, or entirely error-free.
            </p>
          </section>

          <section id="contact-legal" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              6. Legal Contact
            </h2>
            <p>
              For formal inquiries or questions concerning this Disclaimer:
            </p>
            <div className="panel-card p-6 bg-surface space-y-1.5 text-xs sm:text-sm rounded-xl border border-border">
              <div className="font-bold text-ink">Aakaar Digital — Legal Compliance</div>
              <div>Email: <a href="mailto:info@aakaardigital.com" className="text-[#4B6300] dark:text-[#B9F000] underline">info@aakaardigital.com</a></div>
              <div>Global Engineering &amp; Digital Growth Studio</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default DisclaimerPage;
