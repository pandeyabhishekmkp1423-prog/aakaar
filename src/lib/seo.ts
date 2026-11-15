import { useEffect } from "react";

const SITE_URL = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) || "https://aakaardigital.com";

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  images?: string[];
  keywords?: string;
}

export function constructMetadata(meta: SEOMetadata): SEOMetadata {
  return meta;
}

export function useSEO({ title, description, canonical, keywords, authors }: Partial<SEOMetadata>) {
  useEffect(() => {
    if (title) {
      document.title = title.includes("Aakaar Digital") ? title : `${title} | Aakaar Digital`;
    }
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    setMeta("author", (authors && authors.length > 0 ? authors : ["Aakaar Digital Engineering Team"]).join(", "));
    setMeta("publisher", "Aakaar Digital");
    if (keywords) setMeta("keywords", keywords);
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      const fullUrl = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
      linkCanonical.setAttribute("href", fullUrl);
    }
  }, [title, description, canonical]);
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aakaar Digital",
    url: SITE_URL,
    logo: `${SITE_URL}/logo%20(2).png`,
    image: `${SITE_URL}/logo%20(2).png`,
    description: "Custom software development, bespoke web applications, mobile apps, CRM systems, LMS platforms, and WhatsApp automation engineered for businesses worldwide.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA",
    },
    telephone: "+1-800-555-0199",
    priceRange: "$$",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Worldwide" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "European Union" },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aakaar Digital",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getServiceSchema(name: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: "Aakaar Digital",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Worldwide" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Australia" },
    ],
    description,
    url: `${SITE_URL}/services/${slug}`,
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getArticleSchema({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  authorName = "Aakaar Digital Engineering Team",
  coverImage,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName?: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Aakaar Digital",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo%20(2).png`,
      },
    },
    image: coverImage ? (coverImage.startsWith("http") ? coverImage : `${SITE_URL}${coverImage}`) : undefined,
  };
}


