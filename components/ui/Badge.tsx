import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "emerald" | "cyan" | "indigo" | "outline";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  icon,
  variant = "emerald",
  className,
}) => {
  const variantStyles = {
    emerald:
      "bg-emerald-950/60 text-emerald-400 border-emerald-500/30 shadow-emerald-950/50",
    cyan: "bg-cyan-950/60 text-cyan-400 border-cyan-500/30 shadow-cyan-950/50",
    indigo:
      "bg-indigo-950/60 text-indigo-400 border-indigo-500/30 shadow-indigo-950/50",
    outline:
      "bg-slate-900/60 text-slate-300 border-slate-700/60 shadow-slate-950/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-sm transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
