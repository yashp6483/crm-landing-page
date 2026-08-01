import { UserModel } from "@/lib/db/models/User";
import { LeadModel } from "@/lib/db/models/Lead";
import { EmployeeModel } from "@/lib/db/models/Employee";
import { AttendanceModel } from "@/lib/db/models/Attendance";
import { LeaveModel } from "@/lib/db/models/Leave";
import { InvoiceModel } from "@/lib/db/models/Invoice";
import { ConnectorModel } from "@/lib/db/models/Connector";
import { NotificationModel } from "@/lib/db/models/Notification";
import { hashPassword } from "@/lib/auth/bcrypt";

export async function ensureDatabaseSeeded() {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      // Database already has records
      return;
    }

    console.log("Seeding MongoDB collections with default enterprise documents...");

    // 1. Seed Users in MongoDB
    const defaultPassword = await hashPassword("Orbit360@2026");
    await UserModel.create([
      {
        name: "Sarah Jenkins",
        email: "sarah.jenkins@orbit360.com",
        passwordHash: defaultPassword,
        role: "ADMIN",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Executive & Sales",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@orbit360.com",
        passwordHash: defaultPassword,
        role: "SALES",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Sales & Revenue",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      },
      {
        name: "Elena Rostova",
        email: "elena.rostova@orbit360.com",
        passwordHash: defaultPassword,
        role: "HR",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Human Resources",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      },
      {
        name: "David Chen",
        email: "david.chen@orbit360.com",
        passwordHash: defaultPassword,
        role: "EMPLOYEE",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Customer Success",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      },
    ]);

    // 2. Seed Leads in MongoDB
    await LeadModel.create([
      {
        title: "Enterprise CRM Implementation (500 Seats)",
        contactName: "Michael Chang",
        email: "mchang@apextech.com",
        phone: "+1 (555) 234-5678",
        companyName: "Apex Tech Corp",
        value: 145000,
        currency: "USD",
        status: "NEGOTIATION",
        priority: "URGENT",
        source: "Facebook Lead Ads",
        assignedToName: "Sarah Jenkins",
        assignedToEmail: "sarah.jenkins@orbit360.com",
        tags: ["Enterprise", "High Intent", "Q3 Closure"],
        notes: "Requested custom GST billing integration and SSO migration.",
        logs: [
          { id: "l-1", type: "CALL", content: "30-min discovery call completed. Budget approved.", author: "Sarah Jenkins", timestamp: "2026-07-28 14:30" },
          { id: "l-2", type: "WHATSAPP", content: "Sent customized enterprise proposal PDF.", author: "Sarah Jenkins", timestamp: "2026-07-29 10:15" },
        ],
      },
      {
        title: "Real Estate Portal Multi-Broker Sync",
        contactName: "Priya Sundaram",
        email: "priya@vanguardrealty.in",
        phone: "+91 98765 43210",
        companyName: "Vanguard Infra & Realty",
        value: 48000,
        currency: "USD",
        status: "PROPOSAL_SENT",
        priority: "HIGH",
        source: "99acres",
        assignedToName: "Rahul Sharma",
        assignedToEmail: "rahul.sharma@orbit360.com",
        tags: ["Real Estate", "IndiaMART", "Automated Routing"],
        notes: "Interested in 99acres & Housing.com auto-ingestion features.",
        logs: [
          { id: "l-3", type: "EMAIL", content: "Sent platform demo link and walkthrough video.", author: "Rahul Sharma", timestamp: "2026-07-30 11:00" },
        ],
      },
      {
        title: "Omnichannel WhatsApp Lead Automation",
        contactName: "Alexander Wright",
        email: "a.wright@horizonmedia.io",
        phone: "+44 20 7946 0912",
        companyName: "Horizon Media Group",
        value: 62000,
        currency: "USD",
        status: "DEMO_SCHEDULED",
        priority: "MEDIUM",
        source: "WhatsApp Business",
        assignedToName: "Rahul Sharma",
        assignedToEmail: "rahul.sharma@orbit360.com",
        tags: ["WhatsApp API", "Marketing"],
        notes: "Demo scheduled for Friday 3 PM GMT.",
        logs: [],
      },
      {
        title: "Fintech HRMS & Attendance Sync",
        contactName: "Jessica Alba",
        email: "jessica@veloxfintech.com",
        phone: "+1 (555) 987-6543",
        companyName: "Velox Financial",
        value: 88000,
        currency: "USD",
        status: "QUALIFIED",
        priority: "HIGH",
        source: "Google Ads",
        assignedToName: "Sarah Jenkins",
        assignedToEmail: "sarah.jenkins@orbit360.com",
        tags: ["HRMS", "Fintech"],
        notes: "Geo-fenced attendance and mobile check-in requirement.",
        logs: [],
      },
      {
        title: "B2B Marketplace Lead Distribution Hub",
        contactName: "Amitabh Verma",
        email: "averma@indiamart-vendor.com",
        phone: "+91 91234 56789",
        companyName: "Starlight Industrial Solutions",
        value: 35000,
        currency: "USD",
        status: "WON",
        priority: "URGENT",
        source: "IndiaMART",
        assignedToName: "Sarah Jenkins",
        assignedToEmail: "sarah.jenkins@orbit360.com",
        tags: ["Closed Won", "IndiaMART"],
        notes: "Contract signed! Payment received via Wire Transfer.",
        logs: [
          { id: "l-4", type: "STAGE_CHANGE", content: "Lead stage moved to WON.", author: "System", timestamp: "2026-07-31 16:45" },
        ],
      },
      {
        title: "Custom REST Webhook Developer Integration",
        contactName: "Markus Vance",
        email: "mvance@krypton-saas.com",
        phone: "+1 (555) 444-1212",
        companyName: "Krypton Cloud Solutions",
        value: 28000,
        currency: "USD",
        status: "NEW",
        priority: "LOW",
        source: "Custom API & Webhooks",
        assignedToName: "Rahul Sharma",
        assignedToEmail: "rahul.sharma@orbit360.com",
        tags: ["Developer API", "Inbound"],
        notes: "Inbound developer key request.",
        logs: [],
      },
    ]);

    // 3. Seed Employees in MongoDB
    await EmployeeModel.create([
      {
        employeeId: "EMP-101",
        name: "Sarah Jenkins",
        email: "sarah.jenkins@orbit360.com",
        phone: "+1 (555) 234-5678",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Sales & Revenue",
        designation: "VP of Enterprise Sales",
        joiningDate: "2023-03-01",
        salary: 125000,
        baseSalary: 90000,
        allowances: 40000,
        deductions: 5000,
        netSalary: 125000,
        status: "ACTIVE",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        quotaAchievement: "114%",
      },
      {
        employeeId: "EMP-102",
        name: "Rahul Sharma",
        email: "rahul.sharma@orbit360.com",
        phone: "+91 98765 43210",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Sales & Revenue",
        designation: "Senior Account Executive",
        joiningDate: "2023-08-15",
        salary: 85000,
        baseSalary: 60000,
        allowances: 28000,
        deductions: 3000,
        netSalary: 85000,
        status: "ACTIVE",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        quotaAchievement: "96%",
      },
      {
        employeeId: "EMP-103",
        name: "Elena Rostova",
        email: "elena.rostova@orbit360.com",
        phone: "+1 (555) 888-9999",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Human Resources",
        designation: "Head of People & HRMS",
        joiningDate: "2022-11-01",
        salary: 95000,
        baseSalary: 70000,
        allowances: 30000,
        deductions: 5000,
        netSalary: 95000,
        status: "ACTIVE",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        quotaAchievement: "100%",
      },
      {
        employeeId: "EMP-104",
        name: "David Chen",
        email: "david.chen@orbit360.com",
        phone: "+1 (555) 333-2211",
        companyId: "comp-orbit-global",
        companyName: "Orbit Global Technologies",
        department: "Customer Success",
        designation: "Senior SDR Specialist",
        joiningDate: "2024-02-10",
        salary: 68000,
        baseSalary: 50000,
        allowances: 20000,
        deductions: 2000,
        netSalary: 68000,
        status: "ON_LEAVE",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        quotaAchievement: "88%",
      },
    ]);

    // 4. Seed Attendance in MongoDB
    await AttendanceModel.create([
      {
        employeeName: "Sarah Jenkins",
        employeeEmail: "sarah.jenkins@orbit360.com",
        date: "2026-08-01",
        checkIn: "08:58 AM",
        status: "ON_TIME",
        location: "Orbit HQ - San Francisco (Geo-Verified)",
      },
      {
        employeeName: "Rahul Sharma",
        employeeEmail: "rahul.sharma@orbit360.com",
        date: "2026-08-01",
        checkIn: "09:04 AM",
        status: "ON_TIME",
        location: "Gurugram Sales Hub (Geo-Verified)",
      },
      {
        employeeName: "Elena Rostova",
        employeeEmail: "elena.rostova@orbit360.com",
        date: "2026-08-01",
        checkIn: "09:12 AM",
        status: "REMOTE",
        location: "Remote Check-in (GPS 28.6139, 77.2090)",
      },
    ]);

    // 5. Seed Leaves in MongoDB
    await LeaveModel.create([
      {
        employeeName: "David Chen",
        employeeEmail: "david.chen@orbit360.com",
        leaveType: "CASUAL",
        startDate: "2026-08-01",
        endDate: "2026-08-03",
        reason: "Personal family event trip",
        status: "APPROVED",
        approvedBy: "Elena Rostova",
      },
      {
        employeeName: "Rahul Sharma",
        employeeEmail: "rahul.sharma@orbit360.com",
        leaveType: "SICK",
        startDate: "2026-08-10",
        endDate: "2026-08-11",
        reason: "Dental procedure appointment",
        status: "PENDING",
      },
    ]);

    // 6. Seed Invoices in MongoDB
    await InvoiceModel.create([
      {
        invoiceNumber: "INV-2026-889",
        clientName: "Apex Tech Corp",
        clientEmail: "mchang@apextech.com",
        clientAddress: "100 Innovation Way, Tech Park, CA 94025",
        clientGstin: "07AAAAA0000A1Z5",
        taxType: "INTRA_STATE",
        items: [
          { description: "Orbit 360 Enterprise Annual License (100 Reps)", quantity: 1, unitPrice: 12000, amount: 12000, hsnCode: "998313" },
          { description: "Custom WhatsApp API & Lead Routing Setup", quantity: 1, unitPrice: 2500, amount: 2500, hsnCode: "998314" },
        ],
        subtotal: 14500,
        discount: 500,
        cgstRate: 9,
        cgstAmount: 1260,
        sgstRate: 9,
        sgstAmount: 1260,
        igstRate: 0,
        igstAmount: 0,
        total: 16520,
        status: "PAID",
        dueDate: "2026-08-15",
        paymentLink: "https://stripe.com/pay/inv_2026_889",
      },
      {
        invoiceNumber: "INV-2026-890",
        clientName: "Vanguard Infra & Realty",
        clientEmail: "priya@vanguardrealty.in",
        clientAddress: "Suite 404, Real Estate Tower, Cyber City, HR",
        clientGstin: "06BBBCC1111B2Z8",
        taxType: "INTER_STATE",
        items: [
          { description: "99acres & Housing.com Auto Connector License", quantity: 1, unitPrice: 8200, amount: 8200, hsnCode: "998313" },
        ],
        subtotal: 8200,
        discount: 200,
        cgstRate: 0,
        cgstAmount: 0,
        sgstRate: 0,
        sgstAmount: 0,
        igstRate: 18,
        igstAmount: 1440,
        total: 9440,
        status: "DUE",
        dueDate: "2026-08-10",
        paymentLink: "https://razorpay.com/pay/inv_2026_890",
      },
    ]);

    // 7. Seed Connectors in MongoDB
    await ConnectorModel.create([
      {
        connectorId: "fb-ads",
        name: "Facebook Lead Ads",
        category: "Social Ads",
        status: "ACTIVE",
        syncSpeed: "< 1s sync",
        lastSyncedAt: "2 mins ago",
        totalLeadsSynced: 1248,
        autoImport: true,
        apiKeyOrWebhookUrl: "https://orbit360.com/api/v1/webhooks/fb-leads",
        syncLogs: [
          { id: "s-1", timestamp: "2026-08-01 09:45", status: "SUCCESS", leadsImported: 4, message: "Ingested 4 instant form submissions" },
        ],
      },
      {
        connectorId: "indiamart",
        name: "IndiaMART B2B Connector",
        category: "B2B Marketplace",
        status: "ACTIVE",
        syncSpeed: "< 2s sync",
        lastSyncedAt: "5 mins ago",
        totalLeadsSynced: 890,
        autoImport: true,
        apiKeyOrWebhookUrl: "https://orbit360.com/api/v1/webhooks/indiamart",
        syncLogs: [
          { id: "s-2", timestamp: "2026-08-01 09:30", status: "SUCCESS", leadsImported: 2, message: "Parsed 2 buyer RFQs" },
        ],
      },
      {
        connectorId: "99acres",
        name: "99acres Real Estate Hub",
        category: "Real Estate",
        status: "ACTIVE",
        syncSpeed: "< 3s sync",
        lastSyncedAt: "12 mins ago",
        totalLeadsSynced: 612,
        autoImport: true,
        apiKeyOrWebhookUrl: "https://orbit360.com/api/v1/webhooks/99acres",
        syncLogs: [],
      },
      {
        connectorId: "whatsapp",
        name: "WhatsApp Business API",
        category: "Messaging",
        status: "ACTIVE",
        syncSpeed: "Realtime",
        lastSyncedAt: "Just now",
        totalLeadsSynced: 3410,
        autoImport: true,
        apiKeyOrWebhookUrl: "https://orbit360.com/api/v1/webhooks/whatsapp",
        syncLogs: [],
      },
    ]);

    // 8. Seed Notifications in MongoDB
    await NotificationModel.create([
      {
        title: "New High-Intent Lead Assigned",
        message: "Enterprise CRM Implementation ($145,000) assigned to Sarah Jenkins.",
        type: "LEAD_ASSIGNED",
        read: false,
      },
      {
        title: "Invoice Paid",
        message: "Invoice INV-2026-889 ($16,520) marked as PAID by Apex Tech Corp.",
        type: "INVOICE_PAID",
        read: false,
      },
      {
        title: "Leave Approved",
        message: "Casual leave request for David Chen approved by Elena Rostova.",
        type: "LEAVE_APPROVED",
        read: true,
      },
    ]);

    console.log("MongoDB collections populated successfully.");
  } catch (error) {
    console.error("Auto-seeding error:", error);
  }
}
