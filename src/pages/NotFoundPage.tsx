import Link from "@/components/common/Link";
import Button from "@/components/common/Button";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/lib/seo";

export function NotFoundPage() {
  useSEO({
    title: "Page Not Found | Aakaar Digital",
    description: "The page you are looking for may have been moved, renamed, or is temporarily unavailable.",
  });

  return (
    <div className="flex-1 flex items-center justify-center py-20 sm:py-32 bg-canvas">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-sm font-mono font-bold text-[#4B6300] dark:text-[#B9F000] uppercase tracking-widest block mb-2">
            404 Error
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-secondary text-base leading-relaxed mb-8">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Button variant="primary" size="md" href="/" arrow="right">
              Return to Homepage
            </Button>
            <Button variant="secondary" size="md" href="/services">
              View Services
            </Button>
          </div>

          <div className="pt-8 border-t border-line text-xs text-secondary">
            Looking for something specific? Browse our{" "}
            <Link href="/blog" className="text-[#4B6300] dark:text-[#B9F000] underline font-medium hover:text-ink">
              Knowledge Base & Blog
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-[#4B6300] dark:text-[#B9F000] underline font-medium hover:text-ink">
              contact our team
            </Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;


