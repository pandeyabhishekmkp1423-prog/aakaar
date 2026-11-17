import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteLayout from "./pages/layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import IndustriesPage from "./pages/IndustriesPage";
import IndustryDetailPage from "./pages/IndustryDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ThankYouPage from "./pages/ThankYouPage";
import SuccessPage from "./pages/SuccessPage";
import FaqPage from "./pages/FaqPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFoundPage from "./pages/NotFoundPage";
import StyleguidePage from "./pages/StyleguidePage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminEnquiriesPage from "./pages/admin/AdminEnquiriesPage";
import AdminPostsPage from "./pages/admin/AdminPostsPage";
import AdminNewPostPage from "./pages/admin/AdminNewPostPage";
import AdminEditPostPage from "./pages/admin/AdminEditPostPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminMediaPage from "./pages/admin/AdminMediaPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

function ScrollToTop() {
  const location = useLocation();
  const { pathname, hash, state } = location;

  useEffect(() => {
    const targetId =
      (state as { scrollTo?: string } | null)?.scrollTo ||
      (hash ? hash.replace("#", "") : null);

    if (targetId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);

      // Instantly scrub any residual hash from the browser address bar
      if (window.location.hash && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state]);

  return null;
}

function isSubdomainAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname.toLowerCase();
  return (
    hostname.startsWith("admin.") ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_IS_ADMIN_SUBDOMAIN === "true")
  );
}

export function App() {
  const isAdminDomain = isSubdomainAdmin();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* If hosted on admin subdomain (e.g. admin.domainname.com) */}
        {isAdminDomain ? (
          <>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/login" element={<Navigate to="/admin/login" replace />} />
            <Route path="/enquiries" element={<Navigate to="/admin/enquiries" replace />} />
            <Route path="/posts" element={<Navigate to="/admin/posts" replace />} />
            <Route path="/posts/new" element={<Navigate to="/admin/posts/new" replace />} />
            <Route path="/posts/:id" element={<Navigate to="/admin/posts" replace />} />
            <Route path="/categories" element={<Navigate to="/admin/categories" replace />} />
            <Route path="/media" element={<Navigate to="/admin/media" replace />} />
            <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />

            {/* Admin Portal Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="login" element={<AdminLoginPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="posts" element={<AdminPostsPage />} />
              <Route path="posts/new" element={<AdminNewPostPage />} />
              <Route path="posts/:id" element={<AdminEditPostPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            {/* Public Site Routes */}
            <Route path="/" element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="case-studies" element={<CaseStudiesPage />} />
              <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="industries" element={<IndustriesPage />} />
              <Route path="industries/:slug" element={<IndustryDetailPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />

              {/* Legal, Privacy & Compliance Pages */}
              <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="terms-and-conditions" element={<Navigate to="/terms" replace />} />
              <Route path="terms-of-service" element={<Navigate to="/terms" replace />} />
              <Route path="cookies" element={<CookiePolicyPage />} />
              <Route path="cookie-policy" element={<Navigate to="/cookies" replace />} />
              <Route path="disclaimer" element={<DisclaimerPage />} />

              {/* Success & Confirmation Pages */}
              <Route path="success" element={<SuccessPage />} />
              <Route path="thank-you" element={<SuccessPage />} />

              <Route path="styleguide" element={<StyleguidePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Portal Routes on Main Domain */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="login" element={<AdminLoginPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="posts" element={<AdminPostsPage />} />
              <Route path="posts/new" element={<AdminNewPostPage />} />
              <Route path="posts/:id" element={<AdminEditPostPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

