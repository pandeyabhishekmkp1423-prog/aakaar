export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  iconName: string;
  headline: string;
  tagline: string;
  heroSummary: string;
  challenges: {
    title: string;
    description: string;
  }[];
  solutions: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  compliance: {
    framework: string;
    detail: string;
  }[];
  featuredCaseStudySlug?: string;
  deliverables: string[];
}

export const INDUSTRIES_DATA: Record<string, Industry> = {
  "logistics-supply-chain": {
    slug: "logistics-supply-chain",
    name: "Logistics, Fleet & Supply Chain",
    shortName: "Logistics & Fleet",
    iconName: "Truck",
    headline: "Custom Software & Fleet Telematics for Modern Freight Operations",
    tagline: "Real-time dispatch, route optimization, and digital Bill of Lading systems.",
    heroSummary:
      "We build custom logistics software engineered for freight carriers, third-party logistics (3PL) providers, and multi-state warehouse networks across the United States. Eliminate manual spreadsheets, integrate GPS telematics, and gain complete operational visibility with zero per-seat SaaS licensing fees.",
    challenges: [
      {
        title: "Disjointed Dispatch & Communication Latency",
        description:
          "Dispatchers juggle endless phone check-ins, text messages, and spreadsheets to track drivers, resulting in delayed load assignments, route deviations, and missed delivery windows.",
      },
      {
        title: "Compounding Per-Seat Software Subscriptions",
        description:
          "Commercial TMS platforms charge tens of thousands in annual seat licenses that penalize fleet growth, yet still lack flexibility for custom customer rate sheets and detention fees.",
      },
      {
        title: "Paper-Heavy Invoicing & Delayed Cashflow",
        description:
          "Physical proof-of-delivery (POD) documents and paper bills of lading get lost or take days to reconcile, delaying invoice generation and tying up operational capital.",
      },
    ],
    solutions: [
      {
        title: "Real-Time Fleet Dispatch & Telematics Consoles",
        description:
          "Sub-second interactive dispatch dashboards powered by WebSockets, Mapbox, and automated vehicle routing. Track truck coordinates, geofence entries, and trailer sensor data.",
        technologies: ["Next.js 16", "Mapbox GL", "PostGIS", "WebSockets"],
      },
      {
        title: "Offline-First Mobile Driver Applications",
        description:
          "High-performance native iOS and Android apps for commercial drivers. Captures digital signatures, photos, and bills of lading with automatic SQLite queue synchronization when returning to cell coverage.",
        technologies: ["Flutter", "SQLite", "Background GPS", "AWS S3"],
      },
      {
        title: "Automated eBOL & Accounting Bridges",
        description:
          "Instant digital Bill of Lading generation with cryptographic verification and direct two-way synchronization with QuickBooks Online, NetSuite, and freight factoring partners.",
        technologies: ["REST APIs", "OpenAPI", "Node.js", "QuickBooks API"],
      },
    ],
    compliance: [
      {
        framework: "DOT / FMCSA ELD Integration",
        detail: "Standardized integration with compliant Electronic Logging Devices and telematics hardware.",
      },
      {
        framework: "SOC 2 Type II Security",
        detail: "Enterprise-grade role-based access control, encrypted transit data (TLS 1.3), and tamper-proof audit trails.",
      },
      {
        framework: "CCPA & US Data Residency",
        detail: "AWS US East and West cloud infrastructure with strict data protection compliance.",
      },
    ],
    featuredCaseStudySlug: "vanguard-fleet-telematics",
    deliverables: [
      "Custom web-based dispatch control room application",
      "Native iOS and Android mobile driver applications (Flutter)",
      "Automated electronic Bill of Lading (eBOL) generation engine",
      "Accounting & billing synchronization service (QuickBooks / NetSuite)",
      "100% intellectual property transfer and source code repository ownership",
    ],
  },

  "healthcare-life-sciences": {
    slug: "healthcare-life-sciences",
    name: "Healthcare & Life Sciences",
    shortName: "Healthcare & MedTech",
    iconName: "Stethoscope",
    headline: "HIPAA-Compliant Patient Portals & Clinical Data Systems",
    tagline: "Secure, audit-ready software engineered for clinics, research trials, and digital health.",
    heroSummary:
      "We design and build secure healthcare platforms, clinical trial management systems, and patient intake portals adhering strictly to HIPAA, HITECH, 21 CFR Part 11, and HL7 FHIR standards. Engineered by senior architects with complete bilateral NDA protection and zero vendor lock-in.",
    challenges: [
      {
        title: "Complex Regulatory Compliance & Audit Risks",
        description:
          "Healthcare software requires stringent technical safeguards, encrypted data-at-rest (AES-256), immutable audit logs, and signed Business Associate Agreements (BAAs) that generic software agencies cannot deliver.",
      },
      {
        title: "High Patient Drop-Off on Legacy Portals",
        description:
          "Clunky, non-responsive clinical intake forms and confusing patient authentication lead to high onboarding abandonment and clinical trial recruitment bottlenecks.",
      },
      {
        title: "EHR Interoperability Blockers",
        description:
          "Connecting custom healthcare tools to hospital Electronic Health Record (EHR) systems like Epic, Cerner, and AthenaHealth requires specialized knowledge of HL7 FHIR protocols.",
      },
    ],
    solutions: [
      {
        title: "HIPAA-Compliant Patient Intake & Scheduling Portals",
        description:
          "Mobile-first, WCAG 2.2 AA accessible patient intake experiences featuring secure two-factor authentication, digital consent signing, and instant automated appointment confirmation.",
        technologies: ["React 19", "TypeScript", "Tailwind CSS", "Twilio HIPAA"],
      },
      {
        title: "Clinical Trial Electronic Data Capture (EDC)",
        description:
          "FDA 21 CFR Part 11 compliant data capture portals with cryptographic audit logging, automated adverse event alerting, and multi-site coordinator permissions.",
        technologies: ["PHP 8.2 / Laravel", "PostgreSQL", "Immutable Audit Logs"],
      },
      {
        title: "HL7 & FHIR v4 Health Data Bridges",
        description:
          "Standardized bi-directional data pipelines that exchange patient demographics, lab test results, and clinical notes directly with enterprise hospital EHR platforms.",
        technologies: ["HL7 FHIR v4", "Docker", "AWS GovCloud / US East"],
      },
    ],
    compliance: [
      {
        framework: "HIPAA & HITECH Security Rule",
        detail: "Full administrative, physical, and technical safeguards with signed Business Associate Agreements.",
      },
      {
        framework: "FDA 21 CFR Part 11",
        detail: "Cryptographically verifiable electronic signatures, computer-generated audit logs, and strict versioning.",
      },
      {
        framework: "WCAG 2.2 Level AA Accessibility",
        detail: "Strict adherence to accessible web standards for patients with visual or motor impairments.",
      },
    ],
    featuredCaseStudySlug: "apex-health-clinical-portal",
    deliverables: [
      "Custom HIPAA-compliant web portal with role-based clinical access",
      "FHIR-compatible data ingestion and validation engine",
      "Cryptographic audit log service compliant with 21 CFR Part 11",
      "Comprehensive BAA compliance dossier and cloud infrastructure template",
      "Complete repository ownership with zero recurring per-patient agency licensing fees",
    ],
  },

  "manufacturing-distribution": {
    slug: "manufacturing-distribution",
    name: "Manufacturing & Distribution",
    shortName: "Manufacturing & Industrial",
    iconName: "Cpu",
    headline: "Custom Manufacturing ERPs & Shop-Floor Inventory Systems",
    tagline: "High-density data platforms, barcode tracking, and automated work-order dispatch.",
    heroSummary:
      "We replace fragile legacy spreadsheets and bloated $150k+ off-the-shelf ERP software with custom, modular systems built specifically for discrete manufacturers, machine shops, and industrial distributors across North America.",
    challenges: [
      {
        title: "Legacy Systems & Clipboard Inefficiencies",
        description:
          "Relying on aging Windows desktop programs or paper clipboards on the shop floor causes data entry latency, inventory discrepancies, and uncoordinated shift handoffs.",
      },
      {
        title: "Exorbitant Tier-1 ERP Implementation Costs",
        description:
          "Platforms like SAP and NetSuite require $100k+ in upfront consultants and force companies into rigid workflows that don't match actual assembly line realities.",
      },
      {
        title: "Disconnected Accounting & Job Costing",
        description:
          "Without automated integration between inventory consumption and corporate accounting, business owners cannot calculate true job margins until weeks after delivery.",
      },
    ],
    solutions: [
      {
        title: "Shop-Floor Barcode & Tablet Workstations",
        description:
          "Ultra-fast tablet interfaces built for rugged environments. Workers scan barcodes with industrial hardware to record raw material consumption and stage completions in real time.",
        technologies: ["Next.js 16", "USB / Bluetooth HID Barcode", "Zebra APIs"],
      },
      {
        title: "Multi-Level Bill of Materials (BOM) & Inventory Control",
        description:
          "Dynamic assembly management with automated reorder threshold triggers, lot number traceability, and supplier purchase order generation.",
        technologies: ["Node.js", "MySQL 8", "Redis BullMQ", "SendGrid"],
      },
      {
        title: "Automated Job Costing & ERP Ledger Sync",
        description:
          "Direct two-way synchronization with QuickBooks Online or enterprise accounting suites to calculate exact labor hours, machine overhead, and material costs per order.",
        technologies: ["REST APIs", "QuickBooks Online SDK", "Automated Webhooks"],
      },
    ],
    compliance: [
      {
        framework: "ISO 9001 Traceability",
        detail: "Complete digital lot tracking, raw material certificates of analysis, and revision history logs.",
      },
      {
        framework: "OSHA & Safety Audit Logging",
        detail: "Standardized equipment maintenance schedules and shift safety inspection checklists.",
      },
      {
        framework: "SOC 2 Type II Security",
        detail: "Encrypted database backups with point-in-time recovery and regional US cloud isolation.",
      },
    ],
    featuredCaseStudySlug: "solis-manufacturing-erp",
    deliverables: [
      "Custom modular ERP with Inventory, BOM, and Order Fulfillment modules",
      "Shop-floor tablet scanning application optimized for rapid data entry",
      "Automated supplier purchase order and low-stock alerting workflow",
      "Two-way QuickBooks Online accounting ledger sync connector",
      "Full source code handover and complete architectural schema documentation",
    ],
  },

  "commercial-trades-contracting": {
    slug: "commercial-trades-contracting",
    name: "Commercial Trades & Contracting",
    shortName: "Trades & Field Services",
    iconName: "Wrench",
    headline: "Commercial Contractor CRMs & WhatsApp/SMS Field Dispatch",
    tagline: "Instant quote generation, live technician tracking, and mobile job approvals.",
    heroSummary:
      "We build tailored CRMs and dispatch automation engines for commercial HVAC, plumbing, electrical, and facility maintenance contractors. Dispatch technicians in seconds, provide instant client estimates, and collect signed work orders on-site.",
    challenges: [
      {
        title: "Lost Revenue on Delayed Emergency Quotes",
        description:
          "Commercial property managers demand immediate response times for facility emergencies; delayed estimates cause multi-thousand dollar maintenance contracts to be lost to competitors.",
      },
      {
        title: "Complex Mobile Apps Technicians Refuse to Use",
        description:
          "Clunky mobile forms with too many mandatory steps frustrate field technicians, resulting in missing job photos, unbilled labor hours, and inaccurate job histories.",
      },
      {
        title: "Slow Cashflow from Delayed Invoicing",
        description:
          "Waiting days for technicians to bring physical work orders into the central office delays customer billing and increases accounts receivable collection cycles.",
      },
    ],
    solutions: [
      {
        title: "WhatsApp & SMS Cloud Dispatch Automation",
        description:
          "Automate technician dispatches via official WhatsApp Business Cloud API and Twilio. Field staff receive clean job briefs and reply with 1-tap arrival and completion confirmations.",
        technologies: ["WhatsApp Cloud API", "Twilio", "Webhook Queues", "PHP 8.2"],
      },
      {
        title: "Visual Commercial Deal Pipelines",
        description:
          "Kanban sales pipelines calibrated for commercial contracting cycles, including recurring preventative maintenance contracts and service level agreements (SLAs).",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Kanban Engine"],
      },
      {
        title: "Instant Client Sign-Off & Mobile Payments",
        description:
          "Client-facing mobile sign-off portal where facility managers review before-and-after work photos, sign digital work orders, and pay invoices instantly via Stripe.",
        technologies: ["Stripe Connect", "Digital Signatures", "AWS S3 Photos"],
      },
    ],
    compliance: [
      {
        framework: "TCPA & CASL Messaging Compliance",
        detail: "Strict opt-in consent tracking and audit logs for automated SMS and WhatsApp customer dispatches.",
      },
      {
        framework: "PCI-DSS Level 1 Security",
        detail: "Secure tokenized credit card processing via Stripe with zero customer card data stored locally.",
      },
      {
        framework: "Bilateral Commercial NDA",
        detail: "All customer pricing algorithms and proprietary technician rates protected under bilateral NDA.",
      },
    ],
    featuredCaseStudySlug: "beacon-crm-automation",
    deliverables: [
      "Custom commercial contracting CRM with deal tracking and recurring SLAs",
      "Automated WhatsApp Business Cloud API dispatch engine with failover",
      "Client photo review and digital sign-off mobile portal",
      "Stripe payment checkout integration and accounting export",
      "100% intellectual property ownership transfer with zero per-technician seat fees",
    ],
  },

  "professional-financial-services": {
    slug: "professional-financial-services",
    name: "Professional & Financial Services",
    shortName: "Financial & Consulting",
    iconName: "Building2",
    headline: "Custom Client Portals & Automated Financial Workflow Systems",
    tagline: "Secure document exchange, billing automation, and SOC 2 aligned data pipelines.",
    heroSummary:
      "We engineer enterprise client portals, billing automation suites, and custom CRM platforms for wealth management firms, accounting practices, and commercial consulting agencies throughout North America and Europe.",
    challenges: [
      {
        title: "Insecure Email Attachment Exchanges",
        description:
          "Sharing sensitive corporate tax documents, financial statements, and contracts via email exposes firms to regulatory non-compliance and phishing attacks.",
      },
      {
        title: "Fragmented Billing & Retainer Tracking",
        description:
          "Manually tracking billable consulting hours across disparate tools leads to unbilled work, invoice disputes, and revenue leakage.",
      },
      {
        title: "Lack of Cohesive Brand Experience",
        description:
          "Sending high-value clients to disjointed third-party software with external branding diminishes the premium perception of professional services firms.",
      },
    ],
    solutions: [
      {
        title: "Secure Branded Client Document Portals",
        description:
          "High-security client portals featuring multi-factor authentication, end-to-end encrypted document vaults, and granular client/advisor permission controls.",
        technologies: ["Next.js 16", "AES-256 Encryption", "MFA Auth", "PostgreSQL"],
      },
      {
        title: "Automated Retainer & Milestone Billing",
        description:
          "Custom billing automation that calculates billable hours, sends scheduled retainer invoices, and reconciles payments directly into QuickBooks and Stripe.",
        technologies: ["Stripe Billing API", "QuickBooks API", "Automated Webhooks"],
      },
      {
        title: "Bespoke Consulting CRM & Pipeline Tracker",
        description:
          "Sales pipeline software customized for long-cycle enterprise consulting proposals, bilateral NDAs, and automated contract renewal alerts.",
        technologies: ["React", "TypeScript", "Laravel", "Audit Logs"],
      },
    ],
    compliance: [
      {
        framework: "SOC 2 Type II Security Alignment",
        detail: "Strict encryption standards (TLS 1.3, AES-256), intrusion detection, and annual security audits.",
      },
      {
        framework: "GLBA & Financial Privacy Compliance",
        detail: "Protection of non-public personal information (NPI) with strict role-based data isolation.",
      },
      {
        framework: "GDPR, PIPEDA & CCPA Governance",
        detail: "Automated data subject access request (DSAR) workflows and user privacy controls.",
      },
    ],
    deliverables: [
      "Custom client document portal with encrypted file exchange",
      "Automated recurring retainer billing and invoicing engine",
      "Consulting pipeline CRM with proposal generation workflows",
      "Full source code ownership transfer with bilateral IP assignment",
      "Production deployment to secure US AWS / GCP cloud regions",
    ],
  },

  "retail-ecommerce-wholesale": {
    slug: "retail-ecommerce-wholesale",
    name: "Retail, E-Commerce & Wholesale Distribution",
    shortName: "Retail & E-Commerce",
    iconName: "ShoppingBag",
    headline: "High-Performance B2B Wholesale Portals & Omnichannel Systems",
    tagline: "Custom B2B pricing catalogs, tiered volume discounts, and ERP inventory sync.",
    heroSummary:
      "We build custom B2B wholesale ordering platforms, dealer portals, and omnichannel inventory integrations for high-growth commercial brands. Give wholesale buyers personalized pricing tiers, credit term checkout, and real-time inventory visibility.",
    challenges: [
      {
        title: "Manual Wholesale Order Processing via PDF & Phone",
        description:
          "Sales reps spend hours re-typing email and phone orders into accounting software, leading to order entry mistakes and delayed fulfillment.",
      },
      {
        title: "Standard E-Commerce Platforms Fail at B2B Complexities",
        description:
          "Consumer platforms like Shopify or WooCommerce struggle with tiered corporate pricing, net-30 terms, multi-warehouse allocations, and custom tax exemptions.",
      },
      {
        title: "Inventory Overselling Across Multiple Channels",
        description:
          "Without real-time sync between warehouse inventory and digital sales channels, high-volume distributors frequently oversell stock.",
      },
    ],
    solutions: [
      {
        title: "B2B Wholesale Ordering & Dealer Portals",
        description:
          "Password-protected wholesale portals with buyer-specific tiered pricing catalogs, minimum order quantity rules, and quick CSV order uploads.",
        technologies: ["Next.js 16", "PostgreSQL", "Tailwind CSS", "Redis"],
      },
      {
        title: "Credit Terms (Net 30/60) & Invoice Checkout",
        description:
          "Enterprise B2B checkout flows supporting credit limits, purchase order (PO) number verification, and automated invoice dispatch.",
        technologies: ["Stripe Invoicing", "QuickBooks Sync", "Node.js REST"],
      },
      {
        title: "Multi-Channel Inventory Sync Engine",
        description:
          "Sub-second inventory synchronization keeping warehouse ERPs, wholesale portals, and retail sales channels perfectly aligned.",
        technologies: ["BullMQ Queues", "Webhooks", "PostgreSQL RLS"],
      },
    ],
    compliance: [
      {
        framework: "PCI-DSS Level 1 Compliance",
        detail: "Tokenized payment gateways with zero unencrypted credit card data stored locally.",
      },
      {
        framework: "US Sales Tax Automation",
        detail: "Automated state and municipal sales tax calculation and exemption certificate management.",
      },
      {
        framework: "SOC 2 Aligned Data Security",
        detail: "Encrypted transactions, automated vulnerability scans, and secure cloud hosting.",
      },
    ],
    deliverables: [
      "Custom B2B wholesale dealer portal with tiered pricing engine",
      "Credit terms checkout with purchase order validation",
      "Two-way warehouse ERP and inventory synchronization pipeline",
      "Comprehensive API documentation and developer onboarding runbook",
      "Complete source code ownership with zero monthly per-transaction agency royalties",
    ],
  },
};

