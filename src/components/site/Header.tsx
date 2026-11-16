import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";
import { ThemeToggle } from "./ThemeToggle";
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
} from "lucide-react";

function getPageShortTitle(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname === "/services") return "Services";
  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace("/services/", "");
    const map: Record<string, string> = {
      "web-development": "Web Development",
      "mobile-app-development": "Mobile App Development",
      "custom-software": "Custom Software",
      "crm-solutions": "CRM Solutions",
      "lms-platforms": "LMS & E-Learning",
      "whatsapp-automation": "WhatsApp Automation",
      "integrations-automation": "Integrations & Automation",
      "maintenance-support": "Maintenance & Support",
    };
    if (map[slug]) return map[slug];
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  if (pathname === "/case-studies") return "Case Studies";
  if (pathname.startsWith("/case-studies/")) {
    const slug = pathname.replace("/case-studies/", "");
    const map: Record<string, string> = {
      "vanguard-telematics-chicago": "Vanguard Telematics",
      "apex-health-portal-austin": "Apex Health Portal",
      "solis-manufacturing-erp-columbus": "Solis Manufacturing",
      "beacon-trades-field-crm-atlanta": "Beacon Trades CRM",
    };
    return map[slug] || "Case Study";
  }
  if (pathname === "/industries") return "Industries";
  if (pathname.startsWith("/industries/")) {
    const slug = pathname.replace("/industries/", "");
    const map: Record<string, string> = {
      "logistics-supply-chain": "Logistics & Supply",
      "healthcare-life-sciences": "Healthcare & Life Sciences",
      "manufacturing-distribution": "Manufacturing & Distribution",
      "commercial-trades-contracting": "Commercial Trades",
      "professional-financial-services": "Financial Services",
      "retail-wholesale-commerce": "Retail & Wholesale",
    };
    return map[slug] || "Industry";
  }
  if (pathname === "/about") return "About Us";
  if (pathname === "/contact") return "Contact & Quote";
  if (pathname === "/blog") return "Engineering Blog";
  if (pathname.startsWith("/blog/")) return "Blog Article";
  if (pathname === "/privacy-policy") return "Privacy Policy";
  if (pathname === "/terms") return "Terms of Service";
  if (pathname.startsWith("/admin")) return "Admin Portal";

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const last = segments[segments.length - 1];
    return last
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Overview";
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const pageShortTitle = getPageShortTitle(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
    setSearchOpen(false);
  }, [pathname]);

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

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setServicesOpen(false);
        setAboutOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

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
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 h-[82px] flex items-center justify-between gap-6 lg:gap-10">
        <div className="flex min-w-0 items-center gap-8 lg:gap-12">
          <Link
            href="/"
            className="flex items-center gap-3 group select-none py-1"
            id="header-brand-logo"
            aria-label="Aakaar Digital - Go to Homepage"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B0E0B] border border-[#22291C] p-1.5 shrink-0 flex items-center justify-center shadow-xs group-hover:border-[#AEDD00] transition-all">
                <Image
                  src="/Angular White and Neon Lime Logo.png"
                  alt="Aakaar Digital logo"
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            <span className="text-[17px] sm:text-[19px] font-bold tracking-[-0.045em] leading-none text-ink dark:text-white group-hover:text-[#4B6300] dark:group-hover:text-[#B9F000] transition-colors whitespace-nowrap">Aakaar Digital</span>
          </Link>

          <nav
            className="hidden md:flex min-w-0 flex-1 items-center justify-center gap-5 lg:gap-7 xl:gap-8"
            aria-label="Main Navigation"
          >
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className={`text-[14px] font-medium transition-colors flex items-center gap-1 cursor-pointer py-2 ${
                  pathname.startsWith("/services")
                    ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                    : "text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#B9F000]"
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                id="services-menu-button"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180 opacity-100" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 w-88 pt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100"
                  role="menu"
                >
                  <div className="p-2.5 bg-white dark:bg-[#151711] border border-black/[0.08] dark:border-[#22291C] rounded-2xl shadow-xl">
                    <div className="px-3 py-1.5 text-xs font-semibold text-secondary uppercase tracking-wider border-b border-line mb-1 flex items-center gap-1.5">
                      <span>Enterprise Software & IT</span>
                    </div>
                    <div className="grid grid-cols-1 gap-0.5 max-h-[380px] overflow-y-auto">
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#151A0C] transition-colors group"
                          role="menuitem"
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] leading-tight">
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
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#151A0C] dark:text-[#B9F000] hover:underline"
                      >
                        <span>View all 8 services index</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              className={`text-[14px] font-medium transition-colors ${
                pathname.startsWith("/case-studies")
                  ? "text-[#4B6300] dark:text-[#AEDD00] font-semibold"
                  : "text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#AEDD00]"
              }`}
            >
              Case Studies
            </Link>

            <Link
              href="/industries"
              className={`text-[14px] font-medium transition-colors ${
                pathname.startsWith("/industries")
                  ? "text-[#4B6300] dark:text-[#AEDD00] font-semibold"
                  : "text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#AEDD00]"
              }`}
            >
              Industries
            </Link>

            <button
              type="button"
              onClick={() => {
                if (pathname === "/") {
                  document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" });
                  }, 120);
                }
              }}
              className="text-[14px] font-medium text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#AEDD00] transition-colors cursor-pointer"
            >
              How We Work
            </button>

            <div className="relative" onMouseLeave={() => setAboutOpen(false)}>
              <button
                type="button"
                onClick={() => setAboutOpen(!aboutOpen)}
                onMouseEnter={() => setAboutOpen(true)}
                className={`text-[14px] font-medium transition-colors flex items-center gap-1 cursor-pointer py-2 ${
                  pathname === "/about"
                    ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                    : "text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#B9F000]"
                }`}
                aria-expanded={aboutOpen}
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                    aboutOpen ? "rotate-180 opacity-100" : ""
                  }`}
                />
              </button>

              {aboutOpen && (
                <div
                  className="absolute top-full left-0 w-56 pt-2 z-50 animate-in fade-in-50 zoom-in-95 duration-100"
                  role="menu"
                >
                  <div className="p-2 bg-white dark:bg-[#151711] border border-black/[0.08] dark:border-[#22291C] rounded-xl shadow-xl space-y-0.5 text-xs sm:text-sm">
                    <Link
                      href="/about"
                      className="block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#151A0C] text-ink font-medium"
                    >
                      About Our Team
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setAboutOpen(false);
                        if (pathname === "/") {
                          document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          navigate("/");
                          setTimeout(() => {
                            document.getElementById("why-us")?.scrollIntoView({ behavior: "smooth" });
                          }, 120);
                        }
                      }}
                      className="w-full text-left block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#151A0C] text-ink font-medium cursor-pointer"
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
                          navigate("/");
                          setTimeout(() => {
                            document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                          }, 120);
                        }
                      }}
                      className="w-full text-left block px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#151A0C] text-ink font-medium cursor-pointer"
                    >
                      Frequently Asked Questions
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`text-[14px] font-medium transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-[#4B6300] dark:text-[#B9F000] font-semibold"
                  : "text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#B9F000]"
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex shrink-0 items-center gap-4 lg:gap-5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-1.5 text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#B9F000] transition-colors cursor-pointer"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link
            href="/contact"
            className="text-[13.5px] font-medium text-ink/80 hover:text-[#4B6300] dark:text-[#F1F3EC] dark:hover:text-[#B9F000] transition-colors"
          >
            Talk to an expert
          </Link>

          <ThemeToggle />

          <Link
            href="/contact"
            className="btn-primary group !min-h-[42px] !px-5 !py-2 !text-[13.5px]"
            id="header-cta-quote-btn"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#374151] hover:text-black dark:text-[#B9C8C4] dark:hover:text-white"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111827] dark:text-white cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-[#12231F] rounded-2xl shadow-2xl border border-line p-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-secondary absolute left-3.5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, guides, technical articles..."
                className="w-full pl-11 pr-24 py-3 rounded-xl border border-line bg-canvas text-ink text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#B9F000]"
              />
              <button
                type="submit"
                className="absolute right-2 px-3 py-1.5 rounded-lg bg-[#0A0D10] text-white text-xs font-semibold hover:bg-black"
              >
                Search
              </button>
            </form>
            <div className="mt-3 pt-3 border-t border-line text-xs text-secondary flex items-center justify-between">
              <span>Press [ESC] to close</span>
              <span>Aakaar Digital Search</span>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[82px] bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {mobileMenuOpen && (
        <div
          className="fixed top-[82px] left-0 right-0 z-50 md:hidden bg-white dark:bg-[#0B0E0B] border-b border-line shadow-2xl max-h-[calc(100vh-5.125rem)] overflow-y-auto overscroll-contain animate-in slide-in-from-top-3 duration-200"
          id="mobile-navigation-drawer"
        >
          <div className="px-5 py-6 max-w-md mx-auto space-y-3">
            <div className="rounded-xl border border-line bg-canvas/40 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-sm font-bold text-ink cursor-pointer hover:bg-mist transition-colors min-h-[44px]"
              >
                <span>Services (8)</span>
                <ChevronDown
                  className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-line/60 bg-surface space-y-1">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-secondary hover:text-ink hover:bg-mist transition-colors min-h-[40px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {s.icon}
                      <span className="truncate">{s.name}</span>
                    </Link>
                  ))}
                  <div className="pt-2 px-3 border-t border-line/50 mt-1">
                    <Link
                      href="/services"
                      className="flex items-center justify-between text-xs font-bold text-[#151A0C] dark:text-[#B9F000] hover:underline py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>View all 8 services index</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/case-studies"
              className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>

            <Link
              href="/industries"
              className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Industries
            </Link>

            <button
              type="button"
              className="w-full text-left block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center cursor-pointer"
              onClick={() => {
                setMobileMenuOpen(false);
                if (pathname === "/") {
                  document.getElementById("development-process")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/");
                  setTimeout(() => {
                    document.getElementById("development-process")?.scrollIntoView({ behavior: "smooth" });
                  }, 120);
                }
              }}
            >
              How We Work
            </button>

            <Link
              href="/about"
              className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/blog"
              className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog & Insights
            </Link>

            <Link
              href="/contact"
              className="block px-4 py-3 text-sm font-semibold text-ink hover:bg-mist rounded-xl transition-colors min-h-[44px] flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact & Enquiries
            </Link>

            <div className="pt-4">
              <Link
                href="/contact"
                className="btn-primary w-full group !min-h-[46px] !text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-line grid grid-cols-2 gap-2 text-xs text-secondary">
              <a
                href="mailto:info@aakaardigital.com"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-canvas border border-line hover:text-ink transition-colors min-h-[40px]"
              >
                <Mail className="w-3.5 h-3.5 text-[#B9F000]" />
                <span>Email Us</span>
              </a>
              <a
                href="tel:+18005550199"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-canvas border border-line hover:text-ink transition-colors min-h-[40px]"
              >
                <Phone className="w-3.5 h-3.5 text-[#B9F000]" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

