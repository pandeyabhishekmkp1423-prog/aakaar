import Link from "@/components/common/Link";
import { SERVICES_DATA } from "@/lib/services-data";
import FeatureCard from "@/components/site/FeatureCard";
import { JsonLd } from "@/components/site/JsonLd";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import {
  Globe,
  Smartphone,
  Code2,
  Users,
  GraduationCap,
  MessageSquare,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Code,
} from "lucide-react";

export default function ServicesIndexPage() {
  useSEO({
    title: "Software & IT Solutions | Aakaar Digital",
    description:
      "Explore our suite of 8 core software & IT services: web development, mobile apps, custom software, CRM solutions, LMS platforms, WhatsApp automation, integrations, and maintenance worldwide.",
    canonical: "/services",
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    "web-development": <Globe className="w-5 h-5 text-primary-spruce" />,
    "mobile-app-development": <Smartphone className="w-5 h-5 text-primary-spruce" />,
    "custom-software": <Code2 className="w-5 h-5 text-primary-spruce" />,
    "crm-solutions": <Users className="w-5 h-5 text-primary-spruce" />,
    "lms-platforms": <GraduationCap className="w-5 h-5 text-primary-spruce" />,
    "whatsapp-automation": <MessageSquare className="w-5 h-5 text-primary-spruce" />,
    "integrations-automation": <Cpu className="w-5 h-5 text-primary-spruce" />,
    "maintenance-support": <ShieldCheck className="w-5 h-5 text-primary-spruce" />,
  };

  const servicesList = Object.values(SERVICES_DATA);

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              Our 8 Core Software & IT Solutions
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed prose-measure">
              Every system we engineer is built to solve concrete operational bottlenecks for growing businesses and enterprises worldwide. Zero bloated templates, zero unnecessary per-seat licenses, and full intellectual property ownership.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Cards Grid (1 Mobile / 2 Tablet / 4 Desktop) in Clean Appen-style Cards */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-line bg-surface">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold font-heading text-gray-900 dark:text-white tracking-[-0.03em] mb-4 leading-tight">
              Software services directory
            </h2>
            <p className="text-base sm:text-[17px] text-gray-600 dark:text-[#A0B5AE] leading-relaxed">
              Explore our core technical specialisms below for detailed use cases, architecture roadmaps, and project deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {servicesList.map((svc, idx) => (
              <FeatureCard
                key={svc.slug}
                title={svc.title}
                description={svc.shortDescription}
                number={`0${idx + 1}`}
                icon={iconMap[svc.slug]}
                href={`/services/${svc.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Multi-Service Consultation CTA */}
      <section className="py-14 sm:py-20 bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="rounded-xl p-6 sm:p-10 bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink mb-2">
                Need a Cross-Functional Engineering Assessment?
              </h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Most complex systems combine multiple domainsâ€”such as a custom web portal with WhatsApp automated dispatch and QuickBooks sync. We architect unified solution roadmaps.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary w-full sm:w-auto text-center text-sm shrink-0 min-h-[46px] justify-center"
            >
              <span>Request consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

