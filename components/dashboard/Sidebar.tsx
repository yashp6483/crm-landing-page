"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Receipt,
  Share2,
  BarChart3,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  ArrowLeft,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Sidebar: React.FC<{ mobileOpen?: boolean; onMobileClose?: () => void }> = ({
  mobileOpen = false,
  onMobileClose,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, role: "ALL" },
    { label: "Lead Pipeline", href: "/dashboard/leads", icon: Kanban, role: "ALL" },
    { label: "HRMS & Team", href: "/dashboard/hrms", icon: Users, role: "ALL" },
    { label: "GST Invoicing", href: "/dashboard/invoicing", icon: Receipt, role: "ALL" },
    { label: "Connectors Hub", href: "/dashboard/connectors", icon: Share2, role: "ALL" },
    { label: "Reports", href: "/dashboard/reports", icon: BarChart3, role: "ALL" },
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck, role: "ADMIN" },
  ];

  const content = (
    <div className="h-full flex flex-col justify-between">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <Link href="/dashboard" onClick={onMobileClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6 text-slate-950" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">Orbit 360</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase block">Unified CRM</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white items-center justify-center transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.role === "ADMIN" && user?.role !== "ADMIN") return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute left-0 w-1 h-6 bg-emerald-400 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Back to Site */}
      <div className="p-3 border-t border-slate-800/80 space-y-3">
        {(!collapsed || mobileOpen) && user && (
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center gap-3">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{user.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono block uppercase">{user.role}</span>
            </div>
          </div>
        )}

        <Link
          href="/"
          onClick={onMobileClose}
          className={`flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 px-3 py-2 rounded-xl transition-colors ${
            collapsed && !mobileOpen ? "justify-center" : ""
          }`}
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Back to Landing Page</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex h-screen sticky top-0 bg-[#070b14]/95 border-r border-slate-800/80 flex-col justify-between transition-all duration-300 z-30 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex"
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-[#070b14] border-r border-slate-800 p-2"
            >
              {content}
            </motion.aside>
            <div className="flex-1" onClick={onMobileClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
