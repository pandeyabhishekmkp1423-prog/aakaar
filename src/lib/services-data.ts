export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  iconName: string;
  tagline: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  useCases: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  deliverables: string[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  "web-development": {
    slug: "web-development",
    title: "Web Development Services",
    shortDescription: "Bespoke, high-performance web applications and digital platforms engineered with Next.js, React, Node.js, and modern APIs for modern enterprises worldwide.",
    iconName: "Globe",
    tagline: "High-speed, scalable web applications engineered for global business workflows.",
    overviewHeading: "Production-Grade Web Engineering Tailored to Your Commercial Operations",
    overviewParagraphs: [
      "For small and mid-sized enterprises, a web application is rarely just a digital billboardâ€”it is the operational core of customer engagement, transaction processing, and service delivery. Off-the-shelf website builders and bloated generic WordPress themes often buckle under the demands of custom business logic, causing slow load times, security vulnerabilities, and brittle plugin dependencies that break with every update. At Aakaar Digital, we build bespoke web applications using modern full-stack architectures, primarily Next.js, React, TypeScript, PHP/Laravel, and relational databases.",
      "Our engineering process prioritizes sub-second page performance, strict accessibility compliance (WCAG 2.2 AA standards), and rock-solid reliability across mobile and desktop viewports. Whether you require a secure customer portal for logistics tracking, a dynamic booking engine for appointments, or a multi-tenant SaaS application, we architect clean codebases with decoupled APIs that scale smoothly without recurring per-seat agency fees or vendor lock-in.",
      "We adhere to enterprise data governance standards, ensuring user sessions, form submissions, and database assets reside securely within compliant global data centres (AWS, Azure, GCP). Every line of code is structured for maintainability, audited for cross-browser stability, and optimized for Core Web Vitals to deliver immediate, effortless interactions for your worldwide clientele.",
    ],
    useCases: [
      {
        title: "Client & Contractor Portals",
        description: "Secure self-service dashboards where clients review project status, upload documents, and approve milestone invoices.",
      },
      {
        title: "Bespoke E-Commerce & Checkout Engines",
        description: "Tailored transactional platforms supporting global payment processors (Stripe, PayPal), regional tax calculations (VAT, GST/HST, sales tax), and multi-currency billing.",
      },
      {
        title: "Interactive Estimation & Quoting Tools",
        description: "Custom calculators that allow prospects to input technical specifications and receive instant preliminary estimates, qualifying leads before sales calls.",
      },
      {
        title: "High-Traffic Content & Resource Hubs",
        description: "Lightning-fast static and server-rendered knowledge hubs delivering technical documentation, whitepapers, and guides with instantaneous search.",
      },
    ],
    benefits: [
      {
        title: "Sub-Second Performance & CWV",
        description: "Engineered with Next.js App Router and static pre-rendering, achieving Lighthouse scores above 90 and LCP under 2.5s.",
      },
      {
        title: "Accessible & Compliant Architecture",
        description: "Native keyboard navigation, semantic HTML landmarks, and contrast ratios meeting international accessibility standards (WCAG 2.2 AA).",
      },
      {
        title: "Total IP Ownership & Zero Lock-In",
        description: "You receive complete repository access and unencumbered intellectual property upon project handover.",
      },
      {
        title: "Global Cloud Hosting & Data Sovereignty",
        description: "Configured for deployment on international cloud regions (AWS, Azure, GCP) to satisfy GDPR, PIPEDA, and local data residency requirements.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We analyze your user workflows, data models, integration dependencies, and performance benchmarks." },
      { step: "02", title: "Design", description: "We craft interactive wireframes, accessible design systems, and responsive layouts for desktop and mobile." },
      { step: "03", title: "Build", description: "We write clean, typed TypeScript and PHP code backed by automated testing, security reviews, and API contracts." },
      { step: "04", title: "Launch & Support", description: "We handle production DNS, SSL certificates, deployment automation, and provide post-launch warranties." },
    ],
    faqs: [
      {
        question: "Why do you recommend Next.js over traditional website builders like WordPress?",
        answer: "Next.js delivers dramatically superior speed, security, and developer maintainability. It eliminates vulnerability-prone third-party plugins, produces pre-rendered static pages that load instantaneously, and scales cleanly without server memory spikes.",
      },
      {
        question: "Do we own the source code when the project is finished?",
        answer: "Yes, absolutely. Once final milestone payment is completed, 100% of the repository code, asset files, and documentation transfer to your organization with zero recurring proprietary agency licensing fees.",
      },
      {
        question: "Can our website integrate with our existing CRM or accounting platform?",
        answer: "Yes. We specialize in building secure REST and GraphQL API integrations linking your web frontend with QuickBooks, HubSpot, Salesforce, Xero, or custom databases.",
      },
      {
        question: "How do you handle multi-currency transactions and regional taxation?",
        answer: "Our checkout architectures dynamically verify customer location, applying the exact required tax rules (VAT, GST, sales tax) and converting multi-currency billing via Stripe or leading global gateways.",
      },
    ],
    deliverables: [
      "Production Next.js application repository",
      "Responsive UI tested from 320px to 1920px",
      "REST API integration layer",
      "WCAG 2.2 AA accessibility audit report",
      "Automated CI/CD deployment pipeline",
      "30-day post-launch warranty & documentation",
    ],
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Native and cross-platform iOS and Android mobile software engineered with Flutter and React Native for commercial operations worldwide.",
    iconName: "Smartphone",
    tagline: "Intuitive, high-performance mobile applications built for field crews, clients, and internal teams.",
    overviewHeading: "Custom Mobile Applications Built for Reliable Performance in the Field",
    overviewParagraphs: [
      "In modern industriesâ€”from commercial trades, freight logistics, and field inspections to retail loyalty and specialized healthcareâ€”mobile applications empower staff and customers to transact and communicate anywhere. However, launching separate native codebases for iOS (Swift) and Android (Kotlin) frequently doubles initial capital expenditure and ongoing maintenance overhead.",
      "At Aakaar Digital, we specialize in modern cross-platform engineering using Flutter and React Native. This enables growing businesses to maintain a single, rigorously tested codebase that compiles natively for both Apple App Store and Google Play platforms. The result is fluid 60fps animations, native hardware access (camera, GPS, offline storage, biometrics), and identical feature parity at nearly half the lifecycle cost.",
      "We design mobile interfaces with offline-first capabilities, recognizing that field operations in remote regions or transit corridors often face intermittent cellular coverage. Data synchronizes automatically via encrypted background queues the moment network connectivity resumes, ensuring zero data loss and uninterrupted field productivity.",
    ],
    useCases: [
      {
        title: "Field Service & Inspection Apps",
        description: "Mobile checklists, photo uploads, customer digital signatures, and automated dispatch sync for technicians on the road.",
      },
      {
        title: "B2B Customer Ordering & Re-Ordering",
        description: "Streamlined mobile catalogue browsing and one-tap re-ordering for commercial suppliers and wholesale distributors.",
      },
      {
        title: "Staff Scheduling & Time Tracking",
        description: "Geofenced clock-in, shift trading, safety briefing sign-offs, and payroll export for distributed workforces.",
      },
      {
        title: "Member & Client Portals",
        description: "Branded native apps for professional associations, fitness clubs, or boutique clinics offering booking and messaging.",
      },
    ],
    benefits: [
      {
        title: "Single Codebase for iOS & Android",
        description: "Halve your ongoing feature development and QA costs while ensuring consistent customer experience on all devices.",
      },
      {
        title: "Offline-First Synchronization",
        description: "Field teams can capture records, photos, and signatures without internet access; records sync automatically upon reconnection.",
      },
      {
        title: "Full App Store & Play Store Handling",
        description: "We navigate Apple and Google submission guidelines, compliance requirements, and release management end-to-end.",
      },
      {
        title: "Biometric & Hardware Integration",
        description: "Seamless integration with Face ID, fingerprint scanning, push notifications, cameras, and Bluetooth peripheral devices.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We outline user personas, mobile-specific user journeys, hardware permissions, and backend API endpoints." },
      { step: "02", title: "Design", description: "We prototype interactive mobile screens adhering to Apple Human Interface Guidelines and Material Design." },
      { step: "03", title: "Build", description: "We develop the application in Flutter or React Native, integrating state management and offline SQLite queues." },
      { step: "04", title: "Launch & Support", description: "We conduct TestFlight and Google Play beta testing, handle store approval, and monitor crash diagnostics." },
    ],
    faqs: [
      {
        question: "Should we build cross-platform with Flutter or separate native apps?",
        answer: "For over 90% of business applications, cross-platform frameworks like Flutter deliver native performance while cutting development and maintenance expenses in half. We only recommend separate native builds for graphic-heavy 3D games or specialized hardware drivers.",
      },
      {
        question: "How do you handle App Store approvals?",
        answer: "We prepare your developer accounts, generate metadata, configure privacy declarations, and guide the app through Apple and Google review cycles until publication.",
      },
      {
        question: "Can the app function without cell reception?",
        answer: "Yes. We engineer offline-first architectures that store form entries and photos in local encrypted SQLite databases on the device, uploading automatically once reception returns.",
      },
      {
        question: "How do push notifications work?",
        answer: "We configure Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNs) so your backend can trigger targeted, automated notifications based on user actions.",
      },
    ],
    deliverables: [
      "Cross-platform mobile codebase (Flutter or React Native)",
      "App Store & Google Play production builds",
      "Backend REST/WebSocket sync endpoints",
      "Push notification architecture setup",
      "Offline database synchronization layer",
      "Full app store submission & approval handover",
    ],
  },

  "custom-software": {
    slug: "custom-software",
    title: "Custom Software Development",
    shortDescription: "Tailored business logic, bespoke internal operational platforms, and proprietary SaaS solutions built specifically for your competitive advantage.",
    iconName: "Code",
    tagline: "Replace rigid off-the-shelf software with tailored platforms that match your exact business logic.",
    overviewHeading: "Engineered Software That Adapts to Your Workflows, Not the Other Way Around",
    overviewParagraphs: [
      "Every successful business develops proprietary operational methods, estimating techniques, or specialized workflows that distinguish it from commercial competitors. When leadership attempts to shoehorn these unique operations into rigid commercial SaaS platforms, operational compromise is inevitable. Staff resort to external spreadsheet workarounds, critical data fragments across disconnected tools, and monthly subscription licensing fees escalate relentlessly.",
      "Aakaar Digital designs, develops, and deploys custom software tailored to your organization's exact commercial workflows. From multi-tenant B2B portals and internal ERP platforms to automated estimating systems, we engineer software assets that your company owns outright. We focus on clean relational data architecture, secure role-based access controls, and transparent API endpoints.",
      "Our software engineering team operates with clear documentation, predictable sprint cadences, and pragmatic technology selections. By eliminating recurring per-seat subscription fees and addressing your operational bottlenecks, custom software turns technical systems into a long-term competitive advantage.",
    ],
    useCases: [
      {
        title: "Internal Operations & ERP Platforms",
        description: "Unified platforms combining inventory tracking, job costing, workforce dispatch, and milestone reporting under one login.",
      },
      {
        title: "Proprietary Estimating & Pricing Engines",
        description: "Complex rule-based calculating engines that generate accurate project quotes based on real-time material costs and labor rates.",
      },
      {
        title: "Commercial Multi-Tenant SaaS Products",
        description: "Scalable software platforms built for entrepreneurs and established firms seeking to commercialize proprietary industry tools.",
      },
      {
        title: "Multi-Language Client Service Portals",
        description: "Secure, multi-language portals enabling institutional clients to submit and track regulatory filings and project milestones.",
      },
    ],
    benefits: [
      {
        title: "Zero Per-Seat SaaS Licensing Fees",
        description: "Scale your team from 10 to 500 users without incurring punitive per-user monthly software subscription costs.",
      },
      {
        title: "100% Intellectual Property Ownership",
        description: "Your software becomes a capitalized enterprise asset on your balance sheet, increasing corporate valuation.",
      },
      {
        title: "Tailored Specifically to Your Team",
        description: "No useless bloated features or missing critical fields; every button, filter, and report matches your real workflow.",
      },
      {
        title: "Granular Security & Role Controls",
        description: "Define precise user roles (admin, supervisor, field tech, auditor) ensuring staff access only authorized corporate data.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We conduct detailed architectural discovery, diagramming business logic, data models, and edge cases." },
      { step: "02", title: "Design", description: "We design complete database schemas, role hierarchies, user interfaces, and technical API specifications." },
      { step: "03", title: "Build", description: "We develop in two-week iterative sprints, delivering verifiable working modules for your review at each stage." },
      { step: "04", title: "Launch & Support", description: "We oversee data migration from legacy spreadsheets, staff onboarding, cloud provisioning, and warranty maintenance." },
    ],
    faqs: [
      {
        question: "Is custom software development significantly more expensive than commercial SaaS?",
        answer: "While initial development requires capital investment, custom software typically achieves a lower total cost of ownership (TCO) within 18 to 24 months by eliminating recurring per-user licensing fees for growing teams.",
      },
      {
        question: "Can you migrate data from our current spreadsheets and legacy databases?",
        answer: "Yes. Data migration is a standard part of our delivery. We write scripts to sanitize, normalize, and import your existing spreadsheets and legacy SQL data into the new platform.",
      },
      {
        question: "What technology stack do you use for custom software?",
        answer: "We select pragmatic, industry-proven stacks: TypeScript/Next.js for web frontends, PHP (Laravel) or Node.js for backend APIs, and PostgreSQL or MySQL 8 for relational databases.",
      },
      {
        question: "How do you protect sensitive commercial data?",
        answer: "We implement encryption at rest (AES-256), encryption in transit (TLS 1.3), role-based access control, session timeouts, and comprehensive audit logs tracking every state change.",
      },
    ],
    deliverables: [
      "Custom software web application and API",
      "Relational database schema with full documentation",
      "Legacy data sanitization and migration scripts",
      "User role and permission configuration suite",
      "Administrator user manual and onboarding video guide",
      "Full source code repository ownership and deployment scripts",
    ],
  },

  "crm-solutions": {
    slug: "crm-solutions",
    title: "CRM Solutions",
    shortDescription: "Custom customer relationship platforms, pipeline automation, and enterprise system synchronization built for high-growth sales teams.",
    iconName: "Users",
    tagline: "Consolidate sales leads, customer records, and deal pipelines without bloated per-seat subscriptions.",
    overviewHeading: "CRM Systems Engineered for How Modern Companies Actually Sell",
    overviewParagraphs: [
      "For small and mid-sized enterprises, managing sales leads, customer communication, and service contracts across disconnected spreadsheets and generic email inboxes rapidly creates operational bottlenecks. Recognizing this challenge, leadership teams typically invest in massive commercial SaaS platformsâ€”such as Salesforce or HubSpotâ€”expecting immediate clarity.",
      "Within six months, however, an alarming proportion of businesses find themselves paying thousands of dollars monthly in licensing fees for complex systems that their staff actively avoid using. Fields remain unpopulated, workflows are poorly represented, and customer records sit disconnected from financial systems. Choosing the right Customer Relationship Management (CRM) platform requires prioritizing workflow alignment, data governance, and operational adoption over brand recognition.",
      "Aakaar Digital designs and develops streamlined CRM solutions tailored to your unique sales cycle. We build intuitive drag-and-drop deal pipelines, automated email and WhatsApp reminders, direct integrations with billing tools like QuickBooks and Xero, and strict compliance with global privacy regulations (GDPR, CAN-SPAM, CASL). Our CRMs give sales reps exactly what they needâ€”and nothing they don't.",
    ],
    useCases: [
      {
        title: "B2B Sales Pipeline & Quoting",
        description: "Visual kanban deal boards, multi-tier proposal generation, and automated follow-up sequences for commercial B2B sales teams.",
      },
      {
        title: "Trade & Service Dispatch Management",
        description: "Tracking customer property history, recurring maintenance agreements, and scheduling on-site service appointments.",
      },
      {
        title: "Privacy-Compliant Contact Management",
        description: "Centralized customer database logging express consent dates, communication history, and one-click opt-outs.",
      },
      {
        title: "Accounting & Invoice Synchronization",
        description: "Automatically generating invoices in QuickBooks Online or Xero the moment a deal stage moves to 'Closed-Won'.",
      },
    ],
    benefits: [
      {
        title: "High Staff Adoption Rates",
        description: "Clean, simplified interfaces with only the fields your team actually uses, eliminating CRM friction and data omissions.",
      },
      {
        title: "Native Consent & Privacy Auditing",
        description: "Automated tracking of consent categories, expiry timelines, and opt-out commands keeping your outreach strictly compliant.",
      },
      {
        title: "Seamless Accounting Sync",
        description: "Eliminate double-entry by automatically pushing customer profiles and won deals into your billing platform.",
      },
      {
        title: "Predictable, Fixed Investment",
        description: "Pay for the software once rather than suffering compounding monthly subscription increases as your sales headcount grows.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We map your sales stages, lead sources, communication channels, and accounting integration requirements." },
      { step: "02", title: "Design", description: "We design custom contact cards, visual pipeline boards, automated email triggers, and reporting dashboards." },
      { step: "03", title: "Build", description: "We engineer the CRM database, connect email/WhatsApp APIs, implement privacy rules, and configure webhooks." },
      { step: "04", title: "Launch & Support", description: "We migrate contact histories, train your sales reps, verify sync accuracy, and monitor live deals." },
    ],
    faqs: [
      {
        question: "Can your CRM integrate with QuickBooks Online and Xero?",
        answer: "Yes. When an opportunity is marked won, our system automatically creates customer records and draft or final invoices in QuickBooks Online or Xero with correct regional tax rules.",
      },
      {
        question: "How does the system help with international privacy and anti-spam laws?",
        answer: "The CRM natively logs consent types, transaction timestamps, and expiration countdowns. It blocks automated outreach if consent has lapsed without renewal, adhering to GDPR, CAN-SPAM, and CASL.",
      },
      {
        question: "Can we access the CRM on mobile devices in the field?",
        answer: "Yes. The CRM is built responsive-first, allowing sales reps and field technicians to update deal stages, log call notes, and review customer files seamlessly on smartphones.",
      },
      {
        question: "Can we import our existing leads from spreadsheets?",
        answer: "Yes. We clean and format your CSV spreadsheets, map contact fields, eliminate duplicates, and import all historical records into your new CRM database.",
      },
    ],
    deliverables: [
      "Custom CRM platform tailored to your sales process",
      "Visual drag-and-drop pipeline management board",
      "Global privacy and consent tracking system",
      "Two-way integration with QuickBooks Online or Xero",
      "Automated email and WhatsApp notification triggers",
      "Complete historical contact data migration",
    ],
  },

  "lms-platforms": {
    slug: "lms-platforms",
    title: "LMS & E-Learning Platforms",
    shortDescription: "Custom learning management systems, course delivery architecture, and enterprise compliance training platforms with certification engines.",
    iconName: "GraduationCap",
    tagline: "Bespoke e-learning systems engineered for professional associations, corporate training, and accredited certifications.",
    overviewHeading: "Scalable E-Learning Platforms Built for Global Regulatory and Training Standards",
    overviewParagraphs: [
      "Around the world, professional associations, safety certification bodies, healthcare institutions, and corporate enterprises are transitioning their specialized training curricula from physical classrooms into digital Learning Management Systems (LMS). Whether delivering continuing education, mandatory workplace certifications, or corporate onboarding, digital delivery dramatically scales reach while reducing overhead.",
      "However, many organizations attempt to deploy commercial off-the-shelf course marketplaces that were engineered for generic audiences. When these platforms encounter specialized accreditation standards, regional tax complexities, and multi-language operational requirements, fundamental operational deficiencies quickly emerge. Before launching courses to learners, your LMS architecture must satisfy several non-negotiable standards.",
      "Aakaar Digital develops bespoke LMS platforms featuring SCORM/xAPI module support, native multi-language toggles, automated PDF certificate generation, timed assessments with randomized question banks, and accurate localized checkout calculations. We build systems you own and control completely.",
    ],
    useCases: [
      {
        title: "Mandatory Corporate Compliance Training",
        description: "Workplace safety, regulatory, and compliance courses with verifiable completion tracking and expiration alerts.",
      },
      {
        title: "Professional Association Continuing Education",
        description: "Accredited educational modules awarding continuing education credits (CEUs) to certified professionals worldwide.",
      },
      {
        title: "Commercial Course Marketplaces",
        description: "Monetized digital academies selling paid courses with localized tax calculations and instant global credit card checkout.",
      },
      {
        title: "Employee Onboarding & Knowledge Bases",
        description: "Structured onboarding pathways for distributed corporate workforces with interactive assessments.",
      },
    ],
    benefits: [
      {
        title: "Multi-Language & Localization Support",
        description: "Learners toggle languages effortlessly; certificates dynamically output correct regional legal accreditation terms.",
      },
      {
        title: "Automated Regional Tax Billing",
        description: "Accurately calculates local sales tax, VAT, or GST at checkout based on the learner's country and postal code.",
      },
      {
        title: "Standard SCORM & xAPI Compatibility",
        description: "Import rich course modules built in Articulate 360, Adobe Captivate, or iSpring without proprietary format restrictions.",
      },
      {
        title: "Automated Verifiable Digital Certificates",
        description: "Generates tamper-proof PDF completion certificates featuring verifiable QR codes and unique serial hashes.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We define learning objectives, curriculum formats (video, SCORM, quizzes), billing models, and accreditation requirements." },
      { step: "02", title: "Design", description: "We design distraction-free learner interfaces, course outline navigations, and administrative grading dashboards." },
      { step: "03", title: "Build", description: "We develop the LMS engine, integrate adaptive video streaming, configure assessment rules, and connect payment gateways." },
      { step: "04", title: "Launch & Support", description: "We upload pilot course content, verify tax calculations across all regions, and train your curriculum administrators." },
    ],
    faqs: [
      {
        question: "Can our LMS support multi-language learners?",
        answer: "Yes. Our LMS architectures feature native multi-language support, allowing students to toggle interfaces and receive certificates generated in their chosen language.",
      },
      {
        question: "How do you handle video streaming for learners with varying internet connections?",
        answer: "We implement HTTP Live Streaming (HLS) with adaptive bitrates, ensuring video lessons stream smoothly without buffering even on bandwidth-constrained connections.",
      },
      {
        question: "Can we prevent students from skipping video lessons before taking exams?",
        answer: "Yes. We implement playback verification that prevents advancing to quizzes until the student has fully completed required video modules.",
      },
      {
        question: "Does the system automatically generate certificates upon course completion?",
        answer: "Yes. As soon as a learner achieves a passing score on the final assessment, the LMS instantly renders a customized, print-ready PDF certificate with a verifiable validation hash.",
      },
    ],
    deliverables: [
      "Custom LMS web portal for learners and administrators",
      "SCORM 1.2 / 2004 and xAPI content player",
      "Adaptive bitrate video hosting architecture",
      "Timed examination and randomized quiz engine",
      "Multi-currency tax-compliant payment gateway integration",
      "Automated multilingual PDF certificate generation system",
    ],
  },

  "whatsapp-automation": {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    shortDescription: "Official WhatsApp Business Platform API integrations, lead qualification chatbots, and automated customer dispatch notifications.",
    iconName: "MessageSquare",
    tagline: "Turn instant messaging into an automated customer communication and sales channel.",
    overviewHeading: "Automate Customer Inquiries and Reduce Phone Tag with the WhatsApp Cloud API",
    overviewParagraphs: [
      "In high-touch service sectors worldwideâ€”from commercial contracting and field services to legal consultancies, e-commerce, and healthcareâ€”customer responsiveness dictates commercial success. Prospective clients seeking quotes rarely leave voicemails; they expect immediate verification that their enquiry has been acknowledged and is receiving prompt technical attention.",
      "Yet for growing businesses and distributed operations, maintaining staff dedicated exclusively to answering incoming phone inquiries across multiple time zones is cost-prohibitive. Front-desk personnel spend hours playing phone tag, leaving unanswered voicemails, and sending email follow-ups that languish in spam folders. Integrating official WhatsApp automation into your business processes transforms this dynamic by meeting clients on the messaging channel they already check throughout the business day.",
      "Aakaar Digital implements verified WhatsApp Business Platform (Cloud API) solutions that automate lead qualification, confirm field appointments, dispatch work order status updates, and sync conversations directly with your CRM. We ensure strict international anti-spam compliance (CASL, GDPR, TCPA) with affirmative opt-ins and instant opt-out handling.",
    ],
    useCases: [
      {
        title: "Automated Lead Qualification & Intake",
        description: "Engage website visitors on WhatsApp to collect postal code, service needed, and project photos in under 60 seconds.",
      },
      {
        title: "Field Appointment Reminders",
        description: "Send automated appointment alerts with interactive confirmation and rescheduling buttons, reducing missed visits.",
      },
      {
        title: "Work Order Status Updates",
        description: "Automatically message clients when a technician is in transit, work is completed, or invoices are ready for payment.",
      },
      {
        title: "Multi-Agent Shared Support Inbox",
        description: "Enable multiple team members to manage customer chats from a single official corporate WhatsApp phone number.",
      },
    ],
    benefits: [
      {
        title: "98% Message Open Rates",
        description: "WhatsApp messages achieve dramatically higher open and response rates compared to standard commercial email follow-ups.",
      },
      {
        title: "Official Meta Verified Profile",
        description: "Establish consumer trust with an official business profile displaying verified address, business hours, and branding.",
      },
      {
        title: "Seamless CRM & Webhook Sync",
        description: "Every inbound message, photo, and lead response syncs directly into your customer timeline with zero manual data entry.",
      },
      {
        title: "Global Anti-Spam Compliance",
        description: "Built-in opt-in management and instant 'STOP' opt-out triggers keeping your corporate communications fully compliant with global standards (GDPR, CASL, TCPA).",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We map your customer messaging scenarios, frequently asked questions, qualification fields, and team routing rules." },
      { step: "02", title: "Design", description: "We draft conversation flows, interactive button menus, and pre-approved Meta message templates." },
      { step: "03", title: "Build", description: "We register your WhatsApp Cloud API account, connect webhooks to your CRM, and configure automated chatbot flows." },
      { step: "04", title: "Launch & Support", description: "We test two-way communication across mobile carriers, train support staff, and monitor delivery analytics." },
    ],
    faqs: [
      {
        question: "How is this different from the free WhatsApp Business app on a phone?",
        answer: "The consumer app is tied to a single mobile device. The official WhatsApp Cloud API allows entire teams to collaborate from a centralized dashboard, integrates with your CRM, and supports automated chatbots.",
      },
      {
        question: "Do we need Meta Business verification to use the WhatsApp API?",
        answer: "Yes. We guide your company through official Meta Business verification, phone number registration, and display name approval.",
      },
      {
        question: "Can an automated conversation be handed off to a live person?",
        answer: "Yes. Our chatbot flows detect when human intervention is needed or requested, immediately alerting a designated team member and providing the full conversation transcript.",
      },
      {
        question: "Does WhatsApp automation comply with global anti-spam regulations (CASL, GDPR, TCPA)?",
        answer: "Yes. We configure strict opt-in checkpoints on your digital channels and support instant unsubscribe commands that immediately halt automated outreach in accordance with international standards.",
      },
    ],
    deliverables: [
      "Official Meta WhatsApp Cloud API account registration",
      "Custom conversational lead intake and qualification bot",
      "Interactive appointment confirmation and reminder workflows",
      "Two-way CRM integration via secure webhooks",
      "Multi-agent shared team inbox configuration",
      "Pre-approved Meta utility message templates",
    ],
  },

  "integrations-automation": {
    slug: "integrations-automation",
    title: "Integrations & Workflow Automation",
    shortDescription: "Custom REST APIs, ERP/accounting synchronization, and automated data pipelines connecting your business software without manual data entry.",
    iconName: "Cpu",
    tagline: "Connect your existing software tools into unified, automated data pipelines.",
    overviewHeading: "Eliminate Manual Data Entry by Connecting Disconnected Business Systems",
    overviewParagraphs: [
      "As growing businesses expand, they inevitably adopt specialized software tools for distinct functions: an e-commerce storefront for orders, an accounting platform for invoices, a warehouse system for inventory, and a CRM for sales. When these applications cannot communicate with one another, employees spend dozens of hours every week manually copying and pasting records between browser tabs.",
      "Manual data entry is not only expensiveâ€”it introduces inevitable transcription errors, delayed customer order fulfillment, and outdated financial reporting. Aakaar Digital engineers robust, secure system integrations and automated workflow pipelines that synchronize data across your operational software in real time.",
      "We build custom REST and GraphQL API connectors, webhook event dispatchers, and automated sync jobs using secure microservices or middleware. Whether synchronizing QuickBooks with proprietary manufacturing software, pushing Shopify orders to legacy ERPs, or piping lead data into marketing databases, our integrations ensure data integrity and auditability.",
    ],
    useCases: [
      {
        title: "Accounting & ERP Synchronization",
        description: "Automatic real-time sync between e-commerce orders, CRM deals, and QuickBooks Online or Xero accounting ledgers.",
      },
      {
        title: "Warehouse & Inventory Sync",
        description: "Multi-channel inventory updates ensuring product counts remain synchronized across web storefronts and physical warehouses.",
      },
      {
        title: "Third-Party Logistics (3PL) Connectors",
        description: "Automated transmission of shipping manifests, tracking numbers, and fulfillment statuses to global and regional carriers (FedEx, UPS, DHL, Canada Post).",
      },
      {
        title: "Automated Document & PDF Generation",
        description: "Dynamic creation of signed work orders, commercial invoices, and regulatory compliance receipts generated from database events.",
      },
    ],
    benefits: [
      {
        title: "Save Hundreds of Staff Hours",
        description: "Eliminate repetitive copying and pasting between disconnected software applications, freeing staff for high-value tasks.",
      },
      {
        title: "Near-Zero Transcription Errors",
        description: "Automated programmatic validation guarantees data accuracy across all financial, inventory, and customer databases.",
      },
      {
        title: "Real-Time Operational Visibility",
        description: "Leadership gains immediate insight into inventory levels, sales velocity, and financial margins without manual delays.",
      },
      {
        title: "Resilient Retry & Error Alerting",
        description: "Our sync pipelines feature automated retry queues and Slack/email alerts so temporary third-party API outages never drop data.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We audit your existing software tools, API capabilities, rate limits, data schemas, and error thresholds." },
      { step: "02", title: "Design", description: "We map data transformation rules, field-by-field schemas, conflict resolution policies, and security tokens." },
      { step: "03", title: "Build", description: "We develop custom API middleware, implement webhook listeners, write unit tests, and configure retry queues." },
      { step: "04", title: "Launch & Support", description: "We execute staging simulations with production data samples, monitor live transactions, and provide logging tools." },
    ],
    faqs: [
      {
        question: "Can you connect older legacy software that does not have modern REST APIs?",
        answer: "In many cases, yes. We can often connect legacy systems via database triggers, automated SFTP batch file exports, or headless ODBC queries.",
      },
      {
        question: "What happens if one of the connected third-party tools goes down?",
        answer: "Our integration pipelines implement resilient message queues (such as Redis or database queues). If an external API is temporarily unavailable, messages are held safely and retried with exponential backoff until successful.",
      },
      {
        question: "Is our business data secure when transferring between systems?",
        answer: "Yes. All data in transit is encrypted using TLS 1.3. API keys and credentials are stored in secure environment secrets management, and sensitive fields are encrypted at rest.",
      },
      {
        question: "Can we track and review what data was synchronized?",
        answer: "Yes. We build an administrative audit dashboard where your team can inspect sync timestamps, payload contents, and review any flagged discrepancies.",
      },
    ],
    deliverables: [
      "Custom API integration middleware and webhook listeners",
      "Field-level data mapping and transformation documentation",
      "Automated queue and error recovery retry architecture",
      "Real-time synchronization audit log dashboard",
      "Integration unit tests and staging simulation suite",
      "API monitoring and failure alerting configuration",
    ],
  },

  "maintenance-support": {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    shortDescription: "Proactive software maintenance, security patches, Core Web Vitals monitoring, and guaranteed response SLAs for mission-critical applications worldwide.",
    iconName: "Shield",
    tagline: "Keep your web and software applications fast, secure, and continuously operational.",
    overviewHeading: "Proactive Engineering Support to Protect Your Critical Digital Assets",
    overviewParagraphs: [
      "Launching a custom web application or software platform is only the first chapter of its operational lifecycle. Software operates in an constantly evolving digital ecosystem: browser standards change, third-party API endpoints deprecate older versions, dependency libraries require security patches, and database indexes need maintenance as transaction records expand.",
      "Leaving mission-critical business software without structured maintenance inevitably invites performance degradation, unexpected downtime, and severe security vulnerabilities. Aakaar Digital provides dedicated maintenance and support agreements for growing companies and enterprises worldwide. We do not provide consumer IT helpdesk or printer support; we provide rigorous software engineering maintenance for production applications.",
      "Our support plans include 24/7 automated uptime and latency monitoring, regular framework and security dependency updates, scheduled database backups, Core Web Vitals performance tuning, and guaranteed response times backed by clear Service Level Agreements (SLAs).",
    ],
    useCases: [
      {
        title: "Mission-Critical Web Applications",
        description: "Continuous monitoring, automated security patch updates, and rapid bug resolution for high-revenue business applications.",
      },
      {
        title: "API & Third-Party Dependency Maintenance",
        description: "Proactive updates ensuring your integrations with payment gateways, CRMs, and messaging APIs never break during provider upgrades.",
      },
      {
        title: "Database Optimization & Archival",
        description: "Regular index tuning, query optimization, and archival of historical data to maintain snappy response times as data scales.",
      },
      {
        title: "Emergency Incident Response",
        description: "Fast-response engineering standby for unexpected server incidents, SSL expiration issues, or critical production bugs.",
      },
    ],
    benefits: [
      {
        title: "Guaranteed SLA Response Times",
        description: "Clear contractual commitments ensuring urgent production bugs receive immediate attention within defined response windows.",
      },
      {
        title: "Zero Downtime Deployments",
        description: "Security patches and updates are deployed using automated staging pipelines and canary checks without interrupting customers.",
      },
      {
        title: "Proactive Security & CVE Patching",
        description: "Continuous automated scanning of code dependencies against global vulnerability databases (CVEs) with immediate patching.",
      },
      {
        title: "Senior Engineering Availability",
        description: "Direct access to experienced senior software engineers who know your codebase intimatelyâ€”no disconnected call centres or junior order-takers.",
      },
    ],
    process: [
      { step: "01", title: "Discover", description: "We audit your existing application architecture, server configuration, dependency trees, and error logs." },
      { step: "02", title: "Design", description: "We establish synthetic uptime monitors, automated backup routines, staging environments, and escalation protocols." },
      { step: "03", title: "Build", description: "We remediate outstanding technical debt, patch outdated packages, and optimize slow database queries." },
      { step: "04", title: "Launch & Support", description: "We initiate monthly maintenance cycles, continuous monitoring, and provide transparent monthly status reports." },
    ],
    faqs: [
      {
        question: "Do you only maintain software built by Aakaar Digital?",
        answer: "While we prioritize applications we engineered, we also onboard and maintain existing Next.js, React, Node.js, and PHP/Laravel applications after conducting an initial technical discovery audit.",
      },
      {
        question: "What is your emergency response time for critical issues?",
        answer: "Our critical SLA guarantees engineering response within 1 hour for severe outages impacting production transactions, available 24/7 under dedicated enterprise retainers.",
      },
      {
        question: "How often do you apply software updates and security patches?",
        answer: "Routine dependency updates are applied and tested on staging monthly. Urgent zero-day security patches are deployed immediately upon vendor disclosure.",
      },
      {
        question: "Are database backups included in maintenance plans?",
        answer: "Yes. We configure automated daily encrypted database snapshots retained offsite in secure multi-region cloud storage, tested with quarterly restoration drills.",
      },
    ],
    deliverables: [
      "24/7 automated uptime and latency monitoring with synthetic checks",
      "Monthly security patching and dependency upgrades on staging",
      "Automated daily offsite database backups with tested restore scripts",
      "Guaranteed Service Level Agreement (SLA) response windows",
      "Monthly executive health report covering performance, speed, and uptime",
      "Dedicated developer hours for ongoing feature tweaks and enhancements",
    ],
  },
};

