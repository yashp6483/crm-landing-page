import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { EmployeeModel } from "@/lib/db/models/Employee";
import { ensureDatabaseSeeded } from "@/lib/db/seedHelper";

export async function GET() {
  try {
    await connectToDatabase();
    await ensureDatabaseSeeded();

    let employees = await EmployeeModel.find().sort({ createdAt: -1 });

    // Fallback safety: if still 0 records, seed immediately and query again
    if (employees.length === 0) {
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
      employees = await EmployeeModel.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data: employees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const count = await EmployeeModel.countDocuments();
    const newEmp = await EmployeeModel.create({
      ...body,
      employeeId: `EMP-${101 + count}`,
    });
    return NextResponse.json({ success: true, data: newEmp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
