import { useState, useEffect } from "react";
import Link from "@/components/common/Link";
import { ArrowRight, MessageSquare } from "lucide-react";

export function MobileStickyQuoteButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 760; // keep the CTA away from the hero and first content transition

      // Check if enquiry form is currently in view
      const formEl = document.getElementById("contact");
      let formInView = false;
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        formInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      // Hide if menu drawer has locked body scroll
      const isDrawerOpen = document.body.classList.contains("overflow-hidden");

      if (scrollY > heroThreshold && !formInView && !isDrawerOpen) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Also listen to body class mutations if drawer opens
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed left-4 right-4 z-40 animate-in slide-in-from-bottom-3 duration-200"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      id="mobile-sticky-quote-container"
    >
      <Link
        href="/contact"
        className="w-full h-12 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] dark:bg-[#3FB89C] dark:hover:bg-[#329B82] text-white dark:text-[#0C1815] font-semibold text-sm shadow-xl flex items-center justify-between px-5 border border-[#0A4136]/30 active:scale-[0.98] transition-all"
      >
        <span className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#3FB89C] dark:text-[#0C1815]" />
          <span>Request an Estimate</span>
        </span>
        <div className="w-6 h-6 rounded-[6px] bg-white/20 dark:bg-black/20 flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </div>
  );
}
