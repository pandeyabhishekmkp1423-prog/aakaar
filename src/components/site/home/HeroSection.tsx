import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "@/components/common/Link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="hero-viewport-section transition-colors duration-200 select-none overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(185, 240, 0, 0.12) 0%, transparent 65%), linear-gradient(180deg, #F1F5ED 0%, #E8EDE4 100%)",
      }}
    >
      {/* ==================================================================== */}
      {/* TOP AREA — TEXT CONTENT & CRADLED BUTTONS                             */}
      {/* ==================================================================== */}
      <div className="hero-text-block-responsive w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center shrink-0 z-20">
        {/* 1. EYEBROW LABEL */}
        <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/80 dark:bg-black/20 border border-[#DCE3D6] dark:border-[#2A3A14] mb-2 sm:mb-2.5 shadow-2xs backdrop-blur-xs max-w-full">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B9F000] shrink-0 animate-pulse" />
          <span className="font-['Manrope',sans-serif] text-[10.5px] xs:text-[11.5px] sm:text-[12px] font-bold tracking-[1.6px] uppercase text-[#3A4E00] dark:text-[#B9F000]">
            DIGITAL GROWTH &amp; TECHNOLOGY STUDIO
          </span>
        </div>

        {/* 2. MAIN HEADLINE */}
        <h1 className="hero-headline-responsive font-['Manrope',sans-serif] font-[800] tracking-[-0.035em] text-center max-w-[900px] mx-auto text-[30px] xs:text-[36px] sm:text-5xl lg:text-[64px] xl:text-[72px] mb-2 sm:mb-2.5">
          <span className="text-[#101407] dark:text-white">Ideas into </span>
          <span className="text-[#B9F000] inline-block">impact.</span>
        </h1>

        {/* 3. DESCRIPTION */}
        <p className="hero-desc-responsive font-['Inter',sans-serif] text-[#525C4D] dark:text-[#B5BDAA] max-w-[620px] mx-auto text-center font-normal px-2 text-[13.5px] xs:text-[14.5px] sm:text-[16px] md:text-[17px] mb-3 sm:mb-4">
          We combine digital marketing, creative design and technology solutions to help businesses grow, scale and move forward.
        </p>

        {/* 4. TWO PILL CTA BUTTONS (CRADLED ABOVE CHARACTERS) */}
        <div className="hero-btn-container-responsive flex flex-row items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 w-auto mb-0 relative z-30">
          {/* Primary CTA: Lime Gradient Pill */}
          <Link
            href="/contact"
            id="hero-cta-primary"
            className="hero-btn-responsive inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-7 py-2 sm:py-3 rounded-full font-semibold text-[#101407] transition-all duration-200 group cursor-pointer shadow-md hover:shadow-[0_8px_24px_rgba(185,240,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] text-xs sm:text-sm md:text-[15px] whitespace-nowrap"
            style={{
              background: "linear-gradient(110deg, #AEDD00 0%, #C5F500 52%, #B9F000 100%)",
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Secondary CTA: Crisp Glass Pill with Border */}
          <Link
            href="/case-studies"
            id="hero-cta-secondary"
            className="hero-btn-responsive inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 xs:px-5 sm:px-7 py-2 sm:py-3 rounded-full font-semibold text-[#101407] dark:text-white bg-white/90 dark:bg-black/30 hover:bg-white dark:hover:bg-black/40 border border-[#DCE3D6] dark:border-[#2A3A14] hover:border-[#101407]/40 dark:hover:border-white/40 transition-all duration-200 group cursor-pointer shadow-2xs hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm md:text-[15px] whitespace-nowrap"
          >
            <span>Explore Our Work</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* BOTTOM AREA — FULL-BLEED EDGE-TO-EDGE TEAM ILLUSTRATION              */}
      {/* ==================================================================== */}
      <div className="hero-team-wrapper">
        <img
          src="/Cheerful Group Selfie Cutout.png"
          alt="Aakaar Digital Team - Ideas into Impact"
          className="hero-team-image"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}

export default HeroSection;
