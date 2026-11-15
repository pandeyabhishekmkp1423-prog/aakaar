import { useParams, Navigate } from "react-router-dom";
import Link from "@/components/common/Link";
import { INDUSTRIES_DATA } from "@/lib/industries-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Sparkles,
  Truck,
  Stethoscope,
  Cpu,
  Wrench,
  Building2,
  ShoppingBag,
} from "lucide-react";

const ICON_COMPONENTS: Record<string, any> = {
  Truck,
  Stethoscope,
  Cpu,
  Wrench,
  Building2,
  ShoppingBag,
};

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? INDUSTRIES_DATA[slug] : null;

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const featuredCaseStudy = industry.featuredCaseStudySlug
    ? CASE_STUDIES[industry.featuredCaseStudySlug]
    : null;

  useSEO({
    title: `${industry.headline} | Aakaar Digital`,
    description: industry.heroSummary,
    canonical: `/industries/${industry.slug}`,
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: industry.name, url: `/industries/${industry.slug}` },
  ];

  const IconComp = ICON_COMPONENTS[industry.iconName] || Building2;

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C]">
                <IconComp className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase select-none">
                {industry.name}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#14232B] dark:text-white tracking-[-0.03em] leading-tight mb-5">
              {industry.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#41545C] dark:text-[#A0B5AE] leading-relaxed mb-8">
              {industry.heroSummary}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] text-white dark:bg-[#3FB89C] dark:hover:bg-[#329B82] dark:text-[#0C1815] text-sm font-semibold transition-all shadow-xs cursor-pointer text-center"
              >
                <span>Request Industry Proposal</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              {featuredCaseStudy && (
                <Link
                  href={`/case-studies/${featuredCaseStudy.slug}`}
                  className="inline-flex items-center justify-center sm:justify-start text-sm font-semibold text-[#0F5C4D] dark:text-[#3FB89C] underline underline-offset-4 decoration-1 hover:text-[#0A4136] transition-colors"
                >
                  <span>Review {featuredCaseStudy.clientName} Case Study</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-white dark:bg-[#071914]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-14">
              {/* Sector Challenges */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  01 / Common Industry Bottlenecks
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Why Standard SaaS Fails in {industry.shortName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {industry.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-2"
                    >
                      <h3 className="text-sm font-bold font-heading text-[#14232B] dark:text-white leading-snug">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Solutions */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  02 / Custom Software Solutions
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Engineered Capabilities for {industry.name}
                </h2>
                <div className="space-y-4 pt-2">
                  {industry.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-bold font-heading text-[#14232B] dark:text-white">
                          {sol.title}
                        </h3>
                        <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] select-none">
                          {`0${idx + 1}`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                        {sol.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {sol.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#142923] border border-[#DCE4E1] dark:border-[#1C332D] text-[#33444B] dark:text-[#B9C8C4]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Compliance Frameworks */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  03 / Security & Compliance
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Regulatory Compliance & Data Protection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {industry.compliance.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1.5"
                    >
                      <span className="font-bold text-xs sm:text-sm text-[#0F5C4D] dark:text-[#3FB89C] block">
                        {item.framework}
                      </span>
                      <p className="text-xs text-[#6B7F79] dark:text-[#8FA59F] leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Study Spotlight if available */}
              {featuredCaseStudy && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#E3EFEA] dark:bg-[#15382E] border border-[#0F5C4D]/30 dark:border-[#3FB89C]/30 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#0F5C4D] dark:text-[#3FB89C] uppercase tracking-wider select-none">
                      Featured Industry Deployment
                    </span>
                    <span className="font-mono text-xs text-[#41545C] dark:text-[#A0B5AE]">
                      {featuredCaseStudy.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#14232B] dark:text-white leading-snug">
                    {featuredCaseStudy.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#0C241E] dark:text-[#E6F4F0] leading-relaxed">
                    {featuredCaseStudy.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {featuredCaseStudy.keyResults.map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-3 rounded-lg bg-white/70 dark:bg-[#11201C]/70 border border-[#0F5C4D]/20 dark:border-[#3FB89C]/20"
                      >
                        <span className="text-lg font-bold font-heading text-[#0F5C4D] dark:text-[#3FB89C] block">
                          {r.metric}
                        </span>
                        <span className="text-xs text-[#14232B] dark:text-white font-medium block">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/case-studies/${featuredCaseStudy.slug}`}
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#0F5C4D] dark:text-[#3FB89C] underline underline-offset-4 decoration-1 hover:text-[#0A4136]"
                    >
                      <span>Read the complete technical case study</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Deliverables & Consultation Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#0F5C4D]/30 dark:border-[#1C332D] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0F5C4D] dark:text-[#3FB89C]" />
                  <h3 className="text-base font-bold font-heading text-[#14232B] dark:text-white">
                    Deliverables Included
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE]">
                  {industry.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#3FB89C] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#DCE4E1] dark:border-[#1C332D] space-y-3">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center min-h-[46px] px-6 py-3 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] text-white dark:bg-[#3FB89C] dark:hover:bg-[#329B82] dark:text-[#0C1815] text-sm font-semibold transition-all shadow-xs"
                  >
                    <span>Request an Estimate</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <Link
                    href="/industries"
                    className="w-full inline-flex items-center justify-center text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    <span>Back to all industries</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


