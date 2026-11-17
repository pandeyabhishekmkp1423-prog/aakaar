import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@/components/common/Link";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Search,
  Globe,
  Smartphone,
  Code2,
  Users,
  GraduationCap,
  MessageSquare,
  Cpu,
  ShieldCheck,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Scroll detection for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route change reset
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile drawer
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  // Global Keyboard Shortcuts (⌘K, Ctrl+K, /, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setServicesOpen(false);
        setAboutOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const services = [
    {
      name: "Web Development",
      href: "/services/web-development",
      desc: "Next.js, React & full-stack web platforms",
      icon: <Globe className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "Mobile App Development",
      href: "/services/mobile-app-development",
      desc: "iOS, Android & Flutter cross-platform apps",
      icon: <Smartphone className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "Custom Software",
      href: "/services/custom-software",
      desc: "Bespoke business platforms & SaaS systems",
      icon: <Code2 className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "CRM Solutions",
      href: "/services/crm-solutions",
      desc: "Pipelines, lead workflows & custom CRM builds",
      icon: <Users className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "LMS & E-Learning",
      href: "/services/lms-platforms",
      desc: "Course portals, assessments & training suites",
      icon: <GraduationCap className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "WhatsApp Automation",
      href: "/services/whatsapp-automation",
      desc: "Official WhatsApp Cloud API & customer chatbots",
      icon: <MessageSquare className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "Integrations & Automation",
      href: "/services/integrations-automation",
      desc: "REST APIs, accounting sync & ERP workflows",
      icon: <Cpu className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
    {
      name: "Maintenance & Support",
      href: "/services/maintenance-support",
      desc: "Proactive SLAs, security patches & uptime",
      icon: <ShieldCheck className="w-4 h-4 text-[#B9F000] shrink-0" />,
    },
  ];

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 border-b ${
          isScrolled ? "shadow-md" : "shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between gap-4 lg:gap-6">
          
          {/* ================================================================ */}
          {/* 1. BRAND LOCKUP: Toggle-Adaptive A/K Emblem + Manrope Wordmark */}
          {/* ================================================================ */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-3.5 group select-none py-1"
              id="header-brand-logo"
              aria-label="Aakaar Digital - Home"
            >
              {/* Dark mode emblem: White 'A' + Electric Lime 'K' */}
              <img
                src="/aakaar-logo-emblem.png"
                alt="Aakaar Digital emblem"
                className="theme-logo-dark h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              {/* Light mode emblem: Deep Charcoal 'A' + Rich Lime 'K' (100% visible on light mode!) */}
              <img
                src="/aakaar-logo-emblem-dark.png"
                alt="Aakaar Digital emblem"
                className="theme-logo-light h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />

              {/* Clean Horizontal Brand Name in Manrope */}
              <span className="font-['Manrope',sans-serif] text-[21px] sm:text-[22px] md:text-[23px] font-[750] tracking-[-0.03em] leading-none text-ink dark:text-white flex items-baseline gap-1.5 whitespace-nowrap">
                <span>Aakaar</span>
                <span className="theme-brand-accent font-[750]">Digital</span>
              </span>
            </Link>
          </div>

          {/* ================================================================ */}
          {/* 2. CENTER NAVIGATION (No multi-line wrapping, whitespace-nowrap) */}
          {/* ================================================================ */}
          <nav
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-7 whitespace-nowrap shrink-0"
            aria-label="Main Navigation"
          >
            {/* Services Dropdown */}
            <div className="relative shrink-0" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`text-[14.5px] font-medium transition-colors flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap shrink-0 ${
                  pathname.startsWith("/services")
                    ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                    : "text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000]"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                id="services-menu-button"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 opacity-100 text-[#4B6300] dark:text-[#B9F000]" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 w-88 pt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100"
                  role="menu"
                >
                  <div className="p-2.5 bg-white dark:bg-[#0D130A] border border-[#DCE3D6] dark:border-[#2A3A14] rounded-2xl shadow-2xl">
                    <div className="px-3 py-1.5 text-xs font-semibold text-secondary uppercase tracking-wider border-b border-line mb-1 flex items-center justify-between">
                      <span>Enterprise Software &amp; IT</span>
                      <span className="text-[10px] font-mono text-[#4B6300] dark:text-[#B9F000] bg-lime/10 px-1.5 py-0.5 rounded font-bold">
                        8 CAPABILITIES
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5 max-h-[380px] overflow-y-auto">
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-3 py-2 rounded-xl hover:bg-surface-2 transition-colors group/item"
                          role="menuitem"
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink group-hover/item:text-[#4B6300] dark:group-hover/item:text-[#B9F000] leading-tight">
                            {s.icon}
                            <span>{s.name}</span>
                          </div>
                          <div className="text-xs text-secondary line-clamp-1 mt-0.5 ml-6">
                            {s.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-line mt-1">
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-ink hover:text-[#4B6300] dark:hover:text-[#B9F000] transition-colors"
                      >
                        <span>Explore all software services</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4B6300] dark:text-[#B9F000]" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Case Studies Link — whitespace-nowrap prevents 2-line wrap */}
            <Link
              href="/case-studies"
              className={`text-[14.5px] font-medium transition-colors py-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith("/case-studies")
                  ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                  : "text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000]"
              }`}
            >
              Case Studies
            </Link>

            {/* Industries Link */}
            <Link
              href="/industries"
              className={`text-[14.5px] font-medium transition-colors py-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith("/industries")
                  ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                  : "text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000]"
              }`}
            >
              Industries
            </Link>

            {/* How We Work Anchor — whitespace-nowrap prevents 2-line wrap */}
            <button
              type="button"
              onClick={() => {
                if (pathname === "/") {
                  document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/", { state: { scrollTo: "how-we-work" } });
                }
              }}
              className="text-[14.5px] font-medium text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000] transition-colors cursor-pointer py-2 whitespace-nowrap shrink-0"
            >
              How We Work
            </button>

            {/* About Dropdown */}
            <div className="relative shrink-0" onMouseLeave={() => setAboutOpen(false)}>
              <button
                type="button"
                onClick={() => setAboutOpen(!aboutOpen)}
                onMouseEnter={() => setAboutOpen(true)}
                className={`text-[14.5px] font-medium transition-colors flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap shrink-0 ${
                  pathname === "/about"
                    ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                    : "text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000]"
                }`}
                aria-expanded={aboutOpen}
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    aboutOpen ? "rotate-180 opacity-100 text-[#4B6300] dark:text-[#B9F000]" : ""
                  }`}
                />
              </button>

              {aboutOpen && (
                <div
                  className="absolute top-full left-0 w-60 pt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100"
                  role="menu"
                >
                  <div className="p-2.5 bg-white dark:bg-[#0D130A] border border-[#DCE3D6] dark:border-[#2A3A14] rounded-2xl shadow-2xl space-y-0.5 text-xs sm:text-sm">
                    <Link
                      href="/about"
                      className="block px-3 py-2 rounded-xl hover:bg-surface-2 text-ink hover:text-[#4B6300] dark:hover:text-[#B9F000] font-medium transition-colors whitespace-nowrap"
                    >
                      About Aakaar Digital
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setAboutOpen(false);
                        if (pathname === "/") {
                          document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          navigate("/", { state: { scrollTo: "why-us" } });
                        }
                      }}
                      className="w-full text-left block px-3 py-2 rounded-xl hover:bg-surface-2 text-ink hover:text-[#4B6300] dark:hover:text-[#B9F000] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Why Choose Us
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAboutOpen(false);
                        if (pathname === "/") {
                          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          navigate("/", { state: { scrollTo: "faq" } });
                        }
                      }}
                      className="w-full text-left block px-3 py-2 rounded-xl hover:bg-surface-2 text-ink hover:text-[#4B6300] dark:hover:text-[#B9F000] font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Frequently Asked Questions
                    </button>
                    <Link
                      href="/styleguide"
                      className="block px-3 py-2 rounded-xl hover:bg-surface-2 text-ink hover:text-[#4B6300] dark:hover:text-[#B9F000] font-medium transition-colors border-t border-line mt-1 pt-2 whitespace-nowrap"
                    >
                      Design System &amp; Tokens
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Engineering Blog Link */}
            <Link
              href="/blog"
              className={`text-[14.5px] font-medium transition-colors py-2 whitespace-nowrap shrink-0 ${
                pathname.startsWith("/blog")
                  ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                  : "text-ink/80 dark:text-white/80 hover:text-[#4B6300] dark:hover:text-[#B9F000]"
              }`}
            >
              Blog
            </Link>
          </nav>

          {/* ================================================================ */}
          {/* 3. DESKTOP ACTIONS: Compact Search Icon, Talk Expert, Theme, CTA */}
          {/* ================================================================ */}
          <div className="hidden lg:flex shrink-0 items-center gap-3 xl:gap-4 whitespace-nowrap">
            {/* Compact Search Trigger Icon Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl border border-border bg-surface-2/70 dark:bg-[#0D130A] hover:bg-surface hover:border-[#4B6300] dark:hover:border-[#B9F000]/60 text-secondary hover:text-ink dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-2xs shrink-0"
              aria-label="Universal Site Search (Press ⌘K or / to open)"
              title="Search (⌘K or Ctrl+K)"
            >
              <Search className="w-4 h-4 text-secondary hover:text-[#4B6300] dark:hover:text-[#B9F000] transition-colors" />
            </button>

            {/* Talk to an expert (Desktop Wide) */}
            <Link
              href="/contact"
              className="hidden xl:inline-flex text-[14px] font-medium text-secondary hover:text-ink dark:hover:text-white transition-colors py-2 px-1 whitespace-nowrap shrink-0"
            >
              Talk to an expert
            </Link>

            {/* Theme Toggle (Day & Night) */}
            <div className="shrink-0">
              <ThemeToggle />
            </div>

            {/* Master CTA Button (Refined Gradient, 10px Radius, Subtle Glow) */}
            <a
              href="/contact"
              id="header-cta-quote-btn"
              className="group inline-flex items-center justify-center select-none whitespace-nowrap shrink-0"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* ================================================================ */}
          {/* 4. MOBILE / TABLET CONTROLS */}
          {/* ================================================================ */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl border border-border bg-surface-2 text-secondary hover:text-ink dark:hover:text-white hover:border-[#B9F000]/60 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 text-secondary" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl border border-border bg-surface-2 text-ink dark:text-white hover:text-[#B9F000] hover:border-[#B9F000]/60 flex items-center justify-center transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#B9F000]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* 5. MOBILE NAVIGATION DRAWER */}
        {/* ================================================================ */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 top-[80px] bg-black/75 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {mobileMenuOpen && (
          <div
            className="fixed top-[80px] left-0 right-0 z-50 lg:hidden bg-white dark:bg-[#0B0E0B] border-b border-line shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-3 duration-200"
            id="mobile-navigation-drawer"
          >
            <div className="px-5 py-6 max-w-md mx-auto space-y-3">
              {/* Quick Search Tap inside Drawer */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-line bg-surface-2 text-secondary hover:text-ink text-sm font-medium transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#B9F000]" />
                  <span>Search all services &amp; case studies...</span>
                </div>
                <kbd className="px-2 py-0.5 rounded bg-surface text-[10px] font-mono border border-line">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Accordion Services */}
              <div className="rounded-xl border border-line bg-surface-2/40 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full px-4 py-3 flex items-center justify-between text-sm font-bold text-ink cursor-pointer hover:bg-surface-2 transition-colors min-h-[44px]"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B9F000]" />
                    <span>Software &amp; IT Services (8)</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180 text-[#B9F000]" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="px-3 pb-3 pt-1 border-t border-line/60 bg-surface space-y-1">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-secondary hover:text-ink hover:bg-surface-2 transition-colors min-h-[40px]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {s.icon}
                        <span className="truncate">{s.name}</span>
                      </Link>
                    ))}
                    <div className="pt-2 px-3 border-t border-line/50 mt-1">
                      <Link
                        href="/services"
                        className="text-xs font-bold text-[#B9F000] flex items-center justify-between py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>View all services catalog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Nav Links */}
              <Link
                href="/case-studies"
                className="block px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Case Studies &amp; Outcomes</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>

              <Link
                href="/industries"
                className="block px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Industries &amp; Verticals</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (pathname === "/") {
                    document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/", { state: { scrollTo: "how-we-work" } });
                  }
                }}
                className="w-full text-left px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between cursor-pointer"
              >
                <span>How We Work (Process)</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </button>

              <Link
                href="/about"
                className="block px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About Aakaar Digital</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>

              <Link
                href="/blog"
                className="block px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Engineering Insights Blog</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>

              <Link
                href="/contact"
                className="block px-4 py-3 rounded-xl border border-line bg-surface-2/40 hover:bg-surface-2 text-sm font-bold text-ink transition-colors min-h-[44px] flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact &amp; Enquiries</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>

              <div className="pt-3">
                <a
                  href="/contact"
                  id="header-cta-quote-btn"
                  className="w-full justify-center !min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Get a Project Quote</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-line grid grid-cols-2 gap-2 text-xs text-secondary">
                <a
                  href="mailto:info@aakaardigital.com"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-surface-2 border border-line hover:text-ink transition-colors min-h-[40px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B9F000]" />
                  <span>Email Us</span>
                </a>
                <a
                  href="tel:+18005550199"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-surface-2 border border-line hover:text-ink transition-colors min-h-[40px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B9F000]" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================== */}
      {/* 6. UNIVERSAL SEARCH & COMMAND PALETTE MODAL */}
      {/* ================================================================== */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Header;
