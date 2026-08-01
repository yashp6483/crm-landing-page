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
    const defaultPassword = await hashPassword("Orbit360@2026");

    // 1. Seed Users if empty
    if ((await UserModel.countDocuments()) === 0) {
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
    }

    // 2. Seed Employees if empty
    if ((await EmployeeModel.countDocuments()) === 0) {
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
        {
          employeeId: "EMP-105",
          name: "Michael Chang",
          email: "mchang@apextech.com",
          phone: "+1 (555) 999-1122",
          companyId: "comp-apex-tech",
          companyName: "Apex Tech Corp",
          department: "Engineering & IT",
          designation: "CTO & Solutions Architect",
          joiningDate: "2023-01-10",
          salary: 140000,
          baseSalary: 100000,
          allowances: 45000,
          deductions: 5000,
          netSalary: 140000,
          status: "ACTIVE",
          avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
          quotaAchievement: "120%",
        },
        {
          employeeId: "EMP-106",
          name: "Priya Sundaram",
          email: "priya@vanguardrealty.in",
          phone: "+91 98111 22334",
          companyId: "comp-vanguard",
          companyName: "Vanguard Realty",
          department: "Real Estate Operations",
          designation: "Managing Broker",
          joiningDate: "2023-05-18",
          salary: 92000,
          baseSalary: 65000,
          allowances: 30000,
          deductions: 3000,
          netSalary: 92000,
          status: "ACTIVE",
          avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
          quotaAchievement: "105%",
        },
      ]);
    }

    // 3. Seed Leads if empty
    if ((await LeadModel.countDocuments()) === 0) {
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
      ]);
    }

    // 4. Seed Attendance if empty
    if ((await AttendanceModel.countDocuments()) === 0) {
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
      ]);
    }

    // 5. Seed Leaves if empty
    if ((await LeaveModel.countDocuments()) === 0) {
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
      ]);
    }

    // 6. Seed Invoices if empty
    if ((await InvoiceModel.countDocuments()) === 0) {
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
          ],
          subtotal: 12000,
          discount: 0,
          cgstRate: 9,
          cgstAmount: 1080,
          sgstRate: 9,
          sgstAmount: 1080,
          igstRate: 0,
          igstAmount: 0,
          total: 14160,
          status: "PAID",
          dueDate: "2026-08-15",
          paymentLink: "https://stripe.com/pay/inv_2026_889",
        },
      ]);
    }

    // 7. Seed Connectors if empty
    if ((await ConnectorModel.countDocuments()) === 0) {
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
          syncLogs: [],
        },
      ]);
    }

    console.log("Database collections checked and auto-populated.");
  } catch (error) {
    console.error("Auto-seeding error:", error);
  }
}
