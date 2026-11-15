import { useState } from "react";
import Link from "@/components/common/Link";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  Quote,
} from "lucide-react";

export default function CaseStudiesPage() {
  useSEO({
    title: "Client Case Studies & Verified Results | Aakaar Digital",
    description:
      "Explore real-world software engineering case studies. See how we deliver custom web apps, mobile solutions, and enterprise CRMs with verifiable results for US & global clients.",
    canonical: "/case-studies",
    keywords:
      "software engineering case studies, custom software case studies, web application development, mobile app development, enterprise CRM solutions, Aakaar Digital",
    authors: ["Aakaar Digital Engineering Team"],
  });

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const caseStudiesList = Object.values(CASE_STUDIES);
  const industries = ["all", ...new Set(caseStudiesList.map((cs) => cs.industry))];

  const filteredStudies =
    activeFilter === "all"
      ? caseStudiesList
      : caseStudiesList.filter((cs) => cs.industry === activeFilter);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block mb-2 select-none">
              Engineering Track Record
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#14232B] dark:text-white tracking-[-0.03em] leading-tight mb-5">
              Production Software Case Studies & Verified Outcomes
            </h1>
            <p className="text-base sm:text-lg text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
              Explore how our senior engineering team builds custom web applications, mobile platforms, and enterprise workflows that replace clunky off-the-shelf tools, eliminate recurring licensing costs, and deliver measurable operational ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Case Study Grid */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-white dark:bg-[#071914]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Industry Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-[#DCE4E1] dark:border-[#1C332D]">
            <span className="text-xs font-semibold text-[#8B9DA3] dark:text-[#5E7A72] uppercase tracking-wider mr-2 select-none">
              Filter by Industry:
            </span>
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveFilter(industry)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === industry
                    ? "bg-[#0F5C4D] text-white dark:bg-[#3FB89C] dark:text-[#0C1815] shadow-xs"
                    : "bg-[#F2F5F4] dark:bg-[#11201C] text-[#41545C] dark:text-[#A0B5AE] hover:text-[#0F5C4D] dark:hover:text-white border border-[#DCE4E1] dark:border-[#1C332D]"
                }`}
              >
                {industry === "all" ? "All Case Studies" : industry}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="space-y-12">
            {filteredStudies.map((study, idx) => (
              <article
                key={study.slug}
                className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-2xl p-6 sm:p-8 lg:p-10 transition-all hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_12px_32px_rgba(15,92,77,0.06)] group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Metadata, Title, Summary */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase select-none">
                        {`0${idx + 1}`} / {study.industry}
                      </span>
                      <span className="text-[#8B9DA3] dark:text-[#5E7A72]">Â·</span>
                      <span className="inline-flex items-center text-[#6B7F79] dark:text-[#8FA59F]">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#0F5C4D] dark:text-[#3FB89C]" />
                        {study.location}
                      </span>
                      <span className="text-[#8B9DA3] dark:text-[#5E7A72]">Â·</span>
                      <span className="inline-flex items-center text-[#6B7F79] dark:text-[#8FA59F]">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#0F5C4D] dark:text-[#3FB89C]" />
                        {study.timeline}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors leading-snug">
                      <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                    </h2>

                    <p className="text-sm sm:text-base text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                      {study.summary}
                    </p>

                    {/* Technologies Tag Pills */}
                    <div className="pt-2">
                      <span className="text-xs font-semibold text-[#8B9DA3] dark:text-[#5E7A72] uppercase tracking-wider block mb-2 select-none">
                        Core Technologies Deployed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {study.architecture.frontend.split(",").concat(study.architecture.backend.split(",")).slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-white dark:bg-[#142923] border border-[#DCE4E1] dark:border-[#1C332D] text-[#33444B] dark:text-[#B9C8C4]"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-[#0F5C4D] dark:text-[#3FB89C] underline underline-offset-4 decoration-1 hover:text-[#0A4136] transition-colors"
                      >
                        <span>View complete architectural case study</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Key Results & Testimonial Snippet */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {study.keyResults.slice(0, 2).map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-white dark:bg-[#142923] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-4 space-y-1"
                        >
                          <span className="text-xl sm:text-2xl font-bold font-heading text-[#0F5C4D] dark:text-[#3FB89C] block">
                            {res.metric}
                          </span>
                          <span className="text-xs font-bold text-[#14232B] dark:text-white block">
                            {res.label}
                          </span>
                          <p className="text-xs text-[#6B7F79] dark:text-[#8FA59F] leading-snug">
                            {res.context}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial Quote Card */}
                    <div className="bg-[#E3EFEA] dark:bg-[#15382E] border border-[#0F5C4D]/30 dark:border-[#3FB89C]/30 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#0F5C4D] dark:text-[#3FB89C] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified Executive Review</span>
                        </span>
                        <span className="text-xs font-mono text-[#41545C] dark:text-[#A0B5AE]">
                          {study.testimonial.location}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0C241E] dark:text-[#E6F4F0] italic leading-relaxed">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="pt-1 text-xs">
                        <strong className="text-[#14232B] dark:text-white block font-semibold">
                          {study.testimonial.author}
                        </strong>
                        <span className="text-[#41545C] dark:text-[#A0B5AE]">
                          {study.testimonial.role}, {study.testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-16 sm:py-20 bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                Start a New Build
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white leading-tight">
                Have a Similar Challenge in Your Organization?
              </h2>
              <p className="text-sm sm:text-base text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                Schedule a confidential architectural discovery session with our senior engineers. We review your specifications, evaluate technical feasibility, and provide fixed milestone quotes.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] text-white dark:bg-[#3FB89C] dark:hover:bg-[#329B82] dark:text-[#0C1815] text-sm font-semibold transition-all shadow-sm shrink-0"
            >
              <span>Request a Project Quote</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


