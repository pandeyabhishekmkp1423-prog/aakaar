import { useState } from "react";
import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
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
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block mb-2 select-none">
              Engineering Track Record
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-[-0.03em] leading-tight mb-5">
              Production Software Case Studies & Verified Outcomes
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Explore how our senior engineering team builds custom web applications, mobile platforms, and enterprise workflows that replace clunky off-the-shelf tools, eliminate recurring licensing costs, and deliver measurable operational ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Case Study Grid */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-surface">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Industry Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-[#DCE3D6] dark:border-[#22291C]">
            <span className="text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] uppercase tracking-wider mr-2 select-none">
              Filter by Industry:
            </span>
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => setActiveFilter(industry)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === industry
                    ? "btn-primary !min-h-[36px] !px-4 !py-1 !text-xs !shadow-sm"
                    : "bg-[#E8EDE4]/60 dark:bg-[#151711] text-[#5C6656] dark:text-[#A2A69B] hover:text-[#0B0E0B] dark:hover:text-[#B9F000] border border-[#DCE3D6] dark:border-[#22291C]"
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
                className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-2xl p-6 sm:p-8 lg:p-10 transition-all hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Metadata, Title, Summary */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-mono font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase select-none">
                        {`0${idx + 1}`} / {study.industry}
                      </span>
                      <span className="text-secondary">·</span>
                      <span className="inline-flex items-center text-secondary">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-[#151A0C] dark:text-[#B9F000]" />
                        {study.location}
                      </span>
                      <span className="text-secondary">·</span>
                      <span className="inline-flex items-center text-secondary">
                        <Clock className="w-3.5 h-3.5 mr-1 text-[#151A0C] dark:text-[#B9F000]" />
                        {study.timeline}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors leading-snug">
                      <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
                    </h2>

                    <p className="text-sm sm:text-base text-secondary leading-relaxed">
                      {study.summary}
                    </p>

                    {/* Technologies Tag Pills */}
                    <div className="pt-2">
                      <span className="text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] uppercase tracking-wider block mb-2 select-none">
                        Core Technologies Deployed:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {study.architecture.frontend.split(",").concat(study.architecture.backend.split(",")).slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-[#F1F5ED] dark:bg-[#151A0C] border border-[#DCE3D6] dark:border-[#22291C] text-secondary"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-[#151A0C] dark:text-[#B9F000] underline underline-offset-4 decoration-1 hover:text-[#4B6300] transition-colors group"
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
                          className="bg-[#F1F5ED] dark:bg-[#151A0C] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-4 space-y-1"
                        >
                          <span className="text-xl sm:text-2xl font-bold font-heading text-[#151A0C] dark:text-[#B9F000] block">
                            {res.metric}
                          </span>
                          <span className="text-xs font-bold text-ink block">
                            {res.label}
                          </span>
                          <p className="text-xs text-secondary leading-snug">
                            {res.context}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial Quote Card */}
                    <div className="bg-[#E8EDE4] dark:bg-[#151A0C] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#151A0C] dark:text-[#B9F000] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verified Executive Review</span>
                        </span>
                        <span className="text-xs font-mono text-secondary">
                          {study.testimonial.location}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ink italic leading-relaxed">
                        "{study.testimonial.quote}"
                      </p>
                      <div className="pt-1 text-xs">
                        <strong className="text-ink block font-semibold">
                          {study.testimonial.author}
                        </strong>
                        <span className="text-secondary">
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
      <section className="py-16 sm:py-20 bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block select-none">
                Start a New Build
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink leading-tight">
                Have a Similar Challenge in Your Organization?
              </h2>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                Schedule a confidential architectural discovery session with our senior engineers. We review your specifications, evaluate technical feasibility, and provide fixed milestone quotes.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              arrow="right"
              className="shrink-0"
            >
              Request a Project Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
