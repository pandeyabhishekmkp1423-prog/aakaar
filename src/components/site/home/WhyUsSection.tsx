import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "@/components/common/Link";

export function WhyUsSection() {
  return (
    <section className="ad-intro relative" id="about">
      <div id="why-us" className="absolute -top-24 pointer-events-none" />
      <div className="ad-container">
        {/* Top Editorial Grid: Philosophy & Manifesto */}
        <div className="ad-intro-grid">
          <div>
            <p className="ad-kicker">01 / The Aakaar Philosophy</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#151A0C] text-[#4B6300] dark:text-[#B9F000] text-xs font-bold mb-4">
              <Sparkles size={14} />
              <span>Full-Stack Synergy</span>
            </div>
          </div>
          <div>
            <h2>
              Marketing without technology is fragile.
              <br />
              <span>Technology without growth is invisible.</span>
            </h2>
            <p className="ad-body">
              Traditional marketing agencies don&apos;t know how to write production code or scale cloud databases.
              Traditional IT outsourcing shops don&apos;t know how to generate commercial pipeline or convert paid traffic.
              Aakaar Digital unites both worlds into a single, high-velocity engineering and growth powerhouse.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link href="/about" className="ad-text-link group">
                <span>Our Leadership &amp; Engineering Culture</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Team Showcase Card: Humanizing the Philosophy */}
        <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl border border-[#DCE3D6] dark:border-[#22291C] bg-white/85 dark:bg-[#151711]/90 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle lime glow background */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_100%,rgba(185,240,0,0.18),transparent_70%)]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Team Identity & Core Pillars */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] text-xs font-bold border border-[#DCE3D6] dark:border-[#2A3A14]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B9F000] animate-pulse" />
                <span>Meet the Builders Behind Aakaar</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B0E0B] dark:text-white font-['Manrope',sans-serif] leading-tight">
                One unified team of engineers, designers &amp; growth hackers.
              </h3>
              <p className="text-sm sm:text-base text-[#4C5449] dark:text-[#A2A69B] leading-relaxed">
                No junior outsourced delegates or layers of account managers. You collaborate directly with passionate specialists who build production systems and scale revenue funnels.
              </p>

              {/* Credential Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14]">
                  Senior Software Engineers
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14]">
                  Growth &amp; CRO Strategists
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] border border-[#DCE3D6] dark:border-[#2A3A14]">
                  UI/UX Systems Architects
                </span>
              </div>

              {/* Direct Link to About Page */}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#101407] dark:text-white hover:text-[#4B6300] dark:hover:text-[#B9F000] transition-colors group"
                >
                  <span>Explore our team &amp; global culture</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Cheerful Team Illustration */}
            <div className="lg:col-span-7 flex justify-center items-end relative pt-4 lg:pt-0">
              <div className="relative w-full max-w-[620px]">
                <img
                  src="/Cheerful Group Selfie Cutout.png"
                  alt="Aakaar Digital Team - The Engineers and Growth Strategists"
                  className="w-full h-auto object-contain drop-shadow-md select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
