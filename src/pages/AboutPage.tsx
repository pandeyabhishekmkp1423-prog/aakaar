import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  useSEO({
    title: "About Us | Worldwide Digital Marketing & IT Solutions | Aakaar Digital",
    description:
      "Learn about Aakaar Digital: our fusion of high-ROAS digital marketing and rigorous software engineering. Delivering custom web apps, mobile solutions, CRM architectures, and global SEO worldwide.",
    canonical: "/about",
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <section className="pt-12 pb-12 sm:pt-20 sm:pb-16 border-b border-line bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#151A0C] dark:text-[#B9F000] uppercase tracking-wider block mb-2">
              Our Engineering &amp; Growth Heritage
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              Engineering Software &amp; Scaling Brands for Modern Enterprises Worldwide.
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed prose-measure">
              Aakaar Digital was established with a singular conviction: growing and mid-sized businesses globally deserve genuine engineering rigor, measurable marketing ROI, and complete intellectual property ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Culture Visual Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-b from-canvas via-[#E8EDE4]/40 to-surface dark:from-[#0B0E0B] dark:via-[#14180E] dark:to-[#12150E] border-b border-line py-12 sm:py-16">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl border border-[#DCE3D6] dark:border-[#22291C] bg-white/85 dark:bg-[#151711]/90 backdrop-blur-md overflow-hidden shadow-sm relative">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,rgba(185,240,0,0.18),transparent_70%)]" />

            <div className="relative z-10 px-6 pt-8 pb-0 sm:px-12 sm:pt-12 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] text-xs font-bold border border-[#DCE3D6] dark:border-[#2A3A14] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B9F000] animate-pulse" />
                Global Senior Engineering &amp; Growth Team
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink font-heading tracking-tight max-w-2xl mx-auto mb-3">
                The minds shaping your digital systems &amp; commercial pipeline.
              </h2>
              <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto mb-6">
                From full-stack web and mobile architects to performance marketing specialists, we build every digital asset with pride, craftsmanship, and measurable impact.
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-ink mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-[#4B6300] dark:text-[#B9F000] font-bold">✓</span>
                  <span>100% In-House Senior Talent</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4B6300] dark:text-[#B9F000] font-bold">✓</span>
                  <span>Direct Engineer-to-Client Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4B6300] dark:text-[#B9F000] font-bold">✓</span>
                  <span>Worldwide Timezone Coverage</span>
                </div>
              </div>

              {/* Team Illustration */}
              <div className="w-full max-w-3xl mx-auto flex justify-center items-end -mb-1">
                <img
                  src="/Cheerful Group Selfie Cutout.png"
                  alt="Aakaar Digital Team - The Engineers and Growth Strategists"
                  className="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 sm:py-24 border-b border-line bg-surface">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 prose-measure space-y-6 text-sm sm:text-base text-secondary leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
                Why We Reject Bloated Software & Per-Seat Lock-In
              </h2>
              <p>
                Around the world, countless growing enterprises enter digital technology relationships with high expectations, only to be met with fragile templates that break with every update, complex off-the-shelf CRMs that staff actively avoid using, and compounding monthly subscription licensing fees.
              </p>
              <p>
                We do things differently. We operate as a tightly integrated team of senior software engineers, mobile app developers, database architects, and automation specialists serving clients across North America, Europe, and worldwide. When you engage Aakaar Digital, you speak directly with the practitioners designing your data models, writing your TypeScript components, and configuring your API webhooks.
              </p>
              <p>
                We hold our work to uncompromising standards. Every web application we deliver is audited against WCAG 2.2 Level AA accessibility benchmarks, loads in under 2.5 seconds on mobile connections, and complies strictly with international data governance standards (GDPR, PIPEDA, CCPA).
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-6">
                Our Core Operating Principles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="w-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-3 block select-none">
                      01
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B0E0B] dark:text-white group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-2 leading-snug">
                      100% Code & IP Ownership
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6656] dark:text-[#A2A69B] leading-relaxed">
                      You own all source code repositories, databases, and deployment scripts upon final milestone. Zero proprietary agency locks, per-seat licenses, or hidden retainers.
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-3 block select-none">
                      02
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B0E0B] dark:text-white group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-2 leading-snug">
                      Global Data Governance
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6656] dark:text-[#A2A69B] leading-relaxed">
                      We architect systems to deploy across secure international cloud regions (AWS, Azure, GCP), respecting regional privacy laws including GDPR, PIPEDA, and CCPA.
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-3 block select-none">
                      03
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B0E0B] dark:text-white group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-2 leading-snug">
                      Pragmatic Tech Stacks
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6656] dark:text-[#A2A69B] leading-relaxed">
                      We build with proven modern standards — Next.js, React, TypeScript, PHP/Laravel, PostgreSQL — that future developers can inspect, extend, and deploy effortlessly.
                    </p>
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-3 block select-none">
                      04
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B0E0B] dark:text-white group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-2 leading-snug">
                      Transparent Engineering Communication
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C6656] dark:text-[#A2A69B] leading-relaxed">
                      Direct communication with lead engineers. Transparent sprint demos, reproducible testing benchmarks, and clear architectural roadmaps without agency smoke and mirrors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Facts */}
            <div className="lg:col-span-4">
              <div className="rounded-xl p-6 sm:p-8 bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] space-y-6 sticky top-28 shadow-xs">
                <h3 className="text-base sm:text-lg font-bold font-heading text-ink">
                  At a Glance
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-ink">Service Delivery</div>
                    <div className="text-secondary">Worldwide (Seamless Cross-Timezone Collaboration)</div>
                  </div>
                  <div>
                    <div className="font-semibold text-ink">Primary Specialisms</div>
                    <div className="text-secondary">Web, Mobile Apps, Custom Software, CRM, LMS, WhatsApp Automation</div>
                  </div>
                  <div>
                    <div className="font-semibold text-ink">Compliance Standards</div>
                    <div className="text-secondary">GDPR, PIPEDA, CCPA, WCAG 2.2 AA</div>
                  </div>
                  <div>
                    <div className="font-semibold text-ink">Operating Language</div>
                    <div className="text-secondary">English (Global Commercial Standards)</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-line">
                  <Button variant="primary" size="md" href="/contact" arrow="right" className="w-full justify-center">
                    Start a Conversation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-canvas">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="panel-card p-8 sm:p-12 bg-surface border border-border text-center max-w-3xl mx-auto shadow-xs rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading tracking-tight mb-4">
              Build With a Dedicated Global Engineering Partner
            </h2>
            <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Discuss your software roadmap with our senior technical team. We review your specifications, evaluate architecture options, and provide clear milestone estimates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/contact" arrow="right">
                Contact our technical team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
