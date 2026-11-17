import { useSEO } from "@/lib/seo";
import {
  HeroSection,
  TrustMetricsBar,
  WhyUsSection,
  CapabilitiesSection,
  SolutionConfiguratorSection,
  CaseStudiesSection,
  ProcessSection,
  IndustriesSection,
  FaqSection,
  CtaSection,
} from "@/components/site/home";

export default function HomePage() {
  useSEO({
    title: "Aakaar Digital | Worldwide Digital Marketing & Enterprise IT Solutions",
    description:
      "Aakaar Digital is a premier global digital growth agency and software engineering firm. We build high-ROAS marketing funnels, global SEO, custom web applications, mobile apps, CRM systems, and WhatsApp automations for ambitious businesses worldwide.",
    canonical: "/",
  });

  return (
    <div className="aakaar-page">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Global Trust & Enterprise Credential Bar */}
      <TrustMetricsBar />

      {/* 3. The Aakaar Philosophy (Why Us) */}
      <WhyUsSection />

      {/* 4. Interactive Capabilities Matrix (Marketing vs Technology) */}
      <CapabilitiesSection />

      {/* 5. Interactive Solution Configurator & Scoping Engine */}
      <SolutionConfiguratorSection />

      {/* 6. Selected Case Studies & Proven Global Impact */}
      <CaseStudiesSection />

      {/* 7. How We Work (4-Stage Execution Model) */}
      <ProcessSection />

      {/* 8. Industry Specializations & Verticals */}
      <IndustriesSection />

      {/* 9. Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 10. Closing Strategic Call-To-Action */}
      <CtaSection />
    </div>
  );
}
