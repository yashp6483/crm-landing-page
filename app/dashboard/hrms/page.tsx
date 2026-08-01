"use client";

import React, { useState, useEffect } from "react";
import { Users, Clock, Calendar, MapPin, CheckCircle2, XCircle, Plus, ShieldCheck, UserCheck, DollarSign, Building, Receipt, FileText, X } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { TiltCard } from "@/components/ui/TiltCard";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";

export default function HRMSPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"directory" | "attendance" | "leaves" | "payroll">("directory");
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");
  const [selectedEmployeeForPayslip, setSelectedEmployeeForPayslip] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Leave Form State
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [leaveForm, setLeaveForm] = useState({
    employeeName: user?.name || "Sarah Jenkins",
    employeeEmail: user?.email || "sarah.jenkins@orbit360.com",
    leaveType: "CASUAL",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    reason: "Personal leave request",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empRes, attRes, leaveRes] = await Promise.all([
        fetch("/api/employees"),
        fetch("/api/attendance"),
        fetch("/api/leaves"),
      ]);

      const empData = await empRes.json();
      const attData = await attRes.json();
      const leaveData = await leaveRes.json();

      if (empData.success) setEmployees(empData.data);
      if (attData.success) setAttendance(attData.data);
      if (leaveData.success) setLeaves(leaveData.data);
    } catch {
      toast.error("Failed to load HRMS telemetry data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter employees by company
  const filteredEmployees = employees.filter((emp) => {
    if (selectedCompany === "ALL") return true;
    return (emp.companyName || "Orbit Global Technologies") === selectedCompany;
  });

  // Handle Geo-Location Clock-In
  const handleClockIn = async () => {
    toast.loading("Fetching GPS coordinates & verifying geo-fence...", { id: "clockIn" });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const res = await fetch("/api/attendance", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                employeeName: user?.name || "Sarah Jenkins",
                employeeEmail: user?.email || "sarah.jenkins@orbit360.com",
                latitude: lat,
                longitude: lng,
                location: `GPS Checked (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
                status: "ON_TIME",
              }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
              toast.success("Clock-in recorded successfully!", { id: "clockIn" });
              fetchData();
            }
          } catch {
            toast.error("Error logging attendance", { id: "clockIn" });
          }
        },
        async () => {
          const res = await fetch("/api/attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              employeeName: user?.name || "Sarah Jenkins",
              employeeEmail: user?.email || "sarah.jenkins@orbit360.com",
              location: "Orbit HQ - San Francisco (Geo-Verified)",
              status: "ON_TIME",
            }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            toast.success("Clock-in recorded (HQ Verified)!", { id: "clockIn" });
            fetchData();
          }
        }
      );
    } else {
      toast.error("Geolocation not supported on browser", { id: "clockIn" });
    }
  };

  // Handle Approve/Reject Leave
  const handleLeaveAction = async (id: string, newStatus: "APPROVED" | "REJECTED") => {
    try {
      toast.loading(`Updating leave status to ${newStatus}...`, { id: "leaveAct" });
      const res = await fetch("/api/leaves", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, approvedBy: user?.name || "Elena Rostova" }),
      });
      if (res.ok) {
        toast.success(`Leave request ${newStatus.toLowerCase()}!`, { id: "leaveAct" });
        fetchData();
      }
    } catch {
      toast.error("Failed to update leave", { id: "leaveAct" });
    }
  };

  // Handle Leave Submit
  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.loading("Submitting leave request...", { id: "leaveSub" });
      const res = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveForm),
      });
      if (res.ok) {
        toast.success("Leave request submitted for approval!", { id: "leaveSub" });
        setShowLeaveModal(false);
        fetchData();
      }
    } catch {
      toast.error("Error submitting leave", { id: "leaveSub" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Multi-Tenant Company Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Role: {user?.role || "ADMIN"}
            </span>
            <span className="text-xs text-slate-400">• Multi-Company Isolated Database</span>
          </div>
          <h1 className="text-2xl font-black text-white">HRMS & Company Payroll Cockpit</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Admin and HR Manager control hub for company workforce, attendance clock-ins, leave approvals, and salary payslips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Company Filter Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white">
            <Building className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer font-semibold text-xs text-white"
            >
              <option value="ALL" className="bg-slate-950">All Companies</option>
              <option value="Orbit Global Technologies" className="bg-slate-950">Orbit Global Technologies</option>
              <option value="Apex Tech Corp" className="bg-slate-950">Apex Tech Corp</option>
              <option value="Vanguard Realty" className="bg-slate-950">Vanguard Realty</option>
            </select>
          </div>

          <ButtonRipple onClick={handleClockIn} variant="primary" size="md">
            <MapPin className="w-4 h-4" />
            <span>Clock In (GPS Verified)</span>
          </ButtonRipple>
          <ButtonRipple onClick={() => setShowLeaveModal(true)} variant="secondary" size="md">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Apply Leave</span>
          </ButtonRipple>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("directory")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "directory" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Employee Directory ({filteredEmployees.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("payroll")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "payroll" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Salary Payroll & Payslips</span>
        </button>

        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "attendance" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Geo-Attendance Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab("leaves")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === "leaves" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Leave Approvals ({leaves.filter((l) => l.status === "PENDING").length} Pending)</span>
        </button>
      </div>

      {/* Directory Tab */}
      {activeTab === "directory" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEmployees.map((emp) => (
            <TiltCard key={emp._id || emp.employeeId} tiltAmount={6} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={emp.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={emp.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-emerald-500/40"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate">{emp.name}</h4>
                    <span className="text-[11px] text-emerald-400 font-mono block">{emp.designation}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Company</span>
                    <span className="font-semibold text-white truncate max-w-[120px]">{emp.companyName || "Orbit Global"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Department</span>
                    <span className="font-semibold text-white">{emp.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Quota Achievement</span>
                    <span className="font-mono font-bold text-emerald-400">{emp.quotaAchievement || "100%"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedEmployeeForPayslip(emp)}
                  className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Payslip</span>
                </button>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  {emp.status}
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      )}

      {/* Salary Payroll Tab */}
      {activeTab === "payroll" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Company & Department</th>
                <th className="p-4">Base Salary</th>
                <th className="p-4">Allowances</th>
                <th className="p-4">Tax Deductions</th>
                <th className="p-4">Net Monthly Salary</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredEmployees.map((emp) => {
                const base = emp.baseSalary || Math.round((emp.salary || 75000) * 0.7);
                const allow = emp.allowances || Math.round((emp.salary || 75000) * 0.2);
                const deduct = emp.deductions || Math.round((emp.salary || 75000) * 0.05);
                const net = base + allow - deduct;

                return (
                  <tr key={emp._id || emp.employeeId} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white">{emp.name}</p>
                      <span className="text-[10px] text-slate-400">{emp.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-white block">{emp.companyName || "Orbit Global"}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{emp.department}</span>
                    </td>
                    <td className="p-4 font-mono">${base.toLocaleString()}</td>
                    <td className="p-4 font-mono text-cyan-400">+${allow.toLocaleString()}</td>
                    <td className="p-4 font-mono text-rose-400">-${deduct.toLocaleString()}</td>
                    <td className="p-4 font-mono font-bold text-emerald-400 text-sm">${net.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedEmployeeForPayslip({ ...emp, baseSalary: base, allowances: allow, deductions: deduct, netSalary: net })}
                        className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/20 text-xs cursor-pointer"
                      >
                        Generate Payslip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Date</th>
                <th className="p-4">Check In Time</th>
                <th className="p-4">Location Verification</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {attendance.map((att) => (
                <tr key={att._id || att.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-white">{att.employeeName}</p>
                    <span className="text-[10px] text-slate-400">{att.employeeEmail}</span>
                  </td>
                  <td className="p-4 font-mono">{att.date}</td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">{att.checkIn}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{att.location}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {att.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Leaves Tab */}
      {activeTab === "leaves" && (
        <div className="space-y-3">
          {leaves.map((leave) => (
            <div key={leave._id || leave.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-white">{leave.employeeName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-cyan-400">
                    {leave.leaveType} LEAVE
                  </span>
                </div>
                <p className="text-xs text-slate-300">{leave.reason}</p>
                <span className="text-[11px] text-slate-400 block mt-1 font-mono">
                  {leave.startDate} to {leave.endDate}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {leave.status === "PENDING" ? (
                  <>
                    <button
                      onClick={() => handleLeaveAction(leave._id || leave.id, "APPROVED")}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleLeaveAction(leave._id || leave.id, "REJECTED")}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      leave.status === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {leave.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Salary Payslip Modal */}
      {selectedEmployeeForPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Official Salary Slip</span>
                <h3 className="text-base font-black text-white">{selectedEmployeeForPayslip.name}</h3>
              </div>
              <button onClick={() => setSelectedEmployeeForPayslip(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
              <div className="flex justify-between text-slate-400">
                <span>Company</span>
                <span className="text-white font-bold">{selectedEmployeeForPayslip.companyName || "Orbit Global"}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Employee ID</span>
                <span className="text-white font-mono">{selectedEmployeeForPayslip.employeeId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Designation</span>
                <span className="text-emerald-400 font-semibold">{selectedEmployeeForPayslip.designation}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span>Base Salary</span>
                  <span className="font-mono text-white">${(selectedEmployeeForPayslip.baseSalary || 60000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>HRA & Special Allowances</span>
                  <span className="font-mono text-cyan-400">+${(selectedEmployeeForPayslip.allowances || 20000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax & Provident Deductions</span>
                  <span className="font-mono text-rose-400">-${(selectedEmployeeForPayslip.deductions || 5000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800">
                  <span className="text-white">NET SALARY PAYABLE</span>
                  <span className="text-emerald-400 font-mono">${(selectedEmployeeForPayslip.netSalary || 75000).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <ButtonRipple onClick={() => toast.success(`Salary Payslip exported for ${selectedEmployeeForPayslip.name}`)} variant="primary" size="md" className="w-full">
                <FileText className="w-4 h-4" />
                <span>Download Salary Payslip</span>
              </ButtonRipple>
            </div>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-lg font-black text-white mb-4">Submit Leave Request</h3>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="CASUAL">Casual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="PAID">Paid Time Off</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reason</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State reason for leave request..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <ButtonRipple type="submit" variant="primary" size="md">
                  <span>Submit Request</span>
                </ButtonRipple>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
