import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
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
} from "lucide-react";

export default function ServicesIndexPage() {
  useSEO({
    title: "Worldwide Digital Marketing & Enterprise IT Solutions | Aakaar Digital",
    description:
      "Explore Aakaar Digital's complete suite of global digital marketing and enterprise IT solutions: high-ROAS paid media, technical SEO, custom web platforms, mobile apps, CRM systems, WhatsApp automations, and cloud infrastructure.",
    canonical: "/services",
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    "web-development": <Globe className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "mobile-app-development": <Smartphone className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "custom-software": <Code2 className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "crm-solutions": <Users className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "lms-platforms": <GraduationCap className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "whatsapp-automation": <MessageSquare className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "integrations-automation": <Cpu className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
    "maintenance-support": <ShieldCheck className="w-5 h-5 text-[#151A0C] dark:text-[#B9F000]" />,
  };

  const servicesList = Object.values(SERVICES_DATA);

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#4B6300] dark:text-[#B9F000] uppercase tracking-wider block mb-2">
              Global Growth &amp; Technology Directory
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              Worldwide Digital Marketing &amp; Enterprise IT Solutions
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed prose-measure">
              Every system and campaign we engineer is built to drive measurable revenue growth and eliminate operational bottlenecks for businesses worldwide. From global SEO and high-ROAS paid media to full-stack Next.js web applications, custom CRMs, and WhatsApp API automations.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Cards Grid */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-line bg-surface">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold font-heading text-ink tracking-[-0.03em] mb-4 leading-tight">
              Software services directory
            </h2>
            <p className="text-base sm:text-[17px] text-secondary leading-relaxed">
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
          <div className="rounded-2xl p-6 sm:p-10 bg-surface border border-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink dark:text-white mb-2">
                Need a Cross-Functional Engineering Assessment?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Most complex systems combine multiple domains — such as a custom web portal with WhatsApp automated dispatch and QuickBooks sync. We architect unified solution roadmaps.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              href="/contact"
              arrow="right"
              className="w-full sm:w-auto shrink-0 justify-center"
            >
              Request consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
