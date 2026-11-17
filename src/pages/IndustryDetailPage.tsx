import { useParams, Navigate } from "react-router-dom";
import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
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
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8EDE4] dark:bg-[#151A0C] flex items-center justify-center text-[#151A0C] dark:text-[#B9F000] border border-black/5 dark:border-white/5">
                <IconComp className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase select-none">
                {industry.name}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-[-0.03em] leading-tight mb-5">
              {industry.headline}
            </h1>

            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8">
              {industry.heroSummary}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="primary"
                size="md"
                href="/contact"
                arrow="right"
              >
                Request Industry Proposal
              </Button>
              {featuredCaseStudy && (
                <Link
                  href={`/case-studies/${featuredCaseStudy.slug}`}
                  className="inline-flex items-center justify-center sm:justify-start text-sm font-semibold text-[#151A0C] dark:text-[#B9F000] underline underline-offset-4 decoration-1 hover:text-[#4B6300] transition-colors"
                >
                  <span>Review {featuredCaseStudy.clientName} Case Study</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-surface">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Industry Solutions */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block select-none">
                  02 / Engineered Solutions
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
                  Targeted Systems for {industry.name}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {industry.solutions.map((sol, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-5 space-y-2 hover:border-[#AEDD00] dark:hover:border-[#B9F000] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold font-heading text-ink">
                          {sol.title}
                        </h3>
                        <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] select-none">
                          {`0${idx + 1}`}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                        {sol.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {sol.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-[#F1F5ED] dark:bg-[#151A0C] border border-[#DCE3D6] dark:border-[#22291C] text-secondary"
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
                <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block select-none">
                  03 / Security & Compliance
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
                  Regulatory Compliance & Data Protection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {industry.compliance.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-5 space-y-1.5"
                    >
                      <span className="font-bold text-xs sm:text-sm text-[#151A0C] dark:text-[#B9F000] block">
                        {item.framework}
                      </span>
                      <p className="text-xs text-secondary leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Study Spotlight */}
              {featuredCaseStudy && (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#E8EDE4] dark:bg-[#151A0C] border border-[#DCE3D6] dark:border-[#22291C] space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#151A0C] dark:text-[#B9F000] uppercase tracking-wider select-none">
                      Featured Industry Deployment
                    </span>
                    <span className="font-mono text-xs text-secondary">
                      {featuredCaseStudy.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink leading-snug">
                    {featuredCaseStudy.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {featuredCaseStudy.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {featuredCaseStudy.keyResults.map((r, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-3 rounded-lg bg-white/70 dark:bg-[#151711]/70 border border-black/5 dark:border-white/5"
                      >
                        <span className="text-lg font-bold font-heading text-[#151A0C] dark:text-[#B9F000] block">
                          {r.metric}
                        </span>
                        <span className="text-xs text-ink font-medium block">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/case-studies/${featuredCaseStudy.slug}`}
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#151A0C] dark:text-[#B9F000] underline underline-offset-4 decoration-1 hover:text-[#4B6300] group"
                    >
                      <span>Read the complete technical case study</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Deliverables Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />
                  <h3 className="text-base font-bold font-heading text-ink">
                    Deliverables Included
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-secondary">
                  {industry.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#151A0C] dark:bg-[#B9F000] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#DCE3D6] dark:border-[#22291C] space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="/contact"
                    arrow="right"
                    className="w-full justify-center"
                  >
                    Request an Estimate
                  </Button>

                  <Link
                    href="/industries"
                    className="w-full inline-flex items-center justify-center text-xs font-semibold text-[#151A0C] dark:text-[#B9F000] hover:underline pt-2"
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
