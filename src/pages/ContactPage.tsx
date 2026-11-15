import Link from "@/components/common/Link";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Mail, Phone, MapPin, Clock, Shield } from "lucide-react";

export default function ContactPage() {
  useSEO({
    title: "Contact Us | Aakaar Digital",
    description:
      "Get in touch with Aakaar Digital. Request a free consultation or quotation for custom web applications, mobile apps, CRM systems, LMS platforms, or WhatsApp automation worldwide.",
    canonical: "/contact",
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-primary-spruce uppercase tracking-wider block mb-2">
              Engineering Consultation & Inquiries
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              Start Your Software Project or Request a Consultation.
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed prose-measure">
              Have technical questions regarding your application architecture, database migration, CRM workflow, or WhatsApp API integration? Connect directly with our senior technical team.
            </p>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Assurance */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-3">
                  Direct Communications
                </h2>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                  Our engineering leads are available Monday through Friday across North American and European business hours. Critical production support for active maintenance SLA clients is monitored 24/7 globally.
                </p>

                <div className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl divide-y divide-[#DCE4E1] dark:divide-[#1C332D] overflow-hidden shadow-xs text-xs sm:text-sm">
                  <div className="flex items-start gap-4 p-5 hover:bg-[#F2F5F4] dark:hover:bg-[#152B24] transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C] shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Project Enquiries & RFPs
                      </div>
                      <a
                        href="mailto:info@aakaardigital.com"
                        className="text-sm sm:text-base font-bold text-[#14232B] dark:text-white group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors"
                      >
                        info@aakaardigital.com
                      </a>
                      <div className="text-xs text-[#41545C] dark:text-gray-400 mt-0.5">
                        Average response time: &lt; 4 hours
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 hover:bg-[#F2F5F4] dark:hover:bg-[#152B24] transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C] shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Technical Phone Consultation
                      </div>
                      <a
                        href="tel:+18005550199"
                        className="text-sm sm:text-base font-bold text-[#14232B] dark:text-white group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors"
                      >
                        +1 (800) 555-0199
                      </a>
                      <div className="text-xs text-[#41545C] dark:text-gray-400 mt-0.5">
                        Monâ€“Fri, 9amâ€“6pm EST
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FAFBFB] dark:bg-[#0E1B17]">
                    <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C] shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Service Delivery
                      </div>
                      <span className="text-sm font-bold text-[#14232B] dark:text-white">
                        Worldwide Enterprise Delivery
                      </span>
                      <div className="text-xs text-[#41545C] dark:text-gray-400 mt-0.5">
                        Seamless collaboration across North American, European, and global timezones
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Guarantee Panel */}
              <div className="rounded-xl p-6 bg-white dark:bg-[#11201C] border border-[#0F5C4D]/25 dark:border-[#1C332D]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#14232B] dark:text-white mb-2">
                  <Shield className="w-4 h-4 text-primary-spruce dark:text-[#3FB89C]" />
                  <span>Enterprise Privacy & Security Guarantee</span>
                </div>
                <p className="text-xs text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                  We process your inquiry under strict confidentiality in compliance with international privacy frameworks (GDPR, PIPEDA, CCPA). We never sell, lease, or monetize your corporate data.
                </p>
              </div>
            </div>

            {/* Right: Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-3">
                Project Enquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-secondary mb-6">
                Please complete the details below so our technical team can review your specifications and prepare an informed estimate.
              </p>
              <EnquiryForm defaultService="Web Development" />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

