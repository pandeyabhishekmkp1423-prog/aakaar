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
    <div className="w-full h-full bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.12)] hover:-translate-y-0.5 group cursor-pointer">
      <div>
        <div className="flex items-center justify-between mb-4">
          {displayNum && (
            <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors select-none">
              {displayNum}
            </span>
          )}
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-[#E8EDE4] dark:bg-[#151A0C] flex items-center justify-center text-[#151A0C] dark:text-[#B9F000] shrink-0 border border-black/5 dark:border-white/5">
              {icon}
            </div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-heading font-bold text-[#0B0E0B] dark:text-white mb-2 sm:mb-2.5 tracking-[-0.015em] leading-snug group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#5C6656] dark:text-[#A2A69B] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-3 flex items-center text-xs font-semibold text-[#151A0C] dark:text-[#B9F000] group-hover:translate-x-0.5 transition-transform">
        <span>Explore capability</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#B9F000] rounded-xl group"
      >
        {cardInner}
      </Link>
    );
  }

  return <div className="h-full">{cardInner}</div>;
}
