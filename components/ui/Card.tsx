import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glowOnHover = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 p-6 shadow-xl overflow-hidden group",
        glowOnHover &&
          "hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent group-hover:via-emerald-500/50 transition-all duration-500" />
      {children}
    </div>
  );
};
