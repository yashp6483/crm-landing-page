export interface FeatureItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  previewMock: {
    title: string;
    type: "kanban" | "hrms" | "invoice";
    data: any;
  };
}

export interface ConnectorItem {
  id: string;
  name: string;
  category: "Social Ads" | "Real Estate" | "B2B Marketplace" | "Messaging" | "Developer API";
  description: string;
  badgeText: string;
  color: string;
  syncSpeed: string;
  iconType: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  statNumber?: number;
  statPrefix?: string;
  statSuffix?: string;
  statLabel?: string;
  colSpan?: string;
}

export const SITE_CONFIG = {
  name: "Orbit 360",
  tagline: "The Unified Operating System for High-Growth Businesses",
  heroHeadingPrimary: "Run Leads, People, and Billing",
  heroHeadingSecondary: "— All On One Unified Platform.",
  heroSubheadline: "Orbit 360 converges intelligent Lead Pipelines, automated HRMS workflows, and GST-compliant Invoicing into a single high-performance cockpit.",
  stats: [
    { value: 500, prefix: "", suffix: "+", label: "Enterprise Teams Trust Us" },
    { value: 12, prefix: "$", suffix: "M+", label: "Monthly Revenue Processed" },
    { value: 99.99, prefix: "", suffix: "%", label: "Automated Lead Route Rate" },
    { value: 4.9, prefix: "", suffix: "/5", label: "User Satisfaction Score" },
  ],
  navLinks: [
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Why Orbit 360", href: "#why-us" },
    { label: "Contact & Demo", href: "#demo" },
  ],
};

export const TRUST_LOGOS = [
  { name: "Apex Global", industry: "Real Estate" },
  { name: "Velox Financial", industry: "Fintech" },
  { name: "Nexus Healthcare", industry: "Healthtech" },
  { name: "Starlight Retail", industry: "E-Commerce" },
  { name: "Terraform Infra", industry: "Construction" },
  { name: "Krypton Tech", industry: "SaaS" },
  { name: "Omni Logistics", industry: "Supply Chain" },
  { name: "Quantum Dynamics", industry: "Manufacturing" },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "lead-management",
    badge: "01. Revenue Engine",
    title: "Smart Visual Lead Pipeline & Scoring",
    tagline: "Capture, track, score, and convert every high-intent opportunity without lead drop-off.",
    description: "Eliminate manual spreadsheet chaos. Orbit 360 routes inbound leads instantly based on rep availability, geography, and AI lead quality scoring.",
    iconName: "Kanban",
    highlights: [
      "Dynamic Kanban stages with custom deal probability scoring",
      "Instant automated SLA alerts & auto-reassignment rules",
      "WhatsApp & Email omnichannel call logs right inside deal cards",
    ],
    metrics: [
      { label: "Lead Response Time", value: "< 45 secs" },
      { label: "Conversion Lift", value: "+38%" },
    ],
    previewMock: {
      title: "Visual Sales Pipeline",
      type: "kanban",
      data: [
        { title: "New Qualified", count: 18, amount: "$142,000", color: "from-blue-500/20 to-cyan-500/10" },
        { title: "Demo Scheduled", count: 12, amount: "$98,500", color: "from-indigo-500/20 to-purple-500/10" },
        { title: "Proposal Sent", count: 7, amount: "$210,000", color: "from-amber-500/20 to-orange-500/10" },
        { title: "Negotiation", count: 4, amount: "$85,000", color: "from-emerald-500/20 to-teal-500/10" },
      ],
    },
  },
  {
    id: "hrms",
    badge: "02. Workforce Operations",
    title: "Integrated HRMS & Team Telemetry",
    tagline: "Unify employee lifecycle management, attendance, leave approvals, and performance in one place.",
    description: "Manage employee master files, automated shift tracking, leave workflows, and team quota achievements linked directly to CRM revenue goals.",
    iconName: "Users",
    highlights: [
      "Geo-fenced mobile attendance & remote check-in logs",
      "1-Click leave approvals with automated Slack/WhatsApp notifications",
      "Real-time rep performance leaderboards linked to live deal closures",
    ],
    metrics: [
      { label: "HR Admin Hours Saved", value: "16 hrs/mo" },
      { label: "Payroll Accuracy", value: "100%" },
    ],
    previewMock: {
      title: "HRMS & Attendance Hub",
      type: "hrms",
      data: [
        { name: "Sarah Jenkins", role: "Sales Director", status: "On Duty", checkedIn: "08:58 AM", quota: "114%" },
        { name: "Rahul Sharma", role: "Account Exec", status: "On Duty", checkedIn: "09:05 AM", quota: "92%" },
        { name: "Elena Rostova", role: "HR Specialist", status: "Remote", checkedIn: "09:12 AM", quota: "100%" },
        { name: "David Chen", role: "Sr. SDR", status: "On Leave", checkedIn: "Planned", quota: "88%" },
      ],
    },
  },
  {
    id: "invoicing",
    badge: "03. Financial Billing",
    title: "GST-Ready Smart Invoicing & Billing",
    tagline: "Transform won opportunities into GST-compliant invoices with zero double data entry.",
    description: "Auto-generate recurring subscriptions, track payment milestones, send automated payment reminders, and keep your accounting synced seamlessly.",
    iconName: "Receipt",
    highlights: [
      "Auto-fill customer GSTIN, HSN codes & multi-state tax rates",
      "One-click payment links via Razorpay, Stripe, and UPI",
      "Real-time accounts receivable aging dashboard and overdue alerts",
    ],
    metrics: [
      { label: "Days Sales Outstanding", value: "-12 days" },
      { label: "Invoice Generation", value: "Instant" },
    ],
    previewMock: {
      title: "GST Billing & Tax Matrix",
      type: "invoice",
      data: [
        { id: "INV-2026-889", client: "Apex Tech Corp", total: "$14,500.00", status: "PAID", gst: "18% CGST/SGST" },
        { id: "INV-2026-890", client: "Vanguard Retail", total: "$8,200.00", status: "DUE IN 3 DAYS", gst: "18% IGST" },
        { id: "INV-2026-891", client: "Horizon Media", total: "$22,000.00", status: "OVERDUE", gst: "18% CGST/SGST" },
      ],
    },
  },
];

export const CONNECTORS_DATA: ConnectorItem[] = [
  {
    id: "fb-ads",
    name: "Facebook Lead Ads",
    category: "Social Ads",
    description: "Instant webhooks capture instant form submissions from Meta Facebook & Instagram campaigns.",
    badgeText: "Meta Verified",
    color: "#1877F2",
    syncSpeed: "< 1s sync",
    iconType: "facebook",
  },
  {
    id: "indiamart",
    name: "IndiaMART",
    category: "B2B Marketplace",
    description: "Auto-ingest buyer inquiries, requirements, and RFQs directly into assigned sales reps' buckets.",
    badgeText: "API v2 Ready",
    color: "#283593",
    syncSpeed: "< 2s sync",
    iconType: "shopping-bag",
  },
  {
    id: "99acres",
    name: "99acres",
    category: "Real Estate",
    description: "Capture buyer/tenant inquiries, property IDs, and price brackets instantly without loss.",
    badgeText: "Real Estate Connector",
    color: "#00897B",
    syncSpeed: "< 3s sync",
    iconType: "building",
  },
  {
    id: "housing",
    name: "Housing.com",
    category: "Real Estate",
    description: "Seamless lead webhook mapping for project leads, site visit requests, and call requests.",
    badgeText: "Direct Webhook",
    color: "#E91E63",
    syncSpeed: "< 2s sync",
    iconType: "home",
  },
  {
    id: "magicbricks",
    name: "MagicBricks",
    category: "Real Estate",
    description: "Auto-parse buyer lead alerts, owner listings, and verified phone leads directly to CRM.",
    badgeText: "Instant Connector",
    color: "#D32F2F",
    syncSpeed: "< 2s sync",
    iconType: "layers",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "Social Ads",
    description: "Capture Search, Performance Max, and Youtube lead form extensions with full keyword attribution.",
    badgeText: "GAds Webhook",
    color: "#EA4335",
    syncSpeed: "< 1s sync",
    iconType: "search",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Messaging",
    description: "Turn incoming WhatsApp conversations into active CRM leads with full message history.",
    badgeText: "Meta Cloud API",
    color: "#25D366",
    syncSpeed: "Realtime",
    iconType: "message-circle",
  },
  {
    id: "custom-api",
    name: "Custom API & Webhooks",
    category: "Developer API",
    description: "Build custom integrations using secured REST API endpoints, JWT auth, and custom field mappers.",
    badgeText: "REST / Webhook",
    color: "#6366F1",
    syncSpeed: "Sub-millisecond",
    iconType: "code",
  },
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    id: "all-in-one",
    title: "All-in-One Business Core",
    description: "Stop paying for 4 separate disconnected SaaS tools. Unify Sales, HR, and Billing under one central login.",
    iconName: "Boxes",
    colSpan: "lg:col-span-2",
  },
  {
    id: "zero-manual-entry",
    title: "Zero Manual Lead Entry",
    description: "Automatic lead routing eliminates data entry delay, getting reps on the phone within 60 seconds of inquiry.",
    iconName: "Zap",
    statNumber: 99.8,
    statSuffix: "%",
    statLabel: "Manual Entry Eliminated",
    colSpan: "lg:col-span-1",
  },
  {
    id: "realtime-visibility",
    title: "Real-Time Telemetry",
    description: "Track sales pipelines, rep calls, employee attendance, and revenue cash flow in real-time dashboards.",
    iconName: "Activity",
    colSpan: "lg:col-span-1",
  },
  {
    id: "bank-grade-security",
    title: "Bank-Grade Security & Roles",
    description: "SOC2 Type II compliant, AES-256 encryption at rest, role-based field permissions, and full audit logs.",
    iconName: "ShieldCheck",
    statNumber: 256,
    statPrefix: "AES-",
    statLabel: "Military Grade Encryption",
    colSpan: "lg:col-span-2",
  },
  {
    id: "fast-setup",
    title: "Setup in Minutes, Not Months",
    description: "Pre-built plug-and-play connectors allow teams to go live on day 1 with zero custom code needed.",
    iconName: "Clock",
    colSpan: "lg:col-span-1",
  },
  {
    id: "dedicated-support",
    title: "24/7 Dedicated Concierge",
    description: "Get a dedicated CSM, 99.99% uptime guarantee SLA, and fast priority response in under 5 minutes.",
    iconName: "Headphones",
    colSpan: "lg:col-span-2",
  },
];

export const DEMO_BENEFITS = [
  "Custom live demo tailored to your industry",
  "Free trial with full feature unlocked for 14 days",
  "Free lead migration assistance from legacy CRMs",
  "Zero setup fees or hidden API maintenance costs",
];
