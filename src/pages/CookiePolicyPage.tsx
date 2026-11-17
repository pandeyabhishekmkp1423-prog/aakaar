import Link from "@/components/common/Link";
import { Cookie, Shield, CheckCircle2, Sliders } from "lucide-react";
import { useSEO } from "@/lib/seo";

export function CookiePolicyPage() {
  useSEO({
    title: "Cookie Policy | Aakaar Digital",
    description: "Learn how Aakaar Digital uses cookies and local storage to deliver secure, accessible, and high-performance digital experiences.",
    canonical: "/cookies",
  });

  const lastUpdated = "October 6, 2026";

  return (
    <div className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14] text-xs font-semibold mb-4">
          <Cookie className="w-3.5 h-3.5" />
          <span>ePrivacy Directive &amp; Global Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Cookie Policy
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
                { id: "what-are-cookies", label: "1. What Are Cookies?" },
                { id: "how-we-use", label: "2. How We Use Cookies" },
                { id: "categories", label: "3. Categories of Cookies We Use" },
                { id: "third-party", label: "4. Third-Party Technologies" },
                { id: "managing-cookies", label: "5. How to Control Cookies" },
                { id: "contact-cookies", label: "6. Questions & Data Inquiries" },
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
              Read our full{" "}
              <Link href="/privacy-policy" className="text-[#4B6300] dark:text-[#B9F000] underline font-medium">
                Privacy Policy
              </Link>{" "}
              for comprehensive details on how we safeguard client and user data.
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-secondary text-sm sm:text-base leading-relaxed">
          
          <section id="what-are-cookies" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files transferred to your computer or mobile device when you visit websites. They are widely used to maintain application sessions, remember user preferences, and ensure responsive and secure web functionality. In addition to HTTP cookies, modern websites may utilize browser <strong>Local Storage</strong> and <strong>Session Storage</strong> for similar functional purposes.
            </p>
          </section>

          <section id="how-we-use" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              2. How We Use Cookies
            </h2>
            <p>
              Aakaar Digital uses cookies with strict adherence to privacy-first engineering standards. We do not engage in invasive cross-site consumer tracking or sell visitor browsing profiles to advertising networks.
            </p>
            <p>
              Our cookies exist exclusively to authenticate administrative sessions, preserve user theme selections (such as light or dark mode), protect against spam and malicious script injections, and aggregate anonymous performance metrics.
            </p>
          </section>

          <section id="categories" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              3. Categories of Cookies We Use
            </h2>
            
            {/* Category 1 */}
            <div className="p-5 rounded-2xl bg-canvas border border-line space-y-2">
              <div className="flex items-center gap-2 text-ink font-bold font-heading text-base">
                <Shield className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                <span>Strictly Necessary &amp; Security Cookies</span>
              </div>
              <p className="text-xs sm:text-sm">
                These cookies are indispensable for core site operations. They manage administrator session authentication, defend against Cross-Site Request Forgery (CSRF) exploits, and enforce API rate limiting on contact enquiry submissions.
              </p>
              <div className="text-xs text-secondary font-mono pt-1">
                Examples: <code>session_token</code>, <code>csrf_token</code>, <code>auth_state</code>
              </div>
            </div>

            {/* Category 2 */}
            <div className="p-5 rounded-2xl bg-canvas border border-line space-y-2">
              <div className="flex items-center gap-2 text-ink font-bold font-heading text-base">
                <Sliders className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                <span>Preference &amp; Functional Cookies</span>
              </div>
              <p className="text-xs sm:text-sm">
                These tokens enable the website to remember choices you make across visits, such as your selected dark or light theme preference and user interface state.
              </p>
              <div className="text-xs text-secondary font-mono pt-1">
                Examples: <code>aakaar_theme</code> (light/dark preference)
              </div>
            </div>

            {/* Category 3 */}
            <div className="p-5 rounded-2xl bg-canvas border border-line space-y-2">
              <div className="flex items-center gap-2 text-ink font-bold font-heading text-base">
                <CheckCircle2 className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                <span>Aggregated Analytics &amp; Performance</span>
              </div>
              <p className="text-xs sm:text-sm">
                These metrics allow us to evaluate visitor traffic patterns, page load times, and Core Web Vitals (LCP, INP, CLS) in an anonymized, aggregated format without collecting personally identifiable information.
              </p>
            </div>
          </section>

          <section id="third-party" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              4. Third-Party Technologies
            </h2>
            <p>
              When we embed third-party services (such as Google Fonts or cloud infrastructure CDN scripts), those providers may collect standard server header metadata required to deliver font and script assets. We configure these endpoints to minimize tracking and comply with GDPR and CCPA boundaries.
            </p>
          </section>

          <section id="managing-cookies" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              5. How to Control and Disable Cookies
            </h2>
            <p>
              You maintain total control over your cookie settings. You can adjust your web browser settings to block or delete cookies at any time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies.</li>
              <li><strong>Apple Safari:</strong> Preferences → Privacy → Block all cookies.</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data.</li>
              <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies.</li>
            </ul>
            <p className="text-xs text-secondary pt-1">
              Please note: Disabling strictly necessary cookies may impact the proper rendering of administrator login portals or security challenge tokens.
            </p>
          </section>

          <section id="contact-cookies" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              6. Questions &amp; Data Inquiries
            </h2>
            <p>
              If you have any questions regarding our use of cookies or technical data governance, contact our technical privacy team:
            </p>
            <div className="panel-card p-6 bg-surface space-y-1.5 text-xs sm:text-sm rounded-xl border border-border">
              <div className="font-bold text-ink">Aakaar Digital — Data Governance Team</div>
              <div>Email: <a href="mailto:privacy@aakaardigital.com" className="text-[#4B6300] dark:text-[#B9F000] underline">privacy@aakaardigital.com</a></div>
              <div>Website: <a href="https://aakaardigital.com" className="text-[#4B6300] dark:text-[#B9F000] underline">aakaardigital.com</a></div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
