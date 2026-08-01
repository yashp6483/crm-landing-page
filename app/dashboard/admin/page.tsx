"use client";

import React, { useState } from "react";
import { ShieldCheck, UserCheck, Key, FileText, CheckCircle2, Lock, Sparkles, Building, Database, Users, Check, X } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();
  const [smtpServer, setSmtpServer] = useState("smtp.orbit360.com");
  const [apiKey, setApiKey] = useState("orb_live_sk_99382103892183921");
  const [companyName, setCompanyName] = useState("Orbit Global Technologies");

  const auditLogs = [
    { id: "a-1", user: "Sarah Jenkins", action: "Updated Lead Stage to WON", module: "LEADS", time: "10 mins ago" },
    { id: "a-2", user: "Elena Rostova", action: "Approved Leave for David Chen", module: "HRMS", time: "1 hour ago" },
    { id: "a-3", user: "Rahul Sharma", action: "Generated Invoice INV-2026-890", module: "INVOICE", time: "3 hours ago" },
  ];

  const permissionsMatrix = [
    { role: "Company Admin", companyScope: "Full Access", hrmsAccess: true, payrollAccess: true, invoicesAccess: true, leadCrmAccess: true, systemKeysAccess: true },
    { role: "HR Manager", companyScope: "Company Isolated", hrmsAccess: true, payrollAccess: true, invoicesAccess: false, leadCrmAccess: false, systemKeysAccess: false },
    { role: "Sales Rep / Manager", companyScope: "Company Isolated", hrmsAccess: false, payrollAccess: false, invoicesAccess: true, leadCrmAccess: true, systemKeysAccess: false },
    { role: "Employee", companyScope: "Self Only", hrmsAccess: false, payrollAccess: false, invoicesAccess: false, leadCrmAccess: false, systemKeysAccess: false },
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("System configuration & MongoDB tenant settings updated!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Database: MongoDB (Mongoose Encrypted)
          </span>
          <span className="text-xs text-slate-400">• Multi-Company Isolation Engine</span>
        </div>
        <h1 className="text-2xl font-black text-white">Admin Security & Role Permission Matrix</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage company admin credentials, HR Manager role boundaries, employee salary scopes, and MongoDB system security.
        </p>
      </div>

      {/* Role Permission Matrix Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Role-Based Access Control (RBAC) & HR Permissions</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">Strict Multi-Tenant Scoping</span>
        </div>

        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">User Role</th>
                <th className="p-3.5">Company Scope</th>
                <th className="p-3.5">HRMS & Attendance</th>
                <th className="p-3.5">Salary & Payroll</th>
                <th className="p-3.5">GST Invoices</th>
                <th className="p-3.5">Lead CRM</th>
                <th className="p-3.5 text-right">System Keys</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {permissionsMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>{p.role}</span>
                  </td>
                  <td className="p-3.5 font-mono text-cyan-400">{p.companyScope}</td>
                  <td className="p-3.5">{p.hrmsAccess ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />}</td>
                  <td className="p-3.5">{p.payrollAccess ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />}</td>
                  <td className="p-3.5">{p.invoicesAccess ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />}</td>
                  <td className="p-3.5">{p.leadCrmAccess ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />}</td>
                  <td className="p-3.5 text-right">{p.systemKeysAccess ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-slate-600 inline" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Settings Form */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-400" />
            <span>Enterprise & Company Tenant Settings</span>
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">SMTP Server</label>
                <input
                  type="text"
                  value={smtpServer}
                  onChange={(e) => setSmtpServer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">REST API Secret Key</label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <ButtonRipple type="submit" variant="primary" size="md">
                <CheckCircle2 className="w-4 h-4" />
                <span>Save System Settings</span>
              </ButtonRipple>
            </div>
          </form>
        </div>

        {/* Audit Logs Feed */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl">
          <h3 className="text-base font-bold text-white mb-4">Real-Time Audit Logs</h3>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold text-emerald-400">{log.user}</span>
                  <span>{log.time}</span>
                </div>
                <p className="text-slate-200 font-medium">{log.action}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-cyan-400">
                  {log.module}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
