import Link from "@/components/common/Link";
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
          <span className="text-sm font-mono font-bold text-maple uppercase tracking-widest block mb-2">
            404 Error
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-ink tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-secondary text-base leading-relaxed mb-8">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/" className="btn-primary">
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/services" className="btn-secondary">
              View Services
            </Link>
          </div>

          <div className="pt-8 border-t border-line text-xs text-secondary">
            Looking for something specific? Browse our{" "}
            <Link href="/blog" className="text-primary-spruce underline">
              Knowledge Base & Blog
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary-spruce underline">
              contact our team
            </Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;


