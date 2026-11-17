import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
import { CheckCircle2, Search, PhoneCall, FileText, ArrowRight, Home, Sparkles, MessageSquare } from "lucide-react";
import ThankYouTracker from "./ThankYouTracker";
import { useSEO } from "@/lib/seo";

export function SuccessPage() {
  useSEO({
    title: "Enquiry Received Successfully | Aakaar Digital",
    description: "Thank you for reaching out to Aakaar Digital. Our technical leads and growth strategists are reviewing your project requirements.",
    canonical: "/success",
  });

  return (
    <div className="py-16 sm:py-24 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Client component that triggers conversion tracking event */}
      <ThankYouTracker />

      <div className="max-w-3xl mx-auto text-center">
        {/* Animated Celebration Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#B9F000]/20 dark:bg-[#B9F000]/15 flex items-center justify-center text-[#3A4E00] dark:text-[#B9F000] border border-[#B9F000]/40 shadow-lg">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 animate-bounce" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#B9F000] flex items-center justify-center text-[#101407]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#B9F000] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#3A4E00] dark:text-[#B9F000]">
            Submission Confirmed
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Thank you, we&apos;ve received your project enquiry!
        </h1>

        {/* Narrative */}
        <p className="text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Your project specifications have been routed directly to our senior engineering and growth directors. We evaluate every inquiry with technical rigor and will connect within <strong className="text-ink font-semibold">one business day</strong>.
        </p>

        {/* 3-Step What Happens Next Card */}
        <div className="panel-card p-6 sm:p-10 bg-surface text-left mb-10 shadow-sm rounded-2xl border border-border">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#3A4E00] dark:text-[#B9F000] mb-8 text-center flex items-center justify-center gap-2">
            <span>What Happens Next In Your Project Journey</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-5 rounded-xl bg-canvas border border-line space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] flex items-center justify-center font-bold font-mono text-xs border border-[#DCE3D6] dark:border-[#2A3A14]">
                01
              </div>
              <h3 className="font-bold text-base text-ink font-heading flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000] shrink-0" />
                <span>Architecture Review</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Our architects inspect your feature requirements, tech stack constraints, database models, and API integrations.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-5 rounded-xl bg-canvas border border-line space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] flex items-center justify-center font-bold font-mono text-xs border border-[#DCE3D6] dark:border-[#2A3A14]">
                02
              </div>
              <h3 className="font-bold text-base text-ink font-heading flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000] shrink-0" />
                <span>Discovery Dialogue</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                We connect directly via video or phone call to align on business outcomes, commercial budget, and milestone timelines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-5 rounded-xl bg-canvas border border-line space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#E8EDE4] dark:bg-[#202716] text-[#3A4E00] dark:text-[#B9F000] flex items-center justify-center font-bold font-mono text-xs border border-[#DCE3D6] dark:border-[#2A3A14]">
                03
              </div>
              <h3 className="font-bold text-base text-ink font-heading flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000] shrink-0" />
                <span>Milestone Roadmap</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                You receive a transparent Statement of Work (SOW) with fixed phase deliverables, 100% IP ownership, and SLA warranties.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button variant="primary" size="md" href="/" icon={<Home className="w-4 h-4 mr-2" />} className="w-full sm:w-auto">
            Return to Homepage
          </Button>
          <Button variant="secondary" size="md" href="/case-studies" arrow="right" className="w-full sm:w-auto">
            Explore Proven Case Studies
          </Button>
          <Button variant="secondary" size="md" href="/services" className="w-full sm:w-auto">
            Browse All Services
          </Button>
        </div>

        {/* Urgent Contact & WhatsApp assistance */}
        <div className="p-6 rounded-2xl bg-canvas border border-line text-xs sm:text-sm text-secondary flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-semibold text-ink flex items-center justify-center sm:justify-start gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
              <span>Need immediate consultation or urgent scoping?</span>
            </div>
            <p className="text-xs text-secondary">
              Reach our engineering desk directly at{" "}
              <a href="mailto:info@aakaardigital.com" className="text-[#4B6300] dark:text-[#B9F000] underline font-semibold">
                info@aakaardigital.com
              </a>
            </p>
          </div>
          <a
            href="https://wa.me/18005550199"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs bg-[#25D366]/10 text-[#128C7E] dark:text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all shrink-0"
          >
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
