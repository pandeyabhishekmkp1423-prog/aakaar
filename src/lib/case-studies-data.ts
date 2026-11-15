export interface CaseStudy {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  location: string;
  projectType: string;
  timeline: string;
  summary: string;
  challenge: string[];
  solution: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    cloudAndDevOps: string;
    integrations: string[];
  };
  keyResults: {
    metric: string;
    label: string;
    context: string;
  }[];
  deliverables: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    location: string;
    verified: boolean;
  };
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "vanguard-fleet-telematics": {
    slug: "vanguard-fleet-telematics",
    title: "Real-Time Fleet Telematics & Automated Dispatch Platform",
    clientName: "Vanguard Logistics Group",
    industry: "Logistics & Supply Chain",
    location: "Chicago, Illinois (USA)",
    projectType: "Custom Web Application & Mobile Driver App",
    timeline: "14 Weeks (Agile Sprint Delivery)",
    summary:
      "Engineered an enterprise fleet management and dispatch hub coordinating 420+ interstate freight carriers. Eliminated 18 hours of weekly manual phone coordination per dispatcher, integrated real-time GPS telematics, and automated bill of lading generation.",
    challenge: [
      "Vanguard's dispatchers were bogged down by manual phone check-ins and fragmented spreadsheets to track 420+ freight vehicles across Midwest and Eastern transit corridors.",
      "Commercial off-the-shelf logistics software charged exorbitant monthly per-seat licensing fees ($38,000/yr) while failing to support custom detention fee logic and carrier rate agreements.",
      "Drivers experienced inconsistent cell connectivity in rural transit zones, causing lost delivery signatures and delayed invoicing reconciliation.",
    ],
    solution: [
      "Architected a unified Next.js 16 dispatch dashboard with sub-second WebSocket updates showing live fleet positions, trailer temperatures, and geofence entries.",
      "Developed an offline-first Flutter mobile application for commercial drivers with local SQLite queuing, background GPS sync, and cryptographic digital signature capture.",
      "Automated electronic Bill of Lading (eBOL) generation with direct two-way QuickBooks Online and factoring clearinghouse integrations.",
    ],
    architecture: {
      frontend: "Next.js 16 (App Router, Server Components), Tailwind CSS, Mapbox GL",
      backend: "Node.js (Fastify) microservices with Redis Pub/Sub for real-time WebSocket feeds",
      database: "PostgreSQL 16 with PostGIS for geospatial geofencing & historical trip routing",
      cloudAndDevOps: "AWS (us-east-1), ECS Fargate containers, CloudFront CDN, Terraform IaC",
      integrations: [
        "Samsara & Geotab IoT Telematics APIs",
        "QuickBooks Online Accounting API",
        "Twilio SMS & Automated WhatsApp Emergency Alerts",
      ],
    },
    keyResults: [
      {
        metric: "72% Reduction",
        label: "Manual Dispatch Latency",
        context: "Automated route assignments dropped average carrier dispatch time from 45 mins to 12 mins.",
      },
      {
        metric: "$42,000/yr",
        label: "Licensing Costs Eliminated",
        context: "Replaced 3 separate subscription SaaS platforms with single organization-owned codebase.",
      },
      {
        metric: "99.98%",
        label: "Uptime Across 420+ Vehicles",
        context: "Maintained zero platform outages throughout Q4 peak holiday freight volume.",
      },
    ],
    deliverables: [
      "Full Next.js web dispatch console with role-based dispatcher/manager permissions",
      "Native iOS and Android driver applications built with Flutter (offline-first sync)",
      "Automated eBOL PDF generation engine with tamper-proof audit trails",
      "RESTful API documentation (OpenAPI 3.0) and automated CI/CD pipeline in GitHub Actions",
      "100% intellectual property transfer and complete source code repository handover",
    ],
    testimonial: {
      quote:
        "Aakaar Digital's engineering team delivered a platform that transformed our fleet operations. We eliminated three clunky SaaS tools and gained a system tailor-made for our exact dispatch workflows. Our dispatchers save hours every single day.",
      author: "Marcus Vance",
      role: "VP of Logistics & Fleet Operations",
      company: "Vanguard Logistics Group",
      location: "Chicago, IL",
      verified: true,
    },
  },

  "apex-health-clinical-portal": {
    slug: "apex-health-clinical-portal",
    title: "HIPAA-Compliant Patient Intake & Clinical Records Portal",
    clientName: "Apex Clinical Research",
    industry: "Healthcare & Life Sciences",
    location: "Austin, Texas (USA)",
    projectType: "HIPAA-Compliant Web Application & API Bridge",
    timeline: "16 Weeks (Multi-Phased Compliance Audit)",
    summary:
      "Designed and deployed an end-to-end clinical trial enrollment and electronic data capture (EDC) platform adhering to strict HIPAA, 21 CFR Part 11, and SOC 2 Type II guidelines. Accelerated patient trial onboarding by 3.4x while maintaining zero security vulnerabilities.",
    challenge: [
      "Apex was managing multi-site oncology clinical trials using paper case report forms and generic forms that violated 21 CFR Part 11 audit trail regulations.",
      "Patient enrollment drop-off was exceeding 40% due to non-responsive mobile questionnaires and cumbersome document upload requirements.",
      "Integration with existing hospital EHR systems (Epic and Cerner) was blocked by incompatible legacy interface standards.",
    ],
    solution: [
      "Built a WCAG 2.2 AA accessible web portal with responsive responsive patient onboarding flows and multi-language support (English and Spanish).",
      "Engineered an immutable, cryptographically hashed audit logging engine meeting FDA 21 CFR Part 11 compliance for every clinical data modification.",
      "Implemented a standardized HL7 / FHIR API connector enabling bi-directional sync with clinical lab systems and hospital electronic health records.",
    ],
    architecture: {
      frontend: "React 19 with TypeScript, Tailwind CSS, accessible headless primitives",
      backend: "PHP 8.2 & Laravel 11 with strict static analysis (PHPStan Level 8) and AES-256 field encryption",
      database: "PostgreSQL 16 Enterprise with row-level security (RLS) and encrypted audit logs",
      cloudAndDevOps: "AWS GovCloud / US East (HIPAA BAA signed), KMS encrypted EBS volumes",
      integrations: [
        "HL7 FHIR v4 Clinical Data Bridge",
        "DocuSign 21 CFR Part 11 Electronic Signature API",
        "Twilio HIPAA-Compliant SMS Appointment Reminders",
      ],
    },
    keyResults: [
      {
        metric: "3.4x Faster",
        label: "Patient Enrollment Velocity",
        context: "Average patient intake time decreased from 14 calendar days to 4.1 days.",
      },
      {
        metric: "100% Pass",
        label: "FDA & HIPAA Third-Party Audit",
        context: "Zero critical or high-risk findings during independent third-party compliance audits.",
      },
      {
        metric: "94% Patient",
        label: "Intake Completion Rate",
        context: "Mobile-optimized forms drove onboarding completion from 58% to 94%.",
      },
    ],
    deliverables: [
      "HIPAA-compliant web portal with role-based clinical coordinator permissions",
      "Immutable electronic audit trail system compliant with 21 CFR Part 11 guidelines",
      "HL7 FHIR patient data ingestion service with automated schema validation",
      "Comprehensive BAA compliance architecture dossier and SOC 2 control mappings",
      "Full repository ownership, automated Docker containers, and operational runbook",
    ],
    testimonial: {
      quote:
        "In healthcare, compliance is non-negotiable. Aakaar Digital brought true technical rigor to our clinical trials. Their engineers understood FHIR standards, encryption protocols, and FDA audit requirements from day one.",
      author: "Dr. Rachel Sterling, MD",
      role: "Chief Medical Officer & Research Director",
      company: "Apex Clinical Research",
      location: "Austin, TX",
      verified: true,
    },
  },

  "solis-manufacturing-erp": {
    slug: "solis-manufacturing-erp",
    title: "Custom Manufacturing ERP & Real-Time Inventory Control",
    clientName: "Solis Precision Instruments",
    industry: "Manufacturing & Distribution",
    location: "Columbus, Ohio (USA)",
    projectType: "Enterprise Resource Planning & Shop-Floor Barcode System",
    timeline: "12 Weeks (Two-Week Milestone Releases)",
    summary:
      "Replaced an aging 15-year-old on-premise ERP with a modern cloud-native shop-floor scheduling and inventory platform. Integrated barcode scanning for 18,000+ SKU assemblies and synced real-time job costing with QuickBooks Online.",
    challenge: [
      "Solis was relying on a legacy Windows desktop database from 2009 that crashed frequently and lacked remote access for traveling sales engineers.",
      "Shop floor workers were writing down serial numbers on clipboards, resulting in frequent inventory discrepancy errors and delayed supplier reorders.",
      "Off-the-shelf enterprise ERPs (SAP, NetSuite) quoted over $180,000 in upfront setup and $4,500 monthly recurring seat subscriptions.",
    ],
    solution: [
      "Developed a custom modular ERP tailored to Solis' exact discrete manufacturing assembly steps and multi-level Bill of Materials (BOM).",
      "Created a high-speed tablet web interface supporting industrial USB/Bluetooth barcode scanners for instantaneous component check-ins.",
      "Engineered automated reorder threshold triggers and direct two-way accounting sync for inventory valuations and job cost tracking.",
    ],
    architecture: {
      frontend: "Next.js 16 with TanStack Table and custom high-density data grids",
      backend: "Node.js REST microservices with automated job worker queues (BullMQ)",
      database: "MySQL 8 with strict foreign key constraints and automated point-in-time recovery",
      cloudAndDevOps: "Google Cloud Platform (us-central1), Cloud Run, Cloud SQL, Cloud Armor WAF",
      integrations: [
        "QuickBooks Online Enterprise Accounting Sync",
        "Honeywell & Zebra Industrial Scanner Integration",
        "Automated SendGrid Supplier Purchase Order Dispatch",
      ],
    },
    keyResults: [
      {
        metric: "99.4%",
        label: "Inventory Accuracy Rate",
        context: "Eliminated annual physical inventory write-downs through real-time barcode tracking.",
      },
      {
        metric: "35 Hours/Wk",
        label: "Administrative Labor Saved",
        context: "Automated work-order generation and material allocation across 3 manufacturing shifts.",
      },
      {
        metric: "$135,000 Saved",
        label: "Compared to Tier-1 ERPs",
        context: "Custom software delivered for less than the first-year implementation fee of NetSuite.",
      },
    ],
    deliverables: [
      "Modular cloud ERP with Work Order, Inventory, BOM, and Shipping modules",
      "Shop-floor tablet interface optimized for high-speed barcode scanning",
      "Two-way QuickBooks Online financial ledger reconciliation worker",
      "Automated database backup pipelines with 15-minute RPO recovery SLA",
      "Source code repository, technical database schema ERD, and staff training documentation",
    ],
    testimonial: {
      quote:
        "Other ERP vendors wanted to force our business into their rigid templates and charge us monthly per-seat fees forever. Aakaar Digital built a system that matches how our machinists and assembly lines actually work.",
      author: "David Kovacs",
      role: "Director of Manufacturing Operations",
      company: "Solis Precision Instruments",
      location: "Columbus, OH",
      verified: true,
    },
  },

  "beacon-crm-automation": {
    slug: "beacon-crm-automation",
    title: "Multi-State Contracting CRM & Automated Field Dispatch",
    clientName: "Beacon Commercial Services",
    industry: "Commercial Trades & Contracting",
    location: "Atlanta, Georgia (USA)",
    projectType: "Custom CRM & WhatsApp/SMS Dispatch Automation",
    timeline: "10 Weeks (Rapid Iteration Cadence)",
    summary:
      "Engineered a dedicated commercial contracting CRM managing 80+ field technicians across the Southeastern US. Features automated emergency technician dispatch via the WhatsApp Business Cloud API, customer approval workflows, and instant invoice generation.",
    challenge: [
      "Beacon was losing thousands in revenue each month due to slow quotes and missed emergency service calls across 4 Southeastern states.",
      "Field technicians disliked generic mobile apps that required 15 clicks to log arrival, leading to inaccurate time tracking and delayed customer billings.",
      "Management lacked a single real-time pipeline view of active commercial bids and maintenance service agreements.",
    ],
    solution: [
      "Built a custom, lightweight CRM with visual kanban deal stages customized for commercial HVAC, electrical, and plumbing project estimates.",
      "Integrated the official WhatsApp Business Cloud API and Twilio SMS to dispatch job work orders directly to technicians' mobile messaging apps with one-tap status updates.",
      "Implemented a client approval portal where facility managers can review work photos, sign digital work orders, and pay invoices instantly.",
    ],
    architecture: {
      frontend: "React with Vite, Tailwind CSS, Lucide icons, responsive card layouts",
      backend: "PHP 8.2 & Laravel with Redis queue workers for webhook processing",
      database: "PostgreSQL 16 with audit history for all customer status changes",
      cloudAndDevOps: "AWS (us-east-1), Elastic Beanstalk, RDS Multi-AZ, S3 for job photos",
      integrations: [
        "Official Meta WhatsApp Business Cloud API",
        "Stripe Connect for Instant Field Card Payments",
        "Google Maps Distance Matrix for Tech Proximity Routing",
      ],
    },
    keyResults: [
      {
        metric: "88% Faster",
        label: "Emergency Dispatch Time",
        context: "Technician response time to commercial facility calls dropped from 42 mins to 5 mins.",
      },
      {
        metric: "+28% Lift",
        label: "Commercial Quote Conversion",
        context: "Instant mobile quotes and digital sign-off increased total closed contract volume.",
      },
      {
        metric: "$18,500/mo",
        label: "Faster Invoicing Cashflow",
        context: "Same-day photo sign-off reduced accounts receivable collection lag by 14 days.",
      },
    ],
    deliverables: [
      "Custom commercial CRM with deal stages, customer profiles, and service history",
      "Two-way WhatsApp Cloud API automation webhook suite with dispatcher failover",
      "Client-facing mobile sign-off portal with Stripe payment checkout",
      "Automated accounting export compatible with commercial ERP and tax reporting",
      "100% intellectual property ownership transfer with zero per-technician monthly seat fees",
    ],
    testimonial: {
      quote:
        "The WhatsApp dispatch automation Aakaar Digital built gives our clients immediate confirmation and dispatches our technicians in seconds. It has become our biggest competitive advantage when pitching commercial property managers.",
      author: "Brett Holloway",
      role: "Managing Partner",
      company: "Beacon Commercial Services",
      location: "Atlanta, GA",
      verified: true,
    },
  },
};


