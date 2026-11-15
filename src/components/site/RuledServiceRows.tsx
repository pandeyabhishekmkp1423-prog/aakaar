import Link from "@/components/common/Link";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code,
  Users,
  GraduationCap,
  MessageSquare,
  Cpu,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";

const ICONS_MAP: Record<string, any> = {
  Globe,
  Smartphone,
  Code,
  Users,
  GraduationCap,
  MessageSquare,
  Cpu,
  Shield,
  ShieldCheck,
};

export function RuledServiceRows() {
  const serviceList = Object.values(SERVICES_DATA);

  return (
    <div className="divide-y divide-[#DCE4E1] dark:divide-[#1C332D] border-y border-[#DCE4E1] dark:border-[#1C332D]" id="services-overview-rows">
      {serviceList.map((service, index) => {
        const IconComponent = ICONS_MAP[service.iconName] || Code;

        return (
          <div
            key={service.slug}
            className="py-6 sm:py-8 group hover:bg-[#F2F5F4] dark:hover:bg-[#11201C]/60 transition-colors px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start lg:items-center">
              {/* Col 1: Number & Icon & Title */}
              <div className="lg:col-span-5 flex items-start gap-4">
                <span className="text-xs sm:text-sm font-bold text-[#8B9DA3] dark:text-[#5E7A72] tracking-wider pt-1 font-mono shrink-0 select-none">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="w-10 h-10 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C] shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#14232B] dark:text-white group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors leading-snug">
                    <Link
                      href={`/services/${service.slug}`}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#6B7F79] dark:text-[#8FA59F] mt-0.5">
                    {service.tagline}
                  </p>
                </div>
              </div>

              {/* Col 2: Description & Key Deliverables */}
              <div className="lg:col-span-5 space-y-2">
                <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#142923] border border-[#DCE4E1] dark:border-[#1C332D] text-[#41545C] dark:text-[#A0B5AE]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 3: Action Link */}
              <div className="lg:col-span-2 flex justify-start lg:justify-end">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F5C4D] dark:text-[#3FB89C] group-hover:underline underline-offset-4"
                >
                  <span>Explore service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
