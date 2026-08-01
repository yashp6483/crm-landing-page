"use client";

import React from "react";
import { BarChart3, Download, FileText, TrendingUp, DollarSign, Users, Receipt } from "lucide-react";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { TiltCard } from "@/components/ui/TiltCard";
import { toast } from "sonner";

export default function ReportsPage() {
  const handleExportReport = (reportName: string) => {
    toast.success(`Exported ${reportName} to CSV successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Reports & Business Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Export monthly sales performance, GST tax ledger summaries, and HRMS attendance reports.
          </p>
        </div>

        <ButtonRipple onClick={() => handleExportReport("Executive Summary Report")} variant="primary" size="md">
          <Download className="w-4 h-4" />
          <span>Export Executive Report (PDF)</span>
        </ButtonRipple>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TiltCard tiltAmount={4} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Monthly Sales & Revenue Report</h4>
                <span className="text-[11px] text-slate-400">July 2026 Financial Closure</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Total processed revenue of $145,000 across won enterprise contracts and subscription billing.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => handleExportReport("Sales Revenue Report")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Export CSV
            </button>
          </div>
        </TiltCard>

        <TiltCard tiltAmount={4} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">GST Tax Compliance Ledger</h4>
                <span className="text-[11px] text-slate-400">CGST / SGST / IGST Summary</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Auto-calculated tax liabilities: $2,520 CGST/SGST + $1,440 IGST collected.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => handleExportReport("GST Tax Compliance Ledger")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Export CSV
            </button>
          </div>
        </TiltCard>

        <TiltCard tiltAmount={4} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Workforce & Attendance Audit</h4>
                <span className="text-[11px] text-slate-400">Geo-Location Logs & Leaves</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              100% duty attendance rate with 16 HR admin hours saved per month.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => handleExportReport("Workforce Attendance Audit")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Export CSV
            </button>
          </div>
        </TiltCard>

        <TiltCard tiltAmount={4} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Lead Source Conversion Funnel</h4>
                <span className="text-[11px] text-slate-400">Omnichannel Attribution</span>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              Top lead generation channels: Meta Ads (38%), IndiaMART (25%), WhatsApp (20%).
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => handleExportReport("Lead Source Conversion Funnel")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Export CSV
            </button>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
