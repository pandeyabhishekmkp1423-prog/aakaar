import { Outlet } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo";

export function SiteLayout() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("main-content");
          if (target) {
            target.focus();
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        Skip to main content
      </a>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <Header />
      <main id="main-content" className="flex-1 pt-[76px] focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default SiteLayout;

