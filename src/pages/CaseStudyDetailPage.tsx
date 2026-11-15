import { useParams, Navigate } from "react-router-dom";
import Link from "@/components/common/Link";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Layers,
  ShieldCheck,
  Server,
  Database,
  Cloud,
  Cpu,
  Quote,
} from "lucide-react";

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? CASE_STUDIES[slug] : null;

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  useSEO({
    title: `${study.title} | Case Study | Aakaar Digital`,
    description: study.summary,
    canonical: `/case-studies/${study.slug}`,
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/case-studies" },
    { name: study.title, url: `/case-studies/${study.slug}` },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Header Banner */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
              <span className="font-mono font-bold text-[#0F5C4D] dark:text-[#3FB89C] uppercase tracking-wider select-none">
                {study.industry}
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

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#14232B] dark:text-white tracking-[-0.03em] leading-tight mb-6">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
              {study.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Case Study Body */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-white dark:bg-[#071914]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Challenge Section */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  01 / The Operational Challenge
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Bottlenecks Facing {study.clientName}
                </h2>
                <div className="space-y-3 pt-2">
                  {study.challenge.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] flex items-start gap-3.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Section */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  02 / The Custom Software Solution
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Bespoke Architectural Execution
                </h2>
                <div className="space-y-3 pt-2">
                  {study.solution.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#E3EFEA]/40 dark:bg-[#14352C]/40 border border-[#0F5C4D]/20 dark:border-[#3FB89C]/20 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0F5C4D] dark:text-[#3FB89C] mt-0.5 shrink-0" />
                      <p className="text-xs sm:text-sm text-[#14232B] dark:text-[#E6F4F0] leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Architecture Specs */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  03 / Architectural Specification
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Technology Stack & Cloud Topology
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0F5C4D] dark:text-[#3FB89C] text-xs font-bold uppercase tracking-wider">
                      <Layers className="w-4 h-4" />
                      <span>Frontend & Interface</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#14232B] dark:text-white font-medium">
                      {study.architecture.frontend}
                    </p>
                  </div>

                  <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0F5C4D] dark:text-[#3FB89C] text-xs font-bold uppercase tracking-wider">
                      <Server className="w-4 h-4" />
                      <span>Backend Services & APIs</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#14232B] dark:text-white font-medium">
                      {study.architecture.backend}
                    </p>
                  </div>

                  <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0F5C4D] dark:text-[#3FB89C] text-xs font-bold uppercase tracking-wider">
                      <Database className="w-4 h-4" />
                      <span>Database & Cache Engine</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#14232B] dark:text-white font-medium">
                      {study.architecture.database}
                    </p>
                  </div>

                  <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[#0F5C4D] dark:text-[#3FB89C] text-xs font-bold uppercase tracking-wider">
                      <Cloud className="w-4 h-4" />
                      <span>Cloud Topology & CI/CD</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#14232B] dark:text-white font-medium">
                      {study.architecture.cloudAndDevOps}
                    </p>
                  </div>
                </div>

                <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#0F5C4D] dark:text-[#3FB89C] text-xs font-bold uppercase tracking-wider">
                    <Cpu className="w-4 h-4" />
                    <span>External Third-Party Integrations</span>
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE]">
                    {study.architecture.integrations.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#3FB89C]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Verified Results Grid */}
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                  04 / Verified Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white">
                  Measurable Business Outcomes
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {study.keyResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-5 space-y-1 text-center sm:text-left"
                    >
                      <span className="text-2xl sm:text-3xl font-bold font-heading text-[#0F5C4D] dark:text-[#3FB89C] block">
                        {result.metric}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#14232B] dark:text-white block">
                        {result.label}
                      </span>
                      <p className="text-xs text-[#6B7F79] dark:text-[#8FA59F] leading-snug">
                        {result.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Review Banner */}
              <div className="bg-[#E3EFEA] dark:bg-[#15382E] border border-[#0F5C4D]/30 dark:border-[#3FB89C]/30 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F5C4D] dark:text-[#3FB89C] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Executive Testimonial</span>
                  </span>
                  <span className="font-mono text-xs text-[#41545C] dark:text-[#A0B5AE]">
                    {study.testimonial.location}
                  </span>
                </div>
                <blockquote className="text-sm sm:text-base text-[#0C241E] dark:text-[#E6F4F0] italic leading-relaxed">
                  "{study.testimonial.quote}"
                </blockquote>
                <div className="pt-2 text-xs border-t border-[#0F5C4D]/20 dark:border-[#3FB89C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <strong className="text-sm font-bold text-[#14232B] dark:text-white block">
                      {study.testimonial.author}
                    </strong>
                    <span className="text-[#41545C] dark:text-[#A0B5AE]">
                      {study.testimonial.role}, {study.testimonial.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#0F5C4D] dark:text-[#3FB89C]">
                    Authenticated US Client
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Deliverables Scope & Quick Action Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#0F5C4D]/30 dark:border-[#1C332D] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#0F5C4D] dark:text-[#3FB89C]" />
                  <h3 className="text-base font-bold font-heading text-[#14232B] dark:text-white">
                    Deliverables Transferred
                  </h3>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE]">
                  {study.deliverables.map((item, idx) => (
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
                    <span>Request a Free Project Quote</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  <Link
                    href="/case-studies"
                    className="w-full inline-flex items-center justify-center text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    <span>Back to all case studies</span>
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


