import React from "react";
import { cn } from "@/lib/utils";

interface GlowingGradientProps {
  className?: string;
  position?: "top-left" | "top-right" | "center" | "bottom-center";
}

export const GlowingGradient: React.FC<GlowingGradientProps> = ({
  className,
  position = "center",
}) => {
  const positions = {
    "top-left": "-top-32 -left-32",
    "top-right": "-top-32 -right-32",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "-bottom-32 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={cn(
        "absolute pointer-events-none w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 z-0",
        positions[position],
        className
      )}
    />
  );
};
