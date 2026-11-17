import Link from "@/components/common/Link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  number?: string;
  stepNumber?: string;
  badge?: string;
  href?: string;
  icon?: React.ReactNode;
  accentTag?: string;
}

export default function FeatureCard({
  title,
  description,
  number,
  stepNumber,
  badge,
  href,
  icon,
}: FeatureCardProps) {
  const rawNum = number || stepNumber || badge;
  let displayNum = "";
  if (rawNum) {
    displayNum = /^\d+$/.test(rawNum) ? rawNum.padStart(2, "0") : rawNum;
  }

  const cardInner = (
    <div className="w-full h-full bg-surface border border-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-lime/80 hover:shadow-[0_12px_32px_rgba(180,232,30,0.18)] hover:-translate-y-1 group cursor-pointer">
      <div>
        <div className="flex items-center justify-between mb-4">
          {displayNum && (
            <span className="font-mono text-xs font-semibold text-text-muted group-hover:text-lime transition-colors select-none">
              {displayNum}
            </span>
          )}
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center text-lime shrink-0 border border-border">
              {icon}
            </div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-heading font-bold text-ink dark:text-white mb-2 sm:mb-2.5 tracking-[-0.015em] leading-snug group-hover:text-lime transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-3 flex items-center text-xs font-semibold text-lime group-hover:translate-x-0.5 transition-transform">
        <span>Explore capability</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-2xl group"
      >
        {cardInner}
      </Link>
    );
  }

  return <div className="h-full">{cardInner}</div>;
}
