"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  color,
}) => {
  return (
    <TiltCard tiltAmount={8} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden group">
      {/* Background Accent Glow */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400">{title}</span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-extrabold text-white tracking-tight"
        >
          {value}
        </motion.h3>
        <span
          className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
          }`}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </span>
      </div>
    </TiltCard>
  );
};
