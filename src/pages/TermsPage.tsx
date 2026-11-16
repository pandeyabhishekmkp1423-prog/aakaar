import Link from "@/components/common/Link";
import { Scale, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/lib/seo";

export default function TermsPage() {
  useSEO({
    title: "Terms and Conditions | Aakaar Digital",
    description: "Terms and conditions governing the use of aakaardigital.com, software quotes, and commercial project boundaries.",
    canonical: "/terms",
  });

  const lastUpdated = "October 6, 2026";
  const province = (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOVERNING_PROVINCE) || "Ontario";

  return (
    <div className="py-16 sm:py-20 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#151A0C] dark:text-[#B9F000] text-xs font-semibold mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Commercial Agreement Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Terms and Conditions
        </h1>
        <p className="text-secondary text-sm sm:text-base leading-relaxed">
          Last updated: <span className="font-semibold text-ink">{lastUpdated}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="panel-card p-6 bg-surface sticky top-28 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-sm text-ink uppercase tracking-wider">
              Terms Sections
            </h3>
            <nav className="flex flex-col space-y-1.5 text-xs sm:text-sm text-secondary">
              {[
                { id: "about-site", label: "1. About the Site" },
                { id: "quotes-not-contracts", label: "2. Enquiries & Quotes (Not Contracts)" },
                { id: "intellectual-property", label: "3. Intellectual Property" },
                { id: "acceptable-use", label: "4. Acceptable Use" },
                { id: "third-party-services", label: "5. Third-Party Services" },
                { id: "disclaimer", label: "6. Warranty Disclaimer" },
                { id: "limitation-liability", label: "7. Limitation of Liability" },
                { id: "privacy", label: "8. Privacy Governance" },
                { id: "links", label: "9. External Links" },
                { id: "governing-law", label: `10. Governing Law (${province})` },
                { id: "changes", label: "11. Changes to Terms" },
                { id: "contact", label: "12. Commercial Contact" },
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
          </div>
        </aside>

        {/* Terms Content */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 text-secondary text-sm sm:text-base leading-relaxed">
          
          <section id="about-site" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              1. About the Site
            </h2>
            <p>
              Welcome to <strong>aakaardigital.com</strong>. This website is owned and operated by aakaardigital. We provide bespoke software engineering, mobile application development, CRM solutions, LMS platforms, WhatsApp automations, and system integration services to businesses worldwide. By browsing or submitting information through this website, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section id="quotes-not-contracts" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              2. Enquiries and Quotes Are Not Contracts
            </h2>
            <div className="p-4 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] border border-[#AEDD00]/40 dark:border-[#22291C] text-ink text-xs sm:text-sm leading-relaxed">
              <strong>Crucial Contractual Boundary:</strong> Information, estimated timelines, or preliminary quote ranges provided through this website or preliminary email exchanges do not constitute a legally binding contract or commitment to perform services.
            </div>
            <p>
              All software development and IT engineering engagements require a mutually executed Master Services Agreement (MSA) and a detailed Statement of Work (SOW) signed by authorized corporate officers of both parties before any billable work or project commencement occurs.
            </p>
          </section>

          <section id="intellectual-property" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              3. Intellectual Property
            </h2>
            <p>
              All original text, user interfaces, branding, software architecture diagrams, illustrative dashboard mockups, and codebase assets published on this website are the proprietary intellectual property of Aakaar Digital and are protected under the Canadian Copyright Act and international copyright treaties.
            </p>
            <p>
              Under our client agreements, custom software engineered for clients transfers 100% intellectual property ownership to the client upon final milestone invoice payment.
            </p>
          </section>

          <section id="acceptable-use" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              4. Acceptable Use
            </h2>
            <p>You agree not to misuse or attempt to compromise our website or API infrastructure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>You shall not transmit malicious payloads, automated spam, SQL injections, or denial-of-service floods.</li>
              <li>You shall not reverse-engineer, decompile, or harvest data through unauthorized scraping scripts.</li>
              <li>You shall not impersonate any individual or business entity in enquiry submissions.</li>
            </ul>
          </section>

          <section id="third-party-services" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              5. Third-Party Services (WhatsApp, Cloud & Payments)
            </h2>
            <p>
              Our solutions interface with third-party enterprise platforms, including Metaâ€™s WhatsApp Business Platform, cloud infrastructure hosts (AWS, Microsoft Azure, Google Cloud), and payment gateways (Stripe, Moneris). Your utilization of these underlying services remains subject to their respective terms of service and acceptable use policies. Aakaar Digital is not liable for upstream service interruptions caused by third-party infrastructure providers.
            </p>
          </section>

          <section id="disclaimer" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              6. Warranty Disclaimer
            </h2>
            <p>
              This website and all informational content are provided on an "as-is" and "as-available" basis without representations or warranties of any kind, whether express or implied. While we strive for technical accuracy, we do not warrant that site functions will be uninterrupted or error-free.
            </p>
          </section>

          <section id="limitation-liability" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              7. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable Canadian law, Aakaar Digital, its officers, employees, and contractors shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from your use of or inability to access this website. In no event shall our total liability arising from website usage exceed one hundred Canadian dollars ($100 CAD).
            </p>
          </section>

          <section id="privacy" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              8. Privacy Governance
            </h2>
            <p>
              Our collection and processing of personal information are governed by our comprehensive{" "}
              <Link href="/privacy-policy" className="text-[#4B6300] dark:text-[#B9F000] underline hover:text-ink font-semibold">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section id="links" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              9. External Links
            </h2>
            <p>
              Links to external websites, including our sister digital marketing web properties, are provided solely for user convenience. We do not endorse or assume liability for third-party websites or services.
            </p>
          </section>

          <section id="governing-law" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              10. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms and any non-contractual disputes arising out of or related to this website shall be governed by and construed in accordance with the laws of the Province of <strong>{province}</strong> and the federal laws of Canada applicable therein, without regard to conflict of law principles. The courts situated in {province}, Canada shall possess exclusive jurisdiction over any proceedings.
            </p>
          </section>

          <section id="changes" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to revise these Terms and Conditions at our discretion. Updated terms take effect immediately upon posting to this URL. Continued use of the website following changes constitutes binding acceptance.
            </p>
          </section>

          <section id="contact" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink pt-2">
              12. Commercial Contact
            </h2>
            <p>For questions regarding these Terms or formal legal inquiries:</p>
            <div className="panel-card p-6 bg-surface space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-ink">Aakaar Digital â€” Corporate Legal</div>
              <div>Email: <a href="mailto:info@aakaardigital.com" className="text-[#4B6300] dark:text-[#B9F000] underline">info@aakaardigital.com</a></div>
              <div>Engineering bespoke software & IT solutions for businesses worldwide.</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

