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
    <div className="w-full h-full bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_12px_32px_rgba(15,92,77,0.08)] dark:hover:shadow-[0_12px_32px_rgba(63,184,156,0.10)] hover:-translate-y-0.5 group cursor-pointer">
      <div>
        <div className="flex items-center justify-between mb-4">
          {displayNum && (
            <span className="font-mono text-xs font-semibold text-[#8B9DA3] dark:text-[#5E7A72] group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors select-none">
              {displayNum}
            </span>
          )}
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-[#E3EFEA] dark:bg-[#14352C] flex items-center justify-center text-[#0F5C4D] dark:text-[#3FB89C] shrink-0">
              {icon}
            </div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-heading font-bold text-[#14232B] dark:text-white mb-2 sm:mb-2.5 tracking-[-0.015em] leading-snug group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-3 flex items-center text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] group-hover:translate-x-0.5 transition-transform">
        <span>Explore capability</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] dark:focus-visible:ring-[#3FB89C] rounded-xl group"
      >
        {cardInner}
      </Link>
    );
  }

  return <div className="h-full">{cardInner}</div>;
}
