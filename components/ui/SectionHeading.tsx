import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  badgeVariant?: "emerald" | "cyan" | "indigo" | "outline";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  badgeVariant = "emerald",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl mb-12 sm:mb-16",
        align === "center" ? "mx-auto text-center items-center" : "items-start text-left",
        className
      )}
    >
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
