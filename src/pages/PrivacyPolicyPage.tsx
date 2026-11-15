import Link from "@/components/common/Link";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/lib/seo";

export default function PrivacyPolicyPage() {
  useSEO({
    title: "Privacy Policy | Global Data Protection & Compliance | Aakaar Digital",
    description: "Our commitment to international data privacy compliance under PIPEDA, GDPR, CCPA, and global anti-spam regulations.",
    canonical: "/privacy-policy",
  });

  const lastUpdated = "October 6, 2026";

  return (
    <div className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist text-primary-spruce text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>Global Privacy Framework (GDPR, PIPEDA, CCPA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-secondary text-sm sm:text-base leading-relaxed">
          Last updated: <span className="font-semibold text-ink">{lastUpdated}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation / Quick Links sidebar */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="panel-card p-6 bg-surface sticky top-28 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-sm text-ink uppercase tracking-wider">
              Policy Sections
            </h3>
            <nav className="flex flex-col space-y-1.5 text-xs sm:text-sm text-secondary">
              {[
                { id: "information-collected", label: "1. Information Collected" },
                { id: "how-it-is-used", label: "2. How It Is Used" },
                { id: "consent", label: "3. Consent Principles" },
                { id: "sharing-service-providers", label: "4. Sharing with Service Providers" },
                { id: "cookies-analytics", label: "5. Cookies & Analytics" },
                { id: "email-communications", label: "6. Email Communications & CASL" },
                { id: "retention-security", label: "7. Retention & Data Security" },
                { id: "your-rights", label: "8. Your Rights (PIPEDA & OPC)" },
                { id: "children", label: "9. Children's Privacy" },
                { id: "third-party-links", label: "10. Third-Party Links" },
                { id: "policy-changes", label: "11. Policy Changes" },
                { id: "contact-us", label: "12. Privacy Officer Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-left hover:text-primary-spruce py-1 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="pt-4 border-t border-line text-xs text-secondary leading-relaxed">
              For privacy complaints or statutory inquiries, you may also consult the{" "}
              <a
                href="https://www.priv.gc.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-spruce underline hover:text-ink font-medium"
              >
                Office of the Privacy Commissioner of Canada (OPC)
              </a>
              .
            </div>
          </div>
        </aside>

        {/* Policy Content */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-secondary text-sm sm:text-base leading-relaxed">
          
          <section id="information-collected" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              1. Information Collected
            </h2>
            <p>
              Aakaar Digital collects personal and business information strictly necessary to provide software engineering and IT consulting services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Contact Identifiers:</strong> Full name, corporate email address, telephone number, and operating company name submitted through our website enquiry forms.</li>
              <li><strong>Project Specifications:</strong> Technical requirements, system parameters, architectural constraints, and target timeline details.</li>
              <li><strong>Technical Metadata:</strong> Internet Protocol (IP) address, browser user-agent, and timestamp records collected automatically upon form submission for rate-limiting, abuse prevention, and anti-spam verification.</li>
            </ul>
          </section>

          <section id="how-it-is-used" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              2. How It Is Used
            </h2>
            <p>
              We process personal and corporate data exclusively for legitimate commercial purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>To evaluate and respond to inbound project enquiries and technical consultation requests.</li>
              <li>To draft non-binding estimates, statements of work (SOWs), and commercial proposals.</li>
              <li>To deliver, configure, and maintain software platforms, custom integrations, CRM systems, and LMS applications.</li>
              <li>To detect and mitigate automated security threats, spam submissions, and malicious API exploitation.</li>
            </ul>
          </section>

          <section id="consent" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              3. Consent Principles
            </h2>
            <p>
              We collect and process your information only with your express or implied consent, as prescribed by applicable privacy standards. By submitting an enquiry through our contact forms, you grant express consent for our technical personnel to contact you regarding your project. You may withdraw consent at any time by contacting our Privacy Officer.
            </p>
          </section>

          <section id="sharing-service-providers" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              4. Sharing with Service Providers (No Sale of Data)
            </h2>
            <p className="font-semibold text-ink">
              Aakaar Digital never sells, rents, leases, or trades your personal or corporate data to third-party data brokers or marketing aggregators.
            </p>
            <p>
              We disclose information strictly to vetted infrastructure service providers who support our core operations under contractual confidentiality and privacy commitments (such as enterprise cloud hosting providers, transactional SMTP delivery services, and database backups).
            </p>
          </section>

          <section id="cookies-analytics" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              5. Cookies and Analytics
            </h2>
            <p>
              Our website utilizes privacy-respecting cookies and local storage tokens strictly for essential functionality:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Essential Session Cookies:</strong> To manage administrator authentication and cross-site request forgery (CSRF) defenses.</li>
              <li><strong>Theme Preferences:</strong> To preserve your selected light or dark mode theme across visits.</li>
              <li><strong>Aggregated Analytics:</strong> To evaluate traffic volume and page performance using anonymized metrics without tracking individuals across third-party websites.</li>
            </ul>
          </section>

          <section id="email-communications" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              6. Email Communications (CASL Compliance)
            </h2>
            <p>
              We adhere strictly to Canadaâ€™s Anti-Spam Legislation (CASL). We do not send unsolicited commercial electronic messages (CEMs). Any transactional or informative electronic communications sent to your inbox include clear identification of Aakaar Digital and a functional mechanism to unsubscribe or adjust communication preferences.
            </p>
          </section>

          <section id="retention-security" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              7. Retention and Data Security
            </h2>
            <p>
              We retain commercial enquiry records only for the period necessary to fulfill commercial discussions or contractual warranty obligations. Technical safeguards include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>Transport Layer Security (TLS 1.3 / HTTPS) encryption for all in-transit communications.</li>
              <li>Argon2id/bcrypt cryptographic hashing for authentication credentials.</li>
              <li>Strict firewall configurations, brute-force lockout rules, and restricted database access limited to authorized technical personnel.</li>
            </ul>
          </section>

          <section id="your-rights" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              8. Your Rights (PIPEDA, GDPR, CCPA & International Privacy Standards)
            </h2>
            <p>
              Under applicable privacy frameworks (including PIPEDA, GDPR for European residents, CCPA for California residents, and provincial statutes such as Quebecâ€™s Law 25), you maintain enforceable rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>The right to request access to the personal records we maintain concerning your identity.</li>
              <li>The right to rectify inaccurate, incomplete, or obsolete information.</li>
              <li>The right to withdraw consent and request data deletion, subject to statutory retention obligations.</li>
            </ul>
            <p>
              If your privacy inquiry or concern is not resolved to your satisfaction, you possess the legal right to file a formal complaint with the{" "}
              <strong>Office of the Privacy Commissioner of Canada (OPC)</strong> at{" "}
              <a
                href="https://www.priv.gc.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-spruce underline hover:text-ink font-medium"
              >
                priv.gc.ca
              </a>{" "}
              or by calling 1-800-282-1376.
            </p>
          </section>

          <section id="children" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              9. Children's Privacy
            </h2>
            <p>
              Our website and services are intended exclusively for commercial enterprises and business professionals aged 18 and older. We do not knowingly solicit or collect personal information from individuals under the age of majority.
            </p>
          </section>

          <section id="third-party-links" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              10. Third-Party Links
            </h2>
            <p>
              Our website may contain references or hyperlinks to external websites (such as official API documentation, partner platforms, or our sister marketing site). We do not control and are not responsible for the privacy practices or content of third-party domains.
            </p>
          </section>

          <section id="policy-changes" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              11. Policy Changes
            </h2>
            <p>
              We periodically review and update this Privacy Policy to reflect evolving technical practices or legal requirements. Material modifications will be posted to this page with an updated "Last updated" date.
            </p>
          </section>

          <section id="contact-us" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              12. Privacy Officer Contact
            </h2>
            <p>
              For questions, access requests, or privacy concerns, contact our designated Privacy Compliance Officer:
            </p>
            <div className="panel-card p-6 bg-surface space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-ink">Aakaar Digital â€” Privacy Officer</div>
              <div>Email: <a href="mailto:privacy@aakaardigital.com" className="text-primary-spruce underline">privacy@aakaardigital.com</a></div>
              <div>General Inquiries: <a href="mailto:info@aakaardigital.com" className="text-primary-spruce underline">info@aakaardigital.com</a></div>
              <div>Jurisdiction: Ontario & Canada Federal</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

