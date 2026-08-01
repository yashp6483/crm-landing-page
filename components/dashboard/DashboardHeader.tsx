"use client";

import React, { useState } from "react";
import { Search, Bell, LogOut, CheckCircle2, User, Sparkles, Menu } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "sonner";

export const DashboardHeader: React.FC<{ onMobileMenuToggle?: () => void }> = ({
  onMobileMenuToggle,
}) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: "New High-Intent Lead Assigned", time: "5 mins ago", read: false },
    { id: 2, title: "Invoice INV-2026-889 Paid ($16,520)", time: "1 hour ago", read: false },
    { id: 3, title: "Leave Request Approved by Elena", time: "3 hours ago", read: true },
  ];

  const handleSeedDatabase = async () => {
    try {
      toast.loading("Seeding database with demo records...", { id: "seed" });
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Database seeded successfully! Reloading view...", { id: "seed" });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(data.error || "Failed to seed database", { id: "seed" });
      }
    } catch {
      toast.error("Error connecting to seeder endpoint", { id: "seed" });
    }
  };

  return (
    <header className="h-16 bg-[#070b14]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu Toggle & Global Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative w-full max-w-xs md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, invoices, employees..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Instant Seed Demo Data Button */}
        <button
          onClick={handleSeedDatabase}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Demo Data</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <h5 className="text-xs font-bold text-white">Notifications</h5>
                <span className="text-[10px] text-emerald-400 font-mono">3 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium leading-tight">{n.title}</p>
                      <span className="text-[10px] text-slate-500 block mt-1">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name || "User"}
              className="w-9 h-9 rounded-xl object-cover border border-slate-700 group-hover:border-emerald-500 transition-colors"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-2 border-b border-slate-800 mb-2">
                <p className="text-xs font-bold text-white truncate">{user?.name || "Sarah Jenkins"}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  {user?.role || "ADMIN"}
                </span>
              </div>
              <button
                onClick={() => {
                  toast.info("Opening profile settings...");
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  toast.success("Logged out successfully");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer mt-1"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
