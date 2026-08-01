"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none relative overflow-hidden group";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-3 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 border border-emerald-400/30",
    secondary:
      "bg-slate-900/90 text-slate-100 border border-slate-700/60 hover:bg-slate-800 hover:border-slate-600 shadow-md backdrop-blur-md",
    outline:
      "bg-transparent text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 hover:border-emerald-400 shadow-sm",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0 relative z-10">{icon}</span>}
    </motion.button>
  );
};
