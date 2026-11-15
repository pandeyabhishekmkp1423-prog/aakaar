import Link from "@/components/common/Link";
import { CheckCircle2, Search, PhoneCall, FileText, ArrowRight, Home } from "lucide-react";
import ThankYouTracker from "./ThankYouTracker";
import { useSEO } from "@/lib/seo";

export default function ThankYouPage() {
  useSEO({
    title: "Thank You | Enquiry Received | Aakaar Digital",
    description: "We have received your enquiry and our engineering team will follow up within one business day.",
  });

  return (
    <div className="py-16 sm:py-24 max-w-[1160px] mx-auto px-4 sm:px-6">
      {/* Client component that triggers conversion tracking event */}
      <ThankYouTracker />

      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-mist text-primary-spruce mx-auto flex items-center justify-center mb-6 shadow-sm border border-[#3FB89C]/20">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-ink tracking-tight mb-4">
          Thank you, we have your enquiry
        </h1>

        {/* Reply Message */}
        <p className="text-secondary text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto">
          We have successfully received your project specifications. One of our senior technical leads will review your requirements and respond directly within <strong className="text-ink font-semibold">one business day</strong>.
        </p>

        {/* Three-step "What happens next" row */}
        <div className="panel-card p-6 sm:p-8 bg-surface text-left mb-10 shadow-xs">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary mb-6 text-center">
            What Happens Next
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-start space-y-2">
              <div className="w-10 h-10 rounded-xl bg-mist text-primary-spruce flex items-center justify-center font-bold font-mono text-sm">
                01
              </div>
              <h3 className="font-bold text-sm sm:text-base text-ink font-heading flex items-center gap-1.5">
                <Search className="w-4 h-4 text-primary-spruce shrink-0" />
                <span>We review</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Our engineers analyze your scope, tech stack compatibility, and integration endpoints.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start space-y-2">
              <div className="w-10 h-10 rounded-xl bg-mist text-primary-spruce flex items-center justify-center font-bold font-mono text-sm">
                02
              </div>
              <h3 className="font-bold text-sm sm:text-base text-ink font-heading flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-primary-spruce shrink-0" />
                <span>We reach out</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                We connect by email or phone to clarify architecture details and project timelines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start space-y-2">
              <div className="w-10 h-10 rounded-xl bg-mist text-primary-spruce flex items-center justify-center font-bold font-mono text-sm">
                03
              </div>
              <h3 className="font-bold text-sm sm:text-base text-ink font-heading flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary-spruce shrink-0" />
                <span>You get a plan</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                You receive a transparent roadmap with milestone deliverables, pricing, and warranty terms.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link href="/" className="btn-primary text-sm w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Link>
          <Link href="/services" className="btn-secondary text-sm w-full sm:w-auto">
            <span>Explore All 8 Services</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Fallback Email Line */}
        <p className="text-xs text-secondary">
          Need immediate assistance? Email our technical director directly at{" "}
          <a
            href="mailto:info@aakaardigital.com"
            className="text-primary-spruce underline hover:text-ink font-semibold"
          >
            info@aakaardigital.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

