"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  Receipt,
  Kanban,
  Plus,
  Share2,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ButtonRipple } from "@/components/ui/ButtonRipple";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";

const revenueData = [
  { month: "Jan", revenue: 42000, leads: 120 },
  { month: "Feb", revenue: 58000, leads: 160 },
  { month: "Mar", revenue: 75000, leads: 210 },
  { month: "Apr", revenue: 64000, leads: 180 },
  { month: "May", revenue: 92000, leads: 260 },
  { month: "Jun", revenue: 110000, leads: 310 },
  { month: "Jul", revenue: 145000, leads: 420 },
];

const sourceData = [
  { source: "FB Ads", count: 180, color: "#1877F2" },
  { source: "IndiaMART", count: 120, color: "#283593" },
  { source: "99acres", count: 95, color: "#00897B" },
  { source: "WhatsApp", count: 140, color: "#25D366" },
  { source: "Google Ads", count: 85, color: "#EA4335" },
];

export default function DashboardOverviewPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setLeads(data.data);
      })
      .catch(() => {});

    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setInvoices(data.data);
      })
      .catch(() => {});
  }, []);

  const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0);

  return (
    <div className="space-y-8">
      {/* Executive Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Orbit 360 Live Cockpit v2.5
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Welcome Back, Executive Cockpit
          </h1>
          <p className="text-xs text-slate-400 max-w-xl mt-1">
            Real-time telemetry for Sales Pipelines, HR Attendance, and GST Billing across all departments.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link href="/dashboard/leads">
            <ButtonRipple variant="primary" size="md">
              <Plus className="w-4 h-4" />
              <span>Create Lead</span>
            </ButtonRipple>
          </Link>
          <Link href="/dashboard/invoicing">
            <ButtonRipple variant="secondary" size="md">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Create Invoice</span>
            </ButtonRipple>
          </Link>
        </div>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Pipeline Value"
          value={`$${(totalValue || 406000).toLocaleString()}`}
          change="+24.8%"
          isPositive={true}
          icon={DollarSign}
          color="#10b981"
        />
        <StatCard
          title="Total Qualified Leads"
          value={leads.length || 6}
          change="+18.2%"
          isPositive={true}
          icon={Kanban}
          color="#06b6d4"
        />
        <StatCard
          title="Team Duty Attendance"
          value="100%"
          change="On Time"
          isPositive={true}
          icon={Users}
          color="#6366f1"
        />
        <StatCard
          title="Invoices Receivable"
          value={`$${invoices.reduce((sum, inv) => sum + (inv.status === "DUE" ? inv.total : 0), 0) || 9440}`}
          change="2 Pending"
          isPositive={false}
          icon={Receipt}
          color="#f59e0b"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Trend (AreaChart) */}
        <TiltCard tiltAmount={4} className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Revenue Growth</h3>
              <p className="text-xs text-slate-400">Processed revenue via Stripe, Razorpay & Wire Transfers.</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
              +38.5% YoY
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#090d16", borderColor: "#1e293b", borderRadius: "12px" }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TiltCard>

        {/* Lead Source Ingestion Breakdown (BarChart) */}
        <TiltCard tiltAmount={4} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Lead Source Distribution</h3>
              <Share2 className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400 mb-4">Inbound leads auto-routed via connectors.</p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <XAxis dataKey="source" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "#090d16", borderColor: "#1e293b", borderRadius: "12px" }} />
                  <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Top Performing Channel</span>
            <span className="font-bold text-emerald-400">Meta Facebook Ads</span>
          </div>
        </TiltCard>
      </div>

      {/* Recent Leads & Team Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active High Value Deals Stream */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Active High-Value Deals</h3>
              <p className="text-xs text-slate-400">Real-time status updates from sales rep buckets.</p>
            </div>
            <Link href="/dashboard/leads" className="text-xs text-emerald-400 hover:underline font-bold">
              View Kanban Board →
            </Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead._id || lead.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Kanban className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="text-xs font-bold text-white truncate">{lead.title}</h5>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {lead.companyName} • {lead.contactName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-400">${(lead.value || 0).toLocaleString()}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-300">
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity Log & Today's Schedule */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">System Activity Stream</h3>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
              <div className="pl-7 relative">
                <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
                <p className="text-xs text-white font-medium">Invoice INV-2026-889 Paid</p>
                <span className="text-[10px] text-slate-500">Apex Tech Corp • 10 mins ago</span>
              </div>
              <div className="pl-7 relative">
                <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
                <p className="text-xs text-white font-medium">4 Facebook Leads Auto-Synced</p>
                <span className="text-[10px] text-slate-500">Facebook Lead Ads Connector • 25 mins ago</span>
              </div>
              <div className="pl-7 relative">
                <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-indigo-400 ring-4 ring-slate-950" />
                <p className="text-xs text-white font-medium">Check-in Logged: Sarah Jenkins</p>
                <span className="text-[10px] text-slate-500">HQ Office (GPS Verified) • 08:58 AM</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All Systems Operational</span>
            </span>
            <span className="font-mono text-[10px]">99.99% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
