import { useParams } from "react-router-dom";
import Link from "@/components/common/Link";
import { SERVICES_DATA } from "@/lib/services-data";
import { getServiceSchema, getFaqSchema, getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { CheckCircle2, ArrowRight, ShieldCheck, Layers, Terminal } from "lucide-react";
import NotFoundPage from "./NotFoundPage";

export default function IndividualServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES_DATA[slug] : undefined;

  useSEO({
    title: service ? `${service.title} | Aakaar Digital` : "Service Not Found",
    description: service?.shortDescription,
    canonical: slug ? `/services/${slug}` : undefined,
  });

  if (!service || !slug) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${slug}` },
  ];

  return (
    <>
      <JsonLd data={getServiceSchema(service.title, service.shortDescription, slug)} />
      <JsonLd data={getFaqSchema(service.faqs)} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8 prose-measure">
              {service.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("enquiry-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary text-sm min-h-[46px] justify-center cursor-pointer"
              >
                <span>Request a service quote</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("deliverables")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-secondary text-sm min-h-[46px] justify-center cursor-pointer"
              >
                View deliverables
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 border-b border-line bg-surface">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink mb-6">
                {service.overviewHeading}
              </h2>
              <div className="prose-measure space-y-6 text-sm sm:text-base text-secondary leading-relaxed">
                {service.overviewParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-12 pt-10 sm:pt-12 border-t border-line">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary-spruce" />
                  <span>Typical Business Use Cases</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {service.useCases.map((uc, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_8px_24px_rgba(15,92,77,0.06)]"
                    >
                      <h4 className="text-sm sm:text-base font-bold font-heading text-ink mb-2">{uc.title}</h4>
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-line">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-spruce" />
                  <span>Key Strategic Benefits</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {service.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_8px_24px_rgba(15,92,77,0.06)]"
                    >
                      <h4 className="text-sm sm:text-base font-bold font-heading text-ink mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#0F5C4D] dark:bg-[#3FB89C] shrink-0" />
                        <span>{b.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4" id="deliverables">
              <div className="rounded-xl p-6 sm:p-8 bg-white dark:bg-[#11201C] border border-[#0F5C4D]/30 dark:border-[#1C332D] lg:sticky lg:top-28 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold font-heading text-ink mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary-spruce" />
                  <span>Scope of Deliverables</span>
                </h3>
                <ul className="space-y-3 mb-8">
                  {service.deliverables.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-spruce mt-2 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("enquiry-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary w-full text-center text-sm min-h-[46px] justify-center cursor-pointer"
                >
                  Request a Free Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 border-b border-line bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold font-heading text-gray-900 dark:text-white tracking-[-0.03em] mb-4 leading-tight">
              How we deliver {service.title.toLowerCase()}
            </h2>
            <p className="text-base sm:text-[17px] text-gray-600 dark:text-[#A0B5AE] leading-relaxed">
              A disciplined four-step operational sequence ensuring transparency, code quality, and predictable milestone deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="pt-6 border-t-2 border-[#DCE4E1] dark:border-[#1C332D] hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] transition-colors group"
              >
                <span className="font-mono text-sm font-bold text-[#0F5C4D] dark:text-[#3FB89C] mb-3 block select-none">
                  {step.step}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#14232B] dark:text-white mb-2.5 group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24 border-b border-line bg-surface">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-xs font-bold text-primary-spruce uppercase tracking-wider block mb-2">
              Questions & Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-secondary">
              Clear, practical answers regarding technology requirements, global data compliance, and project scopes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-6 transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_8px_24px_rgba(15,92,77,0.06)]"
              >
                <h3 className="text-sm sm:text-base font-bold font-heading text-ink mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry-section" className="py-14 sm:py-20 lg:py-24 bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
            <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase mb-2 block select-none">
              Direct Technical Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink mb-3">
              Discuss Your {service.title} Requirements
            </h2>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
              Complete the enquiry form below. Our senior engineering leads will analyze your technical requirements and respond within one business day.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <EnquiryForm defaultService={service.title} />
          </div>
        </div>
      </section>
    </>
  );
}

