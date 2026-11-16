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
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block mb-2 select-none">
              Domain-Specific Engineering
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-ink tracking-[-0.03em] leading-tight mb-5">
              Custom Software Solutions Calibrated for Enterprise Sectors
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Every industry carries distinct operational nuances, data compliance mandates, and field workflows. We build bespoke applications that solve real domain bottlenecks with zero recurring per-seat subscription lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Directory Grid */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-[#DCE3D6] dark:border-[#22291C] bg-surface">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industriesList.map((industry, idx) => {
              const IconComp = ICON_COMPONENTS[industry.iconName] || Building2;

              return (
                <article
                  key={industry.slug}
                  className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] hover:-translate-y-0.5 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] flex items-center justify-center text-[#151A0C] dark:text-[#B9F000] border border-black/5 dark:border-white/5">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#8B9685] dark:text-[#A2A69B] select-none">
                        {`SECTOR 0${idx + 1}`}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold font-heading text-ink group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors leading-snug mb-1.5">
                        <Link href={`/industries/${industry.slug}`}>{industry.name}</Link>
                      </h2>
                      <p className="text-xs font-semibold text-[#5C6656] dark:text-[#A2A69B] mb-3">
                        {industry.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-3">
                        {industry.heroSummary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DCE3D6] dark:border-[#22291C] space-y-2">
                      <span className="text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] uppercase tracking-wider block select-none">
                        Key Solutions Engineered:
                      </span>
                      <ul className="space-y-1 text-xs text-secondary">
                        {industry.solutions.slice(0, 2).map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#151A0C] dark:bg-[#B9F000]" />
                            <span className="truncate">{sol.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-4">
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-[#151A0C] dark:text-[#B9F000] group-hover:underline underline-offset-4"
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
      <section className="py-16 sm:py-20 bg-canvas">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase block select-none">
                Bespoke Systems Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink leading-tight">
                Operating in a Specialized or Niche Sector?
              </h2>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                We frequently build systems combining multi-sector workflows — such as cold-chain medical logistics or industrial wholesale billing portals. Schedule a consultation to review technical feasibility.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary shrink-0 group"
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
