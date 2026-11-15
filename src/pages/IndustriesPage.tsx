import Link from "@/components/common/Link";
import { INDUSTRIES_DATA } from "@/lib/industries-data";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  ArrowRight,
  Truck,
  Stethoscope,
  Cpu,
  Wrench,
  Building2,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ICON_COMPONENTS: Record<string, any> = {
  Truck,
  Stethoscope,
  Cpu,
  Wrench,
  Building2,
  ShoppingBag,
};

export default function IndustriesPage() {
  useSEO({
    title: "Industry Software Solutions & Sector Expertise | Aakaar Digital",
    description:
      "Explore custom software engineered for logistics, healthcare, manufacturing, commercial trades, financial services, and retail wholesale worldwide.",
    canonical: "/industries",
  });

  const industriesList = Object.values(INDUSTRIES_DATA);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block mb-2 select-none">
              Domain-Specific Engineering
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#14232B] dark:text-white tracking-[-0.03em] leading-tight mb-5">
              Custom Software Solutions Calibrated for Enterprise Sectors
            </h1>
            <p className="text-base sm:text-lg text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
              Every industry carries distinct operational nuances, data compliance mandates, and field workflows. We build bespoke applications that solve real domain bottlenecks with zero recurring per-seat subscription lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Directory Grid */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE4E1] dark:border-[#1C332D] bg-white dark:bg-[#071914]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industriesList.map((industry, idx) => {
              const IconComp = ICON_COMPONENTS[industry.iconName] || Building2;

              return (
                <article
                  key={industry.slug}
                  className="bg-[#FAFBFB] dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_12px_32px_rgba(15,92,77,0.08)] hover:-translate-y-0.5 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#8B9DA3] dark:text-[#5E7A72] select-none">
                        {`SECTOR 0${idx + 1}`}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold font-heading text-[#14232B] dark:text-white group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors leading-snug mb-1.5">
                        <Link href={`/industries/${industry.slug}`}>{industry.name}</Link>
                      </h2>
                      <p className="text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] mb-3">
                        {industry.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed line-clamp-3">
                        {industry.heroSummary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DCE4E1] dark:border-[#1C332D] space-y-2">
                      <span className="text-xs font-semibold text-[#8B9DA3] dark:text-[#5E7A72] uppercase tracking-wider block select-none">
                        Key Solutions Engineered:
                      </span>
                      <ul className="space-y-1 text-xs text-[#41545C] dark:text-[#A0B5AE]">
                        {industry.solutions.slice(0, 2).map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#3FB89C]" />
                            <span className="truncate">{sol.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-4">
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] group-hover:underline underline-offset-4"
                    >
                      <span>Explore industry solutions</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16 sm:py-20 bg-[#FAFCFB] dark:bg-[#0C1815]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#0F5C4D] dark:text-[#3FB89C] tracking-wider uppercase block select-none">
                Bespoke Systems Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#14232B] dark:text-white leading-tight">
                Operating in a Specialized or Niche Sector?
              </h2>
              <p className="text-sm sm:text-base text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                We frequently build systems combining multi-sector workflowsâ€”such as cold-chain medical logistics or industrial wholesale billing portals. Schedule a consultation to review technical feasibility.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] text-white dark:bg-[#3FB89C] dark:hover:bg-[#329B82] dark:text-[#0C1815] text-sm font-semibold transition-all shadow-sm shrink-0"
            >
              <span>Speak with a Lead Engineer</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


