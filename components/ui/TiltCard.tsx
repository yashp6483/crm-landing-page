"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  tiltAmount = 10,
  glowColor = "rgba(16, 185, 129, 0.15)",
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight coordinates for CSS gradient radial tracking
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), {
    stiffness: 200,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);

    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(0);
    mouseY.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={cn(
          "relative rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl transition-colors duration-300 p-6 shadow-xl overflow-hidden group cursor-pointer",
          "hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/40",
          className
        )}
      >
        {/* Dynamic Radial Spotlight following mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at ${spotX.get()}px ${spotY.get()}px, ${glowColor}, transparent 80%)`,
          }}
        />

        {/* Subtle glowing top border line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent group-hover:via-emerald-500/60 transition-all duration-500" />

        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};
