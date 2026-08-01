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
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export const Sidebar: React.FC<{ mobileOpen?: boolean; onMobileClose?: () => void }> = ({
  mobileOpen = false,
  onMobileClose,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Lead Pipeline", href: "/dashboard/leads", icon: Kanban },
    { label: "HRMS & Team", href: "/dashboard/hrms", icon: Users },
    { label: "GST Invoicing", href: "/dashboard/invoicing", icon: Receipt },
    { label: "Connectors Hub", href: "/dashboard/connectors", icon: Share2 },
    { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { label: "Admin Panel", href: "/dashboard/admin", icon: ShieldCheck, badge: "Admin" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
          <Link href="/dashboard" onClick={onMobileClose} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6 text-slate-950" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="overflow-hidden">
                <span className="font-extrabold text-white text-base tracking-tight block truncate">Orbit 360</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase block truncate">Unified CRM & HRMS</span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white items-center justify-center transition-colors cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                title={collapsed && !mobileOpen ? item.label : undefined}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 border border-emerald-500/30 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  {(!collapsed || mobileOpen) && <span className="truncate">{item.label}</span>}
                </div>

                {(!collapsed || mobileOpen) && item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute left-0 w-1 h-6 bg-emerald-400 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Actions */}
      <div className="p-3 border-t border-slate-800/80 space-y-2">
        {(!collapsed || mobileOpen) && user && (
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-500/40 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">{user.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono block uppercase">{user.role || "ADMIN"}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <Link
            href="/"
            onClick={onMobileClose}
            className={`flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
              collapsed && !mobileOpen ? "justify-center" : ""
            }`}
            title={collapsed && !mobileOpen ? "Back to Landing Page" : undefined}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Back to Landing Page</span>}
          </Link>

          <button
            onClick={() => {
              if (onMobileClose) onMobileClose();
              logout();
            }}
            className={`w-full flex items-center gap-2.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
              collapsed && !mobileOpen ? "justify-center" : ""
            }`}
            title={collapsed && !mobileOpen ? "Sign Out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden md:flex h-screen sticky top-0 bg-[#070b14]/95 border-r border-slate-800/80 flex-col justify-between transition-all duration-300 z-30 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay Drawer */}
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
              className="w-72 h-full bg-[#070b14] border-r border-slate-800 p-2 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
            <div className="flex-1" onClick={onMobileClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
