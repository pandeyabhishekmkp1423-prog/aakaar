import { ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import Button from "@/components/common/Button";

export function CtaSection() {
  return (
    <section className="ad-cta" id="contact">
      <div className="ad-container">
        <p className="ad-kicker">Initiate Your Next Growth Sprint</p>
        <h2>
          Let’s build something
          <br />
          <em>engineered for scale.</em>
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
          Connect directly with senior engineers and marketing growth leads. We analyze your tech stack, outline clear ROI metrics, and provide a comprehensive proposal within one business day.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="/contact" arrow="right">
            Start Your Software Project
          </Button>
          <Button variant="secondary" size="lg" href="/services" icon={<ArrowUpRight size={17} />}>
            Explore All 8 Services
          </Button>
        </div>
        <div className="mt-8 text-xs text-gray-400 flex items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#B9F000]" /> Strict Mutual NDA Protected
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B9F000]" /> Fast Response Guaranteed
          </span>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
