import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Link from "@/components/common/Link";
import Image from "@/components/common/Image";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  FolderTree,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Loader2,
  Menu,
  X,
} from "lucide-react";

function AdminLayoutInner({ children }: { children?: React.ReactNode }) {
  const { user, isLoading, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // If on login page, render clean layout without sidebar
  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-canvas">{children || <Outlet />}</main>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
          <span className="text-sm font-semibold text-secondary">
            Verifying admin credentials...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { name: "Blog Posts", href: "/admin/posts", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand & Close Button (on mobile) */}
      <div className="h-16 sm:h-20 px-5 sm:px-6 flex items-center justify-between border-b border-line">
        <Link href="/admin" className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-[#0B0E0B] border border-[#22291C] p-1.5 shrink-0 flex items-center justify-center shadow-xs">
            <Image
              src="/Angular White and Neon Lime Logo.png"
              alt="Aakaar Digital"
              width={36}
              height={36}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-heading font-extrabold text-[15px] sm:text-[16px] leading-none tracking-[-0.02em] text-[#14232B] dark:text-white">
              Aakaar Digital <span className="text-[#4B6300] dark:text-[#B9F000]">Admin</span>
            </span>
            <span className="text-xs sm:text-xs text-[#52636A] dark:text-[#B9C8C4] font-semibold uppercase tracking-[0.07em] leading-none mt-1">
              MANAGEMENT PORTAL
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-2 rounded-lg text-secondary hover:text-ink hover:bg-mist transition-colors cursor-pointer"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="p-4 flex-1 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                isActive
                  ? "bg-primary-spruce text-white shadow-xs"
                  : "text-secondary hover:text-ink hover:bg-mist"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-line space-y-3 bg-canvas/40">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-secondary hover:text-ink hover:bg-mist transition-colors min-h-[40px]"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </span>
          <span className="text-xs bg-canvas px-1.5 py-0.5 rounded border border-line">â†—</span>
        </Link>

        <div className="pt-2 border-t border-line flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-mist text-primary-spruce flex items-center justify-center text-xs font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-ink truncate max-w-[120px]">
                {user.name}
              </span>
              <span className="text-xs text-secondary flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-primary-spruce" />
                <span className="capitalize">{user.role}</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="p-2 rounded-lg hover:bg-red-500/10 text-secondary hover:text-red-600 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row">
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex w-64 bg-surface border-r border-line shrink-0 flex-col h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-surface border-b border-line px-4 flex items-center justify-between shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-xl border border-line text-secondary hover:text-ink hover:bg-mist min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Open admin navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B0E0B] border border-[#22291C] p-1 shrink-0 flex items-center justify-center shadow-xs">
              <Image
                src="/Angular White and Neon Lime Logo.png"
                alt="Aakaar Digital"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading font-bold text-sm text-ink">
              Admin <span className="text-[#4B6300] dark:text-[#B9F000]">Portal</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50 animate-in fade-in duration-200"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sliding Off-Canvas Sidebar */}
      {mobileNavOpen && (
        <aside
          className="md:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-surface z-50 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200 border-r border-line"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Admin Navigation"
        >
          {sidebarContent}
        </aside>
      )}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-20 bg-surface border-b border-line px-8 items-center justify-between shrink-0">
          <div className="text-xs text-secondary font-medium">
            Aakaar Digital &bull; Secure Administration
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Body View */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children?: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}

